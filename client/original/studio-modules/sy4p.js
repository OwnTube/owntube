"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.wui=function(a){return(new _.Zj("{productCount,plural,=0{Changes saved}=1{Tagged {PRODUCTCOUNT} product}other{Tagged {PRODUCTCOUNT} products}}")).format({productCount:a.productCount,PRODUCTCOUNT:String(a.productCount)})};
_.xui=function(a,b){return _.n(function(c){a.dispatch({type:"UPDATE_SHOPPING_SETTINGS",payload:{shoppingSettings:b}});return c.return(_.bA(a.metadataService,{update:{shoppingSettings:b}}))})};
_.yui=function(a,b,c,e){_.HB.call(this,"#CreatorChannelProductSelection",a,b);this.dispatch=b;this.shoppingSettingsService=c;this.mutationQueueManager=e};
_.G(_.yui,_.HB);_.yui.prototype.fetchData=function(a){var b=this,c,e;return _.n(function(g){if(g.nextAddress==1)return c={getChannelProductSelectionRequest:{externalChannelId:a}},g.yield(b.shoppingSettingsService.getShoppingSettings(c),2);e=g.yieldResult;if(!e.channelProductSelection)throw Error("FE`"+a);return g.return(e.channelProductSelection)})};
_.yui.prototype.postUpdate=function(a){a=_.zj(a);this.dispatch(_.Gj("UPDATE_SHOPPING_SETTINGS_REQUEST",{eventType:"CREATED",posted:a}));return _.dA(this.mutationQueueManager,a.id)};
_.yui[_.Tr]=[_.sj,_.Xz,_.Fq,_.vaf];_.ne().addProvider({provide:_.yui,useClass:_.yui});_.zui=function(a,b,c,e){_.HB.call(this,"#CreatorVideoProductSelection",a,b);this.dispatch=b;this.shoppingSettingsService=c;this.mutationQueueManager=e};
_.G(_.zui,_.HB);_.zui.prototype.fetchData=function(a){var b=this,c,e;return _.n(function(g){if(g.nextAddress==1)return c={getVideoProductSelectionRequest:{externalVideoId:a}},g.yield(b.shoppingSettingsService.getShoppingSettings(c),2);e=g.yieldResult;if(!e.videoProductSelection)throw Error("GE`"+a);return g.return(e.videoProductSelection)})};
_.zui.prototype.postUpdate=function(a){a=_.zj(a);this.dispatch(_.Gj("UPDATE_SHOPPING_SETTINGS_REQUEST",{eventType:"CREATED",posted:a}));return _.dA(this.mutationQueueManager,a.id)};
_.zui[_.Tr]=[_.sj,_.Xz,_.Fq,_.vaf];_.ne().addProvider({provide:_.zui,useClass:_.zui});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
