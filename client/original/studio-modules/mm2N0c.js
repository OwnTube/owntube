"use strict";_F_installCss(".ytSwitchButtonViewModelHost{display:block}.ytSwitchButtonViewModelButton{padding:0;border:none;outline:none;font:inherit;text-transform:inherit;color:inherit;background:transparent}.ytSwitchButtonViewModelTappable{cursor:pointer}.ytSwitchShapeHost{display:inline-block;position:relative;width:40px;height:24px;flex-shrink:0}.ytSwitchShapeTrack{position:absolute;width:40px;height:24px;border-radius:12px;background-color:var(--t7e34d5baa4ea6277);transition:background-color .15s}.ytSwitchShapeTrackActive{background-color:var(--t1405e70a39276293);transition:background-color .15s}.ytSwitchShapeTrackDisabled{opacity:.3}.ytSwitchShapeKnob{position:absolute;border-radius:50%;background-color:var(--t6216186c28b3834b);width:20px;height:20px;top:2px;transform:translateX(2px);transition:transform .15s}.ytSwitchShapeKnobActive{transform:translateX(18px);transition:transform .15s}@media (forced-colors:active){.ytSwitchShapeTrack{outline:1px solid var(--t7e34d5baa4ea6277)}.ytSwitchShapeTrackActive{outline:2px solid var(--tffc2fd3a644f6275);background-color:ButtonText}.ytSwitchShapeKnob{outline:1px solid var(--tffc2fd3a644f6275)}}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("mm2N0c");
var lxm=_.Ui(function(a){a=_.Vi(a,{disabled:!1});var b=a.active,c=a.disabled;a={};a=_.Wn("ytSwitchShapeTrack",(a.ytSwitchShapeTrackActive=function(){return b()},a.ytSwitchShapeTrackDisabled=function(){return c()},a));
var e={};e=_.Wn("ytSwitchShapeKnob",(e.ytSwitchShapeKnobActive=function(){return b()},e));
return _.y("switch-shape",{class:"ytSwitchShapeHost"},_.y("div",{class:a}),_.y("div",{class:e}))},"XN");_.Jkc=_.Ui(function(a){var b=_.Vi(a,{className:void 0,parentActive:void 0,handleOnTapEventInParent:!1}),c=b.data;a=b.className;var e=b.handleOnTapEventInParent,g=b.parentActive,k=b.onTap;b=_.f(_.Ti(function(){var t;return(t=g())!=null?t:c().switchedOnByDefault||!1}));
var l=b.next().value,m=b.next().value,p=function(){return c().isDisabled},r=_.Sd("button");
b={};b=_.Wn("ytSwitchButtonViewModelButton",(b.ytSwitchButtonViewModelTappable=function(){return!p()},b));
return _.y("switch-button-view-model",{class:_.Wn("ytSwitchButtonViewModelHost",a)},_.y("button",{el:r,class:b,"on:click":function(t){c().handleOnTapEventInParent||e()||(p()?t.stopPropagation():k?k(t):(_.s8b(c(),l(),t),m(!l()),t.stopPropagation()))},
"on:keydown":function(t){t.key==="Enter"&&(t.preventDefault(),r.value.click(),t.stopPropagation())},
"aria-label":function(){return l()?c().a11yLabelSwitchedOn:c().a11yLabelSwitchedOff},
"aria-checked":l,"aria-disabled":p,role:"switch"},_.y(lxm,{active:l,disabled:p})))},"YN");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
