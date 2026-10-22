"use strict";_F_installCss(".miniAppScoreButtonViewModelHost{display:none}.miniAppScoreButtonViewModelIsVisible{display:block;align-items:center;pointer-events:all}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var usm=function(a,b,c){c=c===void 0?function(){}:c;
return a?b():c()},wsm=function(a,b,c){c=c===void 0?vsm:c;
a&&_.cob(function(){var e=c;e=e===void 0?vsm:e;if(a){var g=_.qe().resolve(_.iAa);g?_.Anb(a,{data:b,observer:g,visibilityCallback:e,hideOption:_.Tnb,showOption:_.Unb,layer:a.layer}):_.rf(new _.ye("Warning: monitorVisibility called with null observer",a.tagName,b==null?void 0:b.loggingDirectives,b==null?void 0:b.trackingParams))}else _.rf(new _.ye("Warning: monitorVisibility called with null element",b==null?void 0:b.loggingDirectives,b==null?void 0:b.trackingParams,b==null?void 0:b.rendererContext))})};var xsm=new _.Mv("miniAppScoreChallengeViewModel");Object.freeze&&Object.freeze(Object.create(null));var vsm=function(){},ysm;
(ysm=window.requestIdleCallback)==null||ysm.bind(window);_.zsm=_.Ui(function(a){var b=a.data;var c=a.score;var e=a.formattedScore;var g=a.onScoreChanged;var k=a.isEmbeddedInWebview;var l=_.Td("yt-mini-app-score-button-view-model"),m=function(){var A;return _.bf(b==null?void 0:(A=b())==null?void 0:A.buttonViewModel,_.Th)},p=function(){var A;
return(c==null?void 0:c())||Number(b==null?void 0:(A=b())==null?void 0:A.lastScore)||0},r=function(){var A;
return(e==null?void 0:e())||((A=m())==null?void 0:A.title)||""},t={ytSysMeasurementReference:"YT_SYS_MEASUREMENT_REFERENCE_ACTION_HEIGHT_STANDARD"},v=_.ko(function(){return t}),w,x=1;
if(a=(new URLSearchParams(window.location.search)).get("deviceTextZoomSetting"))a=Number(a),x=isNaN(a)?1:a/100;_.Md(function(){g==null||g(p());var A;var C=_.Sh((A=m())==null?void 0:A.onTap);if(C){A=_.bf(C,_.Iue);var E,F,H;A=_.bf(A==null?void 0:(E=A.panelLoadingStrategy)==null?void 0:(F=E.inlineContent)==null?void 0:(H=F.dialogViewModel)==null?void 0:H.customContent,xsm)}else A=void 0;if(E=A)E.score=r()},"MUrPrf","DK");
_.Wd(function(){if(l.value){var A=l.value.querySelector("button"),C=m();A&&C&&wsm(A,C);_.vf("yt-share-playable-with-high-score",function(){var E=p().toString(),F=b==null?void 0:b().onShareHighScoreCommand,H=b==null?void 0:b().highScoreShareClientParamIdentifier,I=k==null?void 0:k();F&&(I?(E=(new _.TMg).setHighScore(E),_.RMg(F,E.serializeBinary())):H&&(_.qe().resolve(_.wzf).addClientParams(H,{miniAppClientParams:{highScore:E}}),_.PMg(F,!1)))})}});
var z=function(){var A=m();A&&(c==null?0:c())&&A.accessibilityText&&(A.accessibilityText=A.accessibilityText.replace(w,r()));w=r();A=p();var C=r(),E;var F=(E=_.Wob(v()))!=null?E:36;return{numberValue:A,numberText:C,heightPx:F,fontSizeMultiplier:x,shouldAnimate:!(c==null||!c())&&!0}};
a={};return _.y("yt-mini-app-score-button-view-model",{class:_.Wn("miniAppScoreButtonViewModelHost",(a.miniAppScoreButtonViewModelIsVisible=function(){return p()!==0},a)),
el:l,"on:click":function(A){var C,E,F=b==null?void 0:(C=b())==null?void 0:(E=C.loggingDirectives)==null?void 0:E.trackingParams;F&&_.gxe(_.qe().resolve(_.azf),F);A.stopPropagation()}},usm(!1,function(){return _.y("span",{style:"display:none;"},p)}),_.y(_.mo,{data:function(){var A;
return b==null?void 0:(A=b())==null?void 0:A.buttonViewModel}},{buttonViewModel:function(A){return _.y(_.OD,{data:A.data,
animatedTextProps:z})}}))},"EK");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
