"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.xli=function(a,b,c,e){_.JB.call(this,"#CreatorChannelProductSelection",a,b);this.dispatch=b;this.shoppingSettingsService=c;this.mutationQueueManager=e};
_.G(_.xli,_.JB);_.xli.prototype.fetchData=function(a){var b=this,c,e;return _.n(function(g){if(g.nextAddress==1)return c={getChannelProductSelectionRequest:{externalChannelId:a}},g.yield(b.shoppingSettingsService.getShoppingSettings(c),2);e=g.yieldResult;if(!e.channelProductSelection)throw Error("fE`"+a);return g.return(e.channelProductSelection)})};
_.xli.prototype.postUpdate=function(a){a=_.Cj(a);this.dispatch(_.Ij("UPDATE_SHOPPING_SETTINGS_REQUEST",{eventType:"CREATED",posted:a}));return _.eA(this.mutationQueueManager,a.id)};
_.xli[_.Tr]=[_.vj,_.Yz,_.Iq,_.abf];_.qe().addProvider({provide:_.xli,useClass:_.xli});_.yli=function(a,b,c,e){_.JB.call(this,"#CreatorVideoProductSelection",a,b);this.dispatch=b;this.shoppingSettingsService=c;this.mutationQueueManager=e};
_.G(_.yli,_.JB);_.yli.prototype.fetchData=function(a){var b=this,c,e;return _.n(function(g){if(g.nextAddress==1)return c={getVideoProductSelectionRequest:{externalVideoId:a}},g.yield(b.shoppingSettingsService.getShoppingSettings(c),2);e=g.yieldResult;if(!e.videoProductSelection)throw Error("gE`"+a);return g.return(e.videoProductSelection)})};
_.yli.prototype.postUpdate=function(a){a=_.Cj(a);this.dispatch(_.Ij("UPDATE_SHOPPING_SETTINGS_REQUEST",{eventType:"CREATED",posted:a}));return _.eA(this.mutationQueueManager,a.id)};
_.yli[_.Tr]=[_.vj,_.Yz,_.Iq,_.abf];_.qe().addProvider({provide:_.yli,useClass:_.yli});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
