"use strict";_F_installCss(".ytwPlayerDisclosureViewModelHost{display:flex}.ytwPlayerDisclosureViewModelEndpoint{display:flex;align-items:center;max-width:516px;color:#fff;background-color:rgba(0,0,0,0.6);border-radius:4px;border-left:4px solid var(--taf7bd2f2e5a02772);padding:6px 0 6px 6px;text-decoration:none}.ytwPlayerDisclosureViewModelImage{flex:none;margin:4px;height:48px;width:48px}.ytwPlayerDisclosureViewModelExtractOverlay .ytwPlayerDisclosureViewModelEndpoint{color:var(--reel-metadata-color);background-color:var(--t7f4f2c6d54836ce0)}.ytwPlayerDisclosureViewModelTitle{margin:0 4px;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:500;line-height:2rem}.ytwPlayerDisclosureViewModelText{margin:0 4px;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem;overflow:hidden;display:block;max-height:3.6rem;display:box;display:-webkit-box;-webkit-box-orient:vertical;text-overflow:ellipsis;white-space:normal}@supports (-webkit-line-clamp:1){.ytwPlayerDisclosureViewModelText{-webkit-line-clamp:2;max-height:none}}.ytwPlayerDisclosureViewModelDivider{margin:2px 4px;border-top:1px solid rgba(255,255,255,0.3)}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.bkc=_.Ui(function(a){var b=a.data;var c=_.Mq(_.oWg);a={};return _.y("player-disclosure-view-model",{class:_.Wn("ytwPlayerDisclosureViewModelHost",(a.ytwPlayerDisclosureViewModelExtractOverlay=function(){return c()===1},a))},_.y(_.LA,{command:function(){return b().navigationEndpoint},
className:"ytwPlayerDisclosureViewModelEndpoint"},_.y(_.B,{cond:function(){return b().iconName},
then:function(e){return _.y(_.no,{icon:e})}}),_.y(_.B,{cond:function(){return b().iconName?void 0:b().image},
then:function(e){return _.y(_.io,{data:e,alt:function(){return b().title||""},
className:"ytwPlayerDisclosureViewModelImage"})}}),_.y(_.B,{cond:function(){return b().title||b().secondaryText},
then:function(){return _.y("div",null,_.y("div",{class:"ytwPlayerDisclosureViewModelTitle"},function(){return b().title}),_.y("div",{class:"ytwPlayerDisclosureViewModelText"},function(){return b().text}),_.y(_.B,{cond:function(){return b().secondaryText},
then:function(e){return _.y(_.Id,null,_.y("div",{class:"ytwPlayerDisclosureViewModelDivider"}),_.y("div",{class:"ytwPlayerDisclosureViewModelText"},e))}}))},
else:function(){return _.y("span",{class:"ytwPlayerDisclosureViewModelText"},function(){return b().text})}}),_.y(_.B,{cond:function(){return b().showEndChevron},
then:function(){return _.y(_.no,{icon:"CHEVRON_RIGHT"})}})))},"CO");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
