"use strict";_F_installCss(".ytEntryPointButtonViewModelHost{display:block}.ytEntryPointButtonViewModelEntryPointButton{display:flex;align-items:start;border:none;background-color:var(--t7f4f2c6d54836ce0);color:var(--tffc2fd3a644f6275);position:relative;overflow:hidden;width:100%;cursor:pointer}.ytEntryPointButtonViewModelEntryPointButton:focus-visible{background-color:var(--t3e41d7b17b187f69);outline:2px solid var(--tffc2fd3a644f6275)}.ytEntryPointButtonViewModelEntryPointButton:hover{background-color:var(--t20480717de80f555)}.ytEntryPointButtonViewModelDisabled{background-color:var(--t7f4f2c6d54836ce0);color:var(--t7e34d5baa4ea6277);pointer-events:none;cursor:default}.ytEntryPointButtonViewModelIndicator{position:absolute;top:0;left:0;width:6px;height:100%}.ytEntryPointButtonViewModelDisabled .ytEntryPointButtonViewModelIndicator{background-color:var(--t7e34d5baa4ea6277)}.ytEntryPointButtonViewModelBadge{align-self:center;flex-shrink:0;-webkit-margin-start:auto;margin-inline-start:auto}.ytEntryPointButtonViewModelSmall{flex-direction:row;padding:12px;gap:12px;border-radius:8px;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:500;line-height:2rem}.ytEntryPointButtonViewModelSmall.ytEntryPointButtonViewModelNoIcon{padding-left:18px}.ytEntryPointButtonViewModelMedium{flex-direction:column;padding:16px;gap:16px;border-radius:16px;font-family:Roboto,Arial,sans-serif;font-size:1.6rem;font-weight:500;line-height:2.2rem}.ytEntryPointButtonViewModelIcon{flex-shrink:0}.ytEntryPointButtonViewModelSingleLineTitle{min-width:0}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("an7FC");
_.Ijc=_.Ri(function(a){var b=_.Si(a,{className:void 0}).className,c=_.wXb(function(){return a.data().rendererContext}),e=function(){return a.data().state==="ENTRY_POINT_BUTTON_STATE_DISABLED"},g=function(){return a.data().titleMaxLines===1},k={};
return _.y("yt-entry-point-button-view-model",{class:_.Un("ytEntryPointButtonViewModelHost",b)},_.y("button",{el:_.Xn(_.er(function(){return a.data().rendererContext})),
class:_.Un("ytEntryPointButtonViewModelEntryPointButton",function(){a:switch(a.data().size){case "ENTRY_POINT_BUTTON_SIZE_SMALL":var l="ytEntryPointButtonViewModelSmall";break a;default:l="ytEntryPointButtonViewModelMedium"}return l},(k.ytEntryPointButtonViewModelNoIcon=function(){return!a.data().image},k.ytEntryPointButtonViewModelDisabled=e,k)),
disabled:e,"aria-label":function(){var l,m;return((l=c())==null?void 0:l.label)||((m=a.data().titleFormatted)==null?void 0:m.content)}},_.y(_.sOe,{model:function(){return{color:1}}}),_.y(_.B,{cond:function(){var l=_.o0b(a.data().accentThemedColor);
return l?_.Xh(l):void 0},
then:function(l){return _.y("div",{class:"ytEntryPointButtonViewModelIndicator",style:_.fo({"background-color":function(){return e()?void 0:l()}})})}}),_.y(_.B,{cond:function(){return a.data().image},
then:function(l){return _.y(_.go,{data:l,alt:"",className:function(){return g()?"ytEntryPointButtonViewModelIcon":void 0},
targetWidth:18,targetHeight:18,preserveWidth:!0,preserveHeight:!0})}}),_.y(_.B,{cond:function(){return a.data().titleFormatted},
then:function(l){return _.y(_.LA,{text:l,ellipsisTruncate:g,className:function(){return g()?"ytEntryPointButtonViewModelSingleLineTitle":void 0}})}}),_.y(_.ko,{data:function(){return a.data().trailingAccessory}},{badgeViewModel:function(l){return _.y(_.TD,{data:l.data,
class:"ytEntryPointButtonViewModelBadge"})}})))},"JN");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
