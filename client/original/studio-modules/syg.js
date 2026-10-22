"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var XTf=function(a,b,c,e,g,k){e=e===void 0?!1:e;g=g===void 0?!1:g;k=k===void 0?!1:k;b={context:a.baseContextFactory(),videoIds:b,filters:c,fetchAutoDubbingData:e,fetchAutoDubbingAsrData:g,fetchBulkActionsStatus:k};a=a.crowdsourcingApi;return _.Gy(a.$apiClient,{body:b,httpMethod:"POST",methodId:"youtubei.crowdsourcing.get_video_translations",path:"/"+a.gapiVersion+"/crowdsourcing/get_video_translations"})};_.MG=function(a,b,c,e){this.dispatch=a;this.channelFetcher=b;this.crowdsourcingService=c;this.select=e};
_.MG.prototype.get=function(a,b,c){c=c===void 0?[]:c;if(!a||b.length===0)return{};_.lA.services.crowdsourcingData.reportRead();var e=new Set(YTf(this,a,b,c)),g=a.crowdsourcingData.translationsByVideoId;return _.Bg(b.filter(function(k){return!e.has(k)}),function(k){return g[k]})};
_.MG.prototype.fetch=function(a,b){var c=this,e,g,k,l,m,p,r,t,v,w,x,z,A,C,E,F;return _.n(function(H){if(H.nextAddress==1){e=b||{};g=e.filters;k=g===void 0?[]:g;l=e.useCachedData;m=l===void 0?!1:l;p=e.fetchingType;r=p===void 0?"FOREGROUND":p;if(a.length===0)return H.return();t=m?YTf(c,c.entityCache,a,k):a;if(!t.length)return H.return();c.dispatch({type:"FETCH_VIDEO_TRANSLATIONS_START",payload:{videoIds:t,filters:k},meta:_.Cj(r===void 0?"FOREGROUND":r,"START")});w=(v=ZTf(c,c.channelId))&&_.D("enable_dubbing_asr_on_web_v2");
z=((x=b)==null?void 0:x.fetchBulkActionsStatus)||!1;H.setCatchFinallyBlocks(2);return H.yield(XTf(c.crowdsourcingService,t,k,v,w,z),4)}if(H.nextAddress!=2)return A=H.yieldResult,c.dispatch({type:"FETCH_VIDEO_TRANSLATIONS_SUCCESS",payload:{videoIds:t,filters:k,response:A},meta:_.Cj(r===void 0?"FOREGROUND":r,"END")}),E=_.Cg((C=A.audioTracks)!=null?C:[],function(I){return _.nMb(I)}),_.Qg(E)||c.dispatch(_.zl.fetchSuccessAction("#CreatorAudioTrackData",_.Eg(E),{"#CreatorAudioTrackData":E})),H.leaveTryBlock(0);
F=H.enterCatchBlock();c.dispatch({type:"FETCH_VIDEO_TRANSLATIONS_ERROR",payload:{videoIds:t,filters:k},meta:_.Cj(r===void 0?"FOREGROUND":r,"END")});_.pi("FetchVideoTranslations",F);H.jumpToEnd()})};
_.MG.prototype.getWithAutoFetch=function(a,b,c,e){c=c===void 0?[]:c;e=e===void 0?"FOREGROUND":e;var g=this.get(a,b,c);a=b.filter(function(k){return!g[k]});
return a.length?(this.fetch(a,{filters:c,useCachedData:!0,fetchingType:e}),_.Bg(b,function(k){return g[k]||_.ul})):g};
var YTf=function(a,b,c,e){if(e.length>0&&e.every(function(k){return(b?b.crowdsourcingData.isTranslationListComplete[k]||0:0)===2}))return[];
var g=b.crowdsourcingData.translationsByVideoId;return c.filter(function(k){var l=g[k];if(l&&l.status==="SUCCESS"&&l.data.isComplete)return!1;if(e.length>0){var m=b.crowdsourcingData.fetchedStatusByRequest[k];return m?e.some(function(p){return!m[p]}):!0}return!l})},ZTf=function(a,b){if(!b)return!1;
a=a.fetchChannel(a.entityCache,b);return _.ol(a)?_.Xgb(a.data):!1};
_.MG.prototype.fetchChannel=function(a,b){return b&&a?this.channelFetcher.getWithAutoFetch(this.entityCache,b,_.qk()):_.ul};
_.J.Object.defineProperties(_.MG.prototype,{entityCache:{configurable:!0,enumerable:!0,get:function(){return this.select(_.Pl)}},
channelId:{configurable:!0,enumerable:!0,get:function(){return this.select(_.Il)}}});
_.Di([_.Ci(_.MG,[_.Xz,_.mq,_.MUb,_.sj])]);
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
