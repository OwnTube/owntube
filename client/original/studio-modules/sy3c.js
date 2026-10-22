"use strict";_F_installCss(".ytResponseActionsViewModelHost{align-items:center;display:flex;font-family:Roboto,Arial,sans-serif;font-size:1.6rem;font-weight:400;line-height:2.2rem}.ytResponseActionsViewModelText{display:block}.ytResponseActionsViewModelTextLeft{margin-right:16px}.ytResponseActionsViewModelTextRight{margin-left:16px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Rjc=_.Ui(function(a){var b=a.data;a=a.className;var c=_.y(LZg,{data:b}),e=_.y(_.mo,{data:function(){return b().actionsBar}},{flexibleActionsViewModel:_.Bhf});
return _.y("yt-response-actions-view-model",{class:_.Wn("ytResponseActionsViewModelHost",a)},_.y(_.Rd,null,_.y(_.Ad,{when:function(){return b().textAlignment==="RESPONSE_ACTIONS_TEXT_ALIGNMENT_LEFT"}},function(){return _.y(_.Id,null,c,e)}),_.y(_.Ad,{when:function(){return b().textAlignment!=="RESPONSE_ACTIONS_TEXT_ALIGNMENT_LEFT"}},function(){return _.y(_.Id,null,e,c)})))},"Gi");
var MZg=_.Ui(function(a){var b=a.data;return _.y("div",{class:_.Wn("ytResponseActionsViewModelText",function(){a:switch(b().textAlignment){case "RESPONSE_ACTIONS_TEXT_ALIGNMENT_LEFT":var c="ytResponseActionsViewModelTextLeft";break a;default:c="ytResponseActionsViewModelTextRight"}return c})},_.y(_.B,{cond:function(){return b().text},
then:function(c){return _.y(_.MA,{text:c})}}),_.y(_.mo,{data:function(){return b().disclaimerItem}},{disclaimerItemViewModel:_.KZg}))},"Hi"),LZg=_.Ui(function(a){var b=a.data;
return _.y(_.B,{cond:function(){return b().text||b().disclaimerItem},
then:function(){return _.y(MZg,{data:b})}})},"Ii");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
