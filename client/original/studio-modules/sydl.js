"use strict";_F_installCss(".ytReelCarouselViewModelHost{display:flex;flex-direction:row;gap:4px}.ytReelCarouselViewModelHostButton{min-width:0}.ytReelCarouselViewModelHostButton c3-icon{width:inherit;height:inherit}.ytReelCarouselViewModelHostButtonMaxWidth{max-width:50%}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Ric=_.Ri(function(a){var b=a.data;return _.y("yt-reel-carousel-view-model",{class:"ytReelCarouselViewModelHost"},_.y(_.ko,{data:function(){return b().buttonViewModels}},{reelCarouselButtonViewModel:function(c){return _.y(zwm,{data:c.data,
isMultiButton:function(){return!!(b().buttonViewModels&&b().buttonViewModels.length>1)}})}}))},"NO");
var zwm=_.Ri(function(a){var b=a.data;var c=a.isMultiButton;var e=_.Jq(_.yVg);return _.y(_.ko,{data:function(){return b().buttonViewModel}},{buttonViewModel:function(g){var k={};
return _.y(_.PD,{data:g.data,className:_.Un("ytReelCarouselViewModelHostButton",(k.ytReelCarouselViewModelHostButtonMaxWidth=function(){return!(c==null||!c())},k)),
buttonOverrides:function(){return e()===1?{style:"mono"}:{}}})}})},"OO");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
