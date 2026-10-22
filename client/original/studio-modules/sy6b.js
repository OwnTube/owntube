"use strict";_F_installCss(".ytFormFooterViewModelHost{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var gDh=function(a){if(a){var b=_.qe().resolve(_.co);b&&(a=_.Sh(a))&&b.resolveCommand(a)}};_.Ckc=_.Ui(function(a){a=_.Vi(a,{disablePadding:!1});var b=a.data,c=a.disablePadding,e=_.QOa(function(){return b().formId}),g=_.cDh(function(){return b().formId},void 0,function(){return b().onSubmitSuccess}),k=function(){return e.form()!==void 0},l=function(){var p;
return _.n(function(r){switch(r.nextAddress){case 1:if(!k()){g.submitForm();r.jumpTo(0);break}r.setCatchFinallyBlocks(3);return r.yield(e.submit(),5);case 5:r.leaveTryBlock(4);break;case 3:return p=r.enterCatchBlock(),p instanceof Error?_.of(p):_.of("Failed to submit form. Unknown error"),gDh(b().onSubmitError),r.return();case 4:gDh(b().onSubmitSuccess),r.jumpToEnd()}})},m=function(){return b().alwaysEnableSubmitButton?k()?e.state().isSubmitting:g.isSubmitting():!(k()?e.state().isValid:g.isValid())||
!(k()?e.state().isUpdated:1)||(k()?e.state().isSubmitting:g.isSubmitting())};
return _.y("yt-form-footer-view-model",{class:"ytFormFooterViewModelHost"},_.y(_.mo,{data:function(){return b().panelFooter}},{panelFooterViewModel:function(p){return _.y(_.$rf,{data:p.data,
onClickPrimaryButton:function(){l()},
disablePrimaryButton:m,disablePadding:c})}}))},"Si");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
