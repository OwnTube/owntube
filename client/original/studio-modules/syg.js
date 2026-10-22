"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var JUf=function(a,b,c,e,g,k){e=e===void 0?!1:e;g=g===void 0?!1:g;k=k===void 0?!1:k;b={context:a.baseContextFactory(),videoIds:b,filters:c,fetchAutoDubbingData:e,fetchAutoDubbingAsrData:g,fetchBulkActionsStatus:k};a=a.crowdsourcingApi;return _.Hy(a.$apiClient,{body:b,httpMethod:"POST",methodId:"youtubei.crowdsourcing.get_video_translations",path:"/"+a.gapiVersion+"/crowdsourcing/get_video_translations"})};_.NG=function(a,b,c,e){this.dispatch=a;this.channelFetcher=b;this.crowdsourcingService=c;this.select=e};
_.NG.prototype.get=function(a,b,c){c=c===void 0?[]:c;if(!a||b.length===0)return{};_.mA.services.crowdsourcingData.reportRead();var e=new Set(KUf(this,a,b,c)),g=a.crowdsourcingData.translationsByVideoId;return _.Cg(b.filter(function(k){return!e.has(k)}),function(k){return g[k]})};
_.NG.prototype.fetch=function(a,b){var c=this,e,g,k,l,m,p,r,t,v,w,x,z,A,C,E,F;return _.n(function(H){if(H.nextAddress==1){e=b||{};g=e.filters;k=g===void 0?[]:g;l=e.useCachedData;m=l===void 0?!1:l;p=e.fetchingType;r=p===void 0?"FOREGROUND":p;if(a.length===0)return H.return();t=m?KUf(c,c.entityCache,a,k):a;if(!t.length)return H.return();c.dispatch({type:"FETCH_VIDEO_TRANSLATIONS_START",payload:{videoIds:t,filters:k},meta:_.Ej(r===void 0?"FOREGROUND":r,"START")});w=(v=LUf(c,c.channelId))&&_.D("enable_dubbing_asr_on_web_v2");
z=((x=b)==null?void 0:x.fetchBulkActionsStatus)||!1;H.setCatchFinallyBlocks(2);return H.yield(JUf(c.crowdsourcingService,t,k,v,w,z),4)}if(H.nextAddress!=2)return A=H.yieldResult,c.dispatch({type:"FETCH_VIDEO_TRANSLATIONS_SUCCESS",payload:{videoIds:t,filters:k,response:A},meta:_.Ej(r===void 0?"FOREGROUND":r,"END")}),E=_.Eg((C=A.audioTracks)!=null?C:[],function(I){return _.yMb(I)}),_.Sg(E)||c.dispatch(_.Bl.fetchSuccessAction("#CreatorAudioTrackData",_.Gg(E),{"#CreatorAudioTrackData":E})),H.leaveTryBlock(0);
F=H.enterCatchBlock();c.dispatch({type:"FETCH_VIDEO_TRANSLATIONS_ERROR",payload:{videoIds:t,filters:k},meta:_.Ej(r===void 0?"FOREGROUND":r,"END")});_.ri("FetchVideoTranslations",F);H.jumpToEnd()})};
_.NG.prototype.getWithAutoFetch=function(a,b,c,e){c=c===void 0?[]:c;e=e===void 0?"FOREGROUND":e;var g=this.get(a,b,c);a=b.filter(function(k){return!g[k]});
return a.length?(this.fetch(a,{filters:c,useCachedData:!0,fetchingType:e}),_.Cg(b,function(k){return g[k]||_.wl})):g};
var KUf=function(a,b,c,e){if(e.length>0&&e.every(function(k){return(b?b.crowdsourcingData.isTranslationListComplete[k]||0:0)===2}))return[];
var g=b.crowdsourcingData.translationsByVideoId;return c.filter(function(k){var l=g[k];if(l&&l.status==="SUCCESS"&&l.data.isComplete)return!1;if(e.length>0){var m=b.crowdsourcingData.fetchedStatusByRequest[k];return m?e.some(function(p){return!m[p]}):!0}return!l})},LUf=function(a,b){if(!b)return!1;
a=a.fetchChannel(a.entityCache,b);return _.ql(a)?_.hhb(a.data):!1};
_.NG.prototype.fetchChannel=function(a,b){return b&&a?this.channelFetcher.getWithAutoFetch(this.entityCache,b,_.tk()):_.wl};
_.J.Object.defineProperties(_.NG.prototype,{entityCache:{configurable:!0,enumerable:!0,get:function(){return this.select(_.Rl)}},
channelId:{configurable:!0,enumerable:!0,get:function(){return this.select(_.Kl)}}});
_.Gi([_.Fi(_.NG,[_.Yz,_.oq,_.UUb,_.vj])]);
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
