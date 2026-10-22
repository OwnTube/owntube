"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var dwg;_.bwg=function(a,b){this.test=a;this.validator=b};
_.bwg.prototype.validate=function(a){return this.test()?this.validator.validate(a):null};
_.cwg=function(a,b){b=b===void 0?!1:b;this.errorMessage=a;this.optional=b;this.httpSchemeRegex=/^https?:\/\//};
dwg=function(a,b){return a.httpSchemeRegex.test(b)?b:"http://"+b};
_.cwg.prototype.validate=function(a){if(this.optional&&!a)return null;a=dwg(this,a);try{var b=_.ji(a);if(b.toString()!==a)return{message:this.errorMessage};var c=b.getDomain().split("."),e=c.length>1&&c.every(function(g){return!!g});
return _.Nn(e,this.errorMessage)}catch(g){return{message:this.errorMessage}}};
var ewg,fwg,gwg=((ewg=globalThis.ShadyDOM)==null?0:ewg.inUse)&&((fwg=globalThis.ShadyDOM)==null?void 0:fwg.noPatch)===!0?globalThis.ShadyDOM.wrap:function(a){return a},hwg=function(a,b,c){var e=gwg(a._$startNode).parentNode;
b=b===void 0?a._$endNode:b._$startNode;if(c===void 0)c=gwg(e).insertBefore(document.createComment(""),b),e=gwg(e).insertBefore(document.createComment(""),b),c=new _.Oje(c,e,a,a.options);else{var g=gwg(c._$endNode).nextSibling,k=c._$parent,l=k!==a;if(l){var m,p;(p=(m=c)._$reparentDisconnectables)==null||p.call(m,a);c._$parent=a;var r;c._$notifyConnectionChanged!==void 0&&(r=a._$isConnected)!==k._$isConnected&&c._$notifyConnectionChanged(r)}if(g!==b||l)for(a=c._$startNode;a!==g;)m=gwg(a).nextSibling,
gwg(e).insertBefore(a,b),a=m}return c},iwg=function(a,b,c){a._$setValue(b,c===void 0?a:c);
return a},jwg={},kwg=function(a){a._$clear();
a._$startNode.remove()};var lwg=function(a,b,c){for(var e=new Map;b<=c;b++)e.set(a[b],b);return e},mwg=function(a){if(a.type!==2)throw Error("VA");
};
_.G(mwg,_.ske);mwg.prototype._getValuesAndKeys=function(a,b,c){var e;c===void 0?c=b:b!==void 0&&(e=b);b=[];var g=[],k=0;a=_.f(a);var l=a.next();try{for(;!l.done;l=a.next()){var m=l.value;b[k]=e?e(m,k):k;g[k]=c(m,k);k++}}finally{_.h(a,l)}return{values:g,keys:b}};
mwg.prototype.render=function(a,b,c){return this._getValuesAndKeys(a,b,c).values};
mwg.prototype.update=function(a,b){b=_.f(b);var c=b.next().value;var e=b.next().value;var g=b.next().value;b=a._$committedValue;e=this._getValuesAndKeys(c,e,g);c=e.values;e=e.keys;if(!Array.isArray(b))return this._itemKeys=e,c;var k,l=(k=this._itemKeys)!=null?k:this._itemKeys=[];k=[];g=0;for(var m=b.length-1,p=0,r=c.length-1;g<=m&&p<=r;)if(b[g]===null)g++;else if(b[m]===null)m--;else if(l[g]===e[p])k[p]=iwg(b[g],c[p]),g++,p++;else if(l[m]===e[r])k[r]=iwg(b[m],c[r]),m--,r--;else if(l[g]===e[r])k[r]=
iwg(b[g],c[r]),hwg(a,k[r+1],b[g]),g++,r--;else if(l[m]===e[p])k[p]=iwg(b[m],c[p]),hwg(a,b[g],b[m]),m--,p++;else{if(t===void 0){var t=lwg(e,p,r);var v=lwg(l,g,m)}if(t.has(l[g]))if(t.has(l[m])){var w=v.get(e[p]),x=w!==void 0?b[w]:null;x===null?(w=hwg(a,b[g]),iwg(w,c[p]),k[p]=w):(k[p]=iwg(x,c[p]),hwg(a,b[g],x),b[w]=null);p++}else kwg(b[m]),m--;else kwg(b[g]),g++}for(;p<=r;)t=hwg(a,k[r+1]),iwg(t,c[p]),k[p++]=t;for(;g<=m;)t=b[g++],t!==null&&kwg(t);this._itemKeys=e;b=k;b=b===void 0?jwg:b;a._$committedValue=
b;return _.UJa};
_.nwg=_.rke(mwg);_.aJ=function(){var a={},b=_.f(_.ca.apply(0,arguments)),c=b.next();try{for(;!c.done;c=b.next()){var e=c.value;if(typeof e==="string"){var g=_.f(e.split(" ")),k=g.next();try{for(;!k.done;k=g.next()){var l=k.value;l&&(a[l]=!0)}}finally{_.h(g,k)}}else typeof e==="object"&&Object.assign(a,e)}}finally{_.h(b,c)}return(0,_.uke)(a)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
