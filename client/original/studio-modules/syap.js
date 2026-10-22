"use strict";_F_installCss(".ytPreferredLanguageSettingsPanelViewModelHost{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Oum=new _.Mv("preferredLanguageSettingsFormData");_.pkc=_.Ui(function(a){var b=function(){var m,p;return(m=a.data().formSchema)==null?void 0:(p=m.initialValues)==null?void 0:p.selectedLanguages},c=_.f(_.Ti(function(){return b()})),e=c.next().value,g=c.next().value,k={};
_.Md(function(){var m=a.data().formSchema,p=m==null?void 0:m.submitConfig;a.data()!==k&&(k=a.data(),m&&p&&_.YCh(m.id,{isValid:function(){var r,t=(r=e())!=null?r:[],v;r=(v=b())!=null?v:[];if(t.length!==r.length)return!0;v=new Set(r);t=_.f(t);r=t.next();try{for(;!r.done;r=t.next())if(!v.has(r.value))return!0}finally{_.h(t,r)}return!1},
formData:function(){var r=e()||[];return _.cf({preferredLanguageSettingsFormData:{selectedLanguages:r}},Oum)},
submitConfig:p}))},"iCaJcc","SL");
var l=function(m){var p=m.key;if(p){var r;if(p&&((r=e())==null?0:r.includes(p))){var t;g((t=e())==null?void 0:t.filter(function(v){return v!==p}))}else g([].concat(_.u(e()||[]),[p]))}};
return _.y("yt-preferred-language-settings-panel-view-model",{class:"ytPreferredLanguageSettingsPanelViewModelHost"},_.y(_.mo,{data:function(){return a.data().checkboxGroup}},{checkboxGroupViewModel:function(m){return _.y(_.RYg,{data:m.data,
onItemTap:l,selectedKeys:e,controlledMode:!0,disableHorizontalPadding:a.disableHorizontalPadding})}}))},"TL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
