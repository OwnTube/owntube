"use strict";_F_installCss(".ytContinuationItemViewModelHost{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("DvZC9");
_.Yic=_.Ui(function(a){function b(){var m=a.data();m&&!g()&&m.trigger==="CONTINUATION_TRIGGER_ON_ITEM_SHOWN"&&m.continuationCommand&&(k(!0),_.bo(m.continuationCommand,{commandController:{onSuccess:function(){k(!1)},
onServerError:function(){k(!1)}}}))}
var c=_.f(_.zd(!1,void 0,"ZJ9Ynf",function(){})),e=c.next().value;
c=c.next().value;var g=e,k=c,l;_.Md(function(){function m(){if(window.IntersectionObserver)w=new IntersectionObserver(function(E){if(E.some(function(H){return H.isIntersecting})){b();
var F;(F=w)==null||F.disconnect()}},{rootMargin:"0px 0px "+v+"px",
threshold:0}),w.observe(l);else{var C=function(){if(l){var E=l.getBoundingClientRect();if(E.top<(window.innerHeight||document.documentElement.clientHeight)+v&&E.bottom>0){b();var F;(F=x)==null||F()}}};
window.addEventListener("scroll",C,{passive:!0,capture:!0});window.addEventListener("resize",C,{passive:!0});x=function(){window.removeEventListener("scroll",C,{capture:!0});window.removeEventListener("resize",C)};
C()}}
var p=a.data(),r,t,v=(t=(r=a.continuationTriggerOffset)==null?void 0:r.call(a))!=null?t:0;if(l&&p){var w,x;if(_.D("web_defer_background_continuation")&&document.visibilityState==="hidden"){var z=function(){if(document.visibilityState!=="hidden"){m();var C;(C=A)==null||C()}};
document.addEventListener("visibilitychange",z);var A=function(){document.removeEventListener("visibilitychange",z)}}else m();
_.yd(function(){var C;(C=w)==null||C.disconnect();var E;(E=x)==null||E();var F;(F=A)==null||F()})}},"DBhkod","iO");
return _.y("yt-continuation-item-view-model",{class:_.Wn("ytContinuationItemViewModelHost",a.className),el:_.Zn(function(m){l=m})},_.y(_.B,{cond:g,
then:function(){return _.y(_.Xhf,null)}}))},"jO");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
