"use strict";_F_installCss(".ytFormFooterViewModelHost{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var lCh=function(a){if(a){var b=_.ne().resolve(_.ao);b&&(a=_.Qh(a))&&b.resolveCommand(a)}};_.pkc=_.Ri(function(a){a=_.Si(a,{disablePadding:!1});var b=a.data,c=a.disablePadding,e=_.GOa(function(){return b().formId}),g=_.hCh(function(){return b().formId},void 0,function(){return b().onSubmitSuccess}),k=function(){return e.form()!==void 0},l=function(){var p;
return _.n(function(r){switch(r.nextAddress){case 1:if(!k()){g.submitForm();r.jumpTo(0);break}r.setCatchFinallyBlocks(3);return r.yield(e.submit(),5);case 5:r.leaveTryBlock(4);break;case 3:return p=r.enterCatchBlock(),p instanceof Error?_.lf(p):_.lf("Failed to submit form. Unknown error"),lCh(b().onSubmitError),r.return();case 4:lCh(b().onSubmitSuccess),r.jumpToEnd()}})},m=function(){return b().alwaysEnableSubmitButton?k()?e.state().isSubmitting:g.isSubmitting():!(k()?e.state().isValid:g.isValid())||
!(k()?e.state().isUpdated:1)||(k()?e.state().isSubmitting:g.isSubmitting())};
return _.y("yt-form-footer-view-model",{class:"ytFormFooterViewModelHost"},_.y(_.ko,{data:function(){return b().panelFooter}},{panelFooterViewModel:function(p){return _.y(_.vrf,{data:p.data,
onClickPrimaryButton:function(){l()},
disablePrimaryButton:m,disablePadding:c})}}))},"Ri");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
