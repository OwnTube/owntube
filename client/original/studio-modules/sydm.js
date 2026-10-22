"use strict";_F_installCss(".ytReelCarouselViewModelHost{display:flex;flex-direction:row;gap:4px}.ytReelCarouselViewModelHostButton{min-width:0}.ytReelCarouselViewModelHostButton c3-icon{width:inherit;height:inherit}.ytReelCarouselViewModelHostButtonMaxWidth{max-width:50%}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.djc=_.Ui(function(a){var b=a.data;return _.y("yt-reel-carousel-view-model",{class:"ytReelCarouselViewModelHost"},_.y(_.mo,{data:function(){return b().buttonViewModels}},{reelCarouselButtonViewModel:function(c){return _.y(Bxm,{data:c.data,
isMultiButton:function(){return!!(b().buttonViewModels&&b().buttonViewModels.length>1)}})}}))},"RO");
var Bxm=_.Ui(function(a){var b=a.data;var c=a.isMultiButton;var e=_.Mq(_.oWg);return _.y(_.mo,{data:function(){return b().buttonViewModel}},{buttonViewModel:function(g){var k={};
return _.y(_.PD,{data:g.data,className:_.Wn("ytReelCarouselViewModelHostButton",(k.ytReelCarouselViewModelHostButtonMaxWidth=function(){return!(c==null||!c())},k)),
buttonOverrides:function(){return e()===1?{style:"mono"}:{}}})}})},"SO");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
