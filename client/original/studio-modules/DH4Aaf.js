"use strict";_F_installCss(".ytSportsMatchRefinementViewModelHost{display:block}.ytSportsMatchRefinementViewModelHostOverlay .ytSportsMatchRefinementViewModelMatchContainer{background-color:rgba(255,255,255,0.1);color:#fff}.ytSportsMatchRefinementViewModelHostOverlay .ytSportsMatchRefinementViewModelColumnSegment{color:rgba(255,255,255,0.7)}.ytSportsMatchRefinementViewModelMatchContainer{position:relative;overflow:hidden;display:flex;flex-direction:row;padding:14px 24px;background-color:var(--t7f4f2c6d54836ce0);border-radius:12px;color:var(--tffc2fd3a644f6275);height:100px;box-sizing:border-box}.ytSportsMatchRefinementViewModelMatchContainer>:not(:last-child){margin-right:16px}@media (forced-colors:active){.ytSportsMatchRefinementViewModelMatchContainer{outline:1px solid;outline-offset:-1px}}.ytSportsMatchRefinementViewModelTeamListContainer{display:flex;flex-direction:column;justify-content:space-between}.ytSportsMatchRefinementViewModelTeamListContainer>:not(:last-child){margin-bottom:10px}.ytSportsMatchRefinementViewModelTeamContainer{display:flex;flex-direction:row;flex:1;align-items:center}.ytSportsMatchRefinementViewModelTeamContainer>:not(:last-child){margin-right:10px}.ytSportsMatchRefinementViewModelTeamContainer{font-family:Roboto,Arial,sans-serif;font-size:1.8rem;font-weight:400;line-height:2.6rem}.ytSportsMatchRefinementViewModelTeamLogo{width:28px;height:28px;flex-shrink:0;margin-right:8px}.ytSportsMatchRefinementViewModelDetailsContainer{display:flex;flex-direction:row;flex:1;padding:4px 0}.ytSportsMatchRefinementViewModelDetailsContainer>:not(:last-child){margin-right:16px}.ytSportsMatchRefinementViewModelColumnSegment{display:flex;flex-direction:column;flex-grow:1;justify-content:space-between;align-items:center;color:var(--t4a6da19e16bf221a);text-align:center}.ytSportsMatchRefinementViewModelColumnSegment>:not(:last-child){margin-bottom:10px}.ytSportsMatchRefinementViewModelColumnSegment{font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}.ytSportsMatchRefinementViewModelScoreText{text-align:center}.ytSportsMatchRefinementViewModelLiveIndicatorSegment{display:flex;justify-content:center;align-items:center}.ytSportsMatchRefinementViewModelBadgeWithLabel{display:inline-block;font-family:Roboto,Arial,sans-serif;font-size:1.2rem;font-weight:400;line-height:1.8rem}.ytSportsMatchRefinementViewModelClickable{cursor:pointer}.ytSportsMatchRefinementViewModelClickable:hover:after{content:\"\";position:absolute;inset:0;background-color:var(--t4fb0f67b251e1a42);opacity:.1;pointer-events:none}.ytSportsMatchRefinementViewModelClickable.ytSportsMatchRefinementViewModelOverlayHover:hover:after{background-color:#fff}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("DH4Aaf");
_.Tjc=_.Ui(function(a){var b=a.data,c=function(){var E;return(E=(b().sections||[]).find(function(F){return F.scoreInfo}))==null?void 0:E.scoreInfo},e=function(){return _.gr(b().rendererContext)},g=_.f(_.zd(!1,void 0,"F8Naad",function(){})),k=g.next().value,l=g.next().value;
g=_.f(_.zd(!1,void 0,"DlY4cf",function(){}));
var m=g.next().value,p=g.next().value,r=function(){return k()||m()};
g=_.k0b();var t=g.touchFeedbackEvents,v=g.touchFeedbackOnPointerUp,w=g.touchFeedbackOnPointerDown,x=g.touchFeedbackOnPointerLeave,z=_.EXb(function(){return b().rendererContext});
g=_.D0b();var A={},C={};return _.y("yt-sports-match-refinement-view-model",{class:_.Wn("ytSportsMatchRefinementViewModelHost",a.className,(A.ytSportsMatchRefinementViewModelHostOverlay=a.isOverlay,A))},_.y("div",{class:_.Wn("ytSportsMatchRefinementViewModelMatchContainer",(C.ytSportsMatchRefinementViewModelClickable=e,C.ytSportsMatchRefinementViewModelOverlayHover=a.isOverlay,C)),role:function(){return e()?"link":void 0},
tabindex:function(){return e()?0:void 0},
"on:keydown":g,"aria-label":function(){var E;return(E=z())==null?void 0:E.label},
"on:mousedown":function(E){e()&&w(E)},
"on:mouseup":function(E){e()&&v(E)},
"on:mouseleave":function(){l(!1)},
"on:mouseenter":function(){e()&&l(!0)},
"on:focusin":function(){e()&&p(!0)},
"on:focusout":function(){e()&&p(!1)},
"on:touchstart":function(E){e()&&w(E)},
"on:touchend":function(E){e()&&v(E)},
"on:pointerleave":function(E){e()&&x(E)},
el:_.Zn(_.hr(function(){return b().rendererContext},void 0,void 0,["A".toString(),
"BUTTON".toString()]))},_.y(_.B,{cond:function(){var E;return(E=(b().sections||[]).find(function(F){return F.matchTeamInfo}))==null?void 0:E.matchTeamInfo},
then:function(E){return _.y(xxm,{data:E})}}),_.y("div",{class:"ytSportsMatchRefinementViewModelDetailsContainer"},_.y(_.Qd,{each:function(){return(b().sections||[]).filter(function(E){return!E.matchTeamInfo})},
keyBy:function(E){return E.scoreInfo?"score":E.liveInfo?"live":E.timeInfo?"time":"unknown"}},function(E){return _.y(_.Rd,null,_.y(_.Ad,{when:function(){return!!E().scoreInfo}},function(){return _.y(yxm,{data:function(){return E().scoreInfo},
scoresAriaLabel:function(){var F,H;return(H=(F=c())==null?void 0:F.accessibilityText)!=null?H:""}})}),_.y(_.Ad,{when:function(){return!!E().liveInfo}},function(){return _.y(zxm,{data:function(){return E().liveInfo}})}),_.y(_.Ad,{when:function(){return!!E().timeInfo}},function(){return _.y(Axm,{data:function(){return E().timeInfo}})}))})),_.y(_.B,{cond:e,
then:function(){return _.y(_.$Oe,{model:function(){return{borderRadius:"inherit",color:1,triggerEvents:!0}},
hovered:r,pointerDownEvent:t.pointerDownEvent,pointerUpEvent:t.pointerUpEvent,pointerLeaveEvent:t.pointerLeaveEvent})}})))},"GO");
var xxm=_.Ui(function(a){var b=a.data;return _.y("div",{class:"ytSportsMatchRefinementViewModelTeamListContainer"},_.y("div",{class:"ytSportsMatchRefinementViewModelTeamContainer"},_.y(_.B,{cond:function(){var c;return(c=b().homeTeam)==null?void 0:c.image},
then:function(c){return _.y(_.io,{data:c,alt:"",className:"ytSportsMatchRefinementViewModelTeamLogo"})}}),function(){var c,e;
return(c=b().homeTeam)==null?void 0:(e=c.name)==null?void 0:e.content}),_.y("div",{class:"ytSportsMatchRefinementViewModelTeamContainer"},_.y(_.B,{cond:function(){var c;
return(c=b().awayTeam)==null?void 0:c.image},
then:function(c){return _.y(_.io,{data:c,alt:"",className:"ytSportsMatchRefinementViewModelTeamLogo"})}}),function(){var c,e;
return(c=b().awayTeam)==null?void 0:(e=c.name)==null?void 0:e.content}))},"HO"),yxm=_.Ui(function(a){var b=a.data;
return _.y("div",{class:"ytSportsMatchRefinementViewModelColumnSegment",role:"group","aria-label":a.scoresAriaLabel},_.y("div",{class:"ytSportsMatchRefinementViewModelScoreText","aria-hidden":"true"},_.y(_.B,{cond:function(){var c;return((c=b().homeTeamScoreText)==null?0:c.content)?b().homeTeamScoreText:void 0},
then:function(c){return _.y(_.MA,{text:c})},
else:function(){return _.y(_.Id,null,function(){return b().homeTeamScore})}})),_.y("div",{class:"ytSportsMatchRefinementViewModelScoreText",
"aria-hidden":"true"},_.y(_.B,{cond:function(){var c;return((c=b().awayTeamScoreText)==null?0:c.content)?b().awayTeamScoreText:void 0},
then:function(c){return _.y(_.MA,{text:c})},
else:function(){return _.y(_.Id,null,function(){return b().awayTeamScore})}})))},"IO"),zxm=_.Ui(function(a){var b=a.data;
return _.y("div",{class:"ytSportsMatchRefinementViewModelColumnSegment"},_.y("div",{class:"ytSportsMatchRefinementViewModelLiveIndicatorSegment"},_.y(_.mo,{data:function(){return b().liveBadge}},{badgeViewModel:function(c){return _.y(_.TD,{class:"ytSportsMatchRefinementViewModelBadgeWithLabel",
data:c.data})}})),_.y("div",{class:"ytSportsMatchRefinementViewModelLiveIndicatorSegment"},_.y(_.mo,{data:function(){return b().watchButton}},{buttonViewModel:_.PD})))},"JO"),Axm=_.Ui(function(a){var b=a.data;
return _.y("div",{class:"ytSportsMatchRefinementViewModelColumnSegment"},_.y(_.MA,{text:function(){return b().bracket}}),_.y(_.MA,{text:function(){return b().matchTime}}))},"KO");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
