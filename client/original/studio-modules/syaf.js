"use strict";_F_installCss(".ytdFeedFilterChipRenameFormViewModelHost{display:block;padding:16px 24px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Gsm=function(a,b,c,e,g,k,l,m){var p=!!l;c={formId:a,updatedFeedName:_.Ug(k==null?void 0:k.updatedFeedName,"updatedFeedName",a,_.Tg(function(r){return _.Rg(a,r)},c,g==null?void 0:g.updatedFeedName),_.Sg)};
b=p&&l?{rootFormId:b,nestedFormPath:l}:void 0;_.lOa(a,{form:c,formType:"CustomFeedForm",dependentValidationMap:_.aPa({updatedFeedName:g==null?void 0:g.updatedFeedName}),formDelegate:p?void 0:e,nestedFormAccessor:b,submitConfig:m,toFormData:Fsm,formDataExtensionField:"customFeedFormData"});return c},Fsm=function(a){return{updatedFeedName:a.updatedFeedName.value}},Hsm=function(a,b){if(a==null||!a.id)throw _.ePa(a);
var c=a.id,e=a.fieldSchemas,g=a.initialValues;a=a.submitConfig;var k=_.$Oa(b==null?void 0:b.customValidationRegistry);b=Gsm(c,c,k,b,e,g,void 0,a);_.VOa(b).catch(function(l){throw _.fPa(c,l);})},Ism=function(a){return _.GOa(a,"CustomFeedForm")};_.ikc=_.Ri(function(a){var b;_.Id(function(){var c=a.data().customFeedFormSchema;if(c!==b){var e;if(((e=b)==null?0:e.id)&&b.id!==(c==null?void 0:c.id)){var g;(g=Ism(b.id))==null||g.dispose()}if(c==null?0:c.id){var k;(k=Ism(c.id))==null||k.dispose();e=(e=_.IVg.get(c.id))?Object.assign({},c,{initialValues:Object.assign({},c.initialValues,{updatedFeedName:e})}):c;Hsm(e)}b=c}},"sxD4Wb","pL");
_.wd(function(){var c;if((c=b)==null?0:c.id){var e;(e=Ism(b.id))==null||e.dispose()}});
return _.y("ytd-feed-filter-chip-rename-form-view-model",{class:"ytdFeedFilterChipRenameFormViewModelHost"},_.y(_.ko,{data:function(){return a.data().textField}},{textFieldViewModel:function(c){return _.y(_.Yof,{data:c.data})}}))},"qL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
