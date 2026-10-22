"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Q7h,Z7h;_.O7h=function(a,b){if(a.classList)Array.prototype.forEach.call(b,function(g){_.jxa(a,g)});
else{var c={};Array.prototype.forEach.call(_.gxa(a),function(g){c[g]=!0});
Array.prototype.forEach.call(b,function(g){c[g]=!0});
b="";for(var e in c)b+=b.length>0?" "+e:e;_.hxa(a,b)}};
_.P7h=function(a,b){a.classList?Array.prototype.forEach.call(b,function(c){_.kxa(a,c)}):_.hxa(a,Array.prototype.filter.call(_.gxa(a),function(c){return!_.ya(b,c)}).join(" "))};
Q7h=function(a){var b=a.offsetWidth,c=a.offsetHeight,e=_.If&&!b&&!c;return(b===void 0||e)&&a.getBoundingClientRect?(a=_.JBc(a),new _.Hc(a.right-a.left,a.bottom-a.top)):new _.Hc(b,c)};
_.R7h=function(a){if(_.RHa(a,"display")!="none")var b=Q7h(a);else{b=a.style;var c=b.display,e=b.visibility,g=b.position;b.visibility="hidden";b.position="absolute";b.display="inline";a=Q7h(a);b.display=c;b.position=g;b.visibility=e;b=a}return b};
_.T7h=function(a,b,c){_.Tc.call(this);this.target=a;this.handle=b||a;this.limits=c||new _.id(NaN,NaN,NaN,NaN);this.document_=_.Ud(a);this.eventHandler_=new _.Vf(this);_.Xc(this,this.eventHandler_);this.deltaY=this.deltaX=this.startY=this.startX=this.screenY=this.screenX=this.clientY=this.clientX=0;this.enabled_=!0;this.dragging_=!1;this.preventMouseDown_=!0;this.hysteresisDistanceSquared_=0;this.useRightPositioningForRtl_=!1;_.Yc(this.handle,["touchstart","mousedown"],this.startDrag,!1,this);this.useSetCapture_=
S7h};
_.es(_.T7h,_.Tc);var S7h=_.Ka.document&&_.Ka.document.documentElement&&!!_.Ka.document.documentElement.setCapture&&!!_.Ka.document.releaseCapture;_.d=_.T7h.prototype;_.d.setAllowSetCapture=function(a){this.useSetCapture_=a&&S7h};
_.d.enableRightPositioningForRtl=function(a){this.useRightPositioningForRtl_=a};
_.d.getHandler=function(){return this.eventHandler_};
_.d.setHysteresis=function(a){this.hysteresisDistanceSquared_=Math.pow(a,2)};
_.d.getHysteresis=function(){return Math.sqrt(this.hysteresisDistanceSquared_)};
_.d.setScrollTarget=function(a){this.scrollTarget_=a};
_.d.getEnabled=function(){return this.enabled_};
_.d.setEnabled=function(a){this.enabled_=a};
_.d.setPreventMouseDown=function(a){this.preventMouseDown_=a};
_.d.disposeInternal=function(){_.T7h.superClass_.disposeInternal.call(this);_.Nxc(this.handle,["touchstart","mousedown"],this.startDrag,!1,this);this.eventHandler_.removeAll();this.useSetCapture_&&this.document_.releaseCapture();this.handle=this.target=null};
var U7h=function(a){a.rightToLeft_===void 0&&(a.rightToLeft_=_.PHa(a.target));return a.rightToLeft_};
_.T7h.prototype.startDrag=function(a){var b=a.type=="mousedown",c;!(c=!this.enabled_||this.dragging_)&&(c=b)&&(c=!(a.isButton(0)&&(!_.Wnc||!a.ctrlKey)));if(c)this.dispatchEvent("earlycancel");else{if(this.hysteresisDistanceSquared_==0)if(this.dispatchEvent(new V7h("start",this,a.clientX,a.clientY,a)))this.dragging_=!0,this.preventMouseDown_&&b&&a.preventDefault();else return;else this.preventMouseDown_&&b&&a.preventDefault();b=this.document_;c=b.documentElement;var e=!this.useSetCapture_;this.eventHandler_.listen(b,
["touchmove","mousemove"],this.handleMove_,{capture:e,passive:!1});this.eventHandler_.listen(b,["touchend","mouseup"],this.endDrag,e);this.useSetCapture_?(c.setCapture(!1),this.eventHandler_.listen(c,"losecapture",this.endDrag)):this.eventHandler_.listen(_.bv(b),"blur",this.endDrag);this.scrollTarget_&&this.eventHandler_.listen(this.scrollTarget_,"scroll",this.onScroll_,e);this.clientX=this.startX=a.clientX;this.clientY=this.startY=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;this.deltaX=
this.useRightPositioningForRtl_?_.YHa(this.target):this.target.offsetLeft;this.deltaY=this.target.offsetTop;this.pageScroll=_.Etc(_.nd(this.document_))}};
_.T7h.prototype.endDrag=function(a,b){this.eventHandler_.removeAll();this.useSetCapture_&&this.document_.releaseCapture();this.dragging_?(this.dragging_=!1,this.dispatchEvent(new V7h("end",this,a.clientX,a.clientY,a,_.W7h(this,this.deltaX),_.X7h(this,this.deltaY),b||a.type=="touchcancel"))):this.dispatchEvent("earlycancel")};
_.T7h.prototype.endDragCancel=function(a){this.endDrag(a,!0)};
_.T7h.prototype.handleMove_=function(a){if(this.enabled_){var b=(this.useRightPositioningForRtl_&&U7h(this)?-1:1)*(a.clientX-this.clientX),c=a.clientY-this.clientY;this.clientX=a.clientX;this.clientY=a.clientY;this.screenX=a.screenX;this.screenY=a.screenY;if(!this.dragging_){var e=this.startX-this.clientX,g=this.startY-this.clientY;if(e*e+g*g>this.hysteresisDistanceSquared_)if(this.dispatchEvent(new V7h("start",this,a.clientX,a.clientY,a)))this.dragging_=!0;else{this.isDisposed()||this.endDrag(a);
return}}c=Y7h(this,b,c);b=c.x;c=c.y;this.dragging_&&this.dispatchEvent(new V7h("beforedrag",this,a.clientX,a.clientY,a,b,c))&&(Z7h(this,a,b,c,!1),a.preventDefault())}};
var Y7h=function(a,b,c){var e=_.Etc(_.nd(a.document_));b+=e.x-a.pageScroll.x;c+=e.y-a.pageScroll.y;a.pageScroll=e;a.deltaX+=b;a.deltaY+=c;return new _.Gc(_.W7h(a,a.deltaX),_.X7h(a,a.deltaY))};
_.T7h.prototype.onScroll_=function(a){var b=Y7h(this,0,0);a.clientX=this.clientX;a.clientY=this.clientY;Z7h(this,a,b.x,b.y,!0)};
Z7h=function(a,b,c,e){a.useRightPositioningForRtl_&&U7h(a)?a.target.style.right=c+"px":a.target.style.left=c+"px";a.target.style.top=e+"px";a.dispatchEvent(new V7h("drag",a,b.clientX,b.clientY,b,c,e))};
_.W7h=function(a,b){var c=a.limits;a=isNaN(c.left)?null:c.left;c=isNaN(c.width)?0:c.width;return Math.min(a!=null?a+c:Infinity,Math.max(a!=null?a:-Infinity,b))};
_.X7h=function(a,b){var c=a.limits;a=isNaN(c.top)?null:c.top;c=isNaN(c.height)?0:c.height;return Math.min(a!=null?a+c:Infinity,Math.max(a!=null?a:-Infinity,b))};
_.T7h.prototype.isDragging=function(){return this.dragging_};
var V7h=function(a,b,c,e,g,k,l,m){_.Sc.call(this,a);this.clientX=c;this.clientY=e;this.browserEvent=g;this.left=k!==void 0?k:b.deltaX;this.top=l!==void 0?l:b.deltaY;this.dragger=b;this.dragCanceled=!!m};
_.es(V7h,_.Sc);
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
