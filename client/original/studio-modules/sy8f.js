"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.PNk=function(a){var b;return a.reason==="VIDEO_RESTRICTION_REASON_COMMUNITY_GUIDELINES"||a.reason==="VIDEO_RESTRICTION_REASON_ADULTS_ONLY"||a.reason==="VIDEO_RESTRICTION_REASON_TARGETED_FOR_KIDS"&&((b=a.targetedForKids)==null?void 0:b.imposer)!=="VIDEO_RESTRICTION_IMPOSER_SELF"};
_.QNk=function(a){return _.xn(a,"isTorso")||_.xn(a,"isPremium")||_.xn(a,"isAffiliate")};
_.RNk=function(a,b){return _.mUb()?_.H8h(a,b):_.Dq(b)||_.nUb()?_.sUb(b)==="CREATOR_FEATURE_STATUS_ENABLED"&&_.H8h(a,b):_.H8h(a,b)};
_.SNk=function(){return"Primetime subscribers only"};
_.TNk=function(a,b,c){return a&&b&&c?c.getWithAutoFetch(b,{channelId:a}):_.wl};
_.UNk=function(a,b,c){return a&&b&&c?c.getWithAutoFetch(b,a,_.MC):_.wl};
_.H3=function(a,b,c,e,g,k,l,m,p){l=l===void 0?{}:l;m=m===void 0?{}:m;p=p===void 0?{}:p;_.VNk("FLOW_EVENT_NAMESPACE_LIVE_STREAMING","FLOW_TYPE_LIVE_STREAMING",a,{liveStreamingContext:{broadcastSource:b===void 0?"BROADCAST_SOURCE_UNSPECIFIED":b,isAutoDashboard:c===void 0?!1:c,externalVideoId:e===void 0?"":e,broadcastConferenceType:g===void 0?"BROADCAST_CONFERENCE_TYPE_UNSPECIFIED":g,isMonetizationOn:k===void 0?!1:k,eventData:{errorEventData:l,adsAutomationEventData:m,adBreakOverlayEventData:p}}})};
_.VNk=function(a,b,c,e){_.Wh().logFlowEvent(_.Vh(a,c,e,void 0,_.$g()||void 0),b)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
