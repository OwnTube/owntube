"use strict";_F_installCss(".ytShortsDailyTimerSettingsPanelViewModelHost{display:block;box-sizing:border-box}.ytShortsDailyTimerSettingsPanelViewModelDividerContainer{margin:0 -24px;padding-top:12px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Otm=function(a,b,c,e,g,k,l,m){var p=!!l;c={formId:a,selectedTimeLimitKey:_.Ug(k==null?void 0:k.selectedTimeLimitKey,"selectedTimeLimitKey",a,_.Tg(function(r){return _.Rg(a,r)},c,g==null?void 0:g.selectedTimeLimitKey),_.Sg)};
b=p&&l?{rootFormId:b,nestedFormPath:l}:void 0;_.lOa(a,{form:c,formType:"ShortsDailyTimerSettingsForm",dependentValidationMap:_.aPa({selectedTimeLimitKey:g==null?void 0:g.selectedTimeLimitKey}),formDelegate:p?void 0:e,nestedFormAccessor:b,submitConfig:m,toFormData:Ntm,formDataExtensionField:"shortsDailyTimerSettingsFormData"});return c},Ntm=function(a){return{selectedTimeLimitKey:a.selectedTimeLimitKey.value}},Ptm=function(a,b){if(a==null||!a.id)throw _.ePa(a);
var c=a.id,e=a.fieldSchemas,g=a.initialValues;a=a.submitConfig;var k=_.$Oa(b==null?void 0:b.customValidationRegistry);b=Otm(c,c,k,b,e,g,void 0,a);_.VOa(b).catch(function(l){throw _.fPa(c,l);})};_.bkc=_.Ri(function(a){function b(g,k){if(k.key!=null){var l;(l=c())==null||l.updateValue(Number(k.key))}}
_.Ud(function(){var g=a.data().formSchema;if(g==null?0:g.id)_.GOa(g.id,"ShortsDailyTimerSettingsForm").dispose(),Ptm(g,{onSubmit:function(){return _.n(function(k){var l=a.data().radioButtonGroup,m=e();l=_.Qe(l,_.zue);var p;l=_.f((p=l==null?void 0:l.radioButtons)!=null?p:[]);p=l.next();try{for(;!p.done;p=l.next()){var r=_.Qe(p.value,_.sCh),t=void 0;if(String((t=r)==null?void 0:t.key)===m){m=void 0;((m=r)==null?0:m.command)&&_.$n(r.command);break}}}finally{_.h(l,p)}k.jumpToEnd()})}})});
var c=_.g7b(function(){var g,k;return{formId:(k=(g=a.data().formSchema)==null?void 0:g.id)!=null?k:"",fieldId:"selectedTimeLimitKey"}}),e=function(){var g,k,l,m,p;
return String((p=(m=(g=c())==null?void 0:g.value)!=null?m:(k=a.data().formSchema)==null?void 0:(l=k.initialValues)==null?void 0:l.selectedTimeLimitKey)!=null?p:"")};
return _.y("yt-shorts-daily-timer-settings-panel-view-model",{class:"ytShortsDailyTimerSettingsPanelViewModelHost"},_.y(_.ko,{data:function(){return a.data().radioButtonGroup}},{radioButtonGroupViewModel:function(g){var k=g.data;
g=_.Hd(function(){return Object.assign({},k(),{formFieldMetadata:void 0})},void 0,"Ese9mc");
return _.y(_.irf,{data:g,controlledMode:!0,selectedKey:e,onSelected:b,autofocus:!0})}}),_.y("div",{class:"ytShortsDailyTimerSettingsPanelViewModelDividerContainer"},_.y(_.Hjc,{data:function(){return{dividerStyle:"DIVIDER_STYLE_FULL_BLEED_THIN"}}})))},"QL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
