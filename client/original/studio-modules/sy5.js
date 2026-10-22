"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var UNf,bOf,cOf,dOf,eOf,fOf,gOf,hOf,iOf,jOf,lOf,aOf;
UNf=function(a,b){for(var c=[],e=a.length,g=0,k=[],l,m,p=0;p<e;){switch(g){case 0:var r=a.indexOf("<",p);if(r<0){if(c.length===0)return a;c.push(a.substring(p));p=e}else c.push(a.substring(p,r)),m=r,p=r+1,_.eIc?(_.fIc.lastIndex=p,r=_.fIc.exec(a)):(_.fIc.lastIndex=0,r=_.fIc.exec(a.substring(p))),r?(k=["<",r[0]],l=r[1],g=1,p+=r[0].length):c.push("<");break;case 1:r=a.charAt(p++);switch(r){case "'":case '"':var t=a.indexOf(r,p);t<0?p=e:(k.push(r,a.substring(p,t+1)),p=t+1);break;case ">":k.push(r);c.push(b(k.join(""),
l));g=0;k=[];m=l=null;break;default:k.push(r)}break;default:throw Error();}g===1&&p>=e&&(p=m+1,c.push("<"),g=0,k=[],m=l=null)}return c.join("")};
_.VNf=function(a,b,c){return a!==null&&b in a?a[b]:c};
_.$Nf=function(a,b,c,e,g){g=g===void 0?!1:g;a:{a=a(b||_.WNf,c);b=g;b=b===void 0?!1:b;e=e||_.nd();g=a&&a.renderAsElement?a.renderAsElement():null;if(!g){var k=_.XNf(a);b?(a=_.YNf(e),a.innerHTML=_.ua(k),k=_.ZNf(a).childNodes):(g=e.createElement("DIV"),g.innerHTML=_.ua(k),k=g.childNodes)}if(k.length==1&&(a=k[0],a.nodeType==1)){k=a;break a}g||(g=e.createElement("DIV"),g.append.apply(g,_.u(k)));k=g}return k};
_.YNf=function(a){var b,c;return(c=(b=a.getDocument())[aOf])!=null?c:b[aOf]=a.createElement("TEMPLATE")};
_.ZNf=function(a){var b=a.content;a.textContent="";return b};
_.XNf=function(a){return _.Ga(a)?a.toSafeHtml&&(a=a.toSafeHtml(),a instanceof _.ra)?a:_.Nc("zSoyz"):_.Nc(String(a))};
bOf=function(a){if(a!=null)switch(a.contentDir){case 1:return 1;case -1:return-1;case 0:return 0}return null};
cOf=/[\x00\x22\x26\x27\x3c\x3e]/g;dOf=/</g;eOf=/([a-zA-Z][a-zA-Z0-9:\-]*)[\t\n\r\u0020]*=[\t\n\r\u0020]*("[^"]*"|'[^']*')/g;fOf=/[\x00\x22\x27\x3c\x3e]/g;gOf=function(a){for(var b=[],c=0,e=a.length;c<e;++c){var g=a[c];g.charAt(1)=="/"?(g=b.lastIndexOf(g),g<0?a[c]="":(a[c]=b.slice(g).reverse().join(""),b.length=g)):g=="<li>"&&b.lastIndexOf("</ol>")<0&&b.lastIndexOf("</ul>")<0?a[c]="":_.dIc.test(g)||b.push("</"+g.substring(1))}return b.reverse().join("")};
_.sG=function(a,b){a.parts!==void 0?a.parts.push(b):a.content+=b;return a};
_.tG=function(a,b){a.parts!==void 0?a.parts.push(b):b instanceof _.gIc?b.isStatic()?a.content+=b.getContent():(a.parts=[a.content,b],a.content=void 0):a.content+=b;return a};
hOf={"\x00":"&#0;","\t":"&#9;","\n":"&#10;","\v":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;",'"':"&quot;","&":"&amp;","'":"&#39;","-":"&#45;","/":"&#47;","<":"&lt;","=":"&#61;",">":"&gt;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"};iOf=function(a){return hOf[a]};
jOf=function(a,b){if(!b)return UNf(String(a),function(){return""}).replace(dOf,"&lt;");
a=String(a).replace(/\[/g,"&#91;");var c=[],e=[];a=UNf(a,function(k,l){if(l&&(l=l.toLowerCase(),b.hasOwnProperty(l)&&b[l])){var m=c.length,p="</",r="";if(k.charAt(1)!=="/"){p="<";for(var t;t=eOf.exec(k);)if(t[1]&&t[1].toLowerCase()==="dir"){if(k=t[2]){if(k.charAt(0)==="'"||k.charAt(0)==='"')k=k.substr(1,k.length-2);k=k.toLowerCase();if(k==="ltr"||k==="rtl"||k==="auto")r=' dir="'+k+'"'}break}eOf.lastIndex=0}c[m]=p+l+">";e[m]=r;return"["+m+"]"}return""});
a=String(a).replace(fOf,iOf);var g=gOf(c);a=a.replace(/\[(\d+)\]/g,function(k,l){return e[l]&&c[l]?c[l].substr(0,c[l].length-1)+e[l]+">":c[l]});
return a+g};
_.uG=function(a){_.Goa(a,_.Hoa,_.Ioa)?(a=jOf(a.getContent()),a=String(a).replace(fOf,iOf)):a=String(a).replace(cOf,iOf);return a};
_.kOf=function(a){return _.Goa(a,_.Hoa,_.Ioa)?a:a instanceof _.ra?(0,_.aIc)(_.ua(a).toString()):(0,_.aIc)(String(String(a)).replace(cOf,iOf),bOf(a))};
lOf=function(a,b){a=a.replace(/<\//g,"<\\/").replace(/\]\]>/g,"]]\\>");return b?a.replace(/{/g," \\{").replace(/}/g," \\}").replace(/\/\*/g,"/ *").replace(/\\$/,"\\ "):a};
_.vG={};_.mOf=function(a){return _.Goa(a,_.WHc,_.ZHc)?lOf(a.getContent(),!1):a==null?"":a instanceof _.nba?lOf(_.pba(a),!1):lOf(String(a),!0)};
aOf=Symbol("yy");_.WNf={};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
