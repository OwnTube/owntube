"use strict";_F_installCss(".ytwAdDisclosureBannerViewModelHost{align-items:center;background-color:rgba(0,0,0,0.6);border-radius:4px;display:inline-flex;flex-direction:row;max-width:312px;padding:8px}.ytwAdDisclosureBannerViewModelHostHasAccent{-webkit-border-start:4px solid var(--ad-disclosure-accent-color);border-inline-start:4px solid var(--ad-disclosure-accent-color)}.ytwAdDisclosureBannerViewModelHostIsClickableAdComponent{cursor:pointer}.ytwAdDisclosureBannerViewModelHostIsClickableAdComponent:focus-visible{outline:2px solid #fff;outline-offset:2px}.ytwAdDisclosureBannerViewModelText{background:none;color:#fff;flex-grow:1;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ilc=_.Ui(function(a){var b=a.data;a=_.mVg(function(){return b().interaction},a.customCommandResolver,void 0,function(){return!0});
var c=function(){var g;return!((g=b().interaction)==null||!g.onTap)},e={};
return _.y("ad-disclosure-banner-view-model",{class:_.Wn("ytwAdDisclosureBannerViewModelHost",(e.ytwAdDisclosureBannerViewModelHostIsClickableAdComponent=c,e.ytwAdDisclosureBannerViewModelHostHasAccent=function(){var g;return((g=b().disclosureOverlayAccentColor)!=null?g:0)!==0},e)),
style:_.ho({"--ad-disclosure-accent-color":function(){var g=b().disclosureOverlayAccentColor;return g?_.Zh(g):void 0}}),
"aria-label":function(){var g,k=((g=b().text)==null?void 0:g.content)||"",l,m;(g=((l=b().interaction)==null?void 0:(m=l.accessibility)==null?void 0:m.label)||"")||(g=k+" This link opens in new tab");return g},
tabindex:function(){return c()?0:void 0},
role:function(){return c()?"link":void 0},
el:_.Zn(a)},_.y("div",{class:"ytwAdDisclosureBannerViewModelText","aria-hidden":function(){return c()?"true":void 0}},function(){var g;
return((g=b().text)==null?void 0:g.content)||""}))},"Ph");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
