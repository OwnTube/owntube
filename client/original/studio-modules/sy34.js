"use strict";_F_installCss(".ytwAdButtonViewModelHost{display:block;height:max-content}.ytwAdButtonViewModelHostHasAnimation{transition:opacity,height;transition-duration:.3s}.ytwAdButtonViewModelHostCompactWidth{flex-basis:0;width:max-content;min-width:25%}.ytwAdButtonViewModelHostContentWidth{width:max-content}.ytwAdButtonViewModelShow{opacity:1}.ytwAdButtonViewModelHide{opacity:0}.ytwAdButtonViewModelFullHeight{height:auto}.ytwAdButtonViewModelNoHeight{height:0}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var uVg,tVg,sVg,qVg,rVg;uVg=function(a,b){var c,e=(c=a.interaction)==null?void 0:c.onTap,g,k;c=a.label;var l=(g=a.interaction)==null?void 0:(k=g.accessibility)==null?void 0:k.label;g=a.iconImage?a.label&&a.label.content?a.iconLeading?"leading":"trailing":"icon-only":void 0;return{formattedButtonText:c,accessibilityLabel:l,style:qVg(a.style),type:rVg(a.style),state:"active",size:sVg(a.size),iconPosition:g,disabled:!1,aTagConfig:tVg(e,b),onTap:function(m){e&&_.vUg(m,e,b)}}};
tVg=function(a,b){var c=_.enb({elementsCommand:a,forceNewState:!0,skipOnClick:!0});if(c)return c.onclick=function(e){_.dnb(e)&&(e.preventDefault(),a&&_.vUg(e,a,b))},_.gnb(c)?c:void 0};
sVg=function(a){switch(a){case "AD_BUTTON_SIZE_COMPACT":return"S";case "AD_BUTTON_SIZE_DEFAULT":return"M";case "AD_BUTTON_SIZE_LARGE":return"L";default:return"M"}};
qVg=function(a){switch(a){case "AD_BUTTON_STYLE_OVERLAY":case "AD_BUTTON_STYLE_OVERLAY_TONAL":case "AD_BUTTON_STYLE_OVERLAY_TEXT":return"overlay";case "AD_BUTTON_STYLE_TRANSPARENT":case "AD_BUTTON_STYLE_MONO_FILLED":case "AD_BUTTON_STYLE_MONO_TONAL":case "AD_BUTTON_STYLE_MONO_OUTLINE":return"mono";case "AD_BUTTON_STYLE_OVERLAY_FILLED":return"call-to-action-overlay";default:return"call-to-action"}};
rVg=function(a){switch(a){case "AD_BUTTON_STYLE_OUTLINE":case "AD_BUTTON_STYLE_MONO_OUTLINE":return"outline";case "AD_BUTTON_STYLE_TONAL":case "AD_BUTTON_STYLE_OVERLAY_TONAL":case "AD_BUTTON_STYLE_MONO_TONAL":return"tonal";case "AD_BUTTON_STYLE_OVERLAY_TEXT":case "AD_BUTTON_STYLE_TRANSPARENT":return"text";default:return"filled"}};_.xVg=_.Ri(function(a){var b=a.data;var c=a.customCommandResolver;var e=a.className;var g=a.delayedClassName;var k=a.isCompactWidth;var l=a.isContentWidth;a=_.f(_.xd(!1,void 0,"Oh9Nof",function(){}));
var m=a.next().value,p=a.next().value,r=function(){var ca;return!((ca=b().onImpressionBehaviors)==null||!ca.length)},t=function(){var ca;
return(ca=b().adButtonAnimationStateEntityKey)!=null?ca:""},v=_.br(_.bmb,t),w=function(){var ca,Y;
return(Y=(ca=v())==null?void 0:ca.value)!=null?Y:!1},x=[],z=function(){_.Pi(_.Dr("booleanEntity",t(),{key:t(),
value:!0}))};
a=_.f(_.Qi(function(){return w()||b().visibility!=="VISIBILITY_GONE"}));
var A=a.next().value,C=a.next().value;a=_.f(_.Qi(function(){return w()||b().visibility==="VISIBILITY_VISIBLE"}));
var E=a.next().value,F=a.next().value;a=_.f(_.Qi(function(){return w()?b().destinationStyle:void 0}));
var H=a.next().value,I=a.next().value,K=function(){var ca=uVg(Object.assign({},b(),H()&&{style:H()}),c);ca.focused=m();return ca};
a=_.uf({visibilityCallback:function(ca){var Y,Z=(Y=b().interaction)==null?void 0:Y.onFirstVisible;ca&&Z&&_.$n(Z)},
showOption:_.qL});var M=_.Sob(),O=function(){return _.wpb(K(),!!b().iconImage,M)},R={},W={};
e=_.Un(function(){return"ytwAdButtonViewModelHost"},function(){return r()?"ytwAdButtonViewModelHostHasAnimation":""},function(){var ca=r(),Y=A();
return ca?Y?"ytwAdButtonViewModelFullHeight":"ytwAdButtonViewModelNoHeight":""},function(){var ca=r(),Y=E();
return ca?Y?"ytwAdButtonViewModelShow":"ytwAdButtonViewModelHide":""},function(){return!r()||A()?g==null?void 0:g():""},(R.ytwAdButtonViewModelHostCompactWidth=function(){return(k==null?void 0:k())&&!b().isFullWidth},R),(W.ytwAdButtonViewModelHostContentWidth=function(){return l==null?void 0:l()},W),e!=null?e:"");
var aa=function(ca){ca&&ca.forEach(function(Y){var Z,S=(Z=Y.triggerCondition)==null?void 0:Z.delayedSeconds;S&&(Z=_.AWc(_.Me,function(){if(Y.visibilityBehavior)switch(Y.visibilityBehavior.newVisibility){case "VISIBILITY_INVISIBLE":C(!0);F(!1);break;case "VISIBILITY_VISIBLE":C(!0);F(!0);b().destinationStyle||z();break;case "VISIBILITY_GONE":C(!1),F(!1)}else Y.adButtonAnimationBehavior&&b().destinationStyle&&(I(b().destinationStyle),z())},S*1E3),x.push(Z))})};
_.Ud(function(){aa(b().onImpressionBehaviors)});
_.wd(function(){x.forEach(function(ca){_.Me.cancelJob(ca)});
x.length=0});
return _.y("ad-button-view-model",{"on:focusin":function(ca){var Y=_.ne().resolve(_.ke(_.PA));Y&&p(Y.keyboardInUse);ca.stopPropagation()},
"on:focusout":function(ca){p(!1);ca.stopPropagation()},
class:e,el:_.Xn(a),style:_.fo({"transition-duration":"0.3s"})},_.y(_.B,{cond:K,then:function(){return _.y(_.QA,{data:K,icon:function(){return _.y(_.B,{cond:function(){return b().iconImage},
then:function(ca){return _.y(_.go,{data:ca,alt:"",targetWidth:O,targetHeight:O,preserveWidth:!0,preserveHeight:!0})}})}})}}))},"bi");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
