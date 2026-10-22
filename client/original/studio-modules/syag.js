"use strict";_F_installCss(".ytdFeedFilterChipRenameFormViewModelHost{display:block;padding:16px 24px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Itm=function(a,b,c,e,g,k,l,m){var p=!!l;c={formId:a,updatedFeedName:_.Yg(k==null?void 0:k.updatedFeedName,"updatedFeedName",a,_.Xg(function(r){return _.Ug(a,r)},c,g==null?void 0:g.updatedFeedName),_.Vg)};
b=p&&l?{rootFormId:b,nestedFormPath:l}:void 0;_.vOa(a,{form:c,formType:"CustomFeedForm",dependentValidationMap:_.kPa({updatedFeedName:g==null?void 0:g.updatedFeedName}),formDelegate:p?void 0:e,nestedFormAccessor:b,submitConfig:m,toFormData:Htm,formDataExtensionField:"customFeedFormData"});return c},Htm=function(a){return{updatedFeedName:a.updatedFeedName.value}},Jtm=function(a,b){if(a==null||!a.id)throw _.oPa(a);
var c=a.id,e=a.fieldSchemas,g=a.initialValues;a=a.submitConfig;var k=_.jPa(b==null?void 0:b.customValidationRegistry);b=Itm(c,c,k,b,e,g,void 0,a);_.ePa(b).catch(function(l){throw _.pPa(c,l);})},Ktm=function(a){return _.QOa(a,"CustomFeedForm")};_.vkc=_.Ui(function(a){var b;_.Md(function(){var c=a.data().customFeedFormSchema;if(c!==b){var e;if(((e=b)==null?0:e.id)&&b.id!==(c==null?void 0:c.id)){var g;(g=Ktm(b.id))==null||g.dispose()}if(c==null?0:c.id){var k;(k=Ktm(c.id))==null||k.dispose();e=(e=_.yWg.get(c.id))?Object.assign({},c,{initialValues:Object.assign({},c.initialValues,{updatedFeedName:e})}):c;Jtm(e)}b=c}},"sxD4Wb","tL");
_.yd(function(){var c;if((c=b)==null?0:c.id){var e;(e=Ktm(b.id))==null||e.dispose()}});
return _.y("ytd-feed-filter-chip-rename-form-view-model",{class:"ytdFeedFilterChipRenameFormViewModelHost"},_.y(_.mo,{data:function(){return a.data().textField}},{textFieldViewModel:function(c){return _.y(_.Dpf,{data:c.data})}}))},"uL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
