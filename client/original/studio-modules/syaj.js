"use strict";_F_installCss(".ytShoppingContentLineItemViewModelHost{display:block;min-width:0}.ytShoppingContentLineViewModelHost{display:flex;gap:var(--shopping-content-line-gap);line-height:var(--shopping-content-line-height)}.ytShoppingDescriptionItemViewModelHost{display:block}.ytShoppingDescriptionItemViewModelLink{display:flex;align-items:center;padding:8px;border-radius:12px;color:var(--tffc2fd3a644f6275);text-decoration:none;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}@media (-ms-high-contrast:active),(forced-colors:active){.ytShoppingDescriptionItemViewModelLink{forced-color-adjust:none;background-color:SelectedItem;color:SelectedItemText}}.ytShoppingDescriptionItemViewModelLink:hover{background-color:var(--tf3fc855af2285f5f);cursor:pointer}.ytShoppingDescriptionItemViewModelLink:active{background-color:var(--t7f4f2c6d54836ce0);cursor:pointer}.ytShoppingDescriptionItemViewModelThumbnail{margin-right:12px;border-radius:8px;overflow:hidden;flex:none}.ytShoppingDescriptionItemViewModelText{overflow:hidden}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var sum=new _.Mv("shoppingContentLineItemViewModel");var tum=_.Ui(function(a){var b=a.data,c=a.truncateText,e=function(){var g;return(g=b().text)==null?void 0:g.attributedString};
return _.y("yt-shopping-content-line-item-view-model",{class:_.Wn("ytShoppingContentLineItemViewModelHost"),style:_.ho({"flex-shrink":function(){return b().canShrink?"1":"0"}})},_.y(_.B,{cond:e,
then:function(){return _.y(_.MA,{text:e,ellipsisTruncate:c})}}),_.y(_.mo,{data:function(){return b().viewModel}},{badgeViewModel:function(g){return _.y(_.vhf,{data:g.data,
modern:!0})}}))},"EL");var uum=_.Ui(function(a){var b=a.data,c=function(){return!b().wrapContent};
return _.y("yt-shopping-content-line-view-model",{class:_.Wn("ytShoppingContentLineViewModelHost",a.className),style:_.ho({"--shopping-content-line-gap":function(){return b().itemGap?b().itemGap+"px":void 0},
"--shopping-content-line-height":function(){return b().lineHeight?b().lineHeight+"px":void 0}})},_.y(_.Qd,{each:function(){return(b().items||[]).map(function(e){return _.bf(e,sum)}).filter(function(e){return!!e})}},function(e){return _.y(tum,{data:e,
truncateText:c})}))},"FL");_.Mjc=_.Ui(function(a){var b=a.data;var c=_.EXb(function(){return b().rendererContext}),e=function(){var l;
return((l=b().image)==null?void 0:l.height)||48},g=function(){var l;
return((l=b().image)==null?void 0:l.width)||48},k=function(){var l;
return((l=b().image)==null?0:l.backgroundColor)?_.Zh(b().image.backgroundColor):""};
return _.y("yt-shopping-description-item-view-model",{class:"ytShoppingDescriptionItemViewModelHost",el:_.Zn(_.hr(function(){var l;return(l=b())==null?void 0:l.rendererContext}))},_.y(_.LA,{className:"ytShoppingDescriptionItemViewModelLink",
style:_.ho({"background-color":function(){if(window.matchMedia("(-ms-high-contrast: active)").matches||window.matchMedia("(forced-colors: active)").matches)return"";var l,m,p,r=((l=_.qe().resolve(_.oe(_.ir)))==null?0:l())?(m=b())==null?void 0:m.darkThemeBackgroundColor:(p=b())==null?void 0:p.lightThemeBackgroundColor;return r?_.Zh(r):""},
"padding-left":function(){var l;return _.rum((l=b().padding)==null?void 0:l.start)},
"padding-right":function(){var l;return _.rum((l=b().padding)==null?void 0:l.end)},
"padding-top":function(){var l;return _.rum((l=b().padding)==null?void 0:l.top)},
"padding-bottom":function(){var l;return _.rum((l=b().padding)==null?void 0:l.bottom)}}),
command:function(){return _.fr(b().rendererContext)},
ariaLabel:function(){var l;return(l=c())==null?void 0:l.label}},_.y(_.B,{cond:function(){var l,m;
return(m=(l=b().image)==null?void 0:l.image)!=null?m:b().thumbnail},
then:function(l){return _.y("div",{class:"ytShoppingDescriptionItemViewModelThumbnail",style:_.ho({"background-color":k,width:function(){return g()+"px"},
height:function(){return e()+"px"}})},_.y(_.io,{data:l,
height:e,width:g,style:_.ho({width:function(){return g()+"px"},
height:function(){return e()+"px"}}),
alt:""}))}}),_.y("div",{class:"ytShoppingDescriptionItemViewModelText"},_.y(_.mo,{data:function(){return b().line1}},{shoppingContentLineViewModel:function(l){return _.y(uum,{data:l.data})}}),_.y(_.mo,{data:function(){return b().line2}},{shoppingContentLineViewModel:function(l){return _.y(uum,{data:l.data})}}),_.y(_.mo,{data:function(){return b().line3}},{shoppingContentLineViewModel:function(l){return _.y(uum,{data:l.data})}}))))},"GL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
