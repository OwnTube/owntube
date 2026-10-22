"use strict";_F_installCss(".nudgeFormViewModelHost{display:flex;flex-direction:column;align-items:center}@media (max-width:300px){.nudgeFormViewModelHost{margin-left:-16px;margin-right:-16px}}.nudgeFormViewModelSubtitle{font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem;color:var(--tffc2fd3a644f6275);display:table-cell;text-align:center;margin-top:12px;margin-bottom:6px}.nudgeFormViewModelFormOptions{display:flex;flex-direction:row;justify-content:space-between;max-width:330px;flex-wrap:wrap;align-items:stretch}.nudgeFormViewModelSubmit{margin-top:6px;width:100%}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("JAontb");
var xDh;_.wDh=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("Vzo0Sd"),2);a=_.Hjc;return b.return(a)})};
xDh=_.jo(function(){return _.wDh()},"toggleableImageButtonViewModel");
_.re(_.NA,function(a){a.registerLoadFn("toggleableImageButtonViewModel","Vzo0Sd",_.wDh)});var yDh;_.zDh=_.Ui(function(a){var b=a.data;a=_.f(_.zd({index:-1,command:{}},void 0,"EH24Vb",function(){}));
var c=a.next().value,e=a.next().value;return _.y("yt-nudge-form-view-model",{class:"nudgeFormViewModelHost"},_.y("div",{class:"nudgeFormViewModelFormOptions"},_.y(_.mo,{data:function(){return b().inputFields},
allowIncompleteMapping:!0},{toggleableImageButtonViewModel:function(g,k){return _.y(xDh,{data:g.data,buttonIndex:k,selectedIndex:function(){return c().index},
onSelect:function(l){e({index:k(),command:l})}})}})),_.y(_.MA,{text:function(){return b().subtitle},
className:"nudgeFormViewModelSubtitle"}),_.y("div",{class:"nudgeFormViewModelSubmit"},_.y(_.mo,{data:function(){return b().submitButton}},{buttonViewModel:function(g){return _.y(yDh,{data:g.data,
isDisabled:function(){return c().index===-1},
onClick:function(){_.bo(c().command)}})}})))},"aj");
yDh=_.Ui(function(a){var b=_.Ld(function(){return Object.assign({},a.data(),{state:a.isDisabled()?"BUTTON_VIEW_MODEL_STATE_DISABLED":"BUTTON_VIEW_MODEL_STATE_ACTIVE"})},void 0,"oCYj5");
return _.y(_.PD,{data:b,onClick:a.onClick})},"bj");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
