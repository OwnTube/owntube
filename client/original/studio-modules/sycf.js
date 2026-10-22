"use strict";_F_installCss(".ytDescriptionPreviewViewModelHost{display:block}.ytDescriptionPreviewViewModelClickable{cursor:pointer}.ytDescriptionPreviewViewModelDescription{display:block;position:relative;overflow:auto;color:var(--t4a6da19e16bf221a);font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytDescriptionPreviewViewModelDescriptionMediumText{font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}.ytDescriptionPreviewViewModelIsOverlay .ytDescriptionPreviewViewModelDescription{color:rgba(255,255,255,0.7)}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.flc=_.Ri(function(a){var b=a.className;var c=a.data;var e=a.isOverlay;var g=a.maxLinesOverride;var k=a.useMediumText;var l=function(){return c().alwaysShowTruncationText},m=function(){return c().truncationText},p=function(){return k!==void 0&&k()?"medium":"small"},r=function(){return e!==void 0&&e()?"overlay":"default"},t=function(){var x,z;
return(z=(x=_.Qe(c().rendererContext,_.Rq))==null?void 0:x.label)!=null?z:""};
a=_.f(_.xd(!1,void 0,"OKr1o",function(){}));
var v=a.next().value,w=a.next().value;a={};return _.y("yt-description-preview-view-model",{el:_.Xn(_.er(function(){return c().rendererContext})),
class:_.Un("ytDescriptionPreviewViewModelHost",b,(a.ytDescriptionPreviewViewModelClickable=function(){var x;return!((x=_.Qe(c().rendererContext,_.nLb))==null||!x.onTap)},a.ytDescriptionPreviewViewModelIsOverlay=e,a)),
"on:click":function(){c().expandOnTap&&w(!v())}},_.y(_.B,{cond:function(){return c().description},
then:function(x){return _.y(_.B,{cond:v,then:function(){var z={};return _.y("div",{class:_.Un("ytDescriptionPreviewViewModelDescription",(z.ytDescriptionPreviewViewModelDescriptionMediumText=k,z))},_.y(_.LA,{text:x}))},
else:function(){return _.y(_.mIf,{text:x,alwaysShowTruncationText:l,truncationText:m,maxLines:function(){var z;return(z=g==null?void 0:g())!=null?z:c().maxLines},
textStyle:r,accessibilityLabel:t,textSize:p})}})}}))},"HN");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
