"use strict";_F_installCss(".ytFeedbackPromptViewModelHost{display:flex;flex-direction:row;color:var(--t4a6da19e16bf221a);min-height:48px;align-items:center}.ytFeedbackPromptViewModelPrompt{padding-left:24px;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytFeedbackPromptViewModelLeadingButton{padding-right:8px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("hU04te");
_.ljc=_.Ri(function(a){var b=_.q0b(),c=_.gr(function(){return a.data().textTypographyToken},b);
return _.y("yt-feedback-prompt-view-model",{class:_.Un("ytFeedbackPromptViewModelHost",a.className)},_.y(_.B,{cond:function(){return a.data().reverseButtonOrder},
then:function(){return _.y(_.Ed,null,_.y(pwm,{data:a.data,leading:!0}),_.y(qwm,{data:a.data,leading:!1}))},
else:function(){return _.y(_.Ed,null,_.y(qwm,{data:a.data,leading:!0}),_.y(pwm,{data:a.data,leading:!1}))}}),_.y(_.B,{cond:function(){return a.data().text},
then:function(e){return _.y(_.LA,{text:e,className:"ytFeedbackPromptViewModelPrompt",style:_.fo(c)})}}))},"kO");
var qwm=_.Ri(function(a){return _.y(_.ko,{data:function(){return a.data().likeButton}},{likeButtonViewModel:function(b){return _.y(_.Gpf,{data:b.data,
className:function(){return a.leading()?"ytFeedbackPromptViewModelLeadingButton":void 0}})}})},"lO"),pwm=_.Ri(function(a){return _.y(_.ko,{data:function(){return a.data().dislikeButton}},{dislikeButtonViewModel:function(b){return _.y(_.Dpf,{data:b.data,
className:function(){return a.leading()?"ytFeedbackPromptViewModelLeadingButton":void 0}})}})},"mO");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
