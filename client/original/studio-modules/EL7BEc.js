"use strict";_F_installCss(".ytDropdownViewModelHost{display:block}.ytDropdownViewModelDropdownContainer{display:flex;box-sizing:border-box;height:56px;padding:8px 12px;border-radius:8px;border:1px solid var(--tf3fc855af2285f5f);cursor:pointer}.ytDropdownViewModelDropdownContainerErrorBorder{border-color:var(--td545df04e2c659d7)}.ytDropdownViewModelDropdownContainerDisabled{border:0;color:var(--t7e34d5baa4ea6277);background-color:var(--t7f4f2c6d54836ce0);cursor:default}.ytDropdownViewModelText{flex-grow:1;display:flex;flex-direction:column;justify-content:center}.ytDropdownViewModelLabel{color:var(--t4a6da19e16bf221a);font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytDropdownViewModelLabelError{color:var(--td545df04e2c659d7)}.ytDropdownViewModelTitle{color:var(--tffc2fd3a644f6275);font-family:Roboto,Arial,sans-serif;font-size:1.6rem;font-weight:400;line-height:2.2rem}.ytDropdownViewModelTitlePlaceholder{color:var(--t7e34d5baa4ea6277)}.ytDropdownViewModelChevronDown{display:flex;align-items:center;color:var(--tffc2fd3a644f6275)}.ytDropdownViewModelChevronDownDisabled{color:var(--t7e34d5baa4ea6277)}.ytDropdownViewModelSupport{margin-top:4px;display:flex;align-items:center;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytDropdownViewModelSupportHint{color:var(--t4a6da19e16bf221a)}.ytDropdownViewModelSupportError{color:var(--td545df04e2c659d7)}.ytDropdownViewModelSupportIcon{display:inline-block;height:16px;width:16px}.ytDropdownViewModelSupportText{margin-left:4px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("EL7BEc");
var $tm=function(a,b,c){a=a.map(function(e,g){return _.Te({listItemViewModel:{title:e.title,subtitle:e.subtitle,leadingImage:e.leadingImage,trailingImage:g===b?Ytm:void 0,rendererContext:{commandContext:{onTap:e.onTap}}}},_.Er)});
return Object.assign({},c&&{header:_.Te({panelHeaderViewModel:{title:c}},Ztm)},{content:_.Te({listViewModel:{listItems:a}},_.jdc)})},aum=function(a){var b;
a=(b=a.options)==null?void 0:b.findIndex(function(c){return c.isSelected});
return a===void 0?-1:a},bum=function(a,b){var c=b.type;
if(a===void 0)return-1;var e;b=(e=b.options)==null?void 0:e.findIndex(function(g){return _.Sdc(g.value,c)===a});
return b===void 0?-1:b},cum=function(a,b,c){var e=function(){return a().label},g={},k=_.Un("ytDropdownViewModelLabel",(g.ytDropdownViewModelLabelError=b,g));
return _.y(_.B,{cond:function(){return a().label&&!(c()===-1&&a().label&&!a().placeholderText)},
then:function(){return _.y("div",{class:k},_.y(_.LA,{text:e}))}})},dum=function(a,b){var c={};
c=_.Un("ytDropdownViewModelTitle",(c.ytDropdownViewModelTitlePlaceholder=function(){return b()===-1},c));
return _.y("div",{class:c},_.y(_.LA,{text:function(){var e=a();var g=b();if(g===-1)e=e.placeholderText?e.placeholderText:e.label;else{var k,l;e=(k=e.options)==null?void 0:(l=k[g])==null?void 0:l.title}return e}}))},eum=function(a,b){var c=function(){return a().hint};
return _.y(_.Ed,null,_.y(_.B,{cond:function(){return c()&&!b()},
then:function(){return _.y("div",{class:_.Un("ytDropdownViewModelSupport","ytDropdownViewModelSupportHint")},_.y(_.LA,{text:c,className:"ytDropdownViewModelSupportText"}))}}),_.y(_.B,{cond:b,
then:function(){return _.y("div",{id:"dropdown-view-model-error",role:"alert",class:_.Un("ytDropdownViewModelSupport","ytDropdownViewModelSupportError")},_.y(_.lo,{icon:"INFO",className:"ytDropdownViewModelSupportIcon"}),_.y(_.LA,{text:b,className:"ytDropdownViewModelSupportText"}))}}))},fum=function(a,b){var c=_.ne().resolve(_.Gwf);
_.Ud(function(){var e=a().id;e&&c!=null&&c.dropdownMap.set(e,b)})},Ztm=new _.Nv("panelHeaderViewModel");var Ytm={sources:[{clientResource:{imageName:"CHECK"}}]};_.Gkc=_.Ri(function(a){var b=_.Od("div"),c=_.Si(a,{error:void 0}),e=c.data,g=c.error,k=c.onSelected;a=c.className;var l=c.formFieldMetadata,m=_.g7b(function(){return l==null?void 0:l()});
c=_.f(_.Qi(function(){return aum(e())}));
var p=c.next().value,r=c.next().value,t=function(){var C;return((l==null?0:l())?3:1)===3?bum((C=m())==null?void 0:C.value,e()):p()};
fum(e,function(C){var E,F,H=_.Sdc((E=e().options)==null?void 0:(F=E[C])==null?void 0:F.value,e().type);if(((l==null?0:l())?3:1)===3){var I;(I=m())==null||I.updateValue(H)}else r(C);k==null||k(H);b.value.focus()});
c=_.v0b();var v=function(){var C,E;return(E=(C=m())==null?void 0:C.errors)!=null?E:[]},w=function(){return!!g()||v().length>0},x=function(){return!!e().disabled},z={},A={};
return _.y("dropdown-view-model",{class:"ytDropdownViewModelHost"},_.y("div",{class:_.Un("ytDropdownViewModelDropdownContainer",a,(z.ytDropdownViewModelDropdownContainerErrorBorder=w,z.ytDropdownViewModelDropdownContainerDisabled=x,z)),"on:click":function(){if(!e().disabled){var C=e(),E=t(),F=b.value;C.options&&(C=$tm(C.options,E,C.label),_.ne().resolve(_.r4b).openSheet({viewModel:C},F))}},
el:b,role:"combobox",tabindex:0,"on:keydown":c,"aria-invalid":w,"aria-disabled":x,"aria-describedby":function(){return w()?"dropdown-view-model-error":void 0}},_.y("div",{class:"ytDropdownViewModelText"},cum(e,w,t),dum(e,t)),_.y("div",{class:_.Un("ytDropdownViewModelChevronDown",(A.ytDropdownViewModelChevronDownDisabled=x,A))},_.y(_.lo,{icon:"CHEVRON_DOWN"}))),eum(e,function(){if(((l==null?0:l())?3:1)===3&&v().length>0){var C=v()[0].message;
if(C)return{content:C}}return g()}))},"YL");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
