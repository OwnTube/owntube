"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var TMk;_.SMk=function(){return"You don\u2019t have permission to access this feature"};
TMk=function(a){return _.hj({entityId:a})};
_.UMk=function(a,b){this.dispatch=a;this.permissionsService=b};
_.UMk.prototype.get=function(a,b){if(a&&a.delegateRolesByRequest)return b=TMk(b),a.delegateRolesByRequest[b]};
_.UMk.prototype.fetch=function(a){var b=this,c,e,g;return _.n(function(k){if(k.nextAddress==1){c=TMk(a);b.dispatch({type:"ENTITY_ROLE_FETCH_START",payload:{key:c},meta:_.Cj("FOREGROUND","START")});k.setCatchFinallyBlocks(2);var l=k.yield,m=b.permissionsService;var p={context:m.baseContextFactory(),entityId:a};m=m.creatorApi;p=_.Gy(m.$apiClient,{body:p,httpMethod:"POST",methodId:"youtubei.creator.list_entity_roles",path:"/"+m.gapiVersion+"/creator/list_entity_roles"});return l.call(k,p,4)}if(k.nextAddress!=
2)return e=k.yieldResult,b.dispatch({type:"ENTITY_ROLE_FETCH_COMPLETE",payload:{key:c,delegateRoles:e.roles||[]},meta:_.Cj("FOREGROUND","END")}),k.leaveTryBlock(0);g=k.enterCatchBlock();b.dispatch({type:"ENTITY_ROLE_FETCH_ERROR",payload:{key:c},meta:_.Cj("FOREGROUND","END")});_.ki(Error("CK`"+a+"`"+g));k.jumpToEnd()})};
_.UMk.prototype.getWithAutoFetch=function(a,b){(a=this.get(a,b))||this.fetch(b);return a||_.ul};
_.UMk[_.Tr]=[_.Xz,_.WUb];_.ne().addProvider({provide:_.UMk,useClass:_.UMk});_.VMk=function(a,b){this.dispatch=a;this.permissionsService=b};
_.VMk.prototype.get=function(a,b){if(a&&a.delegateUsersByRequest)return b=TMk(b),a.delegateUsersByRequest[b]};
_.VMk.prototype.fetch=function(a){var b=this,c,e,g;return _.n(function(k){if(k.nextAddress==1){c=TMk(a);b.dispatch({type:"CREATOR_DELEGATE_FETCH_START",payload:{key:c},meta:_.Cj("FOREGROUND","START")});k.setCatchFinallyBlocks(2);var l=k.yield,m=b.permissionsService;var p={context:m.baseContextFactory(),entityId:a};m=m.creatorApi;p=_.Gy(m.$apiClient,{body:p,httpMethod:"POST",methodId:"youtubei.creator.list_creator_delegates",path:"/"+m.gapiVersion+"/creator/list_creator_delegates"});return l.call(k,
p,4)}if(k.nextAddress!=2)return e=k.yieldResult,b.dispatch({type:"CREATOR_DELEGATE_FETCH_COMPLETE",payload:{key:c,creatorDelegates:e.delegates||[]},meta:_.Cj("FOREGROUND","END")}),k.leaveTryBlock(0);g=k.enterCatchBlock();b.dispatch({type:"CREATOR_DELEGATE_FETCH_ERROR",payload:{key:c},meta:_.Cj("FOREGROUND","END")});_.ki(Error("DK`"+a+"`"+g));k.jumpToEnd()})};
_.VMk.prototype.getWithAutoFetch=function(a,b){(a=this.get(a,b))||this.fetch(b);return a||_.ul};
_.VMk[_.Tr]=[_.Xz,_.WUb];_.ne().addProvider({provide:_.VMk,useClass:_.VMk});_.WMk=function(a,b,c){_.HB.call(this,"#PermissionsEmailValidity",a,b);this.permissionsService=c};
_.G(_.WMk,_.HB);_.WMk.prototype.fetchData=function(a){var b=this;return _.n(function(c){var e=c.return;var g=b.permissionsService;var k={email:[a]};k=Object.assign({},{context:g.baseContextFactory()},k);g=g.creatorApi;g=_.Gy(g.$apiClient,{body:k,httpMethod:"POST",methodId:"youtubei.creator.validate_creator_delegates",path:"/"+g.gapiVersion+"/creator/validate_creator_delegates"});return e.call(c,g)})};
_.WMk[_.Tr]=[_.sj,_.Xz,_.WUb];_.ne().addProvider({provide:_.WMk,useClass:_.WMk});var XMk=function(a,b,c,e){this.entityType=a;this.selectFunction=b;this.dispatchFunction=c;this.permissionsMethod=e;this.invalidationService=_.lA.services.entitiesWithoutMask.services[a]};
XMk.prototype.get=function(a,b){this.invalidationService&&this.invalidationService.reportRead([TMk(b)]);if((a=_.Byb(this.getCache(a),TMk(b)))&&_.ol(a))return _.ql(this.responseToOutputType(a))};
_.J.Object.defineProperties(XMk.prototype,{entityCache:{configurable:!0,enumerable:!0,get:function(){return this.selectFunction(_.Pl)}}});
XMk.prototype.fetch=function(a,b){var c=this;return _.n(function(e){return e.yield(_.Gyb(c.entityType,TMk(a),function(){return c.getCache(c.entityCache)},function(){return c.permissionsMethod(a)},c.dispatchFunction,b),0)})};
XMk.prototype.getWithAutoFetch=function(a,b){if(a=this.get(a,b))return a;_.Tl(this.fetch(b,{freshnessRequirement:"CACHED_DATA"}));return _.ul};
XMk.prototype.getCache=function(a){return a.entitiesWithoutMask[this.entityType]};
_.YMk=function(a,b,c){XMk.call(this,"#PermissionsMadisonDelegates",a,b,function(e){e={context:c.baseContextFactory(),entityId:e};var g=c.creatorApi;return _.Gy(g.$apiClient,{body:e,httpMethod:"POST",methodId:"youtubei.creator.list_madison_delegates",path:"/"+g.gapiVersion+"/creator/list_madison_delegates"})})};
_.G(_.YMk,XMk);_.YMk.prototype.responseToOutputType=function(a){var b;a=(b=a.data.madisonDelegates)!=null?b:[];b=[];a=_.f(a);var c=a.next();try{for(;!c.done;c=a.next()){var e=c.value;if(e.user){var g=void 0,k=e.user;k.userId&&k.email&&k.profilePhotoUrl&&b.push({userId:k.userId,name:(g=k.name)!=null?g:"",email:k.email,profilePhotoUrl:k.profilePhotoUrl})}}}finally{_.h(a,c)}return b};
_.YMk[_.Tr]=[_.sj,_.Xz,_.WUb];_.ne().addProvider({provide:_.YMk,useClass:_.YMk});_.ZMk=function(a,b,c,e,g){XMk.call(this,"#PermissionsOptInEligibility",a,b,function(k){k={context:c.baseContextFactory(),entityId:k};var l=c.creatorApi;return _.Gy(l.$apiClient,{body:k,httpMethod:"POST",methodId:"youtubei.creator.get_permissions_opt_in_eligibility",path:"/"+l.gapiVersion+"/creator/get_permissions_opt_in_eligibility"})});
this.dispatch=b;this.permissionsOptInQueueManager=e;this.permissionsOptOutQueueManager=g};
_.G(_.ZMk,XMk);_.ZMk.prototype.responseToOutputType=function(a){var b;return(b=a.data.eligibilityStatus)!=null?b:"PERMISSIONS_ELIGIBILITY_STATUS_UNSPECIFIED"};
_.ZMk.prototype.optIn=function(a){a=_.zj(a,"PERMISSIONS_OPT_IN_UPDATE");this.dispatch(_.Gj("PERMISSIONS_OPT_IN_REQUEST",{eventType:"CREATED",posted:a}));return _.dA(this.permissionsOptInQueueManager,a.id)};
_.ZMk[_.Tr]=[_.sj,_.Xz,_.WUb,_.maf,_.naf];_.ne().addProvider({provide:_.ZMk,useClass:_.ZMk});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
