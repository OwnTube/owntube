"use strict";_F_installCss(".ytwAdAvatarViewModelHost,.ytwAdAvatarViewModelHostIsClickableAdComponent{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Lsm=function(a){switch(a){case "AD_AVATAR_SIZE_XXS":return"tiny";case "AD_AVATAR_SIZE_XS":return"extra-small";case "AD_AVATAR_SIZE_S":return"small";case "AD_AVATAR_SIZE_M":return"medium";case "AD_AVATAR_SIZE_MPLUS":return"48";case "AD_AVATAR_SIZE_L":return"large";case "AD_AVATAR_SIZE_XL":return"extra-large";default:return"medium"}};_.Msm=_.Ui(function(a){var b=a.data;var c=a.customCommandResolver;a=_.wf({visibilityCallback:function(k){var l,m=(l=b().interaction)==null?void 0:l.onFirstVisible;k&&m&&_.bo(m)},
showOption:_.pL});a=_.Zn(a);var e=function(){var k;return((k=b().interaction)==null?0:k.onTap)?function(l){var m;_.lVg(l,(m=b().interaction)==null?void 0:m.onTap,c)}:void 0},g=function(){var k,l=b(),m=e(),p=(k=_.bf(b().rendererContext,_.Uq))==null?void 0:k.label;
a:switch(l.style){case "AD_AVATAR_STYLE_ROUNDED_CORNER":k=1;break a;default:k=0}return{size:Lsm(l.size),type:k,onTap:m,accessibilityText:p}};
return _.y("ad-avatar-view-model",{class:function(){var k;return((k=b().interaction)==null?0:k.onTap)?"ytwAdAvatarViewModelHostIsClickableAdComponent":"ytwAdAvatarViewModelHost"},
el:a},_.y(_.B,{cond:function(){return b().image},
then:function(k){return _.y(_.dWg,{data:g,image:k})}}))},"IK");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
