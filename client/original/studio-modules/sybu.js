"use strict";_F_installCss(".ytMiniAppTopBarViewModelHost{background-color:#000;padding:8px 0;width:100%;position:relative;display:flex;flex-direction:row;align-items:center;justify-content:space-between}.ytMiniAppTopBarViewModelMobile{box-sizing:border-box;padding:6px 4px 6px 6px;height:48px;align-items:center;justify-content:space-between}.ytMiniAppTopBarViewModelCenterButtons{display:flex;align-items:center;justify-content:center}.ytMiniAppTopBarViewModelTitle{font-family:Roboto,Arial,sans-serif;font-size:2.4rem;font-variation-settings:\"wdth\" 100;font-weight:700;line-height:3.2rem;overflow:hidden;display:block;max-height:6.4rem;display:box;display:-webkit-box;-webkit-box-orient:vertical;text-overflow:ellipsis;white-space:normal}@supports (-webkit-line-clamp:1){.ytMiniAppTopBarViewModelTitle{-webkit-line-clamp:2;max-height:none}}@container (max-width: _max($medium_breakpoint)){.ytMiniAppTopBarViewModelTitle{font-family:Roboto,Arial,sans-serif;font-size:2rem;font-variation-settings:\"wdth\" 100;font-weight:700;line-height:2.8rem;overflow:hidden;display:block;max-height:5.6rem;display:box;display:-webkit-box;-webkit-box-orient:vertical;text-overflow:ellipsis;white-space:normal}@supports (-webkit-line-clamp:1){.ytMiniAppTopBarViewModelTitle{-webkit-line-clamp:2;max-height:none}}}@media (max-width:599.9px){.ytMiniAppTopBarViewModelTitle{font-family:Roboto,Arial,sans-serif;font-size:2rem;font-variation-settings:\"wdth\" 100;font-weight:700;line-height:2.8rem;overflow:hidden;display:block;max-height:5.6rem;display:box;display:-webkit-box;-webkit-box-orient:vertical;text-overflow:ellipsis;white-space:normal}@supports (-webkit-line-clamp:1){.ytMiniAppTopBarViewModelTitle{-webkit-line-clamp:2;max-height:none}}}.ytMiniAppTopBarViewModelTitle{color:var(--tffc2fd3a644f6275);user-select:text;-webkit-user-select:text;-ms-user-select:text;-moz-user-select:text;-o-user-select:text}.ytMiniAppTopBarViewModelPlayPageButtonViewModel{align-items:center;display:block}.ytMiniAppTopBarViewModelStartButtons{display:flex;width:40%}.ytMiniAppTopBarViewModelEndButtons{display:flex;width:40%;justify-content:end}.ytMiniAppTopBarViewModelDesktop{background-color:transparent;padding:12px 0;gap:12px;align-items:flex-start;justify-content:space-between}.ytMiniAppTopBarViewModelDesktop .ytMiniAppTopBarViewModelCenterButtons,.ytMiniAppTopBarViewModelDesktop .ytMiniAppTopBarViewModelEndButtons{gap:12px}.ytMiniAppTopBarViewModelTheatreModeButton{display:none}@media ((min-width:1001px)){.ytMiniAppTopBarViewModelTheatreModeButton{display:flex}}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.bMg=_.Ri(function(a){var b,c=(b=_.XLg("yt-mini-app-is-theater-mode-enabled"))!=null?b:!1,e=_.D("enable_playable_container_save_button"),g=_.D("enable_play_next_destination_page_in_toolbar");b={};return _.y("ytm-mini-app-top-bar-view-model",null,_.y("div",{class:_.Un("ytMiniAppTopBarViewModelHost",(b.ytMiniAppTopBarViewModelMobile=!1,b.ytMiniAppTopBarViewModelDesktop=!0,b))},_.y("div",{class:"ytMiniAppTopBarViewModelStartButtons"},_.y(_.B,{cond:function(){var k;return!!a.data().backButtonEdu&&!((k=
a.isExitMiniAppSeen)==null?0:k.call(a))},
then:function(){return _.y(_.ko,{data:function(){return a.data().backButtonEdu}},{buttonViewModel:_.OD})},
else:function(){return _.y(_.ko,{data:function(){return a.data().backButton}},{buttonViewModel:_.OD})}}),_.y(_.B,{cond:function(){return a.data().viewAllButton&&!0},
then:function(){return _.y(_.ko,{data:function(){return a.data().viewAllButton}},{buttonViewModel:_.OD})}}),_.y(_.B,{cond:function(){return a.data().title&&!0},
then:function(){return _.y("div",{class:"ytMiniAppTopBarViewModelTitle"},function(){return a.data().title})}})),_.y("div",{class:"ytMiniAppTopBarViewModelCenterButtons"},_.y(_.B,{cond:function(){var k;
return(k=a.isDesktopPlayPage)==null?void 0:k.call(a)},
then:function(){return _.y(_.Ed,null,_.y(Pum,{highScoreButton:function(){return a.data().highScoreButton},
score:a.score,formattedScore:a.formattedScore,onScoreChanged:a.onScoreChanged,isEmbeddedInWebview:a.isEmbeddedInWebview}),_.y(Qum,{enableSaveButton:function(){return _.Kd(e)},
saveButton:function(){return a.data().saveButton},
isSaved:a.isSaved,onSaveToggled:function(){return a.onSaveToggled}}),_.y(Rum,{menuButton:function(){return a.data().menuButton}}))},
else:function(){return _.y(_.B,{cond:function(){return!1},
then:function(){return _.y(_.ko,{data:function(){return a.data().playPageButton}},{buttonViewModel:function(k){return _.y(_.OD,{data:k.data,
className:"ytMiniAppTopBarViewModelPlayPageButtonViewModel"})}})},
else:function(){return _.y(Pum,{highScoreButton:function(){return a.data().highScoreButton},
score:a.score,formattedScore:a.formattedScore,onScoreChanged:a.onScoreChanged,isEmbeddedInWebview:a.isEmbeddedInWebview})}})}})),_.y("div",{class:"ytMiniAppTopBarViewModelEndButtons"},_.y(_.ko,{data:function(){return a.data().muteButton}},{toggleButtonViewModel:function(k){var l=k.data;
return _.y(_.HE,{data:function(){var m,p;return Object.assign({},l(),{isToggled:(p=(m=a.isAudioEnabled)==null?void 0:m.call(a))!=null?p:!0})},
buttonShapeOverrides:function(){var m,p;return{disabled:(p=(m=a.isAudioButtonDisabled)==null?void 0:m.call(a))!=null?p:!1}},
onToggle:a.onAudioToggled,useOutlinedIcon:!0})}}),_.y(_.ko,{data:function(){return a.data().theatreModeButton}},{toggleButtonViewModel:function(k){var l=k.data;
return _.y("div",{class:"ytMiniAppTopBarViewModelTheatreModeButton"},_.y(_.HE,{data:function(){return Object.assign({},l(),{isToggled:c})},
useOutlinedIcon:!0}))}}),_.y(Sum,{fullscreenButton:function(){return a.data().fullscreenButton}}),_.y(_.B,{cond:function(){return _.Kd(g)&&a.data().viewAllButton&&!1},
then:function(){return _.y(_.ko,{data:function(){return a.data().viewAllButton}},{buttonViewModel:_.OD})}}),_.y(_.B,{cond:function(){var k;
return!((k=a.isDesktopPlayPage)==null?0:k.call(a))},
then:function(){return _.y(_.Ed,null,_.y(Qum,{enableSaveButton:function(){return _.Kd(e)},
saveButton:function(){return a.data().saveButton},
isSaved:a.isSaved,onSaveToggled:function(){return a.onSaveToggled}}),_.y(Rum,{menuButton:function(){return a.data().menuButton}}))}}))))},"TM");
var Rum=_.Ri(function(a){return _.y(_.ko,{data:a.menuButton},{buttonViewModel:_.OD})},"UM"),Qum=_.Ri(function(a){var b=a.enableSaveButton;
var c=a.saveButton;var e=a.isSaved;var g=a.onSaveToggled;return _.y(_.B,{cond:function(){return b()&&!(c==null||!c())},
then:function(){return _.y(_.ko,{data:function(){var k=_.Qe(c==null?void 0:c(),_.Cr),l;return{toggleButtonViewModel:Object.assign({},k,{isToggled:(l=e==null?void 0:e())!=null?l:!(k==null||!k.isToggled)})}}},{toggleButtonViewModel:function(k){return _.y(_.HE,{data:k.data,
onToggle:g})}})}})},"VM"),Pum=_.Ri(function(a){var b=a.highScoreButton;
var c=a.score;var e=a.formattedScore;var g=a.onScoreChanged;var k=a.isEmbeddedInWebview;return _.y(_.ko,{data:b},{miniAppScoreButtonViewModel:function(l){return _.y(_.xrm,{data:l.data,score:c,formattedScore:e,onScoreChanged:g,isEmbeddedInWebview:k})}})},"WM"),Sum=_.Ri(function(a){a=a.fullscreenButton;
return navigator.userAgent.includes("CriOS")?_.y(_.Ed,null):_.y(_.ko,{data:a},{buttonViewModel:_.OD})},"XM");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
