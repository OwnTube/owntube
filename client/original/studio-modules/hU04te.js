"use strict";_F_installCss(".ytFeedbackPromptViewModelHost{display:flex;flex-direction:row;color:var(--t4a6da19e16bf221a);min-height:48px;align-items:center}.ytFeedbackPromptViewModelPrompt{padding-left:24px;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytFeedbackPromptViewModelLeadingButton{padding-right:8px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("hU04te");
_.yjc=_.Ui(function(a){var b=_.z0b(),c=_.jr(function(){return a.data().textTypographyToken},b);
return _.y("yt-feedback-prompt-view-model",{class:_.Wn("ytFeedbackPromptViewModelHost",a.className)},_.y(_.B,{cond:function(){return a.data().reverseButtonOrder},
then:function(){return _.y(_.Id,null,_.y(rxm,{data:a.data,leading:!0}),_.y(sxm,{data:a.data,leading:!1}))},
else:function(){return _.y(_.Id,null,_.y(sxm,{data:a.data,leading:!0}),_.y(rxm,{data:a.data,leading:!1}))}}),_.y(_.B,{cond:function(){return a.data().text},
then:function(e){return _.y(_.MA,{text:e,className:"ytFeedbackPromptViewModelPrompt",style:_.ho(c)})}}))},"oO");
var sxm=_.Ui(function(a){return _.y(_.mo,{data:function(){return a.data().likeButton}},{likeButtonViewModel:function(b){return _.y(_.kqf,{data:b.data,
className:function(){return a.leading()?"ytFeedbackPromptViewModelLeadingButton":void 0}})}})},"pO"),rxm=_.Ui(function(a){return _.y(_.mo,{data:function(){return a.data().dislikeButton}},{dislikeButtonViewModel:function(b){return _.y(_.hqf,{data:b.data,
className:function(){return a.leading()?"ytFeedbackPromptViewModelLeadingButton":void 0}})}})},"qO");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
