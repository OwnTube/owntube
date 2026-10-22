"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.LMk=function(a){var b;return a.reason==="VIDEO_RESTRICTION_REASON_COMMUNITY_GUIDELINES"||a.reason==="VIDEO_RESTRICTION_REASON_ADULTS_ONLY"||a.reason==="VIDEO_RESTRICTION_REASON_TARGETED_FOR_KIDS"&&((b=a.targetedForKids)==null?void 0:b.imposer)!=="VIDEO_RESTRICTION_IMPOSER_SELF"};
_.MMk=function(a){return _.vn(a,"isTorso")||_.vn(a,"isPremium")||_.vn(a,"isAffiliate")};
_.NMk=function(a,b){return _.eUb()?_.K7h(a,b):_.Aq(b)||_.fUb()?_.kUb(b)==="CREATOR_FEATURE_STATUS_ENABLED"&&_.K7h(a,b):_.K7h(a,b)};
_.OMk=function(){return"Primetime subscribers only"};
_.PMk=function(a,b,c){return a&&b&&c?c.getWithAutoFetch(b,{channelId:a}):_.ul};
_.QMk=function(a,b,c){return a&&b&&c?c.getWithAutoFetch(b,a,_.JC):_.ul};
_.E3=function(a,b,c,e,g,k,l,m,p){l=l===void 0?{}:l;m=m===void 0?{}:m;p=p===void 0?{}:p;_.RMk("FLOW_EVENT_NAMESPACE_LIVE_STREAMING","FLOW_TYPE_LIVE_STREAMING",a,{liveStreamingContext:{broadcastSource:b===void 0?"BROADCAST_SOURCE_UNSPECIFIED":b,isAutoDashboard:c===void 0?!1:c,externalVideoId:e===void 0?"":e,broadcastConferenceType:g===void 0?"BROADCAST_CONFERENCE_TYPE_UNSPECIFIED":g,isMonetizationOn:k===void 0?!1:k,eventData:{errorEventData:l,adsAutomationEventData:m,adBreakOverlayEventData:p}}})};
_.RMk=function(a,b,c,e){_.Uh().logFlowEvent(_.Th(a,c,e,void 0,_.Xg()||void 0),b)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
