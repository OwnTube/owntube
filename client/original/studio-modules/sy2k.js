"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var $Hg;_.YHg=function(a,b){return a&&a.status&&a.status==="SUCCESS"&&a.data.features?_.zk(a.data,b):!1};
$Hg=function(a,b,c,e){return new _.ZHg(new _.h$b(a,c),b,e)};
_.ZHg=function(a,b,c){this.contractTermsApi=a;this.baseContextFactory=b;this.delegationContext=c};
_.aIg=function(a,b){var c=a.contractTermsApi;a=Object.assign({},b,{context:a.baseContextFactory(),delegationContext:a.delegationContext});return _.Hy(c.$apiClient,{body:a,httpMethod:"POST",methodId:"youtubei.partnerprogram.sign_creator_contract",path:"/"+c.gapiVersion+"/partnerprogram/sign_creator_contract"})};
_.Gi([{provide:_.ZHg,useFactory:$Hg,deps:[_.Zz,_.$z,_.aA,_.JEe]}]);
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
