"use strict";_F_installCss(".ytThumbnailHoverOverlayViewModelHost{opacity:0;transition:opacity .3s;position:absolute;top:0;left:0;width:100%;height:100%;display:flex;cursor:pointer}.ytThumbnailHoverOverlayViewModelHost:focus,.ytThumbnailHoverOverlayViewModelHost:focus-within,.ytThumbnailHoverOverlayViewModelHost:hover{opacity:1}.ytThumbnailHoverOverlayViewModelHostForceHover{opacity:1;transition:none}.ytThumbnailHoverOverlayViewModelScrim{display:block;position:relative;height:100%}.ytThumbnailHoverOverlayViewModelStyleCover{background-color:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;width:100%}.ytThumbnailHoverOverlayViewModelStyleButton{background-color:rgba(0,0,0,0.6);position:absolute;bottom:16px;right:16px;display:flex;align-items:center;justify-content:center;height:36px;border-radius:18px;padding:0 16px}.ytThumbnailHoverOverlayViewModelText{margin:4px;color:#fff;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}.ytThumbnailHoverOverlayViewModelIcon{margin:4px;color:#fff;fill:#fff;height:24px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.llc=_.Ui(function(a){var b=a.data;var c=a.className;a=a.alwaysShow;var e=_.E0b(),g={};return _.y("thumbnail-hover-overlay-view-model",{el:_.Zn(_.hr(function(){return b().rendererContext})),
class:_.Wn("ytThumbnailHoverOverlayViewModelHost",c,(g.ytThumbnailHoverOverlayViewModelHostForceHover=a,g)),"aria-label":function(){var k;return(k=_.bf(b().rendererContext,_.Uq))==null?void 0:k.label},
role:function(){return _.fr(b().rendererContext)!==void 0?"button":void 0},
tabindex:function(){return _.fr(b().rendererContext)!==void 0?0:void 0},
"on:keypress":e},_.y("div",{class:_.Wn("ytThumbnailHoverOverlayViewModelScrim",function(){a:switch(b().style){case "THUMBNAIL_HOVER_OVERLAY_STYLE_BUTTON":var k="ytThumbnailHoverOverlayViewModelStyleButton";break a;default:k="ytThumbnailHoverOverlayViewModelStyleCover"}return k})},_.y(_.B,{cond:function(){return b().icon},
then:function(k){return _.y(_.io,{data:k,alt:"",className:"ytThumbnailHoverOverlayViewModelIcon"})}}),_.y(_.B,{cond:function(){return b().text},
then:function(k){return _.y(_.MA,{text:k,className:"ytThumbnailHoverOverlayViewModelText"})}})))},"IN");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
