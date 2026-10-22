"use strict";_F_installCss(".ytImageStickerHost{display:block;position:relative}.ytImageStickerImageCopy{position:absolute;filter:brightness(0) invert(1)}.ytImageStickerImageActual{position:relative}.ytOverlayProductStickerHost{display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 0 2px rgba(0,0,0,0.3))}.ytOverlayProductStickerTitleButton.ytOverlayProductStickerTitleButton{display:flex;align-items:center;justify-content:center;width:auto;padding:4px 4px 4px 8px;border-radius:4px;color:var(--t4aeaa857de8a786b);background-color:#fff}.ytOverlayProductStickerTitleButtonOptimized.ytOverlayProductStickerTitleButtonOptimized{font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:500;line-height:2rem;position:relative;margin-top:-2px;padding:4px 7.5px;border-radius:8px;color:var(--tdc8af6750f0dad0d);box-shadow:0 2px 8px rgba(0,0,0,0.25)}.ytOverlayProductStickerTitleButtonWithChevron.ytOverlayProductStickerTitleButtonWithChevron{margin-right:16px}.ytOverlayProductStickerTitleButtonNarrowWithChevron.ytOverlayProductStickerTitleButtonNarrowWithChevron{margin-right:32px}.ytOverlayProductStickerImageWrapper{display:flex;align-items:center;position:relative;padding-right:16px}.ytOverlayProductStickerImageWrapperNarrow{padding-right:32px}.ytOverlayProductStickerImageContainer{position:relative}.ytOverlayProductStickerChevronButton.ytOverlayProductStickerChevronButton{display:flex;align-items:center;justify-content:center;position:absolute;right:0;width:32px;height:32px;padding:0;border-radius:8px;color:var(--tdc8af6750f0dad0d);background-color:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.25)}.ytOverlayProductStickerBagIcon{display:inline-flex;flex-shrink:0;margin-right:2px}.ytOverlayProductStickerExternalLinkIcon{display:inline-flex;flex-shrink:0}.ytOverlayProductStickerOpenIcon{display:flex;align-items:center;justify-content:center;position:absolute;bottom:8px;padding:2px;border-radius:4px;color:var(--t4aeaa857de8a786b);background-color:#fff;height:16px;width:16px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("AT8LTe");
var Awm=function(a,b){return _.Ah(a.entities,"productStickerViewerEntity",b)},Bwm=function(a){var b;
return(a=(b=a.touches)==null?void 0:b[0])?{x:a.pageX,y:a.pageY}:null},Ewm=function(a,b,c){return a>1?Cwm(c):setTimeout(function(){b();
var e;((e=navigator)==null?0:e.vibrate)&&navigator.vibrate(Dwm)},_.qe("speedmaster_touch_activation_ms",500))},Cwm=function(a){a!==void 0&&clearTimeout(a)},Fwm=function(a){var b,c;
a=(b=a.image)==null?void 0:(c=b.sources)==null?void 0:c[0];var e;b=(e=a==null?void 0:a.width)!=null?e:0;var g;e=(g=a==null?void 0:a.height)!=null?g:0;return b>0&&e>0?b/e:1},Gwm=function(a,b){if(b instanceof Element){if(b.closest(".ytOverlayProductStickerImageContainer"))return a.imageAction;
if(b.closest(".ytOverlayProductStickerTitleButton"))return a.titleAction}},Hwm=function(a,b){var c;
return(b==null?0:(c=b.dismissalState)==null?0:c.lastDismissedExternalVideoId)?a==null?void 0:a.alternateLongPressCommand:a==null?void 0:a.defaultLongPressCommand},Iwm=function(a){var b;
if((b=a.shouldShowExternalLinkIcon)!=null)var c=b;else a=_.Qh((c=a.imageAction)==null?void 0:c.command),c=!(!a||_.Qe(a,_.z6b));return c};var Jwm=_.Ri(function(a){var b=a.data;var c=a.alt;var e=a.outlineWidth;var g=a.className;var k=a.borderRadius;var l=a.maxWidth;var m=a.maxHeight;var p=function(){return e()+"px"},r=function(){return"-"+e()+"px"},t=function(){return(k==null?0:k())?(k==null?void 0:k())+"px":void 0};
return _.y("div",{class:_.Un("ytImageStickerHost",g)},_.y(_.Md,{each:function(){return[{left:r,top:r},{left:0,top:r},{left:p,top:r},{left:r,top:p},{left:r,top:0},{left:p,top:0},{left:p,top:p},{left:0,top:p}]}},function(v){return _.y(_.go,{data:b,
className:"ytImageStickerImageCopy",alt:"",style:_.fo(Object.assign({},v,{"border-radius":t}))})}),_.y(_.go,{data:b,
className:"ytImageStickerImageActual",alt:c,style:_.fo({"border-radius":t,"max-width":function(){return(l==null?0:l())?l()+"px":void 0},
"max-height":function(){return(m==null?0:m())?m()+"px":void 0}})}))},"YO");var Lwm;_.Kwm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("p1vESd"),2);a=_.$ic;return b.return(a)})};
Lwm=_.ho(function(){return _.Kwm()},"overlaySticker");
_.oe(_.MA,function(a){a.registerLoadFn("overlaySticker","p1vESd",_.Kwm)});var Dwm=[0,1,20,21];_.Mic=_.Ri(function(a){function b(){p=Cwm(p);m=null}
function c(v){b();r=!1;var w=Hwm(Gwm(k(),v.target),l());w&&(m=Bwm(v),p=Ewm(v.touches.length,function(){p=void 0;r=!0;_.$n(w)}))}
function e(v){var w;v=Bwm(v);if(w=m&&v?{xDistanceFromStartEvent:v.x-m.x,yDistanceFromStartEvent:v.y-m.y}:null){v=p;var x=w.xDistanceFromStartEvent;w=w.yDistanceFromStartEvent;p=Math.sqrt(x*x+w*w)>_.qe("speedmaster_cancellation_movement_dp",10)?Cwm(v):v}}
function g(v){b();r&&v.cancelable&&v.preventDefault()}
var k=a.data;var l=_.br(Awm,function(){return k().productStickerViewerEntityKey}),m=null,p,r=!1;
_.wd(b);var t=function(){return k().enableOptimizedCoreLayoutForProductStickers};
return _.y("yt-overlay-product-sticker",null,_.y(_.B,{cond:function(){var v=k();var w=l();w=w==null?void 0:w.dismissalState;v=(w==null?0:w.isDismissedInSession)?!0:(v=v.externalVideoId)?(w==null?void 0:w.lastDismissedExternalVideoId)===v:!1;return!v},
then:function(){var v={};return _.y(Lwm,{region:function(){var w,x;return(x=(w=k().region)==null?void 0:w.interactionRegion)!=null?x:k().region},
mainBodyWidth:function(){return k().mainBodyWidth},
mainBodyHeight:function(){return k().mainBodyHeight}},_.y("div",{class:"ytOverlayProductStickerHost",
style:_.fo({transform:function(){var w=k(),x=[];w.rotation&&x.push("rotate("+w.rotation+"deg)");w.enableOptimizedCoreLayoutForProductStickers&&w.scale&&x.push("scale("+w.scale+")");return x.length>0?x.join(" "):void 0},
"transform-origin":function(){return t()&&k().scale?"bottom":void 0},
"padding-left":function(){var w=k();return w.extraLeftHorizontalPaddingContainer?w.extraLeftHorizontalPaddingContainer+"px":void 0},
"padding-bottom":function(){var w=k();return w.extraVerticalPaddingContainer?w.extraVerticalPaddingContainer+"px":void 0}}),
"on:touchstart":c,"on:touchmove":e,"on:touchend":g,"on:touchcancel":b},_.y(_.B,{cond:function(){return k().chevronAction},
then:function(w){var x={};return _.y("div",{class:_.Un("ytOverlayProductStickerImageWrapper",(x.ytOverlayProductStickerImageWrapperNarrow=function(){var z=k();return Fwm(z)<.3},x))},_.y(Mwm,{data:k}),_.y(_.OEf,{className:"ytOverlayProductStickerChevronButton",
command:function(){return _.Qh(w().command)},
ariaLabel:function(){var z;return(z=w().accessibility)==null?void 0:z.label}},_.y(_.lo,{icon:"CHEVRON_DOWN",
size:24})))},
else:function(){return _.y(Mwm,{data:k})}}),_.y(_.OEf,{className:_.Un("ytOverlayProductStickerTitleButton",(v.ytOverlayProductStickerTitleButtonOptimized=t,v.ytOverlayProductStickerTitleButtonWithChevron=function(){return!!k().chevronAction},v.ytOverlayProductStickerTitleButtonNarrowWithChevron=function(){var w=k();
return!!w.chevronAction&&Fwm(w)<.3},v)),
command:function(){var w;return _.Qh((w=k().titleAction)==null?void 0:w.command)},
ariaLabel:function(){var w,x;return(w=k().titleAction)==null?void 0:(x=w.accessibility)==null?void 0:x.label}},_.y(_.B,{cond:t,
then:function(){return _.y(_.lo,{className:"ytOverlayProductStickerBagIcon",icon:"OUTLINE_BAG",size:18})}}),_.y(_.LA,{noWrap:!0,
text:function(){var w=k().title;return t()&&w?{content:w.content}:w}}),_.y(_.B,{cond:t,
then:function(){return _.y(_.B,{cond:function(){return Iwm(k())},
then:function(){return _.y(_.lo,{className:"ytOverlayProductStickerExternalLinkIcon",icon:"OPEN_IN_NEW",size:12})}})},
else:function(){return _.y(_.lo,{icon:"CHEVRON_DOWN",size:function(){var w,x;return(x=(w=k().titleAttributes)==null?void 0:w.chevronSize)!=null?x:16}})}}))))}}))},"ZO");
var Mwm=_.Ri(function(a){var b=a.data;return _.y(_.KA,{className:"ytOverlayProductStickerImageContainer",command:function(){var c;return(c=b().imageAction)==null?void 0:c.command},
ariaLabel:function(){var c,e;return(c=b().imageAction)==null?void 0:(e=c.accessibility)==null?void 0:e.label},
style:_.fo({transform:function(){var c=b();return!c.enableOptimizedCoreLayoutForProductStickers&&c.scale?"scale("+c.scale+")":void 0},
"transform-origin":"bottom"})},_.y(_.B,{cond:function(){return b().image},
then:function(c){return _.y(Jwm,{data:c,alt:function(){var e,g;return(g=(e=b().accessibility)==null?void 0:e.label)!=null?g:""},
outlineWidth:2,maxWidth:132,maxHeight:132,borderRadius:function(){return c().imageFormatHint?void 0:12}})}}),_.y(_.B,{cond:function(){return!b().enableOptimizedCoreLayoutForProductStickers&&Iwm(b())},
then:function(){return _.y(Nwm,{data:b})}}))},"$O"),Nwm=_.Ri(function(a){var b=a.data;
return _.y("div",{class:"ytOverlayProductStickerOpenIcon",style:_.fo({right:function(){return(Fwm(b())<.4?-16:4)+"px"}})},_.y(_.lo,{icon:"OPEN_IN_NEW",
size:16}))},"aP");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
