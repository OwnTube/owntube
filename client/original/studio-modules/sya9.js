"use strict";_F_installCss(".ytaLegacyCardWrapperViewModelHost{color:var(--tffc2fd3a644f6275);display:flex;flex-direction:column}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var dsm=new _.Nv("legacyAnalyticsScreenConfiguration");var esm=new _.Nv("analyticsCardData");_.Ukc=_.Ri(function(a){var b=_.Hd(function(){var e=_.Qe(a.data(),dsm),g;if(g=e){g=_.Om();var k=e.userInfo;if(!k||!k.type)throw Error("jT");a:{var l=k.type;switch(l){case "USER_TYPE_PROTO_CHANNEL_OWNER":break a;default:throw Error("iT`"+l);}}k={type:"CHANNEL",id:"User id",title:"User Title",currency:k.currencyCode||"USD",hasSubscriberDataPermissions:!1,hasRevenuePermissions:!1,hasAssetReadPermission:!1,hasMembershipsFeatureEnabled:!1,hasPostsFeatureEnabled:!1,hasProductsTaggingFeatureEnabled:!1,hasMultiTrackFeatureEnabled:!1,
hasPrimetimeAnalyticsEnabled:!1,hasPrimetimeSelfServeAnalyticsEnabled:!1,hasShoppingAnalyticsFeatureEnabled:!1,hasAmazonAffiliateShoppingFeatureEnabled:!1,hasPodcasts:!1,hasCourses:!1,hasTvShows:!1};e=e.entityConfig;if(!e||!e.type)throw Error("kT");g={nowInstant:g,entityConfig:{type:"CHANNEL",id:e.id,title:e.title,creationInstant:_.Lm(Number(e.creationTimestampMillis)),isOwnedByUser:!0},timePeriod:{type:"4_weeks"},userInfo:k,overviewScreenState:{},tabId:"overview"}}return g},void 0,"VKDvFd"),c=_.Hd(function(){var e=
b();
var g=_.Qe(a.data(),esm);e=e&&g&&g.stackedBarCardData?(new _.N_f).createNewCards(e,g):void 0;if(e&&_.ol(e)&&e.data.cardData)return e.data.cardData},void 0,"OEzsZd");
return _.y("yta-legacy-card-wrapper-renderer",{class:_.Un("ytaLegacyCardWrapperViewModelHost",a.className)},_.y(_.B,{cond:c,then:function(e){return _.y(_.j_f,{cardModel:e,tabColor:_.xp.OVERVIEW})},
else:function(){return _.y("div",null,"Card data not available.")}}))},"XK");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
