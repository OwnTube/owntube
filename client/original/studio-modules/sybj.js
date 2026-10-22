"use strict";_F_installCss(".ytSubmitButtonViewModelHost{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Bkc=_.Ri(function(a){var b=a.data;a=a.className;_.Td(function(){b().formId||_.lf(Error("lT"))},"$K");
var c=_.GOa(function(){return b().formId}),e=_.hCh(function(){return b().formId},function(){return b().beforeSubmitCommand},function(){return b().afterSubmitCommand}),g=e.submitForm,k=e.isValid,l=e.isSubmitting,m=function(){return c.form()!==void 0&&!_.D("submit_button_forms_api_killswitch")},p=function(){var t;
return _.n(function(v){if(v.nextAddress==1){if(!m())return g(),v.jumpTo(0);b().beforeSubmitCommand&&_.$n(b().beforeSubmitCommand);v.setCatchFinallyBlocks(3);return v.yield(c.submit(),5)}if(v.nextAddress!=3)return b().afterSubmitCommand&&_.$n(b().afterSubmitCommand),v.leaveTryBlock(0);t=v.enterCatchBlock();t instanceof Error?_.lf(t):_.lf(Error("mT"));b().onSubmitFailureCommand&&_.$n(b().onSubmitFailureCommand);v.jumpToEnd()})},r=function(){return{state:b().isDisabled||(m()?!c.state().isValid:!k())||
(m()?c.state().isSubmitting:l())?"disabled":"active"}};
return _.y("yt-submit-button-view-model",{class:_.Un("ytSubmitButtonViewModelHost",a)},_.y(_.ko,{data:function(){return b().button}},{buttonViewModel:function(t){return _.y(_.OD,{data:t.data,
buttonOverrides:r,onClick:p})}}))},"aL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
