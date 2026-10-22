"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("f90tCb");
var tCh=function(a,b,c){if(c&&c!=="TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_UNSPECIFIED")switch(c){case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_SFV_AUDIO_ITEM":if(!b)break;a=_.epf.selectSfvAudioItemPlaybackState(a,b);if(a==="SFV_AUDIO_ITEM_PLAYBACK_STATE_PLAYING")return{isToggled:!0};if(a)return{isToggled:!1};break;case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_COMMENTS_PANEL":return{isToggled:a.mainAppWatch.openEngagementPanels.includes("engagement-panel-comments-section")};case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_LIVE_CHAT_PANEL":return{isToggled:!a.mainAppWatch.isLiveChatCollapsed};
case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_BOOLEAN":if(!b)break;var e;return{isToggled:!((e=_.bmb(a,b))==null||!e.value)};case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_PLAYLIST_PANEL":return{isToggled:!a.mainAppWatch.isPlaylistPanelCollapsed};case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_DESCRIPTION_PANEL":return{isToggled:a.mainAppWatch.openEngagementPanels.includes("engagement-panel-structured-description")};case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_ASK_PANEL":return{isToggled:a.mainAppWatch.openEngagementPanels.includes("PAyouchat")};
case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_WATCH_NEXT_PANEL":return b=!a.mainAppWatch.hasPlaylist||a.mainAppWatch.isPlaylistPanelCollapsed,c=!(a!=null&&a.watch&&a.watch.hasLiveChat)||a.mainAppWatch.isLiveChatCollapsed,{isToggled:a.mainAppWatch.openEngagementPanels.length===0&&b&&c};case "TOGGLE_BUTTON_ENTITY_SELECTOR_TYPE_DELETE_MODE":var g;return{isToggled:!((g=a.ui.deleteModeState)==null||!g.isDeleteModeEnabled)};default:_.pf(new _.te("Error: entitySelectorType defined but not matched in selector.",
a,c))}};_.Akc=_.Ri(function(a){function b(W){return _.Qe(W,_.Rh)}
function c(){var W=k().isTogglingDisabled||E()&&k().toggledIsTogglingDisabled,aa=W||z()?E():!E();F(aa);I(!1);if(!W){var ca;(ca=p)==null||ca(!!aa)}var Y;(W=((Y=m)==null?void 0:Y())||k().disableExplicitClickLogging)||_.Dwe(_.ne().resolve(_.xyf),k().trackingParams);aa&&b(k().defaultButtonViewModel)&&!W?_.Dwe(_.ne().resolve(_.xyf),b(k().defaultButtonViewModel).trackingParams):b(k().toggledButtonViewModel)&&!W&&_.Dwe(_.ne().resolve(_.xyf),b(k().toggledButtonViewModel).trackingParams)}
var e=_.f(_.xd(void 0,void 0,"ELZGxb",function(){})),g=e.next().value;
e=e.next().value;var k=a.data,l=a.buttonShapeOverrides,m=a.disableExplicitClickLogging,p=a.onToggle,r=a.style,t=a.useOutlinedIcon,v=a.className,w=function(){var W,aa;return E()?(W=a.animatedTextPropsToggled)==null?void 0:W.call(a):(aa=a.animatedTextPropsDefault)==null?void 0:aa.call(a)},x=_.Hd(function(){return w()?Object.assign({},w(),{shouldAnimate:H()}):void 0},void 0,"BsXbSd"),z=function(){var W;
return((W=O())==null?void 0:W.isToggled)!==void 0},A=_.f(_.Qi(function(){var W,aa,ca;
return z()?(W=O())==null?void 0:W.isToggled:(ca=l==null?void 0:(aa=l())==null?void 0:aa.toggled)!=null?ca:k().isToggled})),C=A.next().value;
A=A.next().value;var E=C,F=A;A=_.f(_.Qi(function(){var W,aa;return(W=a.animatedTextPropsToggled)==null?void 0:(aa=W.call(a))==null?void 0:aa.shouldAnimate}));
C=A.next().value;A=A.next().value;var H=C,I=A;C=_.f(_.xd(!1,void 0,"Bfb86c",function(){}));
var K=C.next().value,M=C.next().value,O=_.Jq(function(W){return tCh(W,k().entityKey,k().toggledStateEntitySelectorType)}),R=function(){return Object.assign({},l==null?void 0:l(),{onToggle:c,
toggleable:!0,toggled:E(),focused:K(),useOutlinedIcon:t==null?void 0:t()})};
return _.y("toggle-button-view-model",{el:_.Xn(e),"on:focusin":function(){var W=_.ne().resolve(_.ke(_.PA));W&&M(W.keyboardInUse)},
"on:focusout":function(){M(!1)}},_.y(_.B,{cond:function(){return E()?b(k().toggledButtonViewModel):b(k().defaultButtonViewModel)},
then:function(W){return _.y(_.PD,{data:W,className:v,style:r,useOutlinedIcon:t,buttonOverrides:R,animatedTextProps:x,target:g})}}))},"Ti");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
