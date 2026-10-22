"use strict";_F_installCss(".ytAlertBannerViewModelHost{display:flex;color:var(--tffc2fd3a644f6275);border-radius:12px;flex-direction:row;align-items:center}@media (forced-colors:active){.ytAlertBannerViewModelHost{border:1px solid ButtonBorder}}.ytAlertBannerViewModelNarrow{align-items:start}.ytAlertBannerViewModelNarrow .ytAlertBannerViewModelOuterContainer{flex-direction:column;align-items:normal}.ytAlertBannerViewModelNarrow .ytAlertBannerViewModelActionButton{margin:0 0 12px}.ytAlertBannerViewModelFullbleed{border-radius:0}.ytAlertBannerViewModelInformational{background-color:var(--t7f4f2c6d54836ce0)}.ytAlertBannerViewModelTimeSensitive{background-color:var(--tfa3475c508f5dfef)}.ytAlertBannerViewModelWarning{background-color:rgba(255,85,119,0.2)}.ytAlertBannerViewModelDismissed{display:none}.ytAlertBannerViewModelOuterContainer{display:flex;flex-direction:row;align-items:center;flex:1}.ytAlertBannerViewModelOuterContainer:first-child{padding-left:12px}.ytAlertBannerViewModelOuterContainer:last-child{padding-right:12px}.ytAlertBannerViewModelContainer{display:flex;flex-direction:row;padding:12px 0;align-items:center;flex:1}.ytAlertBannerViewModelIcon{padding:12px}.ytAlertBannerViewModelContent{display:flex;flex-direction:column}.ytAlertBannerViewModelHeading{padding:0;margin:0;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:500;line-height:2rem}.ytAlertBannerViewModelBody{font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}.ytAlertBannerViewModelActionButton{margin:6px 0 6px 12px}.ytAlertBannerViewModelDismissButton{margin:6px}.ytAlertBannerViewModelIsInRichGrid{margin-bottom:16px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("n0DHg");
_.Fkc=_.Ri(function(a){var b=_.f(_.xd(!1,void 0,"M1trLd",function(){})),c=b.next().value,e=b.next().value;
b={};return _.y("yt-alert-banner-view-model",{class:_.Un("ytAlertBannerViewModelHost",a.className,function(){var g;a:switch((g=a.data())==null?void 0:g.type){case "ALERT_BANNER_TYPE_TIME_SENSITIVE":g="ytAlertBannerViewModelTimeSensitive";break a;case "ALERT_BANNER_TYPE_WARNING":g="ytAlertBannerViewModelWarning";break a;default:g="ytAlertBannerViewModelInformational"}return g},(b.ytAlertBannerViewModelDismissed=c,b.ytAlertBannerViewModelFullbleed=a.fullbleed,b.ytAlertBannerViewModelNarrow=a.narrow,
b.ytAlertBannerViewModelIsInRichGrid=a.isInRichGrid,b))},_.y(_.B,{cond:function(){var g;
return!((g=a.data())==null?0:g.hideIcon)},
then:function(){return _.y("div",{class:"ytAlertBannerViewModelIcon"},_.y(_.lo,{icon:function(){var g,k;return((g=a.data())==null?void 0:(k=g.iconOverride)==null?void 0:k.toLowerCase())||"alert_circle"}}))}}),_.y("div",{class:"ytAlertBannerViewModelOuterContainer"},_.y("div",{class:"ytAlertBannerViewModelContainer"},_.y("div",{class:"ytAlertBannerViewModelContent"},_.y(_.B,{cond:function(){var g;
return(g=a.data())==null?void 0:g.heading},
then:function(g){return _.y("h2",{class:"ytAlertBannerViewModelHeading"},_.y(_.LA,{text:g}))}}),_.y("div",{class:"ytAlertBannerViewModelBody"},_.y(_.LA,{text:function(){var g;
return(g=a.data())==null?void 0:g.body}})))),_.y(_.ko,{data:function(){var g;
return(g=a.data())==null?void 0:g.actionButton}},{buttonViewModel:function(g){return _.y(_.PD,{data:g.data,
className:"ytAlertBannerViewModelActionButton"})}})),_.y(_.ko,{data:function(){var g;
return(g=a.data())==null?void 0:g.dismissButton}},{buttonViewModel:function(g){return _.y(_.PD,{data:g.data,
className:"ytAlertBannerViewModelDismissButton",onClick:function(){var k;((k=a.data())==null?0:k.disableLocalDismissBehavior)||e(!0)}})}}))},"Di");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
