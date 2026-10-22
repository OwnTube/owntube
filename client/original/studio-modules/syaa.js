"use strict";_F_installCss(".ytaLegacyCardWrapperViewModelHost{color:var(--tffc2fd3a644f6275);display:flex;flex-direction:column}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var ftm=new _.Mv("legacyAnalyticsScreenConfiguration");var gtm=new _.Mv("analyticsCardData");_.glc=_.Ui(function(a){var b=_.Ld(function(){var e=_.bf(a.data(),ftm),g;if(g=e){g=_.Km();var k=e.userInfo;if(!k||!k.type)throw Error("oT");a:{var l=k.type;switch(l){case "USER_TYPE_PROTO_CHANNEL_OWNER":break a;default:throw Error("nT`"+l);}}k={type:"CHANNEL",id:"User id",title:"User Title",currency:k.currencyCode||"USD",hasSubscriberDataPermissions:!1,hasRevenuePermissions:!1,hasAssetReadPermission:!1,hasMembershipsFeatureEnabled:!1,hasPostsFeatureEnabled:!1,hasProductsTaggingFeatureEnabled:!1,hasMultiTrackFeatureEnabled:!1,
hasPrimetimeAnalyticsEnabled:!1,hasPrimetimeSelfServeAnalyticsEnabled:!1,hasShoppingAnalyticsFeatureEnabled:!1,hasAmazonAffiliateShoppingFeatureEnabled:!1,hasPodcasts:!1,hasCourses:!1,hasTvShows:!1};e=e.entityConfig;if(!e||!e.type)throw Error("pT");g={nowInstant:g,entityConfig:{type:"CHANNEL",id:e.id,title:e.title,creationInstant:_.Gm(Number(e.creationTimestampMillis)),isOwnedByUser:!0},timePeriod:{type:"4_weeks"},userInfo:k,overviewScreenState:{},tabId:"overview"}}return g},void 0,"VKDvFd"),c=_.Ld(function(){var e=
b();
var g=_.bf(a.data(),gtm);e=e&&g&&g.stackedBarCardData?(new _.A0f).createNewCards(e,g):void 0;if(e&&_.ql(e)&&e.data.cardData)return e.data.cardData},void 0,"OEzsZd");
return _.y("yta-legacy-card-wrapper-renderer",{class:_.Wn("ytaLegacyCardWrapperViewModelHost",a.className)},_.y(_.B,{cond:c,then:function(e){return _.y(_.X_f,{cardModel:e,tabColor:_.zp.OVERVIEW})},
else:function(){return _.y("div",null,"Card data not available.")}}))},"aL");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
