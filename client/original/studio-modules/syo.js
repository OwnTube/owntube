"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var R0f,S0f,T0f,V0f,W0f,Y0f,X0f,$0f,a1f,d1f,c1f;_.O0f=function(){_.ca.apply(0,arguments)};
_.P0f=function(a,b){_.O0f.apply(null,_.u(a));return _.wd(b)};
_.Q0f=function(a){return function(b,c){a!=null&&a.disabled||(b.disabledPolySiReactions!=null||(b.disabledPolySiReactions=[]),b.disabledPolySiReactions.push(c),_.s_a(b,"ready",function(){var e,g=(e=this.signalProxy)==null?void 0:e.owner;if(!g)throw Error("Ol`"+this);e=_.ud(g);try{_.Poa(this[c].bind(this),void 0,"m")}finally{_.ud(e)}}))}};
R0f=function(a,b,c){a=a.signalProxy;(a==null?0:a.registerDerivedRootSignal)&&a.registerDerivedRootSignal(b,c)};
_.hH=function(a){return function(b,c,e){a!=null&&a.disabled||(b.disabledPolySiReactions!=null||(b.disabledPolySiReactions=[]),b.disabledPolySiReactions.push(c),_.s_a(b,"created",function(){var g,k,l=((k=e.get)!=null?k:(g=Object.getOwnPropertyDescriptor(b,"__compute__"+c))==null?void 0:g.value).bind(this),m=_.Ld(function(){return l()},{debugName:void 0,
equals:a==null?void 0:a.equals},"rqu8qd");Object.defineProperty(this,c,{get:function(){return m()}});
R0f(this,c,m)}))}};
S0f=function(a,b,c){a.__signalCache!=null||(a.__signalCache=new Map);a.__signalCache.has(b)||a.__signalCache.set(b,_.zd(c,{debugName:b},"NcT2Wd",function(){}));
return a.__signalCache.get(b)};
_.iH=function(a){return function(b,c){_.N()(b,c);if(a==null||!a.disabled){b.signalProperties!=null||(b.signalProperties=[]);b.signalProperties.push(c);var e=void 0;Object.defineProperty(b,c,{get:function(){if(this.useSignals){var g=_.f(S0f(this,c,e)).next().value;return g()}return e},
set:function(g){if(this.useSignals){var k=_.f(S0f(this,c,g));k.next();var l=k.next().value;_.wqa(function(){l(g)})}else e=g}})}}};
T0f=function(a){function b(c){c.__reduxSignalBridgeUnsubscribe||(c.__reduxSignalBridgeUnsubscribe=_.g2a().subscribe(function(){_.Pi(c,"redux-signal-bridge-update",function(){c.__reduxSignalBridge+=1},0)}))}
a.__reduxSignalBridge||(_.iH()(a,"__reduxSignalBridge"),a.__reduxSignalBridge=1,_.s_a(a,"created",function(){b(this)}),_.s_a(a,"attached",function(){this.__reduxSignalBridgeUnsubscribe||(b(this),this.__reduxSignalBridge+=1)}),_.s_a(a,"detached",function(){this.__reduxSignalBridgeUnsubscribe&&(this.__reduxSignalBridgeUnsubscribe(),this.__reduxSignalBridgeUnsubscribe=void 0)}))};
_.jH=function(a){var b=_.ca.apply(1,arguments);return function(c,e){T0f(c);_.s_a(c,"created",function(){var g=this,k=this,l=_.Ld(function(){_.O0f(k.__reduxSignalBridge);var m=b.map(function(p){return g[p]});
return _.n2a(a,m)},void 0,"rvGETc");
Object.defineProperty(this,e,{get:function(){return l()}});
R0f(this,e,l)})}};
V0f=function(a,b){var c=[],e;_.X1a(c,(e=a.prototype.behaviors)!=null?e:[]);b&&_.X1a(c,b);var g,k={is:"unused",behaviors:c,provide:[],reactiveSchemas:[],observedAttributes:[],signalProperties:(g=a.prototype.signalProperties)!=null?g:[]};_.Z1a(k,a);b=function(){var m=a.apply(this,[].concat(_.u(_.ca.apply(0,arguments))))||this;k.behaviors.length>0&&(m.polySiAdapter=new U0f(m,m.signalProxy,k.reactiveSchemas));var p=_.f(c),r=p.next();try{for(;!r.done;r=p.next())_.j0a(r.value.constructor,m)}finally{_.h(p,
r)}return m};
_.G(b,a);_.J.Object.defineProperties(b.prototype,{disableEnforceFastDefaultValuesCheck:{configurable:!0,enumerable:!0,get:function(){return!0}}});
b.prototype.created=function(){var m;if((m=this.polySiAdapter)!=null){var p=_.f(m.reactiveSchemas),r=p.next();try{for(;!r.done;r=p.next()){var t=r.value;t.type==="compute"||t.type==="computeWithMethod"?_.q0a(m.signalProxy,t,m.target):t.type==="signal"&&t.readOnly&&_.s0a(m.signalProxy,t)}}finally{_.h(p,r)}}m=_.f(c);p=m.next();try{for(;!p.done;p=m.next())r=void 0,(r=p.value.created)==null||r.call(this)}finally{_.h(m,p)}a.prototype.created&&a.prototype.created.call(this)};
b.prototype.ready=function(){var m;(m=this.polySiAdapter)==null||m.addPostStampEffects();m=_.f(c);var p=m.next();try{for(;!p.done;p=m.next()){var r=void 0;(r=p.value.ready)==null||r.call(this)}}finally{_.h(m,p)}a.prototype.ready&&a.prototype.ready.call(this)};
b.prototype.attached=function(){var m=_.f(c),p=m.next();try{for(;!p.done;p=m.next()){var r=void 0;(r=p.value.attached)==null||r.call(this)}}finally{_.h(m,p)}a.prototype.attached&&a.prototype.attached.call(this)};
b.prototype.detached=function(){var m=_.f(c),p=m.next();try{for(;!p.done;p=m.next()){var r=void 0;(r=p.value.detached)==null||r.call(this)}}finally{_.h(m,p)}a.prototype.detached&&a.prototype.detached.call(this)};
e=_.f(c);g=e.next();try{for(;!g.done;g=e.next())_.l0a(g.value,b.prototype)}finally{_.h(e,g)}_.l0a(a.prototype,b.prototype);var l;if((l=k.signalProperties)==null?0:l.length)b.prototype.signalProperties=k.signalProperties;return b};
W0f=function(a){var b=function(){var c=a.apply(this,[].concat(_.u(_.ca.apply(0,arguments))))||this;var e;c.signalProxy=new _.NCe(c,void 0,{reactivityMode:0,externalSignalProps:new Set((e=c.signalProperties)!=null?e:[])});return c};
_.G(b,a);b.prototype.addMethodEventListener=function(c,e,g,k){g=_.m0a(this,g,k);_.wCa(c,e,g)||c.addEventListener(e,g);return g};
return b};
Y0f=function(a,b,c){a.polymerController=b;c=[].concat(_.u(Object.entries(Object.getOwnPropertyDescriptors(c.prototype))),_.u(Object.entries(Object.getOwnPropertyDescriptors(b))));c=_.f(c);var e=c.next();try{for(var g={};!e.done;g={prop$jscomp$129:void 0},e=c.next()){var k=_.f(e.value),l=k.next().value,m=k.next().value;g.prop$jscomp$129=l;var p=m;a.hasOwnProperty(g.prop$jscomp$129)||X0f(g.prop$jscomp$129)||(p.value instanceof Function?a[g.prop$jscomp$129]=function(r){return function(){return b[r.prop$jscomp$129].apply(b,
_.ca.apply(0,arguments))}}(g):Object.defineProperty(a,g.prop$jscomp$129,{get:function(r){return function(){return a.polymerController[r.prop$jscomp$129]}}(g),
set:function(r){return function(t){a.polymerController[r.prop$jscomp$129]=t}}(g)}))}}finally{_.h(c,e)}};
X0f=function(a){return Z0f.has(a)||a.startsWith("_")};
$0f=function(a,b){b=_.f(Object.entries(b));var c=b.next();try{for(var e={};!c.done;e={attribute$jscomp$53:void 0,getter$jscomp$59:void 0},c=b.next()){var g=_.f(c.value),k=g.next().value,l=g.next().value;e.attribute$jscomp$53=k;e.getter$jscomp$59=l;_.Poa(function(m){return function(){_.I0a(a,m.attribute$jscomp$53,(0,m.getter$jscomp$59)(),!0)}}(e),void 0,"Sg")}}finally{_.h(b,c)}};
a1f=function(a){return function(b){_.yd(function(){if(b.usePatchedLifecycles){if(!b.lifecycleIsConnected)return;b.lifecycleIsConnected=!1}var p;(p=a.detached)==null||p.call(a)});
var c;(c=a.ready)==null||c.call(a);if(b.isConnected){var e;(e=a.attached)==null||e.call(a)}if(!b.isWebComponentWrapper||!b.hasRenderedCow){var g,k=(g=b.connectedCallback)==null?void 0:g.bind(b);b.connectedCallback=function(){k==null||k();var p;(p=a.attached)==null||p.call(a)};
var l,m=(l=b.disconnectedCallback)==null?void 0:l.bind(b);b.disconnectedCallback=function(){m==null||m();var p;(p=a.detached)==null||p.call(a)};
b.polymerController&&(b.polymerController.connectedCallback=b.connectedCallback,b.polymerController.disconnectedCallback=b.disconnectedCallback);b.usePatchedLifecycles=!0;b.lifecycleIsConnected=b.isConnected}}};
d1f=function(a,b,c,e){e=e===void 0?{}:e;var g;_.d0a(a);var k=_.f(_.zd(void 0,void 0,"S7ZvAd",function(){})),l=k.next().value,m=k.next().value;
return{controller:l,initController:function(p){var r=W0f(a),t;((t=a.prototype.behaviors)==null?void 0:t.length)>0&&(r=V0f(r));r=new r(p);var v;(v=r.created)==null||v.call(r);m(r);if(c){v=c.is;t=c.getTemplate;var w=b1f.get(v);w||(w=_.m1a(t,v),b1f.set(v,w));v=_.n1a(w,r).root;_.o1a(p,v,!0)}g&&(v=c1f(_.Jd(g(r))),p.appendChild(v));var x,z;_.hNa(p,r,b,{slotProps:c==null?void 0:c.slotProps,callbackProps:(z=(x=e)==null?void 0:x.callbackProps)!=null?z:c==null?void 0:c.callbackProps,skipHostForwardedProps:!0});
e.useLegacyAccessors&&Y0f(p,r,a);a1f(r)(p);r.reflectedAttributes&&$0f(p,r.reflectedAttributes)},
legacyTemplate:function(p){g=p;return null}}};
c1f=function(a){var b=document.createDocumentFragment();if(Array.isArray(a)){a=_.f(a);var c=a.next();try{for(;!c.done;c=a.next()){var e=c.value;if(e instanceof Node)b.append(e);else if(typeof e==="string")b.append(document.createTextNode(e));else if(e instanceof Function){var g=_.Jd(_.y("div",null,e));b.append.apply(b,_.u(g.childNodes))}else if(Array.isArray(e))b.append(c1f(e));else throw Error("Sy`"+e);}}finally{_.h(a,c)}}else b.append(a);return b};
_.e1f=function(a,b,c,e){_.n4a(a,{includeVeTypesHelper:!0});return d1f(a,b,c,e)};
_.kH=function(a){this.hostElement=a;this.useSignals=!0};var U0f=function(a,b,c){this.target=a;this.signalProxy=b;this.reactiveSchemas=c;a=_.f(this.reactiveSchemas);b=a.next();try{for(;!b.done;b=a.next()){var e=b.value;e.type==="signal"&&_.Ni(this.signalProxy,e.propertyKey)}}finally{_.h(a,b)}};
U0f.prototype.addPostStampEffects=function(){var a=_.f(this.reactiveSchemas),b=a.next();try{for(;!b.done;b=a.next()){var c=b.value;c.type==="observe"&&_.w0a(this.signalProxy,c,this.target)}}finally{_.h(a,b)}};var Z0f=new Set("behaviors constructor disabledPolySiReactions hostElement polySiAdapter properties signalProperties signalProxy useSignals".split(" "));var b1f=new Map;_.W2a();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
