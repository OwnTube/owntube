"use strict";_F_installCss(".ytAiCompanionAttachmentViewModelHost{display:block}.ytAiCompanionAttachmentViewModelHostStandalone{max-width:67%}@media (max-width:1023.9px){.ytAiCompanionAttachmentViewModelHostStandalone{max-width:100%}}.ytAiCompanionAttachmentViewModelTitleHeading{margin:0}.ytAiCompanionAttachmentViewModelTitleContainer{display:flex;flex-direction:row;align-items:center;color:var(--tffc2fd3a644f6275);font-family:Roboto,Arial,sans-serif;font-size:1.8rem;font-weight:400;line-height:2.6rem}.ytAiCompanionAttachmentViewModelTitleTrailingIcon{-webkit-padding-start:4px;padding-inline-start:4px}.ytAiCompanionAttachmentViewModelDescription{color:var(--tffc2fd3a644f6275);padding-top:4px}.ytAiCompanionAttachmentViewModelDescriptionStandalone{padding-top:0}.ytAiCompanionAttachmentViewModelDescription{font-family:Roboto,Arial,sans-serif;font-size:1.6rem;font-weight:400;line-height:2.2rem}.ytAiCompanionAttachmentViewModelCard{display:grid;grid-template-columns:minmax(0,1fr)}.ytAiCompanionAttachmentViewModelCardDescription,.ytAiCompanionAttachmentViewModelCardTitle{grid-area:1/1}.ytAiCompanionAttachmentViewModelCardTitle{place-self:start;max-width:100%;margin:0;overflow:hidden;text-overflow:ellipsis;color:var(--tffc2fd3a644f6275);font-family:Roboto,Arial,sans-serif;font-size:1.6rem;font-weight:500;line-height:2.2rem}.ytAiCompanionAttachmentViewModelCardTitleChip{padding:0 4px;border-radius:4px;background:linear-gradient(90deg,var(--t99f774684cbb9703) 0,var(--tb8b31ac562fbe9b5) 20%,var(--tef70ca245445b52b) 100%)}.ytAiCompanionAttachmentViewModelCardDescriptionFull{color:var(--tffc2fd3a644f6275);font-family:Roboto,Arial,sans-serif;font-size:1.6rem;font-weight:400;line-height:2.2rem}.ytAiCompanionAttachmentViewModelBottomItem{padding-top:12px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var wBh=function(a){return a.truncationText?{content:a.truncationText}:void 0};var xBh=function(){_.w0b("AiCompanionShelfViewModel","enforce");return _.nhf};var yBh=[_.lBh];_.xjc=_.Ri(function(a){var b=_.Si(a,{enableTruncation:!0}),c=b.data;a=b.className;var e=b.enableTruncation;b=_.io(function(){return c().topPaddingToken});
var g=_.io(function(){return c().bottomPaddingToken});
return _.y("yt-ai-companion-attachment-view-model",{el:_.Xn(_.er(function(){return c().rendererContext})),
class:_.Un("ytAiCompanionAttachmentViewModelHost",a,function(){a:{switch(c().attachmentStyle){case "AI_COMPANION_ATTACHMENT_STYLE_STANDALONE_WIDTH":var k="ytAiCompanionAttachmentViewModelHostStandalone";break a}k=void 0}return k}),
style:_.fo({"padding-top":b,"padding-bottom":g})},_.y(_.B,{cond:function(){return c().attachmentStyle==="AI_COMPANION_ATTACHMENT_STYLE_CARD"},
then:function(){return _.y(zBh,{data:c,enableTruncation:e})},
else:function(){return _.y(ABh,{data:c,enableTruncation:e})}}),_.y(_.B,{cond:function(){return c().bottomItem},
then:function(k){return _.y("div",{class:"ytAiCompanionAttachmentViewModelBottomItem"},_.y(_.ko,{data:k},{aiCompanionShelfViewModel:xBh,tableViewModel:_.vBh}))}}))},"Li");
var zBh=_.Ri(function(a){var b=a.data;a=a.enableTruncation;var c=function(){var p=b().title,r;return(p==null?0:p.content)||(p==null?0:(r=p.attachmentRuns)==null?0:r.length)?p:void 0},e=_.f(_.xd(0,void 0,"MSDZ9b",function(){})),g=e.next().value,k=e.next().value,l=_.Pd("h3",function(p){var r=new ResizeObserver(function(t){t=_.f(t).next().value;
k(t.contentRect.width)});
r.observe(p);return function(){r.disconnect()}}),m=function(){return c()?g():0};
return _.y("div",{class:"ytAiCompanionAttachmentViewModelCard"},_.y(_.B,{cond:c,then:function(p){return _.y("h3",{class:"ytAiCompanionAttachmentViewModelCardTitle",el:l},_.y("span",{class:"ytAiCompanionAttachmentViewModelCardTitleChip"},_.y(_.LA,{text:p,noWrap:!0})))}}),_.y("div",{class:"ytAiCompanionAttachmentViewModelCardDescription",
style:_.fo({"text-indent":(0,_.SEf)(m)})},_.y(_.B,{cond:a,then:function(){return _.y(_.Tjc,{text:function(){m();var p;return(p=b().description)!=null?p:{}},
maxLines:function(){return b().numLinesDescription||void 0},
truncationText:function(){return wBh(b())},
expandOnButtonClick:!0,alwaysTruncateAtMaxLines:!0,textSize:"large",textStyle:"primary-text"})},
else:function(){return _.y("span",{class:"ytAiCompanionAttachmentViewModelCardDescriptionFull"},_.y(_.LA,{text:function(){var p;return(p=b().description)!=null?p:{}}}))}})))},"Mi"),ABh=_.Ri(function(a){var b=a.data;
var c=a.enableTruncation;var e=function(){return b().attachmentStyle==="AI_COMPANION_ATTACHMENT_STYLE_STANDALONE_WIDTH"};
a=_.q0b();var g=_.gr(function(){return b().titleTypographyToken},a,{maxLines:2}),k=_.gr(function(){return b().descriptionTypographyToken},a);
return _.y(_.Ed,null,_.y("div",{class:"ytAiCompanionAttachmentViewModelTitleContainer"},_.y(_.B,{cond:function(){return b().title},
then:function(l){return _.y("h3",{class:"ytAiCompanionAttachmentViewModelTitleHeading"},_.y(_.B,{cond:function(){return _.D("enable_ask_search_latex_rendering")},
then:function(){return _.y(_.AYg,{text:function(){return l().content||""},
disableDefaultStyling:!0,plugins:yBh,style:_.fo(g)})},
else:function(){return _.y(_.LA,{text:l,style:_.fo(g)})}}))}}),_.y(_.B,{cond:function(){return _.p0b(b().trailingTitleIcon)},
then:function(l){return _.y("div",{class:"ytAiCompanionAttachmentViewModelTitleTrailingIcon"},_.y(_.go,{data:l,alt:"",preserveWidth:!0,preserveHeight:!0}))}})),_.y(_.B,{cond:function(){return b().description},
then:function(l){var m={};return _.y("div",{class:_.Un("ytAiCompanionAttachmentViewModelDescription",(m.ytAiCompanionAttachmentViewModelDescriptionStandalone=e,m))},_.y(_.B,{cond:function(){return b().truncationText&&c()},
then:function(){return _.y(_.Tjc,{text:l,maxLines:function(){return b().numLinesDescription},
truncationText:function(){return wBh(b())},
expandOnButtonClick:!0,alwaysTruncateAtMaxLines:!0,textSize:"large",textStyle:"primary-text"})},
else:function(){return _.y(_.B,{cond:function(){return _.D("enable_ask_search_latex_rendering")},
then:function(){return _.y(_.AYg,{text:function(){return l().content||""},
disableDefaultStyling:!0,plugins:yBh,style:_.fo(k)})},
else:function(){return _.y(_.LA,{text:l,style:_.fo(k)})}})}}))}}))},"Ni");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
