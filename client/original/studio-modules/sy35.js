"use strict";_F_installCss(".ytwAdButtonViewModelHost{display:block;height:max-content}.ytwAdButtonViewModelHostHasAnimation{transition:height;transition-duration:.3s}.ytwAdButtonViewModelHostHasAnimation>.ytSpecButtonShapeNextHost{transition:opacity .3s}.ytwAdButtonViewModelHostCompactWidth{flex-basis:0;width:max-content;min-width:25%}.ytwAdButtonViewModelHostContentWidth{width:max-content}.ytwAdButtonViewModelShow>.ytSpecButtonShapeNextHost{opacity:1}.ytwAdButtonViewModelHide>.ytSpecButtonShapeNextHost{opacity:0}.ytwAdButtonViewModelFullHeight{height:auto}.ytwAdButtonViewModelNoHeight{height:0}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var kWg,jWg,iWg,gWg,hWg;kWg=function(a,b){var c,e=(c=a.interaction)==null?void 0:c.onTap,g,k;c=a.label;var l=(g=a.interaction)==null?void 0:(k=g.accessibility)==null?void 0:k.label;g=a.iconImage?a.label&&a.label.content?a.iconLeading?"leading":"trailing":"icon-only":void 0;return{formattedButtonText:c,accessibilityLabel:l,style:gWg(a.style),type:hWg(a.style),state:"active",size:iWg(a.size),iconPosition:g,disabled:!1,aTagConfig:jWg(e,b),onTap:function(m){e&&_.lVg(m,e,b)}}};
jWg=function(a,b){var c=_.onb({elementsCommand:a,forceNewState:!0,skipOnClick:!0});if(c)return c.onclick=function(e){_.nnb(e)&&(e.preventDefault(),a&&_.lVg(e,a,b))},_.qnb(c)?c:void 0};
iWg=function(a){switch(a){case "AD_BUTTON_SIZE_COMPACT":return"S";case "AD_BUTTON_SIZE_DEFAULT":return"M";case "AD_BUTTON_SIZE_LARGE":return"L";default:return"M"}};
gWg=function(a){switch(a){case "AD_BUTTON_STYLE_OVERLAY":case "AD_BUTTON_STYLE_OVERLAY_TONAL":case "AD_BUTTON_STYLE_OVERLAY_TEXT":return"overlay";case "AD_BUTTON_STYLE_TRANSPARENT":case "AD_BUTTON_STYLE_MONO_FILLED":case "AD_BUTTON_STYLE_MONO_TONAL":case "AD_BUTTON_STYLE_MONO_OUTLINE":return"mono";case "AD_BUTTON_STYLE_OVERLAY_FILLED":return"call-to-action-overlay";default:return"call-to-action"}};
hWg=function(a){switch(a){case "AD_BUTTON_STYLE_OUTLINE":case "AD_BUTTON_STYLE_MONO_OUTLINE":return"outline";case "AD_BUTTON_STYLE_TONAL":case "AD_BUTTON_STYLE_OVERLAY_TONAL":case "AD_BUTTON_STYLE_MONO_TONAL":return"tonal";case "AD_BUTTON_STYLE_OVERLAY_TEXT":case "AD_BUTTON_STYLE_TRANSPARENT":return"text";default:return"filled"}};_.nWg=_.Ui(function(a){var b=a.data;var c=a.customCommandResolver;var e=a.className;var g=a.delayedClassName;var k=a.isCompactWidth;var l=a.isContentWidth;a=_.f(_.zd(!1,void 0,"Oh9Nof",function(){}));
var m=a.next().value,p=a.next().value,r=function(){var ba;return!((ba=b().onImpressionBehaviors)==null||!ba.length)},t=function(){var ba;
return(ba=b().adButtonAnimationStateEntityKey)!=null?ba:""},v=_.er(_.lmb,t),w=function(){var ba,Z;
return(Z=(ba=v())==null?void 0:ba.value)!=null?Z:!1},x=[],z=function(){_.Si(_.Er("booleanEntity",t(),{key:t(),
value:!0}))};
a=_.f(_.Ti(function(){return w()||b().visibility!=="VISIBILITY_GONE"}));
var A=a.next().value,C=a.next().value;a=_.f(_.Ti(function(){return w()||b().visibility==="VISIBILITY_VISIBLE"}));
var E=a.next().value,F=a.next().value;a=_.f(_.Ti(function(){return w()?b().destinationStyle:void 0}));
var H=a.next().value,I=a.next().value,K=function(){var ba=kWg(Object.assign({},b(),H()&&{style:H()}),c);ba.focused=m();return ba};
a=_.wf({visibilityCallback:function(ba){var Z,Y=(Z=b().interaction)==null?void 0:Z.onFirstVisible;ba&&Y&&_.bo(Y)},
showOption:_.pL});var M=_.cpb(),O=function(){return _.Hpb(K(),!!b().iconImage,M)},S={},W={};
e=_.Wn(function(){return"ytwAdButtonViewModelHost"},function(){return r()?"ytwAdButtonViewModelHostHasAnimation":""},function(){var ba=r(),Z=A();
return ba?Z?"ytwAdButtonViewModelFullHeight":"ytwAdButtonViewModelNoHeight":""},function(){var ba=r(),Z=E();
return ba?Z?"ytwAdButtonViewModelShow":"ytwAdButtonViewModelHide":""},function(){return!r()||A()?g==null?void 0:g():""},(S.ytwAdButtonViewModelHostCompactWidth=function(){return(k==null?void 0:k())&&!b().isFullWidth},S),(W.ytwAdButtonViewModelHostContentWidth=function(){return l==null?void 0:l()},W),e!=null?e:"");
var aa=function(ba){ba&&ba.forEach(function(Z){var Y,R=(Y=Z.triggerCondition)==null?void 0:Y.delayedSeconds;R&&(Y=_.KWc(_.$e,function(){if(Z.visibilityBehavior)switch(Z.visibilityBehavior.newVisibility){case "VISIBILITY_INVISIBLE":C(!0);F(!1);break;case "VISIBILITY_VISIBLE":C(!0);F(!0);b().destinationStyle||z();break;case "VISIBILITY_GONE":C(!1),F(!1)}else Z.adButtonAnimationBehavior&&b().destinationStyle&&(I(b().destinationStyle),z())},R*1E3),x.push(Y))})};
_.Wd(function(){w()||aa(b().onImpressionBehaviors)});
_.yd(function(){x.forEach(function(ba){_.$e.cancelJob(ba)});
x.length=0});
return _.y("ad-button-view-model",{"on:focusin":function(ba){var Z=_.qe().resolve(_.oe(_.QA));Z&&p(Z.keyboardInUse);ba.stopPropagation()},
"on:focusout":function(ba){p(!1);ba.stopPropagation()},
class:e,el:_.Zn(a),style:_.ho({"transition-duration":"0.3s"})},_.y(_.B,{cond:K,then:function(){return _.y(_.RA,{data:K,icon:function(){return _.y(_.B,{cond:function(){return b().iconImage},
then:function(ba){return _.y(_.io,{data:ba,alt:"",targetWidth:O,targetHeight:O,preserveWidth:!0,preserveHeight:!0})}})}})}}))},"bi");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
