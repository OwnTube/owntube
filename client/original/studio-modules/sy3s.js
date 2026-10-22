"use strict";_F_installCss(".ytSlimlineSurveyViewModelHost{position:relative;border-radius:12px;background-color:var(--t518e925f61bdcb91);box-shadow:0 2px 10px rgba(0,0,0,0.25);margin-top:24px;display:flex;flex-direction:column;max-height:300px;transition:max-height .3s,margin .3s,opacity .3s}.ytSlimlineSurveyViewModelHost:before{content:\"\";background-color:var(--t518e925f61bdcb91);box-shadow:0 0 4px rgba(0,0,0,0.25);position:absolute;margin-left:-12px;width:24px;height:24px;top:-12px;left:50%;transform:rotate(45deg)}.ytSlimlineSurveyViewModelCollapsed{max-height:0;margin-top:0;opacity:0}.ytSlimlineSurveyViewModelCollapsed:before{opacity:0}.ytSlimlineSurveyViewModelContainer{display:flex;flex-direction:column;box-sizing:border-box;border-radius:12px;background-color:var(--t518e925f61bdcb91);padding:8px 12px;overflow:hidden;position:relative}.ytSlimlineSurveyViewModelHeader{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.ytSlimlineSurveyViewModelTitle{font-family:Roboto,Arial,sans-serif;font-size:1.6rem;font-weight:500;line-height:2.2rem;overflow:hidden;display:block;max-height:2.2rem}.ytSlimlineSurveyViewModelAnswers{display:flex;flex-direction:row;align-items:center;justify-content:space-between}.ytSlimlineSurveyViewModelIcon{height:36px;width:36px}.ytSlimlineSurveyViewModelAnswersText{display:flex;flex-direction:row;align-items:center;justify-content:space-between;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytEngagementBarViewModelHost{display:block}.ytEngagementBarViewModelEngagementBarWrapper{display:flex;flex-direction:row;height:48px;align-items:center}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var QVg,RVg;QVg=function(a,b){return _.Ah(a.entities,"hatsSurveyEntity",b)};
RVg=function(a,b){return _.Ah(a.entities,"hatsSurveyStateEntity",b)};
_.SVg=function(a){return _.wh({type:"SET_SLIMLINE_SURVEY_RATING_SELECTED_INDEX",payload:a})};var UVg;_.TVg=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("jJfCod"),2);a=_.Kjc;return b.return(a)})};
UVg=_.ho(function(){return _.TVg()},"surveyIcons");
_.oe(_.MA,function(a){a.registerLoadFn("surveyIcons","jJfCod",_.TVg)});_.VVg=_.Ri(function(a){var b=_.Xn(_.er(function(){var p;return(p=a.data())==null?void 0:p.rendererContext},void 0,void 0,void 0,!0)),c=_.f(_.xd(!1,void 0,"gFr6Mb",function(){})),e=c.next().value,g=c.next().value,k=_.br(QVg,function(){var p;
return(p=a.data().keys)==null?void 0:p.surveyEntityKey}),l=_.br(RVg,function(){var p;
return(p=a.data().keys)==null?void 0:p.surveyStateEntityKey});
_.sf("ytd-slimline-survey-show-action",function(){g(!1)});
var m=function(){var p,r;var t=(p=l())==null?void 0:(r=p.questionStack)==null?void 0:r[0];if(t!==void 0){var v,w;return(v=k())==null?void 0:(w=v.questions)==null?void 0:w[t]}};
c={};return _.y("yt-slimline-survey-view-model",{el:b,class:_.Un("ytSlimlineSurveyViewModelHost",(c.ytSlimlineSurveyViewModelCollapsed=function(){return e()},c))},_.y("div",{class:"ytSlimlineSurveyViewModelContainer"},_.y(_.B,{cond:function(){var p;
return((p=m())==null?void 0:p.layout)==="SURVEY_LAYOUT_TYPE_ICONS"},
then:function(){return _.y(UVg,{data:function(){return m()},
onSelect:function(p,r){var t,v;return _.n(function(w){g(!0);if(v=(t=a.data())==null?void 0:t.onSelectRating)_.$n(v),_.Pi(_.SVg(r));w.jumpToEnd()})},
onDismiss:function(){g(!0);var p;var r=(p=k())==null?void 0:p.dismissalFeedbackToken;p=r?_.Te({feedbackEndpoint:{feedbackToken:r}},_.are):void 0;p&&_.Zn(p,{form:{element:b.value}})}})}})))},"di");var XVg;_.WVg=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("haouOe"),2);a=_.Jjc;return b.return(a)})};
XVg=_.ho(function(){return _.WVg()},"votingViewModel");
_.oe(_.MA,function(a){a.registerLoadFn("votingViewModel","haouOe",_.WVg)});_.YVg=_.Ri(function(a){var b=a.data;return _.y("engagement-bar-view-model",{class:"ytEngagementBarViewModelHost"},_.y("div",{class:_.Un("ytEngagementBarViewModelEngagementBarWrapper",a.className)},_.y(_.ko,{data:function(){return b().actions}},{votingViewModel:XVg})))},"ei");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
