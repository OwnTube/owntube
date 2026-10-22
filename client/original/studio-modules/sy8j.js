"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var XNk;_.WNk=function(){return"You don\u2019t have permission to access this feature"};
XNk=function(a){return _.jj({entityId:a})};
_.YNk=function(a,b){this.dispatch=a;this.permissionsService=b};
_.YNk.prototype.get=function(a,b){if(a&&a.delegateRolesByRequest)return b=XNk(b),a.delegateRolesByRequest[b]};
_.YNk.prototype.fetch=function(a){var b=this,c,e,g;return _.n(function(k){if(k.nextAddress==1){c=XNk(a);b.dispatch({type:"ENTITY_ROLE_FETCH_START",payload:{key:c},meta:_.Ej("FOREGROUND","START")});k.setCatchFinallyBlocks(2);var l=k.yield,m=b.permissionsService;var p={context:m.baseContextFactory(),entityId:a};m=m.creatorApi;p=_.Hy(m.$apiClient,{body:p,httpMethod:"POST",methodId:"youtubei.creator.list_entity_roles",path:"/"+m.gapiVersion+"/creator/list_entity_roles"});return l.call(k,p,4)}if(k.nextAddress!=
2)return e=k.yieldResult,b.dispatch({type:"ENTITY_ROLE_FETCH_COMPLETE",payload:{key:c,delegateRoles:e.roles||[]},meta:_.Ej("FOREGROUND","END")}),k.leaveTryBlock(0);g=k.enterCatchBlock();b.dispatch({type:"ENTITY_ROLE_FETCH_ERROR",payload:{key:c},meta:_.Ej("FOREGROUND","END")});_.mi(Error("HK`"+a+"`"+g));k.jumpToEnd()})};
_.YNk.prototype.getWithAutoFetch=function(a,b){(a=this.get(a,b))||this.fetch(b);return a||_.wl};
_.YNk[_.Tr]=[_.Yz,_.dVb];_.qe().addProvider({provide:_.YNk,useClass:_.YNk});_.ZNk=function(a,b){this.dispatch=a;this.permissionsService=b};
_.ZNk.prototype.get=function(a,b){if(a&&a.delegateUsersByRequest)return b=XNk(b),a.delegateUsersByRequest[b]};
_.ZNk.prototype.fetch=function(a){var b=this,c,e,g;return _.n(function(k){if(k.nextAddress==1){c=XNk(a);b.dispatch({type:"CREATOR_DELEGATE_FETCH_START",payload:{key:c},meta:_.Ej("FOREGROUND","START")});k.setCatchFinallyBlocks(2);var l=k.yield,m=b.permissionsService;var p={context:m.baseContextFactory(),entityId:a};m=m.creatorApi;p=_.Hy(m.$apiClient,{body:p,httpMethod:"POST",methodId:"youtubei.creator.list_creator_delegates",path:"/"+m.gapiVersion+"/creator/list_creator_delegates"});return l.call(k,
p,4)}if(k.nextAddress!=2)return e=k.yieldResult,b.dispatch({type:"CREATOR_DELEGATE_FETCH_COMPLETE",payload:{key:c,creatorDelegates:e.delegates||[]},meta:_.Ej("FOREGROUND","END")}),k.leaveTryBlock(0);g=k.enterCatchBlock();b.dispatch({type:"CREATOR_DELEGATE_FETCH_ERROR",payload:{key:c},meta:_.Ej("FOREGROUND","END")});_.mi(Error("IK`"+a+"`"+g));k.jumpToEnd()})};
_.ZNk.prototype.getWithAutoFetch=function(a,b){(a=this.get(a,b))||this.fetch(b);return a||_.wl};
_.ZNk[_.Tr]=[_.Yz,_.dVb];_.qe().addProvider({provide:_.ZNk,useClass:_.ZNk});_.$Nk=function(a,b,c){_.JB.call(this,"#PermissionsEmailValidity",a,b);this.permissionsService=c};
_.G(_.$Nk,_.JB);_.$Nk.prototype.fetchData=function(a){var b=this;return _.n(function(c){var e=c.return;var g=b.permissionsService;var k={email:[a]};k=Object.assign({},{context:g.baseContextFactory()},k);g=g.creatorApi;g=_.Hy(g.$apiClient,{body:k,httpMethod:"POST",methodId:"youtubei.creator.validate_creator_delegates",path:"/"+g.gapiVersion+"/creator/validate_creator_delegates"});return e.call(c,g)})};
_.$Nk[_.Tr]=[_.vj,_.Yz,_.dVb];_.qe().addProvider({provide:_.$Nk,useClass:_.$Nk});var aOk=function(a,b,c,e){this.entityType=a;this.selectFunction=b;this.dispatchFunction=c;this.permissionsMethod=e;this.invalidationService=_.mA.services.entitiesWithoutMask.services[a]};
aOk.prototype.get=function(a,b){this.invalidationService&&this.invalidationService.reportRead([XNk(b)]);if((a=_.Myb(this.getCache(a),XNk(b)))&&_.ql(a))return _.sl(this.responseToOutputType(a))};
_.J.Object.defineProperties(aOk.prototype,{entityCache:{configurable:!0,enumerable:!0,get:function(){return this.selectFunction(_.Rl)}}});
aOk.prototype.fetch=function(a,b){var c=this;return _.n(function(e){return e.yield(_.Ryb(c.entityType,XNk(a),function(){return c.getCache(c.entityCache)},function(){return c.permissionsMethod(a)},c.dispatchFunction,b),0)})};
aOk.prototype.getWithAutoFetch=function(a,b){if(a=this.get(a,b))return a;_.Vl(this.fetch(b,{freshnessRequirement:"CACHED_DATA"}));return _.wl};
aOk.prototype.getCache=function(a){return a.entitiesWithoutMask[this.entityType]};
_.bOk=function(a,b,c){aOk.call(this,"#PermissionsMadisonDelegates",a,b,function(e){e={context:c.baseContextFactory(),entityId:e};var g=c.creatorApi;return _.Hy(g.$apiClient,{body:e,httpMethod:"POST",methodId:"youtubei.creator.list_madison_delegates",path:"/"+g.gapiVersion+"/creator/list_madison_delegates"})})};
_.G(_.bOk,aOk);_.bOk.prototype.responseToOutputType=function(a){var b;a=(b=a.data.madisonDelegates)!=null?b:[];b=[];a=_.f(a);var c=a.next();try{for(;!c.done;c=a.next()){var e=c.value;if(e.user){var g=void 0,k=e.user;k.userId&&k.email&&k.profilePhotoUrl&&b.push({userId:k.userId,name:(g=k.name)!=null?g:"",email:k.email,profilePhotoUrl:k.profilePhotoUrl})}}}finally{_.h(a,c)}return b};
_.bOk[_.Tr]=[_.vj,_.Yz,_.dVb];_.qe().addProvider({provide:_.bOk,useClass:_.bOk});_.cOk=function(a,b,c,e,g){aOk.call(this,"#PermissionsOptInEligibility",a,b,function(k){k={context:c.baseContextFactory(),entityId:k};var l=c.creatorApi;return _.Hy(l.$apiClient,{body:k,httpMethod:"POST",methodId:"youtubei.creator.get_permissions_opt_in_eligibility",path:"/"+l.gapiVersion+"/creator/get_permissions_opt_in_eligibility"})});
this.dispatch=b;this.permissionsOptInQueueManager=e;this.permissionsOptOutQueueManager=g};
_.G(_.cOk,aOk);_.cOk.prototype.responseToOutputType=function(a){var b;return(b=a.data.eligibilityStatus)!=null?b:"PERMISSIONS_ELIGIBILITY_STATUS_UNSPECIFIED"};
_.cOk.prototype.optIn=function(a){a=_.Cj(a,"PERMISSIONS_OPT_IN_UPDATE");this.dispatch(_.Ij("PERMISSIONS_OPT_IN_REQUEST",{eventType:"CREATED",posted:a}));return _.eA(this.permissionsOptInQueueManager,a.id)};
_.cOk[_.Tr]=[_.vj,_.Yz,_.dVb,_.Saf,_.Taf];_.qe().addProvider({provide:_.cOk,useClass:_.cOk});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
