"use strict";_F_installCss(".ytwFeedAdSitelinkViewModelHost,.ytwFeedAdSitelinkViewModelHostIsClickableAdComponent{display:flex;flex-direction:column;justify-content:center;padding:5px 11px;border:1px solid var(--tf3fc855af2285f5f);border-radius:16px;flex-shrink:0}.ytwFeedAdSitelinkViewModelHost:hover,.ytwFeedAdSitelinkViewModelHostIsClickableAdComponent:hover{background-color:var(--t20480717de80f555);border-color:transparent;cursor:pointer}.ytwFeedAdSitelinkViewModelHeadline{max-width:250px;color:var(--tffc2fd3a644f6275);font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:500;line-height:2rem;overflow:hidden;display:block;max-height:2rem}.ytwFeedAdSitelinksCarouselViewModelHost{display:flex;flex-flow:row wrap;align-items:center;gap:8px 12px;max-height:32px;overflow:hidden}.ytwFeedAdSitelinksCarouselViewModelHostDefault{max-height:32px;overflow:hidden;row-gap:8px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var csm=_.Ri(function(a){var b=a.data;return _.y("feed-ad-sitelink-view-model",{class:function(){var c;return((c=b().interaction)==null?0:c.onTap)?"ytwFeedAdSitelinkViewModelHostIsClickableAdComponent":"ytwFeedAdSitelinkViewModelHost"},
el:_.Xn(_.wUg(function(){return b().interaction},a.customCommandResolver,void 0,function(){return!0})),
"aria-label":function(){var c,e;return(c=b().interaction)==null?void 0:(e=c.accessibility)==null?void 0:e.label},
role:"link",tabindex:0},_.y(_.LA,{text:function(){return b().headline},
className:"ytwFeedAdSitelinkViewModelHeadline",linkInheritColor:!0}))},"VK");_.pVg=_.Ri(function(a){var b=a.data;a=_.uf({visibilityCallback:function(e){var g,k=(g=b().interaction)==null?void 0:g.onFirstVisible;e&&k&&_.$n(k)},
showOption:_.qL});var c={};return _.y("feed-ad-sitelinks-carousel-view-model",{el:_.Xn(a),class:_.Un("ytwFeedAdSitelinksCarouselViewModelHost",(c.ytwFeedAdSitelinksCarouselViewModelHostDefault=function(){return b().style==="FEED_AD_SITELINKS_STYLE_NONE"},c))},_.y(_.ko,{data:function(){return b().sitelinks}},{feedAdSitelinkViewModel:csm}))},"WK");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
