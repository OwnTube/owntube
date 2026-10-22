"use strict";_F_installCss(".ytwAdButtonHoverOverlayViewModelHost,.ytwAdButtonHoverOverlayViewModelHostIsClickableAdComponent{width:100%;height:100%;display:flex;justify-content:center;align-items:center;background-color:rgba(0,0,0,0.6)}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.mWg=_.Ui(function(a){var b=a.data,c=a.listenToTapEvent;a=_.wf({visibilityCallback:function(g){var k,l=(k=b().interaction)==null?void 0:k.onFirstVisible;g&&l&&_.bo(l)},
showOption:_.pL});var e=function(){};
return _.y("ad-button-hover-overlay-view-model",{"on:click":function(g){if(_.D("enable_web_home_top_landscape_image_layout_legacy_click_command")){var k,l=(k=b().interaction)==null?void 0:k.onTap;l&&_.sg(g.currentTarget,"yt-navigate",{endpoint:_.Sh(l)})}},
class:function(){var g;return((g=b().interaction)==null?0:g.onTap)?"ytwAdButtonHoverOverlayViewModelHostIsClickableAdComponent":"ytwAdButtonHoverOverlayViewModelHost"},
el:_.Zn(a,_.mVg(function(){return b().interaction},void 0,function(){return!_.D("enable_web_home_top_landscape_image_layout_legacy_click_command")&&(c==null?void 0:c())}))},function(){return _.D("enable_web_home_top_landscape_image_layout_legacy_click_command")?_.y(_.mo,{data:function(){return b().button}},{adButtonViewModel:function(g){return _.y(_.nWg,{data:g.data,
customCommandResolver:e})}}):_.y(_.mo,{data:function(){return b().button}},{adButtonViewModel:_.nWg})}())},"eO");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
