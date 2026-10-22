"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var rui,qui;rui=function(a,b,c){return new qui(new _.X9b(a,c),b)};
_.sui=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};
_.tui=function(a,b){this.maxLength=a;this.errorMessage=b};
_.tui.prototype.validate=function(a){return _.Ln(a.length<=this.maxLength,this.errorMessage)};
qui=function(a,b){this.adBlockingApi=a;this.baseContextFactory=b};
_.uui=[{provide:qui,useFactory:rui,deps:[_.Yz,_.Zz,_.$z]}];_.vui=function(a,b,c){_.HB.call(this,"#AdBlockingCategoryInfos",a,b);this.adBlockingCategoryService=c};
_.G(_.vui,_.HB);
_.vui.prototype.fetchData=function(a){var b=this,c,e;return _.n(function(g){switch(g.nextAddress){case 1:g.setCatchFinallyBlocks(2);var k=g.yield,l=b.adBlockingCategoryService;var m={context:l.baseContextFactory(),externalChannelId:a};l=l.adBlockingApi;m=_.Gy(l.$apiClient,{body:m,httpMethod:"POST",methodId:"youtubei.partnerprogram.get_ad_blocking_category_infos",path:"/"+l.gapiVersion+"/partnerprogram/get_ad_blocking_category_infos"});return k.call(g,m,4);case 4:c=g.yieldResult;g.leaveTryBlock(3);break;
case 2:throw e=g.enterCatchBlock(),_.pi("Fetching ad blocking category infos failed for "+a+" ",e),e;case 3:return g.return(c)}})};
_.vui[_.Tr]=[_.sj,_.Xz,qui];_.ne().addProvider({provide:_.vui,useClass:_.vui});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
