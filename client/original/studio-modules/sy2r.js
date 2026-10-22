"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
/*


 Copyright (c) 2015-2018 Google, Inc., Netflix, Inc., Microsoft Corp. and contributors
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var GTg,HTg,KTg,NTg,PTg,QTg,STg,UTg,VTg,WTg,aUg,bUg,cUg,eUg,dUg,fUg,pUg,uUg,vUg,xUg,zUg,BUg,GUg,OUg,gUg;_.bL=function(a,b,c){return a+c*(b-a)};
GTg=function(a,b){a&&(b=a.indexOf(b),0<=b&&a.splice(b,1))};
_.cL=function(a){return typeof a==="function"};
HTg=function(a){return a instanceof dL||a&&"closed"in a&&_.cL(a.remove)&&_.cL(a.add)&&_.cL(a.unsubscribe)};
_.ITg=function(){};
KTg=function(a){JTg(function(){throw a;})};
_.LTg=function(a){return a};
_.MTg=function(a){return a.length===0?_.LTg:a.length===1?a[0]:function(b){return a.reduce(function(c,e){return e(c)},b)}};
NTg=function(a){var b;return(b=a!=null?a:void 0)!=null?b:Promise};
_.OTg=function(a,b){return new _.eL(function(c){var e=0;return b.schedule(function(){e===a.length?c.complete():(c.next(a[e++]),c.closed||this.schedule())})})};
PTg=function(a,b){if(!a)throw Error("rC");return new _.eL(function(c){var e=new dL;e.add(b.schedule(function(){var g=a[Symbol.asyncIterator]();e.add(b.schedule(function(){var k=this;g.next().then(function(l){l.done?c.complete():(c.next(l.value),k.schedule())})}))}));
return e})};
QTg=function(a,b,c,e){b=b.schedule(function(){try{c.call(this)}catch(g){a.error(g)}},e===void 0?0:e);
a.add(b);return b};
STg=function(a,b){return new _.eL(function(c){var e;c.add(b.schedule(function(){e=a[RTg]();QTg(c,b,function(){var g=e.next(),k=g.value;g.done?c.complete():(c.next(k),this.schedule())})}));
return function(){var g;return _.cL((g=e)==null?void 0:g.return)&&e.return()}})};
UTg=function(a,b){return new _.eL(function(c){var e=new dL;e.add(b.schedule(function(){var g=a[TTg]();e.add(g.subscribe({next:function(k){e.add(b.schedule(function(){return c.next(k)}))},
error:function(k){e.add(b.schedule(function(){return c.error(k)}))},
complete:function(){e.add(b.schedule(function(){return c.complete()}))}}))}));
return e})};
VTg=function(a,b){return new _.eL(function(c){return b.schedule(function(){return a.then(function(e){c.add(b.schedule(function(){c.next(e);c.add(b.schedule(function(){return c.complete()}))}))},function(e){c.add(b.schedule(function(){return c.error(e)}))})})})};
WTg=function(a){return new TypeError("sC`"+(a!==null&&typeof a==="object"?"an invalid object":"'"+a+"'"))};
_.YTg=function(a,b){if(a!=null){if(_.cL(a[TTg]))return UTg(a,b);if(XTg(a))return _.OTg(a,b);if(_.cL(a==null?void 0:a.then))return VTg(a,b);if(Symbol.asyncIterator&&_.cL(a==null?void 0:a[Symbol.asyncIterator]))return PTg(a,b);if(_.cL(a==null?void 0:a[RTg]))return STg(a,b)}throw WTg(a);};
_.$Tg=function(a,b){return b?_.YTg(a,b):_.ZTg(a)};
_.ZTg=function(a){if(a instanceof _.eL)return a;if(a!=null){if(_.cL(a[TTg]))return aUg(a);if(XTg(a))return bUg(a);if(_.cL(a==null?void 0:a.then))return cUg(a);if(Symbol.asyncIterator&&_.cL(a==null?void 0:a[Symbol.asyncIterator]))return dUg(a);if(_.cL(a==null?void 0:a[RTg]))return eUg(a)}throw WTg(a);};
aUg=function(a){return new _.eL(function(b){var c=a[TTg]();if(_.cL(c.subscribe))return c.subscribe(b);throw new TypeError("tC");})};
bUg=function(a){return new _.eL(function(b){for(var c=0;c<a.length&&!b.closed;c++)b.next(a[c]);b.complete()})};
cUg=function(a){return new _.eL(function(b){a.then(function(c){b.closed||(b.next(c),b.complete())},function(c){return b.error(c)}).then(null,KTg)})};
eUg=function(a){return new _.eL(function(b){for(var c=a[RTg]();!b.closed;){var e=c.next(),g=e.value;e.done?b.complete():b.next(g)}return function(){return _.cL(c==null?void 0:c.return)&&c.return()}})};
dUg=function(a){return new _.eL(function(b){fUg(a,b).catch(function(c){return b.error(c)})})};
fUg=function(a,b){var c,e,g,k,l,m;return _.n(function(p){switch(p.nextAddress){case 1:p.setCatchFinallyBlocks(2,3);var r=a[Symbol.asyncIterator];k=r!==void 0?r.call(a):new gUg(_.f(a));case 5:return e=void 0,p.yield(k.next(),8);case 8:e=p.yieldResult;if(e.done){p.jumpTo(3);break}l=e.value;b.next(l);p.jumpTo(5);break;case 3:p.enterFinallyBlock();p.setFinallyBlock(9);if(!e||e.done||!(g=k.return)){p.jumpTo(9);break}return p.yield(g.call(k),9);case 9:p.enterFinallyBlock(0,0,1);if(c)throw c.error;p.leaveFinallyBlock(10,
1);break;case 10:p.leaveFinallyBlock(4);break;case 2:m=p.enterCatchBlock();c={error:m};p.jumpTo(3);break;case 4:b.complete(),p.jumpToEnd()}})};
_.hUg=function(a,b){return b?_.OTg(a,b):bUg(a)};
_.iUg=function(a){return _.cL(a[a.length-1])?a.pop():void 0};
_.jUg=function(a){var b=a[a.length-1];return b&&_.cL(b.schedule)?a.pop():void 0};
_.mUg=function(a){return new Promise(function(b,c){var e=new kUg({next:function(g){b(g);e.unsubscribe()},
error:c,complete:function(){c(new _.lUg)}});
a.subscribe(e)})};
_.fL=function(a){return function(b){if(_.cL(b==null?void 0:b.lift))return b.lift(function(c){try{return a(c,this)}catch(e){this.error(e)}});
throw new TypeError("uC");}};
_.nUg=function(){return _.fL(function(a,b){var c=null;a._refCount++;var e=new _.gL(b,void 0,void 0,void 0,function(){if(!a||a._refCount<=0||0<--a._refCount)c=null;else{var g=a._connection,k=c;c=null;!g||k&&g!==k||g.unsubscribe();b.unsubscribe()}});
a.subscribe(e);e.closed||(c=a.connect())})};
_.hL=function(a,b){return _.fL(function(c,e){var g=0;c.subscribe(new _.gL(e,function(k){e.next(a.call(b,k,g++))}))})};
pUg=function(a){return _.hL(function(b){return oUg(b)?a.apply(null,_.u(b)):a(b)})};
uUg=function(a){if(a.length===1){var b=a[0];if(qUg(b))return{args:b,keys:null};if(b&&typeof b==="object"&&rUg(b)===sUg)return a=tUg(b),{args:a.map(function(c){return b[c]}),
keys:a}}return{args:a,keys:null}};
_.wUg=function(){var a=_.ca.apply(0,arguments),b=_.jUg(a),c=_.iUg(a);a=uUg(a);var e=a.args,g=a.keys;if(e.length===0)return _.$Tg([],b);b=new _.eL(vUg(e,b,g?function(k){for(var l={},m=0;m<k.length;m++)l[g[m]]=k[m];return l}:_.LTg));
return c?b.pipe(pUg(c)):b};
vUg=function(a,b,c){c=c===void 0?_.LTg:c;return function(e){xUg(b,function(){for(var g=a.length,k=Array(g),l=g,m=a.map(function(){return!1}),p=!0,r={i$jscomp$1714:0};r.i$jscomp$1714<g;r={i$jscomp$1714:r.i$jscomp$1714},r.i$jscomp$1714++)xUg(b,function(t){return function(){_.$Tg(a[t.i$jscomp$1714],b).subscribe(new yUg(e,function(v){k[t.i$jscomp$1714]=v;
p&&(m[t.i$jscomp$1714]=!0,p=!m.every(_.LTg));p||e.next(c(k.slice()))},function(){return--l===0}))}}(r),e)},e)}};
xUg=function(a,b,c){a?c.add(a.schedule(b)):b()};
zUg=function(a,b,c,e,g,k,l,m){var p=[],r=0,t=0,v=!1,w=function(z){return r<e?x(z):p.push(z)},x=function(z){k&&b.next(z);
r++;_.ZTg(c(z,t++)).subscribe(new _.gL(b,function(A){g==null||g(A);k?w(A):b.next(A)},void 0,function(){r--;
for(var A={};p.length&&r<e;A={bufferedValue:void 0})A.bufferedValue=p.shift(),l?b.add(l.schedule(function(C){return function(){return x(C.bufferedValue)}}(A))):x(A.bufferedValue);
!v||p.length||r||b.complete()}))};
a.subscribe(new _.gL(b,w,void 0,function(){v=!0;!v||p.length||r||b.complete()}));
return function(){p=null;m==null||m()}};
_.AUg=function(a,b,c){c=c===void 0?Infinity:c;if(_.cL(b))return _.AUg(function(e,g){return _.hL(function(k,l){return b(e,k,g,l)})(_.ZTg(a(e,g)))},c);
typeof b==="number"&&(c=b);return _.fL(function(e,g){return zUg(e,g,a,c)})};
BUg=function(a){a=a===void 0?Infinity:a;return _.AUg(_.LTg,a)};
_.CUg=function(){var a=_.ca.apply(0,arguments);return BUg(1)(_.hUg(a,_.jUg(a)))};
_.DUg=function(a,b,c,e){_.cL(c)&&(e=c,c=void 0);if(e)return _.DUg(a,b,c).pipe(pUg(e));e=_.f(_.cL(a.addEventListener)&&_.cL(a.removeEventListener)?EUg.map(function(l){return function(m){return a[l](b,m,c)}}):_.cL(a.addListener)&&_.cL(a.removeListener)?FUg.map(GUg(a,b)):_.cL(a.on)&&_.cL(a.off)?HUg.map(GUg(a,b)):[]);
var g=e.next().value,k=e.next().value;return!g&&XTg(a)?_.AUg(function(l){return _.DUg(l,b,c)})(_.hUg(a)):new _.eL(function(l){if(!g)throw new TypeError("vC");
var m=function(){var p=_.ca.apply(0,arguments);return l.next(1<p.length?p:p[0])};
g(m);return function(){return k(m)}})};
GUg=function(a,b){return function(c){return function(e){return a[c](b,e)}}};
_.JUg=function(a,b,c){a=a===void 0?0:a;c=c===void 0?_.IUg:c;var e=-1;b!=null&&(b&&_.cL(b.schedule)?c=b:e=b);return new _.eL(function(g){var k=a instanceof Date&&!isNaN(a)?+a-c.now():a;k<0&&(k=0);var l=0;return c.schedule(function(){g.closed||(g.next(l++),0<=e?this.schedule(void 0,e):g.complete())},k)})};
_.LUg=function(){var a=_.ca.apply(0,arguments),b=_.jUg(a),c=typeof a[a.length-1]==="number"?a.pop():Infinity;return a.length?a.length===1?_.ZTg(a[0]):BUg(c)(_.hUg(a,b)):_.KUg};
_.iL=function(a,b){return _.fL(function(c,e){var g=0;c.subscribe(new _.gL(e,function(k){return a.call(b,k,g++)&&e.next(k)}))})};
_.MUg=function(a){return _.fL(function(b,c){var e=null,g=!1,k;e=b.subscribe(new _.gL(c,void 0,function(l){k=_.ZTg(a(l,_.MUg(a)(b)));e?(e.unsubscribe(),e=null,k.subscribe(c)):g=!0}));
g&&(e.unsubscribe(),e=null,k.subscribe(c))})};
_.NUg=function(a){return a<=0?function(){return _.KUg}:_.fL(function(b,c){var e=0;
b.subscribe(new _.gL(c,function(g){++e<=a&&(c.next(g),a<=e&&c.complete())}))})};
_.jL=function(a,b){b=b===void 0?_.LTg:b;var c;a=(c=a)!=null?c:OUg;return _.fL(function(e,g){var k,l=!0;e.subscribe(new _.gL(g,function(m){var p=b(m);if(l||!a(k,p))l=!1,k=p,g.next(m)}))})};
OUg=function(a,b){return a===b};
_.kL=function(){var a=_.ca.apply(0,arguments),b=_.jUg(a);return _.fL(function(c,e){(b?_.CUg(a,c,b):_.CUg(a,c)).subscribe(e)})};
_.lL=function(a,b){return _.fL(function(c,e){var g=null,k=0,l=!1;c.subscribe(new _.gL(e,function(m){var p;(p=g)==null||p.unsubscribe();var r=0,t=k++;_.ZTg(a(m,t)).subscribe(g=new _.gL(e,function(v){return e.next(b?b(m,v,t,r++):v)},void 0,function(){g=null;
l&&!g&&e.complete()}))},void 0,function(){(l=!0,!g)&&e.complete()}))})};
gUg=function(a){function b(c){return Promise.resolve(c.value).then(function(e){return{value:e,done:!!c.done}})}
this[Symbol.asyncIterator]=function(){return this};
this[Symbol.iterator]=function(){return a};
this.next=function(c){return(new Promise(function(e){e(a.next(c))})).then(b)};
this["throw"]=function(c){return(new Promise(function(e,g){var k=a["throw"];k!==void 0?e(k.call(a,c)):(e=a["return"],e!==void 0&&e.call(a),g(new TypeError("l")))})).then(b)};
a["return"]!==void 0&&(this["return"]=function(c){return(new Promise(function(e){e(a["return"](c))})).then(b)})};var PUg=function(a){var b=Error.call(this,a?a.length+" errors occurred during unsubscription:\n"+a.map(function(c,e){return e+1+") "+c.toString()}).join("\n  "):"");
this.message=b.message;"stack"in b&&(this.stack=b.stack);this.errors=a;Object.setPrototypeOf(this,this.constructor.prototype);this.name="UnsubscriptionError"};
_.G(PUg,Error);var dL=function(a){this.initialTeardown=a;this.closed=!1;this._teardowns=this._parentage=null};
_.d=dL.prototype;
_.d.unsubscribe=function(){if(!this.closed){this.closed=!0;var a=this._parentage;if(Array.isArray(a)){var b=_.f(a),c=b.next();try{for(;!c.done;c=b.next())c.value.remove(this)}finally{_.h(b,c)}}else a==null||a.remove(this);b=this.initialTeardown;if(_.cL(b))try{b()}catch(m){var e=m instanceof PUg?m.errors:[m]}var g=this._teardowns;if(g){this._teardowns=null;b=_.f(g);c=b.next();try{for(;!c.done;c=b.next()){var k=c.value;try{_.cL(k)?k():k.unsubscribe()}catch(m){var l=void 0;e=(l=e)!=null?l:[];m instanceof
PUg?e=[].concat(_.u(e),_.u(m.errors)):e.push(m)}}}finally{_.h(b,c)}}if(e)throw new PUg(e);}};
_.d.add=function(a){if(a&&a!==this)if(this.closed)_.cL(a)?a():a.unsubscribe();else{if(a instanceof dL){if(a.closed||a._hasParent(this))return;a._addParent(this)}var b;(this._teardowns=(b=this._teardowns)!=null?b:[]).push(a)}};
_.d._hasParent=function(a){var b=this._parentage;return b===a||Array.isArray(b)&&b.includes(a)};
_.d._addParent=function(a){var b=this._parentage;this._parentage=Array.isArray(b)?(b.push(a),b):b?[b,a]:a};
_.d._removeParent=function(a){var b=this._parentage;b===a?this._parentage=null:Array.isArray(b)&&GTg(b,a)};
_.d.remove=function(a){var b=this._teardowns;b&&GTg(b,a);a instanceof dL&&a._removeParent(this)};
var QUg=new dL;QUg.closed=!0;dL.EMPTY=QUg;var JTg=function(){return setTimeout.apply(null,_.u(_.ca.apply(0,arguments)))};var mL=function(a){dL.call(this);this.isStopped=!1;this.destination=a instanceof mL?a:new RUg(!a||_.cL(a)?{next:a!=null?a:void 0}:a);HTg(a)&&a.add(this)};
_.G(mL,dL);mL.EMPTY=dL.EMPTY;mL.create=function(a,b,c){return new kUg(a,b,c)};
_.d=mL.prototype;_.d.next=function(a){this.isStopped||this._next(a)};
_.d.error=function(a){this.isStopped||(this.isStopped=!0,this._error(a))};
_.d.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())};
_.d.unsubscribe=function(){this.closed||(this.isStopped=!0,dL.prototype.unsubscribe.call(this))};
_.d._next=function(a){this.destination.next(a)};
_.d._error=function(a){this.destination.error(a);this.unsubscribe()};
_.d._complete=function(){this.destination.complete();this.unsubscribe()};
var RUg=function(a){this.partialObserver=a};
RUg.prototype.next=function(a){var b=this.partialObserver;if(b.next)try{b.next(a)}catch(c){KTg(c)}};
RUg.prototype.error=function(a){var b=this.partialObserver;if(b.error)try{b.error(a)}catch(c){KTg(c)}else KTg(a)};
RUg.prototype.complete=function(){var a=this.partialObserver;if(a.complete)try{a.complete()}catch(b){KTg(b)}};
var kUg=function(a,b,c){mL.call(this);this.destination=new RUg(_.cL(a)||!a?{next:a!=null?a:void 0,error:b!=null?b:void 0,complete:c!=null?c:void 0}:a)};
_.G(kUg,mL);kUg.EMPTY=mL.EMPTY;kUg.create=mL.create;var TTg=typeof Symbol==="function"&&Symbol.observable||"@@observable";_.eL=function(a){a&&(this._subscribe=a)};
_.d=_.eL.prototype;_.d.lift=function(a){var b=new _.eL;b.source=this;b.operator=a;return b};
_.d.subscribe=function(a,b,c){a=a&&a instanceof mL||a&&_.cL(a.next)&&_.cL(a.error)&&_.cL(a.complete)&&HTg(a)?a:new kUg(a,b,c);b=this.operator;c=this.source;a.add(b?b.call(a,c):c?this._subscribe(a):this._trySubscribe(a));return a};
_.d._trySubscribe=function(a){try{return this._subscribe(a)}catch(b){a.error(b)}};
_.d.forEach=function(a,b){var c=this;b=NTg(b);return new b(function(e,g){var k=c.subscribe(function(l){try{a(l)}catch(m){g(m),k==null||k.unsubscribe()}},g,e)})};
_.d._subscribe=function(a){var b;return(b=this.source)==null?void 0:b.subscribe(a)};
_.eL.prototype[TTg]=function(){return this};
_.eL.prototype.pipe=function(){var a=_.ca.apply(0,arguments);return a.length?_.MTg(a)(this):this};
_.eL.prototype.toPromise=function(a){var b=this;a=NTg(a);return new a(function(c,e){var g;b.subscribe(function(k){return g=k},function(k){return e(k)},function(){return c(g)})})};
_.eL.create=function(a){return new _.eL(a)};var SUg=function(){var a=Error.call(this,"object unsubscribed");this.message=a.message;"stack"in a&&(this.stack=a.stack);Object.setPrototypeOf(this,this.constructor.prototype);this.name="ObjectUnsubscribedError"};
_.G(SUg,Error);_.nL=function(){this.observers=[];this.hasError=this.isStopped=this.closed=!1;this.thrownError=null};
_.G(_.nL,_.eL);_.d=_.nL.prototype;_.d.lift=function(a){var b=new TUg(this,this);b.operator=a;return b};
_.d._throwIfClosed=function(){if(this.closed)throw new SUg;};
_.d.next=function(a){this._throwIfClosed();if(!this.isStopped){var b=this.observers.slice();b=_.f(b);var c=b.next();try{for(;!c.done;c=b.next())c.value.next(a)}finally{_.h(b,c)}}};
_.d.error=function(a){this._throwIfClosed();if(!this.isStopped){this.hasError=this.isStopped=!0;this.thrownError=a;for(var b=this.observers;b.length;)b.shift().error(a)}};
_.d.complete=function(){this._throwIfClosed();if(!this.isStopped){this.isStopped=!0;for(var a=this.observers;a.length;)a.shift().complete()}};
_.d.unsubscribe=function(){this.isStopped=this.closed=!0;this.observers=null};
_.J.Object.defineProperties(_.nL.prototype,{observed:{configurable:!0,enumerable:!0,get:function(){var a;return((a=this.observers)==null?void 0:a.length)>0}}});
_.d=_.nL.prototype;_.d._trySubscribe=function(a){this._throwIfClosed();return _.eL.prototype._trySubscribe.call(this,a)};
_.d._subscribe=function(a){this._throwIfClosed();this._checkFinalizedStatuses(a);return this._innerSubscribe(a)};
_.d._innerSubscribe=function(a){var b=this,c=this.isStopped,e=this.observers;return this.hasError||c?dL.EMPTY:(e.push(a),new dL(function(){return GTg(b.observers,a)}))};
_.d._checkFinalizedStatuses=function(a){var b=this.thrownError,c=this.isStopped;this.hasError?a.error(b):c&&a.complete()};
_.d.asObservable=function(){var a=new _.eL;a.source=this;return a};
_.nL.create=function(a,b){return new TUg(a,b)};
var TUg=function(a,b){_.nL.call(this);this.destination=a;this.source=b};
_.G(TUg,_.nL);TUg.create=_.nL.create;TUg.prototype.next=function(a){var b,c;(b=this.destination)==null||(c=b.next)==null||c.call(b,a)};
TUg.prototype.error=function(a){var b,c;(b=this.destination)==null||(c=b.error)==null||c.call(b,a)};
TUg.prototype.complete=function(){var a,b;(a=this.destination)==null||(b=a.complete)==null||b.call(a)};
TUg.prototype._subscribe=function(a){var b,c;return(c=(b=this.source)==null?void 0:b.subscribe(a))!=null?c:dL.EMPTY};_.UUg=function(a){_.nL.call(this);this._value=a};
_.G(_.UUg,_.nL);_.UUg.create=_.nL.create;_.J.Object.defineProperties(_.UUg.prototype,{value:{configurable:!0,enumerable:!0,get:function(){return this.getValue()}}});
_.UUg.prototype._subscribe=function(a){var b=_.nL.prototype._subscribe.call(this,a);!b.closed&&a.next(this._value);return b};
_.UUg.prototype.getValue=function(){var a=this.thrownError,b=this._value;if(this.hasError)throw a;this._throwIfClosed();return b};
_.UUg.prototype.next=function(a){_.nL.prototype.next.call(this,this._value=a)};_.KUg=new _.eL(function(a){return a.complete()});var RTg=typeof Symbol==="function"&&Symbol.iterator?Symbol.iterator:"@@iterator";var XTg=function(a){return a&&typeof a.length==="number"&&typeof a!=="function"};var VUg={now:function(){return(VUg.delegate||Date).now()},
delegate:void 0};_.WUg=function(a,b,c){a=a===void 0?Infinity:a;b=b===void 0?Infinity:b;c=c===void 0?VUg:c;_.nL.call(this);this.bufferSize=a;this.windowTime=b;this.timestampProvider=c;this.buffer=[];this.infiniteTimeWindow=!0;this.infiniteTimeWindow=b===Infinity;this.bufferSize=Math.max(1,a);this.windowTime=Math.max(1,b)};
_.G(_.WUg,_.nL);_.WUg.create=_.nL.create;_.WUg.prototype.next=function(a){var b=this.buffer,c=this.infiniteTimeWindow,e=this.timestampProvider,g=this.windowTime;this.isStopped||(b.push(a),!c&&b.push(e.now()+g));XUg(this);_.nL.prototype.next.call(this,a)};
_.WUg.prototype._subscribe=function(a){this._throwIfClosed();XUg(this);for(var b=this._innerSubscribe(a),c=this.infiniteTimeWindow,e=this.buffer.slice(),g=0;g<e.length&&!a.closed;g+=c?1:2)a.next(e[g]);this._checkFinalizedStatuses(a);return b};
var XUg=function(a){var b=a.bufferSize,c=a.timestampProvider,e=a.buffer;a=a.infiniteTimeWindow;var g=(a?1:2)*b;b<Infinity&&g<e.length&&e.splice(0,e.length-g);if(!a){b=c.now();c=0;for(a=1;a<e.length&&e[a]<=b;a+=2)c=a;c&&e.splice(0,c+1)}};var ZUg=function(a,b){b=b===void 0?YUg:b;this.schedulerActionCtor=a;this.now=b};
ZUg.prototype.schedule=function(a,b,c){b=b===void 0?0:b;return(new this.schedulerActionCtor(this,a)).schedule(c,b)};
var YUg=VUg.now;_.lUg=function(){var a=Error.call(this,"no elements in sequence");this.message=a.message;"stack"in a&&(this.stack=a.stack);Object.setPrototypeOf(this,this.constructor.prototype);this.name="EmptyError"};
_.G(_.lUg,Error);_.gL=function(a,b,c,e,g){mL.call(this,a);this.onUnsubscribe=g;b&&(this._next=function(k){try{b(k)}catch(l){this.destination.error(l)}});
c&&(this._error=function(k){try{c(k)}catch(l){this.destination.error(l)}this.unsubscribe()});
e&&(this._complete=function(){try{e()}catch(k){this.destination.error(k)}this.unsubscribe()})};
_.G(_.gL,mL);_.gL.EMPTY=mL.EMPTY;_.gL.create=mL.create;_.gL.prototype.unsubscribe=function(){var a;this.closed||(a=this.onUnsubscribe)!=null&&a.call(this);mL.prototype.unsubscribe.call(this)};_.$Ug=function(a,b){this.source=a;this.subjectFactory=b;this._subject=null;this._refCount=0;this._connection=null};
_.G(_.$Ug,_.eL);_.$Ug.create=_.eL.create;_.d=_.$Ug.prototype;_.d._subscribe=function(a){return this.getSubject().subscribe(a)};
_.d.getSubject=function(){var a=this._subject;if(!a||a.isStopped)this._subject=this.subjectFactory();return this._subject};
_.d._teardown=function(){this._refCount=0;var a=this._connection;this._subject=this._connection=null;a==null||a.unsubscribe()};
_.d.connect=function(){var a=this,b=this._connection;if(!b){b=this._connection=new dL;var c=this.getSubject();b.add(this.source.subscribe(new _.gL(c,void 0,function(e){a._teardown();c.error(e)},function(){a._teardown();
c.complete()},function(){return a._teardown()})));
b.closed&&(this._connection=null,b=dL.EMPTY)}return b};
_.d.refCount=function(){return _.nUg()(this)};var oUg=Array.isArray;var qUg=Array.isArray,aVg=Object,rUg=aVg.getPrototypeOf,sUg=aVg.prototype,tUg=aVg.keys;var yUg=function(a,b,c){mL.call(this,a);this._next=b;this.shouldComplete=c};
_.G(yUg,mL);yUg.EMPTY=mL.EMPTY;yUg.create=mL.create;yUg.prototype._complete=function(){this.shouldComplete()?mL.prototype._complete.call(this):this.unsubscribe()};var FUg=["addListener","removeListener"],EUg=["addEventListener","removeEventListener"],HUg=["on","off"];var bVg=function(){dL.call(this)};
_.G(bVg,dL);bVg.EMPTY=dL.EMPTY;bVg.prototype.schedule=function(){return this};var cVg=function(a,b){return setInterval.apply(null,[a,b].concat(_.u(_.ca.apply(2,arguments))))};var dVg=function(a,b){dL.call(this);this.scheduler=a;this.work=b;this.pending=!1};
_.G(dVg,bVg);dVg.EMPTY=bVg.EMPTY;dVg.prototype.schedule=function(a,b){b=b===void 0?0:b;if(this.closed)return this;this.state=a;a=this.id;var c=this.scheduler;a!=null&&(this.id=eVg(this,c,a,b));this.pending=!0;this.delay=b;this.id=this.id||this.requestAsyncId(c,this.id,b);return this};
dVg.prototype.requestAsyncId=function(a,b,c){c=c===void 0?0:c;return cVg(a.flush.bind(a,this),c)};
var eVg=function(a,b,c,e){e=e===void 0?0:e;if(e!=null&&a.delay===e&&a.pending===!1)return c;clearInterval(c)};
dVg.prototype.execute=function(a,b){if(this.closed)return Error("wC");this.pending=!1;if(a=this._execute(a,b))return a;this.pending===!1&&this.id!=null&&(this.id=eVg(this,this.scheduler,this.id,null))};
dVg.prototype._execute=function(a){var b=!1;try{this.work(a)}catch(e){b=!0;var c=!!e&&e||Error(e)}if(b)return this.unsubscribe(),c};
dVg.prototype.unsubscribe=function(){if(!this.closed){var a=this.id,b=this.scheduler,c=b.actions;this.work=this.state=this.scheduler=null;this.pending=!1;GTg(c,this);a!=null&&(this.id=eVg(this,b,a,null));this.delay=null;bVg.prototype.unsubscribe.call(this)}};var fVg=function(a,b){b=b===void 0?YUg:b;ZUg.call(this,a,b);this.actions=[];this.active=!1;this.scheduled=void 0};
_.G(fVg,ZUg);fVg.prototype.flush=function(a){var b=this.actions;if(this.active)b.push(a);else{var c;this.active=!0;do if(c=a.execute(a.state,a.delay))break;while(a=b.shift());this.active=!1;if(c){for(;a=b.shift();)a.unsubscribe();throw c;}}};_.IUg=new fVg(dVg);_.gVg=new _.eL(_.ITg);_.hVg=Array.isArray;var iVg=function(a,b){dVg.call(this,a,b);this.scheduler=a;this.work=b};
_.G(iVg,dVg);iVg.EMPTY=dVg.EMPTY;iVg.prototype.schedule=function(a,b){b=b===void 0?0:b;if(b>0)return dVg.prototype.schedule.call(this,a,b);this.delay=b;this.state=a;this.scheduler.flush(this);return this};
iVg.prototype.execute=function(a,b){return b>0||this.closed?dVg.prototype.execute.call(this,a,b):this._execute(a,b)};
iVg.prototype.requestAsyncId=function(a,b,c){c=c===void 0?0:c;return c!=null&&c>0||c==null&&this.delay>0?dVg.prototype.requestAsyncId.call(this,a,b,c):a.flush(this)};var jVg=function(){fVg.apply(this,arguments)};
_.G(jVg,fVg);_.kVg=new jVg(iVg);
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
