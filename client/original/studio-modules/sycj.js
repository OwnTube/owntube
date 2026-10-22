"use strict";_F_installCss(".ytInlineExpanderViewModelHost{display:block;cursor:pointer}.ytInlineExpanderViewModelHeader{display:flex;justify-content:space-between;align-items:center}.ytInlineExpanderViewModelButton{transition:transform .25s cubic-bezier(.05,0,0,1);display:flex}.ytInlineExpanderViewModelButtonExpanded{transform:rotate(180deg)}.ytInlineExpanderViewModelButtonControlled{pointer-events:none}.ytInlineExpanderViewModelBody{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.05,0,0,1)}.ytInlineExpanderViewModelBodyExpanded{grid-template-rows:1fr}.ytInlineExpanderViewModelBodyContent{overflow:hidden}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Nvm;_.Mvm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("nBvByd"),2);a=_.Vic;return b.return(a)})};
Nvm=_.ho(function(){return _.Mvm()},"youthBasicSectionHeaderViewModel");
_.oe(_.MA,function(a){a.registerLoadFn("youthBasicSectionHeaderViewModel","nBvByd",_.Mvm)});var Pvm;_.Ovm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("eDUDoc"),2);a=_.Uic;return b.return(a)})};
Pvm=_.ho(function(){return _.Ovm()},"youthSectionBodyViewModel");
_.oe(_.MA,function(a){a.registerLoadFn("youthSectionBodyViewModel","eDUDoc",_.Ovm)});_.clc=_.Ri(function(a){var b=_.f(_.xd(!1,void 0,"psMzxf",function(){})),c=b.next().value,e=b.next().value,g=function(){return a.data().inlineExpansionEntityKey},k=_.br(_.$lb,g),l=function(){var r;
return((r=a.isSelected)==null?void 0:r.call(a))!==void 0},m=function(){if(l())return a.isSelected();
if(g()){var r;return(r=k())==null?void 0:r.expanded}return c()};
b={};var p={};return _.y("yt-inline-expander-view-model",{class:"ytInlineExpanderViewModelHost","on:click":function(r){if(!_.D("web_inline_expander_child_tap_kill_switch")){var t=_.Y_b(r);if(t.some(function(v){var w;return(w=v.classList)==null?void 0:w.contains("ytInlineExpanderViewModelBody")})&&_.$_b(t,r.currentTarget,["BUTTON".toString(),
"A".toString()]))return}l()||g()||e(!c())}},_.y("div",{class:"ytInlineExpanderViewModelHeader"},_.y(_.ko,{data:function(){return a.data().headerContent}},{youthBasicSectionHeaderViewModel:Nvm,
basicContentViewModel:function(r){return _.y(_.Egf,{data:r.data,isParagraphBold:m})}}),_.y("div",{class:_.Un("ytInlineExpanderViewModelButton",(b.ytInlineExpanderViewModelButtonExpanded=m,b.ytInlineExpanderViewModelButtonControlled=l,b))},_.y(_.QA,{data:function(){return{style:"mono",
type:"text",state:"active",size:"M",iconPosition:"icon-only",toggleable:!0,toggled:m(),accessibilityLabel:m()?_.kh("SHOW_LESS",void 0,"Show Less"):_.kh("SHOW_MORE",void 0,"Show More"),tabIndex:l()?-1:0}},
iconName:"chevron_down"}))),_.y("div",{class:_.Un("ytInlineExpanderViewModelBody",(p.ytInlineExpanderViewModelBodyExpanded=m,p)),"aria-hidden":function(){return!m()}},_.y("div",{class:"ytInlineExpanderViewModelBodyContent"},_.y(_.ko,{data:function(){return a.data().bodyContent}},{youthSectionBodyViewModel:Pvm,
linearLayoutViewModel:_.blc}))))},"KN");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
