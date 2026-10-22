"use strict";_F_installCss(".ytSurveyIconsHost{display:flex;flex-direction:column}.ytSurveyIconsHeader{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.ytSurveyIconsTitle{color:var(--tffc2fd3a644f6275);font-family:Roboto,Arial,sans-serif;font-size:1.6rem;font-weight:500;line-height:2.2rem;overflow:hidden;display:block;max-height:2.2rem}.ytSurveyIconsAnswers{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.ytSurveyIconsIcon{color:var(--tffc2fd3a644f6275);width:36px;height:36px;margin:-6px}.ytSurveyIconsAnswersText{color:var(--tffc2fd3a644f6275);display:flex;flex-direction:row;align-items:center;justify-content:space-between;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("jJfCod");
_.Kjc=_.Ri(function(a){var b=function(){var c;return((c=a.data())==null?void 0:c.answers)||[]};
return _.y("yt-survey-icons",{class:"ytSurveyIconsHost"},_.y("div",{class:"ytSurveyIconsHeader"},_.y("div",{class:"ytSurveyIconsTitle"},function(){var c;return(c=a.data())==null?void 0:c.text}),_.y("div",null,_.y(_.QA,{data:function(){return{style:"mono",
type:"text",state:"active",size:"M",iconPosition:"icon-only",onTap:function(){var c;(c=a.onDismiss)==null||c.call(a)}}},
iconName:"DISMISSAL"}))),_.y("div",null,_.y("div",{class:"ytSurveyIconsAnswers"},_.y(_.Md,{each:function(){return b()},
keyBy:"INDEX"},function(c,e){return _.y("div",null,_.y(_.QA,{data:function(){return{style:"mono",type:"text",state:"active",size:"XL",iconPosition:"icon-only",onTap:function(){var g;(g=a.onSelect)==null||g.call(a,c(),e)}}},
icon:function(){return _.y(_.lo,{icon:function(){var g,k;return(g=c())==null?void 0:(k=g.icon)==null?void 0:k.iconType},
className:"ytSurveyIconsIcon"})}}))})),_.y("div",{class:"ytSurveyIconsAnswersText"},_.y("div",null,function(){return b().length?b()[0].text:""}),_.y("div",null,function(){return b().length?b()[b().length-1].text:""}))))},"cP");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
