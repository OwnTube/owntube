"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var KTi;_.JTi=function(a,b,c){return{configurationType:_.Pn(_.sTi(b),[_.CTi]),adFormats:_.wlb(a==null?void 0:a.adFormats),adBreaks:_.xlb(a==null?void 0:a.adBreaks),liveAdsSettings:_.Qn(_.vlb(b,c),[_.ITi])}};
_.LTi=function(a,b,c,e){var g=c?[_.vMe]:[];e=e?void 0:_.im(a);var k,l,m,p,r={enableFixedDurationAdBreaks:(k=a.livestream)==null?void 0:k.fixedDurationAdBreaks,dynamicAdInsertionDuration:(l=a.livestream)==null?void 0:(m=l.daiDuration)==null?void 0:m.seconds,showHalftimeSlateToYoutubePremiumUser:(p=a.livestream)==null?void 0:p.showHalftimeSlateToYoutubePremiumUser},t;return{monetization:_.Pn(e,g),adOptions:_.Am(a)?_.Qn(_.JTi(a.adSettings,(t=a.livestream)==null?void 0:t.adsAutomationSettings,r),c?[KTi]:
[]):_.Qn(_.ylb(a.adSettings),[]),selfCertification:_.Ixb(_.dlb(a),[b])}};
_.ITi={validate:function(a){return _.Kn(a)||a.liveAdsAutomationSettingsType.value&&a.liveAdsAutomationSettingsType.value!=="VIDEO_LIVESTREAM_ADS_AUTOMATION_SETTINGS_TYPE_MANUAL"?null:{get message(){return""}}}};
KTi={validate:function(a){var b={get message(){return""}};if(!a.configurationType.isValid)return b;switch(a.configurationType.value){case "manual":return!_.slb(a.adFormats.value)||a.liveAdsSettings.isValid?null:b;default:return null}}};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
