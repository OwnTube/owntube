"use strict";_F_installCss(".ytSubmitButtonViewModelHost{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Okc=_.Ui(function(a){var b=a.data;a=a.className;_.Vd(function(){b().formId||_.of(Error("qT"))},"dL");
var c=_.QOa(function(){return b().formId}),e=_.cDh(function(){return b().formId},function(){return b().beforeSubmitCommand},function(){return b().afterSubmitCommand}),g=e.submitForm,k=e.isValid,l=e.isSubmitting,m=function(){return c.form()!==void 0&&!_.D("submit_button_forms_api_killswitch")},p=function(){var t;
return _.n(function(v){if(v.nextAddress==1){if(!m())return g(),v.jumpTo(0);b().beforeSubmitCommand&&_.bo(b().beforeSubmitCommand);v.setCatchFinallyBlocks(3);return v.yield(c.submit(),5)}if(v.nextAddress!=3)return b().afterSubmitCommand&&_.bo(b().afterSubmitCommand),v.leaveTryBlock(0);t=v.enterCatchBlock();t instanceof Error?_.of(t):_.of(Error("rT"));b().onSubmitFailureCommand&&_.bo(b().onSubmitFailureCommand);v.jumpToEnd()})},r=function(){return{state:b().isDisabled||(m()?!c.state().isValid:!k())||
(m()?c.state().isSubmitting:l())?"disabled":"active"}};
return _.y("yt-submit-button-view-model",{class:_.Wn("ytSubmitButtonViewModelHost",a)},_.y(_.mo,{data:function(){return b().button}},{buttonViewModel:function(t){return _.y(_.OD,{data:t.data,
buttonOverrides:r,onClick:p})}}))},"eL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
