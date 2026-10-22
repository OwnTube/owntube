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
var QSg,RSg,USg,XSg,ZSg,$Sg,bTg,dTg,eTg,fTg,kTg,lTg,mTg,oTg,nTg,pTg,zTg,ETg,FTg,HTg,JTg,LTg,QTg,YTg,qTg;_.cL=function(a,b,c){return a+c*(b-a)};
QSg=function(a,b){a&&(b=a.indexOf(b),0<=b&&a.splice(b,1))};
_.dL=function(a){return typeof a==="function"};
RSg=function(a){return a instanceof eL||a&&"closed"in a&&_.dL(a.remove)&&_.dL(a.add)&&_.dL(a.unsubscribe)};
_.SSg=function(){};
USg=function(a){TSg(function(){throw a;})};
_.VSg=function(a){return a};
_.WSg=function(a){return a.length===0?_.VSg:a.length===1?a[0]:function(b){return a.reduce(function(c,e){return e(c)},b)}};
XSg=function(a){var b;return(b=a!=null?a:void 0)!=null?b:Promise};
_.YSg=function(a,b){return new _.fL(function(c){var e=0;return b.schedule(function(){e===a.length?c.complete():(c.next(a[e++]),c.closed||this.schedule())})})};
ZSg=function(a,b){if(!a)throw Error("mC");return new _.fL(function(c){var e=new eL;e.add(b.schedule(function(){var g=a[Symbol.asyncIterator]();e.add(b.schedule(function(){var k=this;g.next().then(function(l){l.done?c.complete():(c.next(l.value),k.schedule())})}))}));
return e})};
$Sg=function(a,b,c,e){b=b.schedule(function(){try{c.call(this)}catch(g){a.error(g)}},e===void 0?0:e);
a.add(b);return b};
bTg=function(a,b){return new _.fL(function(c){var e;c.add(b.schedule(function(){e=a[aTg]();$Sg(c,b,function(){var g=e.next(),k=g.value;g.done?c.complete():(c.next(k),this.schedule())})}));
return function(){var g;return _.dL((g=e)==null?void 0:g.return)&&e.return()}})};
dTg=function(a,b){return new _.fL(function(c){var e=new eL;e.add(b.schedule(function(){var g=a[cTg]();e.add(g.subscribe({next:function(k){e.add(b.schedule(function(){return c.next(k)}))},
error:function(k){e.add(b.schedule(function(){return c.error(k)}))},
complete:function(){e.add(b.schedule(function(){return c.complete()}))}}))}));
return e})};
eTg=function(a,b){return new _.fL(function(c){return b.schedule(function(){return a.then(function(e){c.add(b.schedule(function(){c.next(e);c.add(b.schedule(function(){return c.complete()}))}))},function(e){c.add(b.schedule(function(){return c.error(e)}))})})})};
fTg=function(a){return new TypeError("nC`"+(a!==null&&typeof a==="object"?"an invalid object":"'"+a+"'"))};
_.hTg=function(a,b){if(a!=null){if(_.dL(a[cTg]))return dTg(a,b);if(gTg(a))return _.YSg(a,b);if(_.dL(a==null?void 0:a.then))return eTg(a,b);if(Symbol.asyncIterator&&_.dL(a==null?void 0:a[Symbol.asyncIterator]))return ZSg(a,b);if(_.dL(a==null?void 0:a[aTg]))return bTg(a,b)}throw fTg(a);};
_.jTg=function(a,b){return b?_.hTg(a,b):_.iTg(a)};
_.iTg=function(a){if(a instanceof _.fL)return a;if(a!=null){if(_.dL(a[cTg]))return kTg(a);if(gTg(a))return lTg(a);if(_.dL(a==null?void 0:a.then))return mTg(a);if(Symbol.asyncIterator&&_.dL(a==null?void 0:a[Symbol.asyncIterator]))return nTg(a);if(_.dL(a==null?void 0:a[aTg]))return oTg(a)}throw fTg(a);};
kTg=function(a){return new _.fL(function(b){var c=a[cTg]();if(_.dL(c.subscribe))return c.subscribe(b);throw new TypeError("oC");})};
lTg=function(a){return new _.fL(function(b){for(var c=0;c<a.length&&!b.closed;c++)b.next(a[c]);b.complete()})};
mTg=function(a){return new _.fL(function(b){a.then(function(c){b.closed||(b.next(c),b.complete())},function(c){return b.error(c)}).then(null,USg)})};
oTg=function(a){return new _.fL(function(b){for(var c=a[aTg]();!b.closed;){var e=c.next(),g=e.value;e.done?b.complete():b.next(g)}return function(){return _.dL(c==null?void 0:c.return)&&c.return()}})};
nTg=function(a){return new _.fL(function(b){pTg(a,b).catch(function(c){return b.error(c)})})};
pTg=function(a,b){var c,e,g,k,l,m;return _.n(function(p){switch(p.nextAddress){case 1:p.setCatchFinallyBlocks(2,3);var r=a[Symbol.asyncIterator];k=r!==void 0?r.call(a):new qTg(_.f(a));case 5:return e=void 0,p.yield(k.next(),8);case 8:e=p.yieldResult;if(e.done){p.jumpTo(3);break}l=e.value;b.next(l);p.jumpTo(5);break;case 3:p.enterFinallyBlock();p.setFinallyBlock(9);if(!e||e.done||!(g=k.return)){p.jumpTo(9);break}return p.yield(g.call(k),9);case 9:p.enterFinallyBlock(0,0,1);if(c)throw c.error;p.leaveFinallyBlock(10,
1);break;case 10:p.leaveFinallyBlock(4);break;case 2:m=p.enterCatchBlock();c={error:m};p.jumpTo(3);break;case 4:b.complete(),p.jumpToEnd()}})};
_.rTg=function(a,b){return b?_.YSg(a,b):lTg(a)};
_.sTg=function(a){return _.dL(a[a.length-1])?a.pop():void 0};
_.tTg=function(a){var b=a[a.length-1];return b&&_.dL(b.schedule)?a.pop():void 0};
_.wTg=function(a){return new Promise(function(b,c){var e=new uTg({next:function(g){b(g);e.unsubscribe()},
error:c,complete:function(){c(new _.vTg)}});
a.subscribe(e)})};
_.gL=function(a){return function(b){if(_.dL(b==null?void 0:b.lift))return b.lift(function(c){try{return a(c,this)}catch(e){this.error(e)}});
throw new TypeError("pC");}};
_.xTg=function(){return _.gL(function(a,b){var c=null;a._refCount++;var e=new _.hL(b,void 0,void 0,void 0,function(){if(!a||a._refCount<=0||0<--a._refCount)c=null;else{var g=a._connection,k=c;c=null;!g||k&&g!==k||g.unsubscribe();b.unsubscribe()}});
a.subscribe(e);e.closed||(c=a.connect())})};
_.iL=function(a,b){return _.gL(function(c,e){var g=0;c.subscribe(new _.hL(e,function(k){e.next(a.call(b,k,g++))}))})};
zTg=function(a){return _.iL(function(b){return yTg(b)?a.apply(null,_.u(b)):a(b)})};
ETg=function(a){if(a.length===1){var b=a[0];if(ATg(b))return{args:b,keys:null};if(b&&typeof b==="object"&&BTg(b)===CTg)return a=DTg(b),{args:a.map(function(c){return b[c]}),
keys:a}}return{args:a,keys:null}};
_.GTg=function(){var a=_.ba.apply(0,arguments),b=_.tTg(a),c=_.sTg(a);a=ETg(a);var e=a.args,g=a.keys;if(e.length===0)return _.jTg([],b);b=new _.fL(FTg(e,b,g?function(k){for(var l={},m=0;m<k.length;m++)l[g[m]]=k[m];return l}:_.VSg));
return c?b.pipe(zTg(c)):b};
FTg=function(a,b,c){c=c===void 0?_.VSg:c;return function(e){HTg(b,function(){for(var g=a.length,k=Array(g),l=g,m=a.map(function(){return!1}),p=!0,r={i$jscomp$1716:0};r.i$jscomp$1716<g;r={i$jscomp$1716:r.i$jscomp$1716},r.i$jscomp$1716++)HTg(b,function(t){return function(){_.jTg(a[t.i$jscomp$1716],b).subscribe(new ITg(e,function(v){k[t.i$jscomp$1716]=v;
p&&(m[t.i$jscomp$1716]=!0,p=!m.every(_.VSg));p||e.next(c(k.slice()))},function(){return--l===0}))}}(r),e)},e)}};
HTg=function(a,b,c){a?c.add(a.schedule(b)):b()};
JTg=function(a,b,c,e,g,k,l,m){var p=[],r=0,t=0,v=!1,w=function(z){return r<e?x(z):p.push(z)},x=function(z){k&&b.next(z);
r++;_.iTg(c(z,t++)).subscribe(new _.hL(b,function(A){g==null||g(A);k?w(A):b.next(A)},void 0,function(){r--;
for(var A={};p.length&&r<e;A={bufferedValue:void 0})A.bufferedValue=p.shift(),l?b.add(l.schedule(function(C){return function(){return x(C.bufferedValue)}}(A))):x(A.bufferedValue);
!v||p.length||r||b.complete()}))};
a.subscribe(new _.hL(b,w,void 0,function(){v=!0;!v||p.length||r||b.complete()}));
return function(){p=null;m==null||m()}};
_.KTg=function(a,b,c){c=c===void 0?Infinity:c;if(_.dL(b))return _.KTg(function(e,g){return _.iL(function(k,l){return b(e,k,g,l)})(_.iTg(a(e,g)))},c);
typeof b==="number"&&(c=b);return _.gL(function(e,g){return JTg(e,g,a,c)})};
LTg=function(a){a=a===void 0?Infinity:a;return _.KTg(_.VSg,a)};
_.MTg=function(){var a=_.ba.apply(0,arguments);return LTg(1)(_.rTg(a,_.tTg(a)))};
_.NTg=function(a,b,c,e){_.dL(c)&&(e=c,c=void 0);if(e)return _.NTg(a,b,c).pipe(zTg(e));e=_.f(_.dL(a.addEventListener)&&_.dL(a.removeEventListener)?OTg.map(function(l){return function(m){return a[l](b,m,c)}}):_.dL(a.addListener)&&_.dL(a.removeListener)?PTg.map(QTg(a,b)):_.dL(a.on)&&_.dL(a.off)?RTg.map(QTg(a,b)):[]);
var g=e.next().value,k=e.next().value;return!g&&gTg(a)?_.KTg(function(l){return _.NTg(l,b,c)})(_.rTg(a)):new _.fL(function(l){if(!g)throw new TypeError("qC");
var m=function(){var p=_.ba.apply(0,arguments);return l.next(1<p.length?p:p[0])};
g(m);return function(){return k(m)}})};
QTg=function(a,b){return function(c){return function(e){return a[c](b,e)}}};
_.TTg=function(a,b,c){a=a===void 0?0:a;c=c===void 0?_.STg:c;var e=-1;b!=null&&(b&&_.dL(b.schedule)?c=b:e=b);return new _.fL(function(g){var k=a instanceof Date&&!isNaN(a)?+a-c.now():a;k<0&&(k=0);var l=0;return c.schedule(function(){g.closed||(g.next(l++),0<=e?this.schedule(void 0,e):g.complete())},k)})};
_.VTg=function(){var a=_.ba.apply(0,arguments),b=_.tTg(a),c=typeof a[a.length-1]==="number"?a.pop():Infinity;return a.length?a.length===1?_.iTg(a[0]):LTg(c)(_.rTg(a,b)):_.UTg};
_.jL=function(a,b){return _.gL(function(c,e){var g=0;c.subscribe(new _.hL(e,function(k){return a.call(b,k,g++)&&e.next(k)}))})};
_.WTg=function(a){return _.gL(function(b,c){var e=null,g=!1,k;e=b.subscribe(new _.hL(c,void 0,function(l){k=_.iTg(a(l,_.WTg(a)(b)));e?(e.unsubscribe(),e=null,k.subscribe(c)):g=!0}));
g&&(e.unsubscribe(),e=null,k.subscribe(c))})};
_.XTg=function(a){return a<=0?function(){return _.UTg}:_.gL(function(b,c){var e=0;
b.subscribe(new _.hL(c,function(g){++e<=a&&(c.next(g),a<=e&&c.complete())}))})};
_.kL=function(a,b){b=b===void 0?_.VSg:b;var c;a=(c=a)!=null?c:YTg;return _.gL(function(e,g){var k,l=!0;e.subscribe(new _.hL(g,function(m){var p=b(m);if(l||!a(k,p))l=!1,k=p,g.next(m)}))})};
YTg=function(a,b){return a===b};
_.lL=function(){var a=_.ba.apply(0,arguments),b=_.tTg(a);return _.gL(function(c,e){(b?_.MTg(a,c,b):_.MTg(a,c)).subscribe(e)})};
_.mL=function(a,b){return _.gL(function(c,e){var g=null,k=0,l=!1;c.subscribe(new _.hL(e,function(m){var p;(p=g)==null||p.unsubscribe();var r=0,t=k++;_.iTg(a(m,t)).subscribe(g=new _.hL(e,function(v){return e.next(b?b(m,v,t,r++):v)},void 0,function(){g=null;
l&&!g&&e.complete()}))},void 0,function(){(l=!0,!g)&&e.complete()}))})};
qTg=function(a){function b(c){return Promise.resolve(c.value).then(function(e){return{value:e,done:!!c.done}})}
this[Symbol.asyncIterator]=function(){return this};
this[Symbol.iterator]=function(){return a};
this.next=function(c){return(new Promise(function(e){e(a.next(c))})).then(b)};
this["throw"]=function(c){return(new Promise(function(e,g){var k=a["throw"];k!==void 0?e(k.call(a,c)):(e=a["return"],e!==void 0&&e.call(a),g(new TypeError("l")))})).then(b)};
a["return"]!==void 0&&(this["return"]=function(c){return(new Promise(function(e){e(a["return"](c))})).then(b)})};var ZTg=function(a){var b=Error.call(this,a?a.length+" errors occurred during unsubscription:\n"+a.map(function(c,e){return e+1+") "+c.toString()}).join("\n  "):"");
this.message=b.message;"stack"in b&&(this.stack=b.stack);this.errors=a;Object.setPrototypeOf(this,this.constructor.prototype);this.name="UnsubscriptionError"};
_.G(ZTg,Error);var eL=function(a){this.initialTeardown=a;this.closed=!1;this._teardowns=this._parentage=null};
_.d=eL.prototype;
_.d.unsubscribe=function(){if(!this.closed){this.closed=!0;var a=this._parentage;if(Array.isArray(a)){var b=_.f(a),c=b.next();try{for(;!c.done;c=b.next())c.value.remove(this)}finally{_.h(b,c)}}else a==null||a.remove(this);b=this.initialTeardown;if(_.dL(b))try{b()}catch(m){var e=m instanceof ZTg?m.errors:[m]}var g=this._teardowns;if(g){this._teardowns=null;b=_.f(g);c=b.next();try{for(;!c.done;c=b.next()){var k=c.value;try{_.dL(k)?k():k.unsubscribe()}catch(m){var l=void 0;e=(l=e)!=null?l:[];m instanceof
ZTg?e=[].concat(_.u(e),_.u(m.errors)):e.push(m)}}}finally{_.h(b,c)}}if(e)throw new ZTg(e);}};
_.d.add=function(a){if(a&&a!==this)if(this.closed)_.dL(a)?a():a.unsubscribe();else{if(a instanceof eL){if(a.closed||a._hasParent(this))return;a._addParent(this)}var b;(this._teardowns=(b=this._teardowns)!=null?b:[]).push(a)}};
_.d._hasParent=function(a){var b=this._parentage;return b===a||Array.isArray(b)&&b.includes(a)};
_.d._addParent=function(a){var b=this._parentage;this._parentage=Array.isArray(b)?(b.push(a),b):b?[b,a]:a};
_.d._removeParent=function(a){var b=this._parentage;b===a?this._parentage=null:Array.isArray(b)&&QSg(b,a)};
_.d.remove=function(a){var b=this._teardowns;b&&QSg(b,a);a instanceof eL&&a._removeParent(this)};
var $Tg=new eL;$Tg.closed=!0;eL.EMPTY=$Tg;var TSg=function(){return setTimeout.apply(null,_.u(_.ba.apply(0,arguments)))};var nL=function(a){eL.call(this);this.isStopped=!1;this.destination=a instanceof nL?a:new aUg(!a||_.dL(a)?{next:a!=null?a:void 0}:a);RSg(a)&&a.add(this)};
_.G(nL,eL);nL.EMPTY=eL.EMPTY;nL.create=function(a,b,c){return new uTg(a,b,c)};
_.d=nL.prototype;_.d.next=function(a){this.isStopped||this._next(a)};
_.d.error=function(a){this.isStopped||(this.isStopped=!0,this._error(a))};
_.d.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())};
_.d.unsubscribe=function(){this.closed||(this.isStopped=!0,eL.prototype.unsubscribe.call(this))};
_.d._next=function(a){this.destination.next(a)};
_.d._error=function(a){this.destination.error(a);this.unsubscribe()};
_.d._complete=function(){this.destination.complete();this.unsubscribe()};
var aUg=function(a){this.partialObserver=a};
aUg.prototype.next=function(a){var b=this.partialObserver;if(b.next)try{b.next(a)}catch(c){USg(c)}};
aUg.prototype.error=function(a){var b=this.partialObserver;if(b.error)try{b.error(a)}catch(c){USg(c)}else USg(a)};
aUg.prototype.complete=function(){var a=this.partialObserver;if(a.complete)try{a.complete()}catch(b){USg(b)}};
var uTg=function(a,b,c){nL.call(this);this.destination=new aUg(_.dL(a)||!a?{next:a!=null?a:void 0,error:b!=null?b:void 0,complete:c!=null?c:void 0}:a)};
_.G(uTg,nL);uTg.EMPTY=nL.EMPTY;uTg.create=nL.create;var cTg=typeof Symbol==="function"&&Symbol.observable||"@@observable";_.fL=function(a){a&&(this._subscribe=a)};
_.d=_.fL.prototype;_.d.lift=function(a){var b=new _.fL;b.source=this;b.operator=a;return b};
_.d.subscribe=function(a,b,c){a=a&&a instanceof nL||a&&_.dL(a.next)&&_.dL(a.error)&&_.dL(a.complete)&&RSg(a)?a:new uTg(a,b,c);b=this.operator;c=this.source;a.add(b?b.call(a,c):c?this._subscribe(a):this._trySubscribe(a));return a};
_.d._trySubscribe=function(a){try{return this._subscribe(a)}catch(b){a.error(b)}};
_.d.forEach=function(a,b){var c=this;b=XSg(b);return new b(function(e,g){var k=c.subscribe(function(l){try{a(l)}catch(m){g(m),k==null||k.unsubscribe()}},g,e)})};
_.d._subscribe=function(a){var b;return(b=this.source)==null?void 0:b.subscribe(a)};
_.fL.prototype[cTg]=function(){return this};
_.fL.prototype.pipe=function(){var a=_.ba.apply(0,arguments);return a.length?_.WSg(a)(this):this};
_.fL.prototype.toPromise=function(a){var b=this;a=XSg(a);return new a(function(c,e){var g;b.subscribe(function(k){return g=k},function(k){return e(k)},function(){return c(g)})})};
_.fL.create=function(a){return new _.fL(a)};var bUg=function(){var a=Error.call(this,"object unsubscribed");this.message=a.message;"stack"in a&&(this.stack=a.stack);Object.setPrototypeOf(this,this.constructor.prototype);this.name="ObjectUnsubscribedError"};
_.G(bUg,Error);_.oL=function(){this.observers=[];this.hasError=this.isStopped=this.closed=!1;this.thrownError=null};
_.G(_.oL,_.fL);_.d=_.oL.prototype;_.d.lift=function(a){var b=new cUg(this,this);b.operator=a;return b};
_.d._throwIfClosed=function(){if(this.closed)throw new bUg;};
_.d.next=function(a){this._throwIfClosed();if(!this.isStopped){var b=this.observers.slice();b=_.f(b);var c=b.next();try{for(;!c.done;c=b.next())c.value.next(a)}finally{_.h(b,c)}}};
_.d.error=function(a){this._throwIfClosed();if(!this.isStopped){this.hasError=this.isStopped=!0;this.thrownError=a;for(var b=this.observers;b.length;)b.shift().error(a)}};
_.d.complete=function(){this._throwIfClosed();if(!this.isStopped){this.isStopped=!0;for(var a=this.observers;a.length;)a.shift().complete()}};
_.d.unsubscribe=function(){this.isStopped=this.closed=!0;this.observers=null};
_.J.Object.defineProperties(_.oL.prototype,{observed:{configurable:!0,enumerable:!0,get:function(){var a;return((a=this.observers)==null?void 0:a.length)>0}}});
_.d=_.oL.prototype;_.d._trySubscribe=function(a){this._throwIfClosed();return _.fL.prototype._trySubscribe.call(this,a)};
_.d._subscribe=function(a){this._throwIfClosed();this._checkFinalizedStatuses(a);return this._innerSubscribe(a)};
_.d._innerSubscribe=function(a){var b=this,c=this.isStopped,e=this.observers;return this.hasError||c?eL.EMPTY:(e.push(a),new eL(function(){return QSg(b.observers,a)}))};
_.d._checkFinalizedStatuses=function(a){var b=this.thrownError,c=this.isStopped;this.hasError?a.error(b):c&&a.complete()};
_.d.asObservable=function(){var a=new _.fL;a.source=this;return a};
_.oL.create=function(a,b){return new cUg(a,b)};
var cUg=function(a,b){_.oL.call(this);this.destination=a;this.source=b};
_.G(cUg,_.oL);cUg.create=_.oL.create;cUg.prototype.next=function(a){var b,c;(b=this.destination)==null||(c=b.next)==null||c.call(b,a)};
cUg.prototype.error=function(a){var b,c;(b=this.destination)==null||(c=b.error)==null||c.call(b,a)};
cUg.prototype.complete=function(){var a,b;(a=this.destination)==null||(b=a.complete)==null||b.call(a)};
cUg.prototype._subscribe=function(a){var b,c;return(c=(b=this.source)==null?void 0:b.subscribe(a))!=null?c:eL.EMPTY};_.dUg=function(a){_.oL.call(this);this._value=a};
_.G(_.dUg,_.oL);_.dUg.create=_.oL.create;_.J.Object.defineProperties(_.dUg.prototype,{value:{configurable:!0,enumerable:!0,get:function(){return this.getValue()}}});
_.dUg.prototype._subscribe=function(a){var b=_.oL.prototype._subscribe.call(this,a);!b.closed&&a.next(this._value);return b};
_.dUg.prototype.getValue=function(){var a=this.thrownError,b=this._value;if(this.hasError)throw a;this._throwIfClosed();return b};
_.dUg.prototype.next=function(a){_.oL.prototype.next.call(this,this._value=a)};_.UTg=new _.fL(function(a){return a.complete()});var aTg=typeof Symbol==="function"&&Symbol.iterator?Symbol.iterator:"@@iterator";var gTg=function(a){return a&&typeof a.length==="number"&&typeof a!=="function"};var eUg={now:function(){return(eUg.delegate||Date).now()},
delegate:void 0};_.fUg=function(a,b,c){a=a===void 0?Infinity:a;b=b===void 0?Infinity:b;c=c===void 0?eUg:c;_.oL.call(this);this.bufferSize=a;this.windowTime=b;this.timestampProvider=c;this.buffer=[];this.infiniteTimeWindow=!0;this.infiniteTimeWindow=b===Infinity;this.bufferSize=Math.max(1,a);this.windowTime=Math.max(1,b)};
_.G(_.fUg,_.oL);_.fUg.create=_.oL.create;_.fUg.prototype.next=function(a){var b=this.buffer,c=this.infiniteTimeWindow,e=this.timestampProvider,g=this.windowTime;this.isStopped||(b.push(a),!c&&b.push(e.now()+g));gUg(this);_.oL.prototype.next.call(this,a)};
_.fUg.prototype._subscribe=function(a){this._throwIfClosed();gUg(this);for(var b=this._innerSubscribe(a),c=this.infiniteTimeWindow,e=this.buffer.slice(),g=0;g<e.length&&!a.closed;g+=c?1:2)a.next(e[g]);this._checkFinalizedStatuses(a);return b};
var gUg=function(a){var b=a.bufferSize,c=a.timestampProvider,e=a.buffer;a=a.infiniteTimeWindow;var g=(a?1:2)*b;b<Infinity&&g<e.length&&e.splice(0,e.length-g);if(!a){b=c.now();c=0;for(a=1;a<e.length&&e[a]<=b;a+=2)c=a;c&&e.splice(0,c+1)}};var iUg=function(a,b){b=b===void 0?hUg:b;this.schedulerActionCtor=a;this.now=b};
iUg.prototype.schedule=function(a,b,c){b=b===void 0?0:b;return(new this.schedulerActionCtor(this,a)).schedule(c,b)};
var hUg=eUg.now;_.vTg=function(){var a=Error.call(this,"no elements in sequence");this.message=a.message;"stack"in a&&(this.stack=a.stack);Object.setPrototypeOf(this,this.constructor.prototype);this.name="EmptyError"};
_.G(_.vTg,Error);_.hL=function(a,b,c,e,g){nL.call(this,a);this.onUnsubscribe=g;b&&(this._next=function(k){try{b(k)}catch(l){this.destination.error(l)}});
c&&(this._error=function(k){try{c(k)}catch(l){this.destination.error(l)}this.unsubscribe()});
e&&(this._complete=function(){try{e()}catch(k){this.destination.error(k)}this.unsubscribe()})};
_.G(_.hL,nL);_.hL.EMPTY=nL.EMPTY;_.hL.create=nL.create;_.hL.prototype.unsubscribe=function(){var a;this.closed||(a=this.onUnsubscribe)!=null&&a.call(this);nL.prototype.unsubscribe.call(this)};_.jUg=function(a,b){this.source=a;this.subjectFactory=b;this._subject=null;this._refCount=0;this._connection=null};
_.G(_.jUg,_.fL);_.jUg.create=_.fL.create;_.d=_.jUg.prototype;_.d._subscribe=function(a){return this.getSubject().subscribe(a)};
_.d.getSubject=function(){var a=this._subject;if(!a||a.isStopped)this._subject=this.subjectFactory();return this._subject};
_.d._teardown=function(){this._refCount=0;var a=this._connection;this._subject=this._connection=null;a==null||a.unsubscribe()};
_.d.connect=function(){var a=this,b=this._connection;if(!b){b=this._connection=new eL;var c=this.getSubject();b.add(this.source.subscribe(new _.hL(c,void 0,function(e){a._teardown();c.error(e)},function(){a._teardown();
c.complete()},function(){return a._teardown()})));
b.closed&&(this._connection=null,b=eL.EMPTY)}return b};
_.d.refCount=function(){return _.xTg()(this)};var yTg=Array.isArray;var ATg=Array.isArray,kUg=Object,BTg=kUg.getPrototypeOf,CTg=kUg.prototype,DTg=kUg.keys;var ITg=function(a,b,c){nL.call(this,a);this._next=b;this.shouldComplete=c};
_.G(ITg,nL);ITg.EMPTY=nL.EMPTY;ITg.create=nL.create;ITg.prototype._complete=function(){this.shouldComplete()?nL.prototype._complete.call(this):this.unsubscribe()};var PTg=["addListener","removeListener"],OTg=["addEventListener","removeEventListener"],RTg=["on","off"];var lUg=function(){eL.call(this)};
_.G(lUg,eL);lUg.EMPTY=eL.EMPTY;lUg.prototype.schedule=function(){return this};var mUg=function(a,b){return setInterval.apply(null,[a,b].concat(_.u(_.ba.apply(2,arguments))))};var nUg=function(a,b){eL.call(this);this.scheduler=a;this.work=b;this.pending=!1};
_.G(nUg,lUg);nUg.EMPTY=lUg.EMPTY;nUg.prototype.schedule=function(a,b){b=b===void 0?0:b;if(this.closed)return this;this.state=a;a=this.id;var c=this.scheduler;a!=null&&(this.id=oUg(this,c,a,b));this.pending=!0;this.delay=b;this.id=this.id||this.requestAsyncId(c,this.id,b);return this};
nUg.prototype.requestAsyncId=function(a,b,c){c=c===void 0?0:c;return mUg(a.flush.bind(a,this),c)};
var oUg=function(a,b,c,e){e=e===void 0?0:e;if(e!=null&&a.delay===e&&a.pending===!1)return c;clearInterval(c)};
nUg.prototype.execute=function(a,b){if(this.closed)return Error("rC");this.pending=!1;if(a=this._execute(a,b))return a;this.pending===!1&&this.id!=null&&(this.id=oUg(this,this.scheduler,this.id,null))};
nUg.prototype._execute=function(a){var b=!1;try{this.work(a)}catch(e){b=!0;var c=!!e&&e||Error(e)}if(b)return this.unsubscribe(),c};
nUg.prototype.unsubscribe=function(){if(!this.closed){var a=this.id,b=this.scheduler,c=b.actions;this.work=this.state=this.scheduler=null;this.pending=!1;QSg(c,this);a!=null&&(this.id=oUg(this,b,a,null));this.delay=null;lUg.prototype.unsubscribe.call(this)}};var pUg=function(a,b){b=b===void 0?hUg:b;iUg.call(this,a,b);this.actions=[];this.active=!1;this.scheduled=void 0};
_.G(pUg,iUg);pUg.prototype.flush=function(a){var b=this.actions;if(this.active)b.push(a);else{var c;this.active=!0;do if(c=a.execute(a.state,a.delay))break;while(a=b.shift());this.active=!1;if(c){for(;a=b.shift();)a.unsubscribe();throw c;}}};_.STg=new pUg(nUg);_.qUg=new _.fL(_.SSg);_.rUg=Array.isArray;var sUg=function(a,b){nUg.call(this,a,b);this.scheduler=a;this.work=b};
_.G(sUg,nUg);sUg.EMPTY=nUg.EMPTY;sUg.prototype.schedule=function(a,b){b=b===void 0?0:b;if(b>0)return nUg.prototype.schedule.call(this,a,b);this.delay=b;this.state=a;this.scheduler.flush(this);return this};
sUg.prototype.execute=function(a,b){return b>0||this.closed?nUg.prototype.execute.call(this,a,b):this._execute(a,b)};
sUg.prototype.requestAsyncId=function(a,b,c){c=c===void 0?0:c;return c!=null&&c>0||c==null&&this.delay>0?nUg.prototype.requestAsyncId.call(this,a,b,c):a.flush(this)};var tUg=function(){pUg.apply(this,arguments)};
_.G(tUg,pUg);_.uUg=new tUg(sUg);
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
