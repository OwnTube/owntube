"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var XGg,YGg,ZGg,$Gg,cHg,bHg,dHg;_.WGg=function(a){return a.settingsState};
XGg=function(a){var b=function(c){var e;return(a==null?void 0:(e=a.experiments)==null?void 0:e.includes(c))||!1};
return{invitedToCreatorIncentivesPreEnablementProgram:b("100"),invitedToCreatorIncentivesAlternativeProgram:b("126"),invitedToCreatorIncentivesPostEnablementProgram:b("118"),invitedToCreatorIncentivesPreEnablementWithMocProgram:b("196"),earnedCreatorIncentivesPostEnablementBonus:b("117"),giftTierSelectionEnabled:b("121"),enableLivePricingLevelVersionUpgrade:b("142"),enableManagementPriceRecommendationsM1:b("168"),enableRefreshedOnboardingPriceClientCoefficients:b("181"),enableMembersOnlyCommunityPerk:b("188"),
enableManagementPriceRecommendationsM2:b("187")}};
_.cK=function(a){return _.Cn(a,"join")};
YGg=function(a){var b,c;return(c=a==null?void 0:(b=a.peerChannels)==null?void 0:b.map(function(e){return{title:e.displayName,link:_.cK(e.externalChannelId)}}))!=null?c:[]};
ZGg=function(a){var b={},c;a==null||(c=a.tiers)==null||c.forEach(function(e){var g;e.id&&((g=e.liveVersion)==null?0:g.name)&&(b[e.id]=e.liveVersion.name)});
return b};
$Gg=function(a){var b,c,e=(b=a.sponsorshipsSettings)==null?void 0:(c=b.giftingSettings)==null?void 0:c.giftingTierId;if(e)return e;var g,k,l;return(g=a.sponsorshipsTierData)==null?void 0:(k=g.tiers)==null?void 0:(l=k.find(function(m){return m.isGiftingRecommended}))==null?void 0:l.id};
_.eHg=function(a){var b=a.sponsorshipsState||{},c=b.status==="SPONSORSHIPS_STATUS_ONBOARDING",e,g=((e=b.onboardingState)==null?void 0:e.pageOverride)||"SPONSORSHIPS_ONBOARDING_PAGE_OVERRIDE_UNKNOWN";e=b.status==="SPONSORSHIPS_STATUS_ENABLED";var k=b.status==="SPONSORSHIPS_STATUS_PAUSED",l,m=((l=b.upgradeToPerksState)==null?void 0:l.perksStatus)||"SPONSORSHIPS_PERKS_STATUS_UNKNOWN",p;l=((p=b.unpauseState)==null?void 0:p.pauseReasons)||[];var r;p=((r=b.unpauseState)==null?void 0:r.unpauseEligibility)||
"SPONSORSHIPS_ONBOARDING_ELIGIBILITY_UNKNOWN";var t;r=((t=b.upgradeToPerksState)==null?void 0:t.upgradeEligibility)||"SPONSORSHIPS_ONBOARDING_ELIGIBILITY_UNKNOWN";t=b==null?void 0:b.missingContractId;var v,w=((v=a.sponsorshipsSettings)==null?void 0:v.viewAsCountry)||"",x,z,A,C;b=((A=b.onboardingState)==null?void 0:(C=A.announcementVideoState)==null?void 0:C.markedDone)||!1;A=a.videoData;var E;A=!!(A==null?0:(E=A.offerVideoData)==null?0:E.externalVideoId);E=a.badgeData;C=a.emojiData;if(_.aHg(E)||E&&
(E==null?0:E.badgeMode)&&E.badgeMode!=="BADGE_MODE_UNKNOWN")E=!0;else{var F;E=((C==null?void 0:(F=C.emojis)==null?void 0:F.length)||0)>0}F=!((x=a.backstageData)==null||!x.onboardingPostRequirementFulfilled);x=(z=a.backstageData)==null?void 0:z.serializedPostDialogCustomizationData;z=(z=a.badgeData)?z.badgeMode!=="BADGE_MODE_BASIC"&&_.aHg(z)?{displayMode:"CUSTOM",badgeUrls:bHg(z.customBadges||[])}:{displayMode:"DEFAULT",badgeUrls:bHg(z.defaultBadges||[])}:{displayMode:"DEFAULT",badgeUrls:[]};return{isOnboarding:c,
onboardingPageOverride:g,isSponsorshipsEnabled:e,isSponsorshipsPaused:k,isManagement:e||k,perksStatus:m,pauseReasons:l,unpauseEligibility:p,eligibleToUnpause:p==="SPONSORSHIPS_ONBOARDING_ELIGIBILITY_ELIGIBLE",upgradeToPerksEligibility:r,missingContractId:t,featureCountry:w,hasAnnouncementVideo:b,hasOfferVideo:A,hasStartedWithPersonalization:E,onboardingPostRequirementFulfilled:F,serializedPostDialogCustomizationData:x,badgesPreview:z,emojiUrls:cHg(a.emojiData),tierNameMap:ZGg(a.sponsorshipsTierData),
currencyCountry:dHg(a.sponsorshipsTierData,w),experiments:XGg(a.experiments),links:a.links||{},peers:YGg(a.peers),giftingTierId:$Gg(a),recommendations:a.recommendations}};
cHg=function(a){return a&&a.emojis?a.emojis.map(function(b){return b.thumbnailUrl}).filter(_.Fg):[]};
bHg=function(a){return a.map(function(b){return b.thumbnailUrl}).filter(_.Fg)};
_.aHg=function(a){var b;return!!(a==null?0:(b=a.customBadges)==null?0:b.some(function(c){return!!c.thumbnailUrl}))};
dHg=function(a,b){return b&&a&&a.countriesTierPricings?a.countriesTierPricings.some(function(c){return c.country===b})?b:"US":"US"};_.dK=_.eHg({});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
