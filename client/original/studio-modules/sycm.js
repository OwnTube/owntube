"use strict";_F_installCss(".ytReelSoundMetadataViewModelHost{display:block}@media (max-width:299.9px){.ytReelSoundMetadataViewModelHost{display:none}}.ytReelSoundMetadataViewModelMetadataContainer{display:flex;flex-direction:row;align-items:center;cursor:pointer}.ytReelSoundMetadataViewModelIcon{margin-right:4px;color:var(--reel-metadata-color,#fff);height:16px;width:16px}.ytReelSoundMetadataViewModelMarqueeContainer{color:var(--reel-metadata-color,#fff);overflow:hidden;flex:1;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}.ytReelSoundMetadataViewModelHostLarge{display:block}.ytReelSoundMetadataViewModelHostLarge .ytReelSoundMetadataViewModelIcon{width:22px;height:22px;margin-right:8px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Tvm;_.Svm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("cgSEob"),2);a=_.Tic;return b.return(a)})};
Tvm=_.ho(function(){return _.Svm()},"marqueeScroll");
_.oe(_.MA,function(a){a.registerLoadFn("marqueeScroll","cgSEob",_.Svm)});_.Sic=_.Ri(function(a){var b=a.data;var c=_.Jq(_.zVg),e=function(){return c()===1};
a=_.u0b();var g=function(){return e()?22:16},k={};
return _.y("reel-sound-metadata-view-model",{class:_.Un("ytReelSoundMetadataViewModelHost",(k.ytReelSoundMetadataViewModelHostLarge=e,k)),"on:click":function(l){b().onTapCommand&&_.$n(b().onTapCommand);l.stopPropagation()},
tabindex:0,role:"button","on:keydown":a},_.y("div",{class:"ytReelSoundMetadataViewModelMetadataContainer"},_.y(_.B,{cond:function(){return b().musicIcon},
then:function(l){return _.y(_.go,{data:l,alt:"music icon",className:"ytReelSoundMetadataViewModelIcon",size:g})}}),_.y("div",{class:"ytReelSoundMetadataViewModelMarqueeContainer"},_.y(Tvm,{text:function(){return b().soundMetadata},
enableMarqueeScroll:function(){return!!b().enableMarqueeScroll}}))))},"QN");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
