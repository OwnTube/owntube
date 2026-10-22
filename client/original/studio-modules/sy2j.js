"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var lHg;_.jHg=function(a,b){return a&&a.status&&a.status==="SUCCESS"&&a.data.features?_.wk(a.data,b):!1};
lHg=function(a,b,c,e){return new _.kHg(new _.X9b(a,c),b,e)};
_.kHg=function(a,b,c){this.contractTermsApi=a;this.baseContextFactory=b;this.delegationContext=c};
_.mHg=function(a,b){var c=a.contractTermsApi;a=Object.assign({},b,{context:a.baseContextFactory(),delegationContext:a.delegationContext});return _.Gy(c.$apiClient,{body:a,httpMethod:"POST",methodId:"youtubei.partnerprogram.sign_creator_contract",path:"/"+c.gapiVersion+"/partnerprogram/sign_creator_contract"})};
_.Di([{provide:_.kHg,useFactory:lHg,deps:[_.Yz,_.Zz,_.$z,_.fEe]}]);
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
