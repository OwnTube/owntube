"use strict";_F_installCss(".ytInlineExpanderViewModelHost{display:block;cursor:pointer}.ytInlineExpanderViewModelHeader{display:flex;justify-content:space-between;align-items:center}.ytInlineExpanderViewModelButton{transition:transform .25s cubic-bezier(.05,0,0,1);display:flex}.ytInlineExpanderViewModelButtonExpanded{transform:rotate(180deg)}.ytInlineExpanderViewModelButtonControlled{pointer-events:none}.ytInlineExpanderViewModelBody{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.05,0,0,1)}.ytInlineExpanderViewModelBodyExpanded{grid-template-rows:1fr}.ytInlineExpanderViewModelBodyContent{overflow:hidden}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Pwm;_.Owm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("nBvByd"),2);a=_.hjc;return b.return(a)})};
Pwm=_.jo(function(){return _.Owm()},"youthBasicSectionHeaderViewModel");
_.re(_.NA,function(a){a.registerLoadFn("youthBasicSectionHeaderViewModel","nBvByd",_.Owm)});var Rwm;_.Qwm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("eDUDoc"),2);a=_.gjc;return b.return(a)})};
Rwm=_.jo(function(){return _.Qwm()},"youthSectionBodyViewModel");
_.re(_.NA,function(a){a.registerLoadFn("youthSectionBodyViewModel","eDUDoc",_.Qwm)});_.plc=_.Ui(function(a){var b=_.f(_.zd(!1,void 0,"psMzxf",function(){})),c=b.next().value,e=b.next().value,g=function(){return a.data().inlineExpansionEntityKey},k=_.er(_.jmb,g),l=function(){var r;
return((r=a.isSelected)==null?void 0:r.call(a))!==void 0},m=function(){if(l())return a.isSelected();
if(g()){var r;return(r=k())==null?void 0:r.expanded}return c()};
b={};var p={};return _.y("yt-inline-expander-view-model",{class:"ytInlineExpanderViewModelHost","on:click":function(r){if(!_.D("web_inline_expander_child_tap_kill_switch")){var t=_.g0b(r);if(t.some(function(v){var w;return(w=v.classList)==null?void 0:w.contains("ytInlineExpanderViewModelBody")})&&_.i0b(t,r.currentTarget,["BUTTON".toString(),
"A".toString()]))return}l()||g()||e(!c())}},_.y("div",{class:"ytInlineExpanderViewModelHeader"},_.y(_.mo,{data:function(){return a.data().headerContent}},{youthBasicSectionHeaderViewModel:Pwm,
basicContentViewModel:function(r){return _.y(_.jhf,{data:r.data,isParagraphBold:m})}}),_.y("div",{class:_.Wn("ytInlineExpanderViewModelButton",(b.ytInlineExpanderViewModelButtonExpanded=m,b.ytInlineExpanderViewModelButtonControlled=l,b))},_.y(_.RA,{data:function(){return{style:"mono",
type:"text",state:"active",size:"M",iconPosition:"icon-only",toggleable:!0,toggled:m(),accessibilityLabel:m()?_.lh("SHOW_LESS",void 0,"Show Less"):_.lh("SHOW_MORE",void 0,"Show More"),tabIndex:l()?-1:0}},
iconName:"chevron_down"}))),_.y("div",{class:_.Wn("ytInlineExpanderViewModelBody",(p.ytInlineExpanderViewModelBodyExpanded=m,p)),"aria-hidden":function(){return!m()}},_.y("div",{class:"ytInlineExpanderViewModelBodyContent"},_.y(_.mo,{data:function(){return a.data().bodyContent}},{youthSectionBodyViewModel:Rwm,
linearLayoutViewModel:_.olc}))))},"ON");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
