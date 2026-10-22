"use strict";_F_installCss(".ytShoppingContentLineItemViewModelHost{display:block;min-width:0}.ytShoppingContentLineViewModelHost{display:flex;gap:var(--shopping-content-line-gap);line-height:var(--shopping-content-line-height)}.ytShoppingDescriptionItemViewModelHost{display:block}.ytShoppingDescriptionItemViewModelLink{display:flex;align-items:center;padding:8px;border-radius:12px;color:var(--tffc2fd3a644f6275);text-decoration:none;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}@media (-ms-high-contrast:active),(forced-colors:active){.ytShoppingDescriptionItemViewModelLink{forced-color-adjust:none;background-color:SelectedItem;color:SelectedItemText}}.ytShoppingDescriptionItemViewModelLink:hover{background-color:var(--tf3fc855af2285f5f);cursor:pointer}.ytShoppingDescriptionItemViewModelLink:active{background-color:var(--t7f4f2c6d54836ce0);cursor:pointer}.ytShoppingDescriptionItemViewModelThumbnail{margin-right:12px;border-radius:8px;overflow:hidden;flex:none}.ytShoppingDescriptionItemViewModelText{overflow:hidden}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var qtm=new _.Nv("shoppingContentLineItemViewModel");var rtm=_.Ri(function(a){var b=a.data;a=a.truncateText;return _.y("yt-shopping-content-line-item-view-model",{class:_.Un("ytShoppingContentLineItemViewModelHost"),style:_.fo({"flex-shrink":function(){return b().canShrink?"1":"0"}})},_.y(_.LA,{text:function(){var c;
return(c=b().text)==null?void 0:c.attributedString},
ellipsisTruncate:a}))},"AL");var stm=_.Ri(function(a){var b=a.data,c=function(){return!b().wrapContent};
return _.y("yt-shopping-content-line-view-model",{class:_.Un("ytShoppingContentLineViewModelHost",a.className),style:_.fo({"--shopping-content-line-gap":function(){return b().itemGap?b().itemGap+"px":void 0},
"--shopping-content-line-height":function(){return b().lineHeight?b().lineHeight+"px":void 0}})},_.y(_.Md,{each:function(){return(b().items||[]).map(function(e){return _.Qe(e,qtm)}).filter(function(e){return!!e})}},function(e){return _.y(rtm,{data:e,
truncateText:c})}))},"BL");_.zjc=_.Ri(function(a){var b=a.data;var c=_.wXb(function(){return b().rendererContext}),e=function(){var l;
return((l=b().image)==null?void 0:l.height)||48},g=function(){var l;
return((l=b().image)==null?void 0:l.width)||48},k=function(){var l;
return((l=b().image)==null?0:l.backgroundColor)?_.Xh(b().image.backgroundColor):""};
return _.y("yt-shopping-description-item-view-model",{class:"ytShoppingDescriptionItemViewModelHost",el:_.Xn(_.er(function(){var l;return(l=b())==null?void 0:l.rendererContext}))},_.y(_.KA,{className:"ytShoppingDescriptionItemViewModelLink",
style:_.fo({"background-color":function(){if(window.matchMedia("(-ms-high-contrast: active)").matches||window.matchMedia("(forced-colors: active)").matches)return"";var l,m,p,r=((l=_.ne().resolve(_.ke(_.fr)))==null?0:l())?(m=b())==null?void 0:m.darkThemeBackgroundColor:(p=b())==null?void 0:p.lightThemeBackgroundColor;return r?_.Xh(r):""},
"padding-left":function(){var l;return _.ptm((l=b().padding)==null?void 0:l.start)},
"padding-right":function(){var l;return _.ptm((l=b().padding)==null?void 0:l.end)},
"padding-top":function(){var l;return _.ptm((l=b().padding)==null?void 0:l.top)},
"padding-bottom":function(){var l;return _.ptm((l=b().padding)==null?void 0:l.bottom)}}),
command:function(){return _.cr(b().rendererContext)},
ariaLabel:function(){var l;return(l=c())==null?void 0:l.label}},_.y(_.B,{cond:function(){var l,m;
return(m=(l=b().image)==null?void 0:l.image)!=null?m:b().thumbnail},
then:function(l){return _.y("div",{class:"ytShoppingDescriptionItemViewModelThumbnail",style:_.fo({"background-color":k,width:function(){return g()+"px"},
height:function(){return e()+"px"}})},_.y(_.go,{data:l,
height:e,width:g,style:_.fo({width:function(){return g()+"px"},
height:function(){return e()+"px"}}),
alt:""}))}}),_.y("div",{class:"ytShoppingDescriptionItemViewModelText"},_.y(_.ko,{data:function(){return b().line1}},{shoppingContentLineViewModel:function(l){return _.y(stm,{data:l.data})}}),_.y(_.ko,{data:function(){return b().line2}},{shoppingContentLineViewModel:function(l){return _.y(stm,{data:l.data})}}),_.y(_.ko,{data:function(){return b().line3}},{shoppingContentLineViewModel:function(l){return _.y(stm,{data:l.data})}}))))},"CL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
