"use strict";_F_installCss(".dividerViewModelHost{display:flex}.dividerViewModelInsetThinPadding{padding:16px}.dividerViewModelBaseDivider{height:1px;width:100%;background-color:var(--tf3fc855af2285f5f)}.dividerViewModelBaseDividerFullBleed4px{height:4px}.dividerViewModelBaseDividerFullBleed8px{height:8px}.dividerViewModelBaseDividerFullBleed12px{height:12px}.dividerViewModelBaseDividerFullBleedThick{height:6px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var zYg;zYg=function(a){switch(a){case "DIVIDER_STYLE_FULL_BLEED_4_PX":return"dividerViewModelBaseDividerFullBleed4px";case "DIVIDER_STYLE_FULL_BLEED_THICK":return"dividerViewModelBaseDividerFullBleedThick";case "DIVIDER_STYLE_FULL_BLEED_8_PX":return"dividerViewModelBaseDividerFullBleed8px";case "DIVIDER_STYLE_FULL_BLEED_12_PX":return"dividerViewModelBaseDividerFullBleed12px";default:return""}};
_.AYg=function(a){var b=_.Ud(a),c=new _.Gc(0,0);if(a==(b?_.Ud(b):document).documentElement)return c;a=_.JBc(a);b=_.Etc(_.nd(b));c.x=a.left+b.x;c.y=a.top+b.y;return c};_.Ujc=_.Ui(function(a){var b=a.data;a={};return _.y("divider-view-model",{class:_.Wn("dividerViewModelHost",(a.dividerViewModelInsetThinPadding=function(){return b().dividerStyle==="DIVIDER_STYLE_INSET_THIN"},a))},_.y("div",{class:_.Wn("dividerViewModelBaseDivider",function(){return zYg(b().dividerStyle)}),
style:_.ho({"background-color":function(){return b().backgroundColor!==void 0?_.Zh(b().backgroundColor):void 0}})}))},"wi");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
