"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.vUg=function(a,b,c){c?c(b):_.$n(b,a.target?{form:{element:a.target}}:void 0)};
_.wUg=function(a,b,c,e){return function(g){_.Id(function(){function k(t){t=t.composedPath();t=_.f(t);var v=t.next();try{for(;!v.done;v=t.next()){var w=v.value;if(w===g)break;if(w.className.indexOf("HostIsClickableAdComponent")>=0||w.tagName==="A".toString()||w.tagName==="BUTTON".toString())return!0}}finally{_.h(t,v)}return!1}
var l=new Map,m,p=(m=a())==null?void 0:m.onTap;if(p){m=function(t){k(t)||_.vUg(t,p,b)};
var r=function(t){k(t)||t.key!=="Enter"||_.vUg(t,p,b)};
(c==null?0:c())?(g.addEventListener("tap",m),l.set("tap",m)):(g.addEventListener("click",m),l.set("click",m));if(e==null?0:e())g.addEventListener("keydown",r),l.set("keydown",r)}_.wd(function(){var t=_.f(l),v=t.next();try{for(;!v.done;v=t.next()){var w=_.f(v.value),x=w.next().value,z=w.next().value;g.removeEventListener(x,z)}}finally{_.h(t,v)}})},"rX0VGf","Oh")}};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
