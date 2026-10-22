"use strict";_F_installCss(".ytdSponsorshipsScrollableShelfHost{align-items:center;display:flex;flex-direction:row;position:relative}.ytdSponsorshipsScrollableShelfContent{overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none}.ytdSponsorshipsScrollableShelfPreviousButton{left:0;position:absolute}.ytdSponsorshipsScrollableShelfNextButton{position:absolute;right:0}.ytdSponsorshipsScrollableShelfFadingEffectBothSides{-webkit-mask:linear-gradient(90deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) left/50%,linear-gradient(270deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) right/50%;mask:linear-gradient(90deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) left/50%,linear-gradient(270deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) right/50%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.ytdSponsorshipsScrollableShelfFadingEffectStart{-webkit-mask:linear-gradient(90deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) left;mask:linear-gradient(90deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) left}[dir=rtl] .ytdSponsorshipsScrollableShelfFadingEffectStart{-webkit-mask:linear-gradient(270deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) right;mask:linear-gradient(270deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) right}.ytdSponsorshipsScrollableShelfFadingEffectStart{-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}.ytdSponsorshipsScrollableShelfFadingEffectEnd{-webkit-mask:linear-gradient(270deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) right;mask:linear-gradient(270deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) right}[dir=rtl] .ytdSponsorshipsScrollableShelfFadingEffectEnd{-webkit-mask:linear-gradient(90deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) left;mask:linear-gradient(90deg,rgba(0,0,0,0) 0,90px,rgb(0,0,0) 100px) left}.ytdSponsorshipsScrollableShelfFadingEffectEnd{-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("D98rie");
_.jjc=_.Ri(function(a){var b=_.Od("div"),c=_.f(_.xd(void 0,void 0,"oX22v",function(){})),e=c.next().value,g=c.next().value;
c=_.f(_.xd(void 0,void 0,"PLGmPe",function(){}));
var k=c.next().value,l=c.next().value;c=_.f(_.xd(void 0,void 0,"eIQvff",function(){}));
var m=c.next().value,p=c.next().value,r=function(){var C=e();return C!==void 0?Math.abs(C):void 0},t=function(){var C=r();
return C===void 0||C<=3},v=function(){var C=r();
var E=k(),F=m();C=C!==void 0&&E!==void 0&&F!==void 0?E-F-C:void 0;return C===void 0||C<=3},w=function(C){b.value&&b.value.scrollBy({top:0,
left:(_.$d("HTML_DIR")==="rtl"?-1:1)*C*b.value.clientWidth,behavior:"smooth"})},x=function(){var C;
g((C=b.value)==null?void 0:C.scrollLeft);var E;l((E=b.value)==null?void 0:E.scrollWidth);var F;p((F=b.value)==null?void 0:F.clientWidth)},z=function(){w(-.5)},A=function(){w(.5)};
_.Td(function(){x();if(b.value&&window.ResizeObserver){var C=new ResizeObserver(x);C.observe(b.value);_.wd(function(){C.disconnect()})}},"WO");
c={};return _.y("yt-sponsorships-scrollable-shelf",{class:_.Un("ytdSponsorshipsScrollableShelfHost",a.className)},_.y("div",{class:_.Un("ytdSponsorshipsScrollableShelfContent",(c.ytdSponsorshipsScrollableShelfFadingEffectBothSides=function(){return a.data().previousButton&&a.data().nextButton&&!t()&&!v()},c.ytdSponsorshipsScrollableShelfFadingEffectStart=function(){return a.data().previousButton&&!t()&&v()},c.ytdSponsorshipsScrollableShelfFadingEffectEnd=function(){return a.data().nextButton&&t()&&
!v()},c)),
el:b,"on:scroll":x},a.children),_.y(_.B,{cond:function(){return!t()},
then:function(){return _.y(_.ko,{data:function(){return a.data().previousButton}},{buttonViewModel:function(C){return _.y(_.OD,{data:C.data,
className:"ytdSponsorshipsScrollableShelfPreviousButton",onClick:z})}})}}),_.y(_.B,{cond:function(){return!v()},
then:function(){return _.y(_.ko,{data:function(){return a.data().nextButton}},{buttonViewModel:function(C){return _.y(_.OD,{data:C.data,
className:"ytdSponsorshipsScrollableShelfNextButton",onClick:A})}})}}))},"XO");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
