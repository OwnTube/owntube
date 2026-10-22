"use strict";_F_installCss(".ytImageBannerViewModelHost{display:block;position:relative;width:100%;height:100%}.ytImageBannerViewModelPositionAbsolute{position:absolute;left:0;top:0}.ytImageBannerViewModelInset{border-radius:16px;overflow:hidden}.ytImageBannerViewModelSmallInset{border-radius:8px}.ytImageBannerViewModelTappable{cursor:pointer}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Qtm=function(a){if(!("matchMedia"in window))return _.he(Error("Kt")),function(){return!1};
var b=window.matchMedia(a);a=_.f(_.xd(b.matches,void 0,"waIHpe",function(){}));
var c=a.next().value,e=a.next().value,g=function(k){e(k.matches)};
b.addEventListener?(b.addEventListener("change",g),_.wd(function(){b.removeEventListener("change",g)})):b.addListener&&(b.addListener(g),_.wd(function(){b.removeListener(g)}));
return c},Rtm=function(a){return a==="IMAGE_BANNER_STYLE_INSET"||a==="IMAGE_BANNER_STYLE_UNKNOWN"};_.fjc=_.Ri(function(a){var b=a.data;var c=a.isPositionRelative;var e=Qtm("(max-width: 599.9px)"),g=function(){var k,l;return(l=(k=b())==null?void 0:k.style)!=null?l:"IMAGE_BANNER_STYLE_FULL_BLEED"};
a={};return _.y("yt-image-banner-view-model",{el:_.Xn(_.er(function(){var k;return(k=b())==null?void 0:k.rendererContext})),
class:_.Un((a.ytImageBannerViewModelHost=!0,a.ytImageBannerViewModelInset=function(){return Rtm(g())},a.ytImageBannerViewModelPositionAbsolute=function(){return _.Kd(!0)&&!(c==null?0:c())},a.ytImageBannerViewModelSmallInset=function(){return Rtm(g())&&e()},a.ytImageBannerViewModelTappable=function(){var k;
return _.dr((k=b())==null?void 0:k.rendererContext)},a))},_.y(_.B,{cond:function(){var k;
return(k=b())==null?void 0:k.image},
then:function(){return _.y(_.go,{data:function(){return b().image},
alt:"",contentMode:"CONTENT_MODE_SCALE_ASPECT_FILL"})}}),_.y(_.ko,{data:function(){var k;
return(k=b())==null?void 0:k.overlays}},{thumbnailHoverOverlayViewModel:_.dnf}))},"RL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
