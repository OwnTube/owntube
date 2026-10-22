"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var x1f,C1f,D1f,E1f,F1f,G1f,H1f;
_.v1f=function(a,b){var c={};if(!b.mask)return c;b.mask.description&&(c.description=a.description);b.mask.isMatchPolicy&&(c.isMatchPolicy=a.isMatchPolicy);b.mask.isReadonly&&(c.isReadonly=a.isReadonly);b.mask.name&&(c.name=a.name);b.mask.policyAppliedSummary&&(c.policyAppliedSummary=a.policyAppliedSummary);b.mask.policyId&&(c.policyId=a.policyId);b.mask.responseStatus&&(c.responseStatus=a.responseStatus);b.mask.rules&&(c.rules=a.rules);b.mask.timeUpdatedSecs&&(c.timeUpdatedSecs=a.timeUpdatedSecs);
_.Ij(c,b);return c};
_.oH=function(a,b){var c=_.xo(b.start);b=_.xo(b.end);c.setHours(6);b.setHours(6);c=_.Fqb(c,b,2);return a+": "+c};
_.w1f=function(){return"Asset type"};
_.pH=function(){return"Unable to perform selected actions. Try again later."};
x1f=function(a,b){var c=b.policies,e;a=(e=a.listPoliciesMask)==null?void 0:e.mask;if(!c||!a)return{"#CmsPolicyData":{}};c=_.ml(a,c,function(g){var k;return(k=g.policyId)==null?void 0:k.id});
e=b.defaultUsagePolicy&&_.ml(a,[b.defaultUsagePolicy],function(){return"DEFAULT_USAGE_POLICY"});
b=b.defaultMatchPolicy&&_.ml(a,[b.defaultMatchPolicy],function(){return"DEFAULT_MATCH_POLICY"});
return{"#CmsPolicyData":Object.assign({},c,b,e)}};
_.qH=function(a,b){switch(a.name){case "GREATER_EQUAL":return b.greaterEqual({wrapper:"",value:a.value});case "GREATER_THAN":return b.greaterThan?b.greaterThan({wrapper:"",value:a.value}):"";case "LESS_EQUAL":return b.lessEqual({wrapper:"",value:a.value});case "LESS_THAN":return b.lessThan?b.lessThan({wrapper:"",value:a.value}):"";default:return""}};
_.rH=function(a,b){switch(a.name){case "GREATER_EQUAL":return _.Yq(b.greaterEqual,String(a.value));case "GREATER_THAN":return b.greaterThan?_.Yq(b.greaterThan,String(a.value)):_.am().build();case "LESS_EQUAL":return _.Yq(b.lessEqual,String(a.value));case "LESS_THAN":return b.lessThan?_.Yq(b.lessThan,String(a.value)):_.am().build();default:return _.am().build()}};
_.sH=function(a){return function(b){return a+": "+b.value}};
_.tH=function(a){return function(b){return _.bm(a+": "+b.value)}};
_.uH=function(a){return a?function(){return{veType:a}}:void 0};
_.y1f=function(a){return a.isValid?{isValid:!0,value:{name:"IS",value:a.ids.join(", ")}}:{isValid:!1,error:a.errorMessage}};
_.z1f=function(a){a=(0,_.tlf)(a);return a.isValid?{isValid:!0,values:[{name:"IS",value:a.ids.join(", ")}]}:{isValid:!1}};
_.A1f=function(a){return{title:_.ak(),valueToChipLabel:_.sH(_.ak()),valueToCompactChipLabel:_.tH(_.ak()),contentElement:"ytcp-filter-text-dialog-content",onContentElementInit:function(b){b.operatorOptions=[_.xD];b.valueValidator=function(c){return _.y1f((0,_.tlf)(c))}},
logging:_.uH(a),inputValueIsValidForSuggestion:_.z1f}};
C1f=function(a,b,c,e){return new B1f(new _.qEb(a,c),b,e)};
D1f={mask:{description:!0},responseType:void 0};E1f={mask:{isMatchPolicy:!0},responseType:void 0};F1f={mask:{name:!0},responseType:void 0};G1f={mask:{policyId:{all:!0}},responseType:void 0};H1f={mask:{timeUpdatedSecs:!0},responseType:void 0};_.vH=_.r5a(G1f,F1f,D1f,E1f,_.TFe,H1f);_.I1f=_.r5a(G1f,F1f,D1f,E1f,{mask:{isReadonly:!0},responseType:void 0},_.TFe,H1f,{mask:{policyAppliedSummary:{all:!0}},responseType:void 0});var B1f=function(a,b,c){this.cmsApi=a;this.baseContextFactory=b;this.delegationContext=c};
B1f.prototype.withContext=function(a){return Object.assign({},a,{context:this.baseContextFactory(),delegationContext:this.delegationContext})};
_.Di([{provide:B1f,useFactory:C1f,deps:[_.Yz,_.Zz,_.$z,_.fEe]}]);_.wH=function(a,b){this.dispatch=a;this.policyService=b};
_.wH.prototype.get=function(a,b,c){b=a.policyIdsByRequest[_.hj(b)];if(!_.ol(b))return b;a=this.list(a,c);a=_.ol(a)&&a.data;if(b&&a){c=[];var e=_.f(Object.entries(a)),g=e.next();try{for(;!g.done;g=e.next()){var k=_.f(g.value),l=k.next().value,m=k.next().value,p=l,r=m;r&&p!=="DEFAULT_USAGE_POLICY"&&p!=="DEFAULT_MATCH_POLICY"&&b.data.includes(p)&&c.push(r)}}finally{_.h(e,g)}return _.ql({policies:c,defaultUsagePolicy:a.DEFAULT_USAGE_POLICY,defaultMatchPolicy:a.DEFAULT_MATCH_POLICY})}};
_.wH.prototype.list=function(a,b){a=a.entitiesWithMask["#CmsPolicyData"];var c=Object.keys(a);a=_.T9a(a,c,b.mask,function(e){return _.v1f(e,b)});
return _.wl(a)};
_.wH.prototype.fetch=function(a,b){var c=this,e,g;return _.n(function(k){if(k.nextAddress==1){c.dispatch({type:"POLICY_LIST_FETCH_START",payload:{request:a},meta:_.Cj(b===void 0?"FOREGROUND":b,"START")});k.setCatchFinallyBlocks(2);var l=k.yield,m=c.policyService;var p=m.cmsApi;m=m.withContext(a);p=_.Gy(p.$apiClient,{body:m,httpMethod:"POST",methodId:"youtubei.cms.list_cms_policies",path:"/"+p.gapiVersion+"/cms/list_cms_policies"});return l.call(k,p,4)}if(k.nextAddress!=2){e=k.yieldResult;if(!e.policies)throw Error("Ry`"+
a.externalOwnerId);c.dispatch({type:"POLICY_LIST_FETCH_COMPLETE",payload:{request:a,response:e},meta:_.Cj(b===void 0?"FOREGROUND":b,"END",x1f(a,e))});return k.leaveTryBlock(0)}g=k.enterCatchBlock();c.dispatch({type:"POLICY_LIST_FETCH_ERROR",payload:{request:a},meta:_.Cj(b===void 0?"FOREGROUND":b,"END")});_.pi("PolicyFetcher",g);throw g;})};
_.wH.prototype.getWithAutoFetch=function(a,b,c,e){(a=this.get(a,b,c))||_.Tl(this.fetch(b,e));return a||_.ul};
_.Di([_.Ci(_.wH,[_.Xz,B1f])]);_.J1f=function(a,b){this.dispatch=a;this.cmsService=b};
_.J1f.prototype.updateSavedPolicy=function(a,b,c){var e=this,g;return _.n(function(k){g={externalOwnerId:a,policyId:{id:b},policyUpdate:c,mask:_.I1f.mask};return k.yield(_.Kp("UpdateCmsSavedPolicyRequest",g,function(l){return e.cmsService.updateSavedPolicy(l)},e.dispatch),0)})};
_.J1f.prototype.createSavedPolicy=function(a,b,c,e){var g=this,k;return _.n(function(l){k={externalOwnerId:a,policyName:b,policyDescription:e,policyRules:{rules:c},mask:_.I1f.mask};return l.yield(_.Kp("CreateCmsSavedPolicyRequest",k,function(m){return g.cmsService.createSavedPolicy(m)},g.dispatch),0)})};
_.J1f[_.Tr]=[_.Xz,_.Lp];_.ne().addProvider({provide:_.J1f,useClass:_.J1f});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
