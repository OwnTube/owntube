"use strict";_F_installCss(".ytThumbnailBadgeViewModelHost{display:block}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.gkc=_.Ui(function(a){var b=_.E7b(),c=_.Mq(function(g){var k,l,m;a:{var p=(k=a.data())==null?void 0:k.animationActivationTargetId;k=((l=a.data())==null?void 0:l.animationActivationEntityKey)||"";l=(m=a.data())==null?void 0:m.animationActivationEntitySelectorType;if(k&&p)switch(l){case "THUMBNAIL_BADGE_ANIMATION_ENTITY_SELECTOR_TYPE_PLAYER_STATE":g=_.kmb(g,k);m=_.qe().resolve(_.oe(_.Jze));p=!!(g&&g.videoId===p&&(m==null?0:m.isMiniplayerActive()));p={activated:p,playAnimation:p&&g.playerState==="PLAYER_STATE_PLAYING"};
break a}p=void 0}return p});
_.Md(function(){var g;if((g=c())==null?0:g.activated){var k;if((k=c())==null?0:k.playAnimation){var l;(l=b.lottieEl)==null||l.goToAndPlay(0)}else{var m;(m=b.lottieEl)==null||m.goToAndStop(0)}}},"pqG3X","YL");
var e=function(){var g,k=!((g=c())==null||!g.activated),l;if(a.data()){var m=a.data();g=void 0;m.icon&&(g=_.Bob(m.icon),g=_.Iob(g));var p=void 0,r;if((r=m.backgroundColor)==null?0:r.lightTheme){var t;p={backgroundColor:_.GXa((t=m.backgroundColor)==null?void 0:t.lightTheme,"0.8")}}if(m.text||g||k){var v;if(k)r=18;else b:switch(m.badgeStyle){case "THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE":r=19;break b;case "THUMBNAIL_OVERLAY_BADGE_STYLE_SPECIAL":r=20;break b;default:r=18}t=k&&m.animatedText?m.animatedText:
m.text;var w=(v=_.bf(m.rendererContext,_.Uq))==null?void 0:v.label;if(k&&m.lottieData&&b){v=m.lottieData;var x,z;k={animationConfig:{name:v.url,path:v.url,autoplay:(l=v.settings)==null?void 0:l.autoplay,loop:(z=(x=v.settings)==null?void 0:x.loop)!=null?z:!0},animationRef:b}}else k=void 0;l={type:r,text:t,icon:g,customColors:p,accessibilityText:w,animation:k}}else l=void 0}else l=void 0;return l};
return _.y("yt-thumbnail-badge-view-model",{class:_.Wn("ytThumbnailBadgeViewModelHost",a.class)},_.y(_.B,{cond:e,then:function(){return _.y(_.tWg,{data:function(){return e()}})}}))},"ZL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
