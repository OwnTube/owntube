"use strict";_F_installCss(".ytprimetimeOfferingInReviewCardContentViewModelHost{display:flex;flex-direction:row;align-items:flex-start;justify-content:space-between;box-sizing:border-box;width:641px;max-width:100%;padding:24px}.ytprimetimeOfferingInReviewCardContentViewModelTextContent{display:flex;flex-direction:column;gap:8px;max-width:410px}.ytprimetimeOfferingInReviewCardContentViewModelHeader{font-family:Roboto,Arial,sans-serif;font-size:2rem;font-variation-settings:\"wdth\" 100;font-weight:700;line-height:2.8rem}@container (max-width: _max($medium_breakpoint)){.ytprimetimeOfferingInReviewCardContentViewModelHeader{font-family:Roboto,Arial,sans-serif;font-size:1.8rem;font-variation-settings:\"wdth\" 100;font-weight:700;line-height:2.6rem}}@media (max-width:599.9px){.ytprimetimeOfferingInReviewCardContentViewModelHeader{font-family:Roboto,Arial,sans-serif;font-size:1.8rem;font-variation-settings:\"wdth\" 100;font-weight:700;line-height:2.6rem}}.ytprimetimeOfferingInReviewCardContentViewModelHeader{color:var(--tffc2fd3a644f6275)}.ytprimetimeOfferingInReviewCardContentViewModelDescription{font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem;color:var(--t4a6da19e16bf221a)}.ytprimetimeOfferingInReviewCardContentViewModelActionsContainer{align-self:center;pointer-events:auto}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("B3Dofe");
_.jkc=_.Ui(function(a){function b(r){(r=_.Sh(r==null?void 0:r.onTap))&&!l()&&(m(!0),e({type:"PRIMETIME_OFFERING_LAUNCH_START",payload:{},meta:_.Fj("START")}),_.qe().resolve(_.co).resolveCommand(r,{commandController:{onSuccess:function(){e({type:"PRIMETIME_OFFERING_LAUNCH_SUCCESS",payload:{},meta:_.Fj("END")})},
onServerError:function(){m(!1);e({type:"PRIMETIME_OFFERING_LAUNCH_ERROR",payload:{},meta:_.Fj("END")})}}}))}
var c=a.data,e=_.Hi(_.Yz),g=_.f(_.zd(!1,void 0,"CXz1Me",function(){})),k=g.next().value;
g=g.next().value;var l=k,m=g,p=_.D("WebFEAllStudioByChannel__enable_primetime_tt_fast_followup");return _.y("ytprimetime-offering-in-review-card-content-view-model",{class:_.Wn("ytprimetimeOfferingInReviewCardContentViewModelHost",a.className)},_.y("div",{class:"ytprimetimeOfferingInReviewCardContentViewModelTextContent"},_.y(_.MA,{className:"ytprimetimeOfferingInReviewCardContentViewModelHeader",text:function(){return c().inReviewCardHeading}}),_.y(_.MA,{className:"ytprimetimeOfferingInReviewCardContentViewModelDescription",
text:function(){return c().inReviewCardDescription}})),_.y("div",{class:"ytprimetimeOfferingInReviewCardContentViewModelActionsContainer"},_.y(_.mo,{data:function(){return c().inReviewCardButton}},{buttonViewModel:function(r){var t=r.data;
return _.y(_.OD,{data:function(){var v=t();return v&&p?Object.assign({},v,{onTap:void 0}):v},
onClick:function(){p?b(t()):m(!0)},
buttonOverrides:function(){return l()?{disabled:!0}:void 0}})}})))},"CM");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
