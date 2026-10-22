"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var qvg;_.ovg=function(a,b){this.test=a;this.validator=b};
_.ovg.prototype.validate=function(a){return this.test()?this.validator.validate(a):null};
_.pvg=function(a,b){b=b===void 0?!1:b;this.errorMessage=a;this.optional=b;this.httpSchemeRegex=/^https?:\/\//};
qvg=function(a,b){return a.httpSchemeRegex.test(b)?b:"http://"+b};
_.pvg.prototype.validate=function(a){if(this.optional&&!a)return null;a=qvg(this,a);try{var b=_.hi(a);if(b.toString()!==a)return{message:this.errorMessage};var c=b.getDomain().split("."),e=c.length>1&&c.every(function(g){return!!g});
return _.Ln(e,this.errorMessage)}catch(g){return{message:this.errorMessage}}};
var rvg,svg,tvg=((rvg=globalThis.ShadyDOM)==null?0:rvg.inUse)&&((svg=globalThis.ShadyDOM)==null?void 0:svg.noPatch)===!0?globalThis.ShadyDOM.wrap:function(a){return a},uvg=function(a,b,c){var e=tvg(a._$startNode).parentNode;
b=b===void 0?a._$endNode:b._$startNode;if(c===void 0)c=tvg(e).insertBefore(document.createComment(""),b),e=tvg(e).insertBefore(document.createComment(""),b),c=new _.kje(c,e,a,a.options);else{var g=tvg(c._$endNode).nextSibling,k=c._$parent,l=k!==a;if(l){var m,p;(p=(m=c)._$reparentDisconnectables)==null||p.call(m,a);c._$parent=a;var r;c._$notifyConnectionChanged!==void 0&&(r=a._$isConnected)!==k._$isConnected&&c._$notifyConnectionChanged(r)}if(g!==b||l)for(a=c._$startNode;a!==g;)m=tvg(a).nextSibling,
tvg(e).insertBefore(a,b),a=m}return c},vvg=function(a,b,c){a._$setValue(b,c===void 0?a:c);
return a},wvg={},xvg=function(a){a._$clear();
a._$startNode.remove()};var yvg=function(a,b,c){for(var e=new Map;b<=c;b++)e.set(a[b],b);return e},zvg=function(a){if(a.type!==2)throw Error("QA");
};
_.G(zvg,_.Pje);zvg.prototype._getValuesAndKeys=function(a,b,c){var e;c===void 0?c=b:b!==void 0&&(e=b);b=[];var g=[],k=0;a=_.f(a);var l=a.next();try{for(;!l.done;l=a.next()){var m=l.value;b[k]=e?e(m,k):k;g[k]=c(m,k);k++}}finally{_.h(a,l)}return{values:g,keys:b}};
zvg.prototype.render=function(a,b,c){return this._getValuesAndKeys(a,b,c).values};
zvg.prototype.update=function(a,b){b=_.f(b);var c=b.next().value;var e=b.next().value;var g=b.next().value;b=a._$committedValue;e=this._getValuesAndKeys(c,e,g);c=e.values;e=e.keys;if(!Array.isArray(b))return this._itemKeys=e,c;var k,l=(k=this._itemKeys)!=null?k:this._itemKeys=[];k=[];g=0;for(var m=b.length-1,p=0,r=c.length-1;g<=m&&p<=r;)if(b[g]===null)g++;else if(b[m]===null)m--;else if(l[g]===e[p])k[p]=vvg(b[g],c[p]),g++,p++;else if(l[m]===e[r])k[r]=vvg(b[m],c[r]),m--,r--;else if(l[g]===e[r])k[r]=
vvg(b[g],c[r]),uvg(a,k[r+1],b[g]),g++,r--;else if(l[m]===e[p])k[p]=vvg(b[m],c[p]),uvg(a,b[g],b[m]),m--,p++;else{if(t===void 0){var t=yvg(e,p,r);var v=yvg(l,g,m)}if(t.has(l[g]))if(t.has(l[m])){var w=v.get(e[p]),x=w!==void 0?b[w]:null;x===null?(w=uvg(a,b[g]),vvg(w,c[p]),k[p]=w):(k[p]=vvg(x,c[p]),uvg(a,b[g],x),b[w]=null);p++}else xvg(b[m]),m--;else xvg(b[g]),g++}for(;p<=r;)t=uvg(a,k[r+1]),vvg(t,c[p]),k[p++]=t;for(;g<=m;)t=b[g++],t!==null&&xvg(t);this._itemKeys=e;b=k;b=b===void 0?wvg:b;a._$committedValue=
b;return _.KJa};
_.Avg=_.Oje(zvg);_.bJ=function(){var a={},b=_.f(_.ba.apply(0,arguments)),c=b.next();try{for(;!c.done;c=b.next()){var e=c.value;if(typeof e==="string"){var g=_.f(e.split(" ")),k=g.next();try{for(;!k.done;k=g.next()){var l=k.value;l&&(a[l]=!0)}}finally{_.h(g,k)}}else typeof e==="object"&&Object.assign(a,e)}}finally{_.h(b,c)}return(0,_.Rje)(a)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
