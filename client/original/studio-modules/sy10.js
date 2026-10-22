"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var k2f,p2f,q2f,r2f,s2f,t2f,v2f;
_.i2f=function(a,b){var c={};if(!b.mask)return c;b.mask.description&&(c.description=a.description);b.mask.isMatchPolicy&&(c.isMatchPolicy=a.isMatchPolicy);b.mask.isReadonly&&(c.isReadonly=a.isReadonly);b.mask.name&&(c.name=a.name);b.mask.policyAppliedSummary&&(c.policyAppliedSummary=a.policyAppliedSummary);b.mask.policyId&&(c.policyId=a.policyId);b.mask.responseStatus&&(c.responseStatus=a.responseStatus);b.mask.rules&&(c.rules=a.rules);b.mask.timeUpdatedSecs&&(c.timeUpdatedSecs=a.timeUpdatedSecs);
_.Kj(c,b);return c};
_.pH=function(a,b){var c=_.zo(b.start);b=_.zo(b.end);c.setHours(6);b.setHours(6);c=_.Qqb(c,b,2);return a+": "+c};
_.j2f=function(){return"Asset type"};
_.qH=function(){return"Unable to perform selected actions. Try again later."};
k2f=function(a,b){var c=b.policies,e;a=(e=a.listPoliciesMask)==null?void 0:e.mask;if(!c||!a)return{"#CmsPolicyData":{}};c=_.ol(a,c,function(g){var k;return(k=g.policyId)==null?void 0:k.id});
e=b.defaultUsagePolicy&&_.ol(a,[b.defaultUsagePolicy],function(){return"DEFAULT_USAGE_POLICY"});
b=b.defaultMatchPolicy&&_.ol(a,[b.defaultMatchPolicy],function(){return"DEFAULT_MATCH_POLICY"});
return{"#CmsPolicyData":Object.assign({},c,b,e)}};
_.rH=function(a,b){switch(a.name){case "GREATER_EQUAL":return b.greaterEqual({wrapper:"",value:a.value});case "GREATER_THAN":return b.greaterThan?b.greaterThan({wrapper:"",value:a.value}):"";case "LESS_EQUAL":return b.lessEqual({wrapper:"",value:a.value});case "LESS_THAN":return b.lessThan?b.lessThan({wrapper:"",value:a.value}):"";default:return""}};
_.sH=function(a,b){switch(a.name){case "GREATER_EQUAL":return _.ar(b.greaterEqual,String(a.value));case "GREATER_THAN":return b.greaterThan?_.ar(b.greaterThan,String(a.value)):_.cm().build();case "LESS_EQUAL":return _.ar(b.lessEqual,String(a.value));case "LESS_THAN":return b.lessThan?_.ar(b.lessThan,String(a.value)):_.cm().build();default:return _.cm().build()}};
_.tH=function(a){return function(b){return a+": "+b.value}};
_.uH=function(a){return function(b){return _.em(a+": "+b.value)}};
_.vH=function(a){return a?function(){return{veType:a}}:void 0};
_.l2f=function(a){return a.isValid?{isValid:!0,value:{name:"IS",value:a.ids.join(", ")}}:{isValid:!1,error:a.errorMessage}};
_.m2f=function(a){a=(0,_.Zlf)(a);return a.isValid?{isValid:!0,values:[{name:"IS",value:a.ids.join(", ")}]}:{isValid:!1}};
_.n2f=function(a){return{title:_.ck(),valueToChipLabel:_.tH(_.ck()),valueToCompactChipLabel:_.uH(_.ck()),contentElement:"ytcp-filter-text-dialog-content",onContentElementInit:function(b){b.operatorOptions=[_.yD];b.valueValidator=function(c){return _.l2f((0,_.Zlf)(c))}},
logging:_.vH(a),inputValueIsValidForSuggestion:_.m2f}};
p2f=function(a,b,c,e){return new o2f(new _.BEb(a,c),b,e)};
q2f={mask:{description:!0},responseType:void 0};r2f={mask:{isMatchPolicy:!0},responseType:void 0};s2f={mask:{name:!0},responseType:void 0};t2f={mask:{policyId:{all:!0}},responseType:void 0};v2f={mask:{timeUpdatedSecs:!0},responseType:void 0};_.wH=_.C5a(t2f,s2f,q2f,r2f,_.wGe,v2f);_.w2f=_.C5a(t2f,s2f,q2f,r2f,{mask:{isReadonly:!0},responseType:void 0},_.wGe,v2f,{mask:{policyAppliedSummary:{all:!0}},responseType:void 0});var o2f=function(a,b,c){this.cmsApi=a;this.baseContextFactory=b;this.delegationContext=c};
o2f.prototype.withContext=function(a){return Object.assign({},a,{context:this.baseContextFactory(),delegationContext:this.delegationContext})};
_.Gi([{provide:o2f,useFactory:p2f,deps:[_.Zz,_.$z,_.aA,_.JEe]}]);_.xH=function(a,b){this.dispatch=a;this.policyService=b};
_.xH.prototype.get=function(a,b,c){b=a.policyIdsByRequest[_.jj(b)];if(!_.ql(b))return b;a=this.list(a,c);a=_.ql(a)&&a.data;if(b&&a){c=[];var e=_.f(Object.entries(a)),g=e.next();try{for(;!g.done;g=e.next()){var k=_.f(g.value),l=k.next().value,m=k.next().value,p=l,r=m;r&&p!=="DEFAULT_USAGE_POLICY"&&p!=="DEFAULT_MATCH_POLICY"&&b.data.includes(p)&&c.push(r)}}finally{_.h(e,g)}return _.sl({policies:c,defaultUsagePolicy:a.DEFAULT_USAGE_POLICY,defaultMatchPolicy:a.DEFAULT_MATCH_POLICY})}};
_.xH.prototype.list=function(a,b){a=a.entitiesWithMask["#CmsPolicyData"];var c=Object.keys(a);a=_.d$a(a,c,b.mask,function(e){return _.i2f(e,b)});
return _.yl(a)};
_.xH.prototype.fetch=function(a,b){var c=this,e,g;return _.n(function(k){if(k.nextAddress==1){c.dispatch({type:"POLICY_LIST_FETCH_START",payload:{request:a},meta:_.Ej(b===void 0?"FOREGROUND":b,"START")});k.setCatchFinallyBlocks(2);var l=k.yield,m=c.policyService;var p=m.cmsApi;m=m.withContext(a);p=_.Hy(p.$apiClient,{body:m,httpMethod:"POST",methodId:"youtubei.cms.list_cms_policies",path:"/"+p.gapiVersion+"/cms/list_cms_policies"});return l.call(k,p,4)}if(k.nextAddress!=2){e=k.yieldResult;if(!e.policies)throw Error("Vy`"+
a.externalOwnerId);c.dispatch({type:"POLICY_LIST_FETCH_COMPLETE",payload:{request:a,response:e},meta:_.Ej(b===void 0?"FOREGROUND":b,"END",k2f(a,e))});return k.leaveTryBlock(0)}g=k.enterCatchBlock();c.dispatch({type:"POLICY_LIST_FETCH_ERROR",payload:{request:a},meta:_.Ej(b===void 0?"FOREGROUND":b,"END")});_.ri("PolicyFetcher",g);throw g;})};
_.xH.prototype.getWithAutoFetch=function(a,b,c,e){(a=this.get(a,b,c))||_.Vl(this.fetch(b,e));return a||_.wl};
_.Gi([_.Fi(_.xH,[_.Yz,o2f])]);_.x2f=function(a,b){this.dispatch=a;this.cmsService=b};
_.x2f.prototype.updateSavedPolicy=function(a,b,c){var e=this,g;return _.n(function(k){g={externalOwnerId:a,policyId:{id:b},policyUpdate:c,mask:_.w2f.mask};return k.yield(_.Mp("UpdateCmsSavedPolicyRequest",g,function(l){return e.cmsService.updateSavedPolicy(l)},e.dispatch),0)})};
_.x2f.prototype.createSavedPolicy=function(a,b,c,e){var g=this,k;return _.n(function(l){k={externalOwnerId:a,policyName:b,policyDescription:e,policyRules:{rules:c},mask:_.w2f.mask};return l.yield(_.Mp("CreateCmsSavedPolicyRequest",k,function(m){return g.cmsService.createSavedPolicy(m)},g.dispatch),0)})};
_.x2f[_.Tr]=[_.Yz,_.Np];_.qe().addProvider({provide:_.x2f,useClass:_.x2f});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
