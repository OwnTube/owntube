"use strict";_F_installCss(".ytwAdDetailsLineViewModelHost,.ytwAdDetailsLineViewModelHostIsClickableAdComponent{display:block}.ytwAdDetailsLineViewModelHostIsClickableAdComponentTextStyleStandard,.ytwAdDetailsLineViewModelHostTextStyleStandard{color:var(--t4a6da19e16bf221a);padding-right:0;padding-left:0;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem;overflow:hidden;display:block;max-height:1.8rem;display:box;display:-webkit-box;-webkit-box-orient:vertical;text-overflow:ellipsis;white-space:normal}@supports (-webkit-line-clamp:1){.ytwAdDetailsLineViewModelHostIsClickableAdComponentTextStyleStandard,.ytwAdDetailsLineViewModelHostTextStyleStandard{-webkit-line-clamp:1;max-height:none}}.ytwAdDetailsLineViewModelHostIsClickableAdComponentTextStyleStandard,.ytwAdDetailsLineViewModelHostTextStyleStandard{word-break:break-all}.ytwAdDetailsLineViewModelHostIsClickableAdComponentTextStyleStandardBrowse,.ytwAdDetailsLineViewModelHostTextStyleStandardBrowse{white-space:nowrap;color:var(--t4a6da19e16bf221a);font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var atm;_.btm=_.Ui(function(a){var b=a.data;var c=a.customCommandResolver;var e=a.adRenderingContextType;a=_.wf({visibilityCallback:function(g){var k,l=(k=b().interaction)==null?void 0:k.onFirstVisible;g&&l&&_.bo(l)},
showOption:_.pL});return _.y("ad-details-line-view-model",{class:function(){var g;return((g=b().interaction)==null?0:g.onTap)?"ytwAdDetailsLineViewModelHostIsClickableAdComponent":"ytwAdDetailsLineViewModelHost"},
el:_.Zn(a,_.mVg(function(){return b().interaction},c))},_.y(_.B,{cond:function(){return b().style},
then:function(g){return _.y(_.Qd,{each:function(){var k;return((k=b())==null?void 0:k.attributes)||[]},
keyBy:"INDEX"},function(k){return _.y(atm,{attribute:k,style:g,adRenderingContextType:function(){return e()}})})}}))},"TK");
atm=_.Ui(function(a){var b=a.attribute;var c=a.style;var e=a.adRenderingContextType;return _.y(_.B,{cond:function(){return b().text},
then:function(g){return _.y(_.MA,{text:g,className:function(){var k=e();c();return k==="AD_RENDERING_CONTEXT_TYPE_BROWSE"?"ytwAdDetailsLineViewModelHostTextStyleStandardBrowse":"ytwAdDetailsLineViewModelHostTextStyleStandard"}})}})},"UK");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
