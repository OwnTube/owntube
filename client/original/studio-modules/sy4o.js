"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var wvi,vvi;wvi=function(a,b,c){return new vvi(new _.h$b(a,c),b)};
_.xvi=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};
_.yvi=function(a,b){this.maxLength=a;this.errorMessage=b};
_.yvi.prototype.validate=function(a){return _.Nn(a.length<=this.maxLength,this.errorMessage)};
vvi=function(a,b){this.adBlockingApi=a;this.baseContextFactory=b};
_.zvi=[{provide:vvi,useFactory:wvi,deps:[_.Zz,_.$z,_.aA]}];_.Avi=function(a,b,c){_.JB.call(this,"#AdBlockingCategoryInfos",a,b);this.adBlockingCategoryService=c};
_.G(_.Avi,_.JB);
_.Avi.prototype.fetchData=function(a){var b=this,c,e;return _.n(function(g){switch(g.nextAddress){case 1:g.setCatchFinallyBlocks(2);var k=g.yield,l=b.adBlockingCategoryService;var m={context:l.baseContextFactory(),externalChannelId:a};l=l.adBlockingApi;m=_.Hy(l.$apiClient,{body:m,httpMethod:"POST",methodId:"youtubei.partnerprogram.get_ad_blocking_category_infos",path:"/"+l.gapiVersion+"/partnerprogram/get_ad_blocking_category_infos"});return k.call(g,m,4);case 4:c=g.yieldResult;g.leaveTryBlock(3);break;
case 2:throw e=g.enterCatchBlock(),_.ri("Fetching ad blocking category infos failed for "+a+" ",e),e;case 3:return g.return(c)}})};
_.Avi[_.Tr]=[_.vj,_.Yz,vvi];_.qe().addProvider({provide:_.Avi,useClass:_.Avi});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
