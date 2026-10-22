"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var RSi;_.QSi=function(a,b,c){return{configurationType:_.Nn(_.zSi(b),[_.JSi]),adFormats:_.mlb(a==null?void 0:a.adFormats),adBreaks:_.nlb(a==null?void 0:a.adBreaks),liveAdsSettings:_.On(_.llb(b,c),[_.PSi])}};
_.SSi=function(a,b,c,e){var g=c?[_.RLe]:[];e=e?void 0:_.fm(a);var k,l,m,p,r={enableFixedDurationAdBreaks:(k=a.livestream)==null?void 0:k.fixedDurationAdBreaks,dynamicAdInsertionDuration:(l=a.livestream)==null?void 0:(m=l.daiDuration)==null?void 0:m.seconds,showHalftimeSlateToYoutubePremiumUser:(p=a.livestream)==null?void 0:p.showHalftimeSlateToYoutubePremiumUser},t;return{monetization:_.Nn(e,g),adOptions:_.ym(a)?_.On(_.QSi(a.adSettings,(t=a.livestream)==null?void 0:t.adsAutomationSettings,r),c?[RSi]:
[]):_.On(_.olb(a.adSettings),[]),selfCertification:_.xxb(_.Ukb(a),[b])}};
_.PSi={validate:function(a){return _.In(a)||a.liveAdsAutomationSettingsType.value&&a.liveAdsAutomationSettingsType.value!=="VIDEO_LIVESTREAM_ADS_AUTOMATION_SETTINGS_TYPE_MANUAL"?null:{get message(){return""}}}};
RSi={validate:function(a){var b={get message(){return""}};if(!a.configurationType.isValid)return b;switch(a.configurationType.value){case "manual":return!_.ilb(a.adFormats.value)||a.liveAdsSettings.isValid?null:b;default:return null}}};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
