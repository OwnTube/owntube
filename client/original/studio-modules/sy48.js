"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Zmi=function(a,b){return{type:"SHOPPING_SETTINGS_UPDATE_SUCCESS",payload:a,meta:_.Cj(b===void 0?"FOREGROUND":b,"END")}};
_.$mi=function(a,b){return{type:"SHOPPING_SETTINGS_UPDATE_START",payload:a,meta:_.Cj(b===void 0?"FOREGROUND":b,"START")}};
_.ani=function(){return{type:"SHOPPING_SETTINGS_UPDATE_ERROR",payload:void 0,meta:_.Dj("END")}};var bni;bni=_.Zr(["https://www.youtube.com/embed/shmGG87ZELI?rel=0&amp;showinfo=0"]);_.cni=_.Oc(bni);_.WS=function(a,b,c){this.dispatch=a;this.shoppingSettingsService=b;this.channelFetcher=c};
_.WS.prototype.get=function(a,b){if(a)return a.shoppingChannelConfigurationByChannelId[b]};
_.WS.prototype.fetch=function(a,b){var c=this,e,g,k;return _.n(function(l){if(l.nextAddress==1)return e={},e.getShoppingChannelConfigurationRequest={externalChannelId:a},c.dispatch({type:"FETCH_SHOPPING_CHANNEL_CONFIGURATION_START",payload:e,meta:_.Cj(b===void 0?"FOREGROUND":b,"START")}),l.setCatchFinallyBlocks(2),l.yield(c.shoppingSettingsService.getShoppingSettings(e),4);if(l.nextAddress!=2){g=l.yieldResult;if(!g.shoppingChannelConfiguration)throw Error("sE");c.dispatch({type:"FETCH_SHOPPING_CHANNEL_CONFIGURATION_SUCCESS",
payload:{request:e,response:g},meta:_.Cj(b===void 0?"FOREGROUND":b,"END")});return l.leaveTryBlock(0)}k=l.enterCatchBlock();c.dispatch({type:"FETCH_SHOPPING_CHANNEL_CONFIGURATION_ERROR",payload:e,meta:_.Cj(b===void 0?"FOREGROUND":b,"END")});_.pi("GetShoppingSettings",k);l.jumpToEnd()})};
_.WS.prototype.getWithAutoFetch=function(a,b,c){if(a=this.get(a,b))return a;this.fetch(b,c);return _.ul};
_.WS.prototype.updateAndDispatch=function(a){var b=this,c,e,g,k,l,m;return _.n(function(p){switch(p.nextAddress){case 1:return b.dispatch(_.$mi(a)),p.setCatchFinallyBlocks(2),p.yield(b.shoppingSettingsService.updateShoppingSettings(a),4);case 4:c=p.yieldResult;if(a.updateLiveChatShoppingConfigRequest&&!c.videoProductSelectionData)throw Error("tE");e=a.updateShoppingConfigRequest;if(!(((g=e)==null?0:g.channelConfigUpdate)&&((k=e)==null?0:k.externalChannelId))){p.jumpTo(5);break}return p.yield(b.fetch((l=
e)==null?void 0:l.externalChannelId),5);case 5:b.dispatch(_.Zmi(a));p.leaveTryBlock(0);break;case 2:throw m=p.enterCatchBlock(),b.dispatch(_.ani()),_.pi("UpdateShoppingSettings",m),m;}})};
_.WS[_.Tr]=[_.Xz,_.Fq,_.mq];_.ne().addProvider({provide:_.WS,useClass:_.WS});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
