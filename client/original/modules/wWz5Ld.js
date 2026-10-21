"use strict";this.default_kevlar_base=this.default_kevlar_base||{};(function(_){var window=this;
try{
_.gi("wWz5Ld");
(function(xa,bb,qa,S,ja,Ka,Va,mb,yb){var Tb=function(){var Ma,Qa,La=(Ma=globalThis.document)==null?void 0:(Qa=Ma.currentScript)==null?void 0:Qa.src;return function(Fa){function kb(){var T,g,b;return xa(function(e){switch(e.getNextAddressJsc()){case 1:tg();if(!ac){e.jumpTo(2);break}return e.yield(dd(),2);case 2:T=da.setStatus;if(!T){e.jumpTo(4);break}T("Running...");return e.yield(new Promise(function(h){return setTimeout(h,1)}),5);
case 5:setTimeout(T,1,"");case 4:if(ic)return e.return();da.noFSInit||n.initialized||n.init();vb.init();De.ha();n.ignorePermissions=!1;(b=(g=da).onRuntimeInitialized)==null||b.call(g);Nc();e.jumpToEnd()}})}
function ob(T,g,b,e,h,l,p,r,u,z){var B=Na();try{return Ib(T)(g,b,e,h,l,p,r,u,z)}catch(F){Db(B);if(!(F instanceof bc))throw F;qd(1,0)}}
function $b(T,g,b){var e=Na();try{Ib(T)(g,b)}catch(h){Db(e);if(!(h instanceof bc))throw h;qd(1,0)}}
function Eb(T,g,b,e){var h=Na();try{return Ib(T)(g,b,e)}catch(l){Db(h);if(!(l instanceof bc))throw l;qd(1,0)}}
function Nb(T,g,b,e,h){var l=Na();try{return Ib(T)(g,b,e,h)}catch(p){Db(l);if(!(p instanceof bc))throw p;qd(1,0)}}
function ib(T,g,b){var e=Na();try{return Ib(T)(g,b)}catch(h){Db(e);if(!(h instanceof bc))throw h;qd(1,0)}}
function Mc(T,g,b,e){var h=Na();try{Ib(T)(g,b,e)}catch(l){Db(h);if(!(l instanceof bc))throw l;qd(1,0)}}
function Yb(T,g){var b=Na();try{Ib(T)(g)}catch(e){Db(b);if(!(e instanceof bc))throw e;qd(1,0)}}
function Zb(T,g){var b=Na();try{return Ib(T)(g)}catch(e){Db(b);if(!(e instanceof bc))throw e;qd(1,0)}}
function cd(){return navigator.platform.indexOf("Win")>-1}
function vd(T,g,b,e){try{var h=Aa.getStreamFromFD(T),l=ed(h,g,b);pa[e>>2]=l;return 0}catch(p){if(typeof n=="undefined"||p.name!=="ErrnoError")throw p;return p.errno}}
function Vd(T,g,b,e,h){g=rd(g,b);try{if(isNaN(g))return 22;var l=Aa.getStreamFromFD(T);n.llseek(l,g,e);ma=[l.position>>>0,(ta=l.position,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[h>>2]=ma[0];na[h+4>>2]=ma[1];l.getdents&&!g&&e===0&&(l.getdents=null);return 0}catch(p){if(typeof n=="undefined"||p.name!=="ErrnoError")throw p;return p.errno}}
function ge(T,g,b,e){try{var h=Aa.getStreamFromFD(T),l=Vf(h,g,b);pa[e>>2]=l;return 0}catch(p){if(typeof n=="undefined"||p.name!=="ErrnoError")throw p;return p.errno}}
function Gd(T){try{var g=Aa.getStreamFromFD(T);n.close(g);return 0}catch(b){if(typeof n=="undefined"||b.name!=="ErrnoError")throw b;return b.errno}}
function Hd(T,g,b,e){rd(g,b);if(!ie(T))return 28;if(T===0)T=We();else if(Xe)T=Ye();else return 52;T=Math.round(T*1E3*1E3);ma=[T>>>0,(ta=T,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[e>>2]=ma[0];na[e+4>>2]=ma[1];return 0}
function Cc(T,g,b,e,h){var l=g.length;l<2&&va("argTypes array size mismatch! Must at least get return value and receiver (this) types!");var p=g[1]!==null&&b!==null,r=Be(g),u=!g[0].isVoid,z=l-2,B=Array(z),F=[],I=[];return Dc(T,function(){var E=bb.apply(0,arguments);I.length=0;F.length=p?2:1;F[0]=h;if(p){var G=g[1].toWireType(I,this);F[1]=G}for(var H=0;H<z;++H)B[H]=g[H+2].toWireType(I,E[H]),F.push(B[H]);E=e.apply(null,qa(F));if(r)Sb(I);else for(H=p?1:2;H<g.length;H++){var J=H===1?G:B[H-2];g[H].destructorFunction!==
null&&g[H].destructorFunction(J)}G=u?g[0].fromWireType(E):void 0;return G})}
function Be(T){for(var g=1;g<T.length;++g)if(T[g]!==null&&T[g].destructorFunction===void 0)return!0;return!1}
function Rb(T,g,b,e,h,l,p,r,u,z,B){this.name=T;this.registeredClass=g;this.isReference=b;this.isConst=e;this.isSmartPointer=h;this.pointeeType=l;this.sharingPolicy=p;this.rawGetPointee=r;this.rawConstructor=u;this.rawShare=z;this.rawDestructor=B;h||g.baseClass!==void 0?this.toWireType=ya:(e?this.toWireType=Pa:this.toWireType=cg,this.destructorFunction=null)}
function Ce(T){function g(){return this.isSmartPointer?sd(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:b,smartPtrType:this,smartPtr:T}):sd(this.registeredClass.instancePrototype,{ptrType:this,ptr:T})}
var b=this.getPointee(T);if(!b)return this.destructor(T),null;var e=Jd(this.registeredClass,b);if(void 0!==e){if(0===e.$$.count.value)return e.$$.ptr=b,e.$$.smartPtr=T,e.clone();e=e.clone();this.destructor(T);return e}e=this.registeredClass.getActualType(b);e=Kd[e];if(!e)return g.call(this);e=this.isConst?e.constPointerType:e.pointerType;var h=Ld(b,this.registeredClass,e.registeredClass);return h===null?g.call(this):this.isSmartPointer?sd(e.registeredClass.instancePrototype,{ptrType:e,ptr:h,smartPtrType:this,
smartPtr:T}):sd(e.registeredClass.instancePrototype,{ptrType:e,ptr:h})}
function cg(T,g){if(g===null)return this.isReference&&va("null is not a valid "+this.name),0;g.$$||va('Cannot pass "'+Oc(g)+'" as a '+this.name);g.$$.ptr||va("Cannot pass deleted object as a pointer of type "+this.name);g.$$.ptrType.isConst&&va("Cannot convert argument of type "+g.$$.ptrType.name+" to parameter type "+this.name);T=g.$$.ptrType.registeredClass;return Pc(g.$$.ptr,T,this.registeredClass)}
function ya(T,g){if(g===null){this.isReference&&va("null is not a valid "+this.name);if(this.isSmartPointer){var b=this.rawConstructor();T!==null&&T.push(this.rawDestructor,b);return b}return 0}g&&g.$$||va('Cannot pass "'+Oc(g)+'" as a '+this.name);g.$$.ptr||va("Cannot pass deleted object as a pointer of type "+this.name);!this.isConst&&g.$$.ptrType.isConst&&va("Cannot convert argument of type "+(g.$$.smartPtrType?g.$$.smartPtrType.name:g.$$.ptrType.name)+" to parameter type "+this.name);b=g.$$.ptrType.registeredClass;
b=Pc(g.$$.ptr,b,this.registeredClass);if(this.isSmartPointer)switch(void 0===g.$$.smartPtr&&va("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:g.$$.smartPtrType===this?b=g.$$.smartPtr:va("Cannot convert argument of type "+(g.$$.smartPtrType?g.$$.smartPtrType.name:g.$$.ptrType.name)+" to parameter type "+this.name);break;case 1:b=g.$$.smartPtr;break;case 2:if(g.$$.smartPtrType===this)b=g.$$.smartPtr;else{var e=g.clone();b=this.rawShare(b,Ea.toHandle(function(){return e["delete"]()}));
T!==null&&T.push(this.rawDestructor,b)}break;default:va("Unsupported sharing policy")}return b}
function Pa(T,g){if(g===null)return this.isReference&&va("null is not a valid "+this.name),0;g.$$||va('Cannot pass "'+Oc(g)+'" as a '+this.name);g.$$.ptr||va("Cannot pass deleted object as a pointer of type "+this.name);T=g.$$.ptrType.registeredClass;return Pc(g.$$.ptr,T,this.registeredClass)}
function Ya(T,g,b,e,h,l,p,r){this.name=T;this.constructor=g;this.instancePrototype=b;this.rawDestructor=e;this.baseClass=h;this.getActualType=l;this.upcast=p;this.downcast=r;this.pureVirtualFunctions=[]}
function $a(){}
function cb(T,g,b){b=b===void 0?{}:b;return zb(T,g,b)}
function zb(T,g,b){b=b===void 0?{}:b;var e=g.name;T||va('type "'+e+'" must have a positive integer typeid pointer');if(cc.hasOwnProperty(T)){if(b.ignoreDuplicateRegistrations)return;va("Cannot register type '"+e+"' twice")}cc[T]=g;delete jc[T];Ob.hasOwnProperty(T)&&(g=Ob[T],delete Ob[T],g.forEach(function(h){return h()}))}
function rb(T){return this.fromWireType(pa[T>>2])}
function Cb(T,g,b,e){Aa.varargs=e;try{g=Aa.getStr(g);g=Aa.calculateAt(T,g);var h=e?Ha():0;b&64&&(h&=~Aa.currentUmask);return n.open(g,b,h).fd}catch(l){if(typeof n=="undefined"||l.name!=="ErrnoError")throw l;return-l.errno}}
function he(T,g,b,e){try{g=Aa.getStr(g);var h=e&256;g=Aa.calculateAt(T,g,e&4096);return Aa.writeStat(b,h?n.lstat(g):n.stat(g))}catch(l){if(typeof n=="undefined"||l.name!=="ErrnoError")throw l;return-l.errno}}
function bd(T,g,b){Aa.varargs=b;try{var e=Aa.getStreamFromFD(T);switch(g){case 21509:return e.tty?0:-59;case 21505:if(!e.tty)return-59;if(e.tty.ops.ioctl_tcgets){var h=e.tty.ops.ioctl_tcgets(e),l=eb();na[l>>2]=h.c_iflag||0;na[l+4>>2]=h.c_oflag||0;na[l+8>>2]=h.c_cflag||0;na[l+12>>2]=h.c_lflag||0;for(var p=0;p<32;p++)dc[l+p+17]=h.c_cc[p]||0}return 0;case 21510:case 21511:case 21512:return e.tty?0:-59;case 21506:case 21507:case 21508:if(!e.tty)return-59;if(e.tty.ops.ioctl_tcsets){l=eb();var r=na[l>>
2],u=na[l+4>>2],z=na[l+8>>2],B=na[l+12>>2];T=[];for(p=0;p<32;p++)T.push(dc[l+p+17]);return e.tty.ops.ioctl_tcsets(e.tty,g,{c_iflag:r,c_oflag:u,c_cflag:z,c_lflag:B,c_cc:T})}return 0;case 21519:if(!e.tty)return-59;l=eb();return na[l>>2]=0;case 21520:return e.tty?-28:-59;case 21537:case 21531:return l=eb(),n.ioctl(e,g,l);case 21523:if(!e.tty)return-59;if(e.tty.ops.ioctl_tiocgwinsz){var F=e.tty.ops.ioctl_tiocgwinsz(e.tty);l=eb();pb[l>>1]=F[0];pb[l+2>>1]=F[1]}return 0;case 21524:return e.tty?0:-59;case 21515:return e.tty?
0:-59;default:return-28}}catch(I){if(typeof n=="undefined"||I.name!=="ErrnoError")throw I;return-I.errno}}
function dg(T,g){try{return Aa.writeStat(g,n.fstat(T))}catch(b){if(typeof n=="undefined"||b.name!=="ErrnoError")throw b;return-b.errno}}
function eg(T,g,b){Aa.varargs=b;try{var e=Aa.getStreamFromFD(T);switch(g){case 0:var h=Ha();if(h<0)break;for(;n.streams[h];)h++;return n.dupStream(e,h).fd;case 1:case 2:return 0;case 3:return e.flags;case 4:return h=Ha(),e.flags=e.flags&-289793|h&289792,0;case 12:return h=eb(),pb[h+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(l){if(typeof n=="undefined"||l.name!=="ErrnoError")throw l;return-l.errno}}
function fg(){function T(l){l=De=l.exports;Ec=l.ja;oc=l.ka;wd=l.la;Ze=da._ma_device__on_notification_unlocked=l.ma;da._ma_malloc_emscripten=l.na;da._ma_free_emscripten=l.oa;$e=da._ma_device_process_pcm_frames_capture__webaudio=l.pa;af=da._ma_device_process_pcm_frames_playback__webaudio=l.qa;Wf=l.ra;qd=l.sa;fd=l.ta;bf=l.ua;wb.vij=l.va;wb.iij=l.wa;wb.ji=l.xa;wb.iiiji=l.ya;wb.iiji=l.za;wb.jii=l.Aa;wb.jiii=l.Ba;wb.iijjiiiii=l.Ca;wb.jiji=l.Da;wb.viijii=l.Ea;wb.iiiiij=l.Fa;wb.iiiiijj=l.Ga;wb.iiiiiijj=l.Ha;
Ee=l.ga;Fe=l.ia;gg();return De}
var g,b,e,h;return xa(function(l){if(l.getNextAddressJsc()==1){g={a:Xf};if(b=da.instantiateWasm)return l.return(new Promise(function(p){b(g,function(r){return p(T(r))})}));
sa!=null||(sa=hg("canvas_lite_cc.wasm"));return l.yield(Id(Gb,sa,g),2)}e=l.getYieldResultJsc();h=T(e.instance);return l.return(h)})}
function Id(T,g,b){var e,h,l;return xa(function(p){switch(p.getNextAddressJsc()){case 1:if(T){p.jumpTo(2);break}p.setCatchFinallyBlocks(3);e=fetch(g,{credentials:"same-origin"});return p.yield(WebAssembly.instantiateStreaming(e,b),5);case 5:return h=p.getYieldResultJsc(),p.return(h);case 3:l=p.enterCatchBlock(),pc("wasm streaming compile failed: "+l),pc("falling back to ArrayBuffer instantiation");case 2:return p.return(Fb(g,b))}})}
function Fb(T,g){var b,e,h;return xa(function(l){switch(l.getNextAddressJsc()){case 1:return l.setCatchFinallyBlocks(2),l.yield(lg(T),4);case 4:return b=l.getYieldResultJsc(),l.yield(WebAssembly.instantiate(b,g),5);case 5:return e=l.getYieldResultJsc(),l.return(e);case 2:h=l.enterCatchBlock(),pc("failed to asynchronously prepare wasm: "+h),Ab(h),l.jumpToEnd()}})}
function lg(T){var g;return xa(function(b){switch(b.getNextAddressJsc()){case 1:if(Gb){b.jumpTo(2);break}b.setCatchFinallyBlocks(3);return b.yield(Qc(T),5);case 5:return g=b.getYieldResultJsc(),b.return(new Uint8Array(g));case 3:b.enterCatchBlock();case 2:var e=b.return;if(qc)var h=qc(T);else throw"both async and sync fetching of the wasm failed";return e.call(b,h)}})}
function Ab(T){var g,b;(b=(g=da).onAbort)==null||b.call(g,T);T="Aborted("+T+")";pc(T);ic=!0;throw new WebAssembly.RuntimeError(T+". Build with -sASSERTIONS for more info.");}
function Nc(){var T=da.postRun;if(T){typeof T=="function"&&(T=[T]);var g;(g=Wd).push.apply(g,qa(T))}Pb(Wd)}
function tg(){var T=da.preRun;if(T){typeof T=="function"&&(T=[T]);var g;(g=Xd).push.apply(g,qa(T))}Pb(Xd)}
function gg(){var T,g;((T=dc)==null?0:(g=T.buffer)==null?0:g.resizable)||(T=Ee.buffer,da.HEAP8=dc=new Int8Array(T),pb=new Int16Array(T),da.HEAPU8=jb=new Uint8Array(T),da.HEAPU16=Fc=new Uint16Array(T),da.HEAP32=na=new Int32Array(T),da.HEAPU32=pa=new Uint32Array(T),da.HEAPF32=gd=new Float32Array(T),hd=new Float64Array(T))}
function hg(T){return da.locateFile?da.locateFile(T,Md):Md+T}
function Yf(T,g,b,e,h,l){var p=new DOMMatrix;p.a=T;p.b=g;p.c=b;p.d=e;p.e=h;p.f=l;return p}
function cf(T,g,b,e,h,l){T(g,b,l);T=Math.max(l[0],0);var p=Math.max(l[1],0);g=Math.min(l[2],Math.ceil(e*g));b=Math.min(l[3],Math.ceil(h*b));l[4]=T!==l[0]||p!==l[1]||g!==l[2]||b!==l[3]?1:0;l[0]=T;l[1]=p;l[2]=g;l[3]=b;return g>T&&b>p}
function Zf(T,g){console.assert(T>0);var b=new Map,e=-Infinity;this.push=function(h){h=h+((1<<g)-1)>>g;b.has(h)&&clearTimeout(b.get(h));b.set(h,setTimeout(function(){b.delete(h);if(b.length==0)e=-Infinity;else if(h==e){var l;e=(l=Math).max.apply(l,qa(b.keys()));console.assert(e<h)}},T));
e=Math.max(h,e);return e<<g}}
function ia(){function T(p){var r=e;b=g=0;e=new Map;r.forEach(function(u){try{u(p)}catch(z){console.error(z)}});
this.onAfterCallbacks();h&&h.frameComplete()}
var g=0,b=0,e=new Map,h=null,l=null;this.requestAnimationFrame=function(p){g||(g=requestAnimationFrame(T.bind(this)));var r=++b;e.set(r,p);return r};
this.cancelAnimationFrame=function(p){e.delete(p);g&&e.size==0&&(cancelAnimationFrame(g),g=0)};
this.enableFPSCounter=function(p){l&&(document.body.remove(l),l=null);p||(l=document.createElement("div"),l.style.backgroundColor="black",l.style.position="fixed",l.style.right=0,l.style.top=0,l.style.color="white",l.style.padding="4px",l.textContent="RIVE FPS",p=function(r){l.textContent="RIVE FPS "+r.toFixed(1)},document.body.appendChild(l));
h=new function(){var r=0,u=0;this.frameComplete=function(){var z=performance.now();u?(++r,z-=u,z>1E3&&(p(r*1E3/z),r=u=0)):(u=z,r=0)}}};
this.disableFPSCounter=function(){l&&(document.body.remove(l),l=null);h=null};
this.onAfterCallbacks=function(){}}
Fa=Fa===void 0?{}:Fa;var da,Jb,Ge,ig,df,ef,Yd,la,fa,Ub,kc,xd,ff,je,Nd,Zd,He,Md,Qc,qc,rc,pc,Gb,ic,bc,Ca,sa,ta,ma,Ua,dc,Pb,Wd,Xd,xc,Db,Na,na,Ha,eb,Oa,tb,id,lc,Gc,Hc,mc,yc,Rc,jd,yd,Ic,vb,jb,Mb,$d,Wa,za,Xa,Od,zd,ke,gf,Ie,le,dd,ac,Sc,Je,hf,jf,Ke,me,Le,Me,Ad,w,n,v,pa,Aa,pb,sc,Dc,ec,Hb,Ra,va,Ea,fb,Za,sb,Tc,Uc,cc,zc,Bd,Cd,Vc,kd,ae,ld,tc,Wc,Ac,Sb,Ob,jc,Xc,Kb,ub,nc,kf,lf,ne,Dd,Pd,oe,Kd,Jc,Bc,md,Pc,Oc,Ld,Jd,sd,Qd,Vb,wb,fc,uc,Ib,Kc,Wb,qb,xb,Qb,vc,Yc,nd,pe,mf,nf,Ne,qe,be,Rd,re,ce,Fc,Zc,se,Oe,gd,hd,Pe,of,pf,qf,
rf,Ed,hc,$c,sf,tf,uf,vf,wf,xf,yf,zf,Af,Bf,Cf,te,Sd,ue,Df,Ef,ve,de,Qe,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf,Of,Ye,We,Xe,ie,rd,Td,Pf,Qf,Rf,Sf,Tf,ee,Ud,U,V,we,xe,ye,aa,ba,Re,Vf,ed,wc,od,Ec,oc,wd,Ze,$e,af,Wf,qd,fd,bf,Ee,Fe,Xf,De;return xa(function(T){if(T.getNextAddressJsc()==1){da=Fa;Jb=!!globalThis.window;Ge=!!globalThis.WorkerGlobalScope;((ig=globalThis.process)==null?0:(df=ig.versions)==null?0:df.node)&&((ef=globalThis.process)==null||ef.type);Yd=da.onRuntimeInitialized;da.onRuntimeInitialized=function(){Yd&&
Yd();var g=da.decodeAudio;da.decodeAudio=function(r,u,z){var B;r=g(r,(B=z===void 0?null:z)!=null?B:null);u(r)};
var b=da.decodeFont;da.decodeFont=function(r,u,z){var B;r=b(r,(B=z===void 0?null:z)!=null?B:null);u(r)};
var e=da.FileAsset.prototype.decode;da.FileAsset.prototype.decode=function(r,u){return e.call(this,r,u!=null?u:null)};
var h=da.setFallbackFontCb;da.setFallbackFontCallback=typeof h==="function"?function(r){h(r)}:function(){console.warn("Module.setFallbackFontCallback called, but text support is not enabled in this build.")};
var l=da.FileAssetLoader;da.ptrToAsset=function(r){var u=da.ptrToFileAsset(r);return u.isImage?da.ptrToImageAsset(r):u.isFont?da.ptrToFontAsset(r):u.isAudio?da.ptrToAudioAsset(r):u};
da.CustomFileAssetLoader=l.extend("CustomFileAssetLoader",{__construct:function(r){r=r.loadContents;this.__parent.__construct.call(this);this._loadContents=r},
loadContents:function(r,u){r=da.ptrToAsset(r);return this._loadContents(r,u)}});
da.CDNFileAssetLoader=l.extend("CDNFileAssetLoader",{__construct:function(r){this.__parent.__construct.call(this);this._session=r!=null?r:null},
loadContents:function(r){var u=da.ptrToAsset(r);r=u.cdnUuid;if(r==="")return!1;var z,B=(z=this._session)!=null?z:null;(function(F,I){var E=new XMLHttpRequest;E.responseType="arraybuffer";E.onreadystatechange=function(){E.readyState==4&&E.status==200&&I(E)};
E.open("GET",F,!0);E.send(null)})(u.cdnBaseUrl+"/"+r,function(F){u.decode(new Uint8Array(F.response),B)});
return!0}});
da.FallbackFileAssetLoader=l.extend("FallbackFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this);this.loaders=[]},
addLoader:function(r){this.loaders.push(r)},
loadContents:function(r,u){var z=S(this.loaders),B=z.next();try{for(;!B.done;B=z.next())if(B.value.loadContents(r,u))return!0}finally{ja(z,B)}return!1}});
var p=da.computeAlignment;da.computeAlignment=function(r,u,z,B,F){return p.call(this,r,u,z,B,F===void 0?1:F)}};
la=function(){};
fa=new Int32Array(5);Ub=function(g){this.backend=g;this._rectanizer=null;this._atlasEntries=[];this._pendingReleases=this._maxAtlasSize=0;this._atlasMaxRecentWidth=new Zf(1E3,8);this._atlasMaxRecentHeight=new Zf(1E3,8)};
Ub.prototype.pendingReleaseCount=function(){return this._pendingReleases};
Ub.prototype.setMaxAtlasSize=function(g){this._maxAtlasSize!==g&&(this._maxAtlasSize=g,this.cleanup())};
Ub.prototype._initialAtlasSize=function(){return this._maxAtlasSize!==0?Math.min(512,this._maxAtlasSize):512};
Ub.prototype._atlasSizeLimit=function(){var g=this.backend.maxAtlasSize();return g===0?0:this._maxAtlasSize||g};
Ub.prototype.appendDraw=function(g,b,e,h,l,p,r,u,z,B){var F=this;this._pendingReleases++;var I=function(){F._pendingReleases--;z()},E=this._atlasSizeLimit(),G=E-1,H=G-6;
if(!(H>0))return I(),la;var J=1,Q=1;if(!cf(r,J,Q,b,e,fa))return I(),la;var X=fa[2]-fa[0],wa=fa[3]-fa[1];if(X>G||wa>G)if(J*=Math.min(1,H/X),Q*=Math.min(1,H/wa),!cf(r,J,Q,b,e,fa))return I(),la;b=fa[0];e=fa[1];G=fa[2];H=fa[3];r=fa[4]!==0;if(J<1||Q<1)--b,--e,G+=1,H+=1;var Ba=G-b,Ja=H-e;this._rectanizer||(this._rectanizer=new da.DynamicRectanizer(E),E=this._initialAtlasSize(),this._rectanizer.reset(E,E));E=this._rectanizer.addRect(Ba+1,Ja+1);if(E<0&&(B(),E=this._rectanizer.addRect(Ba+1,Ja+1),E<0))return console.assert(!1,
"draw does not fit in an empty atlas"),I(),la;var Sa=E&65535,ab=E>>16;this._atlasEntries.push({atlasMatrix:[J*h[0],Q*h[1],J*h[2],Q*h[3],J*h[4]-b+Sa,Q*h[5]-e+ab],atlasX:Sa,atlasY:ab,widthInAtlas:Ba,heightInAtlas:Ja,needsScissor:r,contents:u,releaseContents:I});var lb=b/J,nb=e/Q,Lb=Ba/J,ad=Ja/Q,pd=this.backend;return function(){var Lc=pd.canvas();Lc&&(g.save(),g.resetTransform(),g.globalCompositeOperation=l,g.globalAlpha=p,g.drawImage(Lc,Sa,ab,Ba,Ja,lb,nb,Lb,ad),g.restore())}};
Ub.prototype.renderAtlas=function(){if(this._atlasEntries.length!==0){var g=this._atlasSizeLimit();g!==0&&this.backend.render(Math.min(this._atlasMaxRecentWidth.push(this._rectanizer.drawWidth()),g),Math.min(this._atlasMaxRecentHeight.push(this._rectanizer.drawHeight()),g),this._atlasEntries)}};
Ub.prototype.cleanup=function(){this._rectanizer&&(this._rectanizer["delete"](),this._rectanizer=null)};
Ub.prototype.clearAtlas=function(){var g=S(this._atlasEntries),b=g.next();try{for(;!b.done;b=g.next())b.value.releaseContents()}finally{ja(g,b)}this._atlasEntries=[];this._rectanizer&&(g=this._initialAtlasSize(),this._rectanizer.reset(g,g))};
kc=new function(){var g=null,b=0,e=0,h=null,l=null,p=0,r=0,u=!1,z=function(){if(!g){var I=function(J,Q,X){Q=H.createShader(Q);H.shaderSource(Q,X);H.compileShader(Q);X=H.getShaderInfoLog(Q);if((X||"").length>0)throw X;H.attachShader(J,Q)},E=document.createElement("canvas"),G={alpha:1,
depth:0,stencil:0,antialias:0,premultipliedAlpha:1,preserveDrawingBuffer:0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:0,enableExtensionsByDefault:1,explicitSwapControl:1,renderViaOffscreenBackBuffer:1};if(/iPhone|iPad|iPod/i.test(navigator.userAgent)){var H=E.getContext("webgl",G);b=1;if(!H)return console.log("No WebGL support. Image mesh will not be drawn."),!1}else if(H=E.getContext("webgl2",G))b=2;else if(H=E.getContext("webgl",G))b=1;else return console.log("No WebGL support. Image mesh will not be drawn."),
!1;H=new Proxy(H,{get:function(J,Q){if(J.isContextLost()){if(u||(console.error("Cannot render the mesh because the GL Context was lost. Tried to invoke ",Q),u=!0),typeof J[Q]==="function")return function(){}}else return typeof J[Q]==="function"?function(){var X=bb.apply(0,arguments);
return J[Q].apply(J,X)}:J[Q]},
set:function(J,Q,X){if(J.isContextLost())u||(console.error("Cannot render the mesh because the GL Context was lost. Tried to set property "+Q),u=!0);else return J[Q]=X,!0}});
e=Math.min(H.getParameter(H.MAX_RENDERBUFFER_SIZE),H.getParameter(H.MAX_TEXTURE_SIZE));E=H.createProgram();I(E,H.VERTEX_SHADER,"attribute vec2 vertex;\n                attribute vec2 uv;\n                uniform vec4 mat;\n                uniform vec2 translate;\n                varying vec2 st;\n                void main() {\n                    st = uv;\n                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);\n                }");I(E,H.FRAGMENT_SHADER,"precision highp float;\n                uniform sampler2D image;\n                varying vec2 st;\n                void main() {\n                    gl_FragColor = texture2D(image, st);\n                }");
H.bindAttribLocation(E,0,"vertex");H.bindAttribLocation(E,1,"uv");H.linkProgram(E);I=H.getProgramInfoLog(E);if((I||"").trim().length>0)throw I;h=H.getUniformLocation(E,"mat");l=H.getUniformLocation(E,"translate");H.useProgram(E);H.bindBuffer(H.ARRAY_BUFFER,H.createBuffer());H.enableVertexAttribArray(0);H.enableVertexAttribArray(1);H.bindBuffer(H.ELEMENT_ARRAY_BUFFER,H.createBuffer());H.uniform1i(H.getUniformLocation(E,"image"),0);H.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0);g=H}return!0};
z();this.maxRTSize=function(){z();return e};
this.deleteImageTexture=function(I){g&&g.deleteTexture&&g.deleteTexture(I)};
this.createImageTexture=function(I){if(!z())return null;var E=g.createTexture();if(!E)return null;g.bindTexture(g.TEXTURE_2D,E);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,I);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR);b==2?(g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR_MIPMAP_LINEAR),g.generateMipmap(g.TEXTURE_2D)):g.texParameteri(g.TEXTURE_2D,
g.TEXTURE_MIN_FILTER,g.LINEAR);return E};
var B=new Zf(1E3,10),F=new Zf(1E3,10);this.drawMeshAtlas=function(I,E,G){if(z()&&g.canvas){if(g.canvas.width!=I||g.canvas.height!=E)g.canvas.width=I,g.canvas.height=E;g.viewport(0,0,I,E);g.disable(g.SCISSOR_TEST);g.clearColor(0,0,0,0);g.clear(g.COLOR_BUFFER_BIT);G.sort(function(ad,pd){return(pd.contents.image._uniqueID<<1|(pd.needsScissor?1:0))-(ad.contents.image._uniqueID<<1|(ad.needsScissor?1:0))});
var H=0,J=0,Q=S(G),X=Q.next();try{for(;!X.done;X=Q.next()){var wa=X.value;H+=wa.contents.vtx.length;J+=wa.contents.indices.length}}finally{ja(Q,X)}Q=B.push(H);p!=Q&&(g.bufferData(g.ARRAY_BUFFER,Q*2*4,g.DYNAMIC_DRAW),p=Q);Q=0;X=S(G);wa=X.next();try{for(;!wa.done;wa=X.next()){var Ba=wa.value;g.bufferSubData(g.ARRAY_BUFFER,Q,Ba.contents.vtx);Q+=Ba.contents.vtx.length*4}}finally{ja(X,wa)}console.assert(Q==H*4);Ba=S(G);X=Ba.next();try{for(;!X.done;X=Ba.next()){var Ja=X.value;g.bufferSubData(g.ARRAY_BUFFER,
Q,Ja.contents.uv);Q+=Ja.contents.uv.length*4}}finally{ja(Ba,X)}console.assert(Q==H*2*4);Q=F.push(J);r!=Q&&(g.bufferData(g.ELEMENT_ARRAY_BUFFER,Q*2,g.DYNAMIC_DRAW),r=Q);Ja=0;Q=S(G);Ba=Q.next();try{for(;!Ba.done;Ba=Q.next()){var Sa=Ba.value;g.bufferSubData(g.ELEMENT_ARRAY_BUFFER,Ja,Sa.contents.indices);Ja+=Sa.contents.indices.length*2}}finally{ja(Q,Ba)}console.assert(Ja==J*2);Sa=0;Ba=!1;Q=Ja=0;G=S(G);X=G.next();try{for(;!X.done;X=G.next()){var ab=X.value,lb=ab.contents;lb.image._uniqueID!=Sa&&(g.bindTexture(g.TEXTURE_2D,
lb.image._meshTexture||null),Sa=lb.image._uniqueID);ab.needsScissor?(g.scissor(ab.atlasX,E-ab.atlasY-ab.heightInAtlas,ab.widthInAtlas,ab.heightInAtlas),Ba||(g.enable(g.SCISSOR_TEST),Ba=!0)):Ba&&(g.disable(g.SCISSOR_TEST),Ba=!1);var nb=ab.atlasMatrix;wa=2/I;var Lb=-2/E;g.uniform4f(h,nb[0]*wa,nb[1]*Lb,nb[2]*wa,nb[3]*Lb);g.uniform2f(l,nb[4]*wa-1,nb[5]*Lb+1);g.vertexAttribPointer(0,2,g.FLOAT,!1,0,Q);g.vertexAttribPointer(1,2,g.FLOAT,!1,0,Q+H*4);g.drawElements(g.TRIANGLES,lb.indices.length,g.UNSIGNED_SHORT,
Ja);Q+=lb.vtx.length*4;Ja+=lb.indices.length*2}}finally{ja(G,X)}console.assert(Q==H*4);console.assert(Ja==J*2)}};
this.canvas=function(){return z()&&g.canvas}};
xd=function(){this.supportsPaths=!1};
xd.prototype.maxAtlasSize=function(){return kc.maxRTSize()};
xd.prototype.canvas=function(){return kc.canvas()||null};
xd.prototype.attachImage=function(g,b){g._meshTexture=kc.createImageTexture(b)};
xd.prototype.releaseImage=function(g){g._meshTexture&&(kc.deleteImageTexture(g._meshTexture),g._meshTexture=null)};
xd.prototype.render=function(g,b,e){kc.drawMeshAtlas(g,b,e)};
ff=new Ub(new xd);je="createConicGradient createImageData createLinearGradient createPattern createRadialGradient getContextAttributes getImageData getLineDash getTransform isContextLost isPointInPath isPointInStroke measureText".split(" ");Nd=da.onRuntimeInitialized;da.onRuntimeInitialized=function(){function g(K){switch(K){case H.srcOver:return"source-over";case H.additive:return"plus-lighter";case H.screen:return"screen";case H.overlay:return"overlay";case H.darken:return"darken";case H.lighten:return"lighten";
case H.colorDodge:return"color-dodge";case H.colorBurn:return"color-burn";case H.hardLight:return"hard-light";case H.softLight:return"soft-light";case H.difference:return"difference";case H.exclusion:return"exclusion";case H.multiply:return"multiply";case H.hue:return"hue";case H.saturation:return"saturation";case H.color:return"color";case H.luminosity:return"luminosity"}}
function b(K){return"rgba("+((16711680&K)>>>16)+","+((65280&K)>>>8)+","+((255&K)>>>0)+","+((4278190080&K)>>>24)/255+")"}
function e(K,y,C,P,R){return{sx:K,sy:y,ex:C,ey:P,isRadial:R,stops:[],canvasGradient:null}}
function h(K,y,C,P){if(y._style===Q&&!(y._thickness>0))return null;C=C===1;return{path2D:K._acquirePath(C?y._inverseGradientTransform:null),gradientTransform:C?y._gradientTransform:null,thickness:C?y._thickness*y._strokeThicknessScale:y._thickness,fillRule:K._fillRule===X?"evenodd":"nonzero",opacity:P,style:y._style,color:y._color,gradient:y._gradient,cap:y._cap,join:y._join,blend:y._blend}}
function l(K,y){return y._style!==Q||y._thickness>0?{path:K._acquireRivePath(K._fillRule),paint:y._acquireWebGL2Paint()}:null}
function p(){Ba.renderAtlas();var K=S(Lc),y=K.next();try{for(;!y.done;y=K.next()){var C=y.value,P=S(C._drawList),R=P.next();try{for(;!R.done;R=P.next()){var ca=R.value;ca()}}finally{ja(P,R)}C._drawList=[]}}finally{ja(K,y)}Lc.clear();Ba.clearAtlas()}
Nd&&Nd();var r=da.RenderPaintStyle,u=da.FillRule,z=da.RenderPath,B=da.RenderImage;da.FileAssetLoader;var F=da.RenderPaint,I=da.Renderer,E=da.StrokeCap,G=da.StrokeJoin,H=da.BlendMode,J=r.fill,Q=r.stroke,X=u.evenOdd,wa=u.nonZero,Ba=ff,Ja=Ba.backend,Sa=1,ab=B.extend("CanvasRenderImage",{__construct:function(K){var y=K===void 0?{}:K;K=y.onComplete;y=y.onDecode;this.__parent.__construct.call(this);this._uniqueID=Sa;Sa=Sa+1&2147483647||1;this.onComplete=K;this.onDecode=y;this._meshTexture=this._webGL2Image=
this._newObjectUrl=this._image=null},
__destruct:function(){Ja.releaseImage(this);this._newObjectUrl&&URL.revokeObjectURL(this._newObjectUrl);this.__parent.__destruct.call(this)},
decode:function(K){var y=this;y.onDecode&&y.onDecode(y);var C=new Image;y._newObjectUrl=URL.createObjectURL(new Blob([K],{type:"image/png"}));C.onload=function(){y._image=C;Ja.attachImage(y,C);y.size(C.width,C.height);y.onComplete&&y.onComplete(y)};
C.src=y._newObjectUrl}}),lb=function(K){this._pointTransform=K;
this.path=new Path2D;this._pendingMove=null;this._finalized=!1};
lb.prototype._capPendingMove=function(){this._pendingMove!==null&&(this.path.lineTo(this._pendingMove.x,this._pendingMove.y),this._pendingMove=null)};
lb.prototype.moveTo=function(K,y){this._capPendingMove();var C=K,P=y;this._pointTransform!==null&&(K=this._pointTransform.transformPoint({x:K,y:y}),C=K.x,P=K.y);this.path.moveTo(C,P);this._pendingMove={x:C,y:P}};
lb.prototype.lineTo=function(K,y){this._pendingMove=null;this._pointTransform!==null?(K=this._pointTransform.transformPoint({x:K,y:y}),this.path.lineTo(K.x,K.y)):this.path.lineTo(K,y)};
lb.prototype.cubicTo=function(K,y,C,P,R,ca){this._pendingMove=null;this._pointTransform!==null?(K=this._pointTransform.transformPoint({x:K,y:y}),C=this._pointTransform.transformPoint({x:C,y:P}),R=this._pointTransform.transformPoint({x:R,y:ca}),this.path.bezierCurveTo(K.x,K.y,C.x,C.y,R.x,R.y)):this.path.bezierCurveTo(K,y,C,P,R,ca)};
lb.prototype.close=function(){this._pendingMove=null;this.path.closePath()};
lb.prototype.addPath=function(K,y,C,P,R,ca,ha){this._capPendingMove();var ea=new lb(null);K=S(K);var oa=K.next();try{for(;!oa.done;oa=K.next()){var ua=oa.value;ua(ea)}}finally{ja(K,oa)}ea.finalizePath();y=Yf(y,C,P,R,ca,ha);this._pointTransform!==null&&(y=this._pointTransform.multiply(y));this.path.addPath(ea.path,y)};
lb.prototype.finalizePath=function(){this._pendingMove===null||this._finalized||(this._capPendingMove(),this._finalized=!0)};
lb.prototype.wasFinalized=function(){return this._finalized};
lb.prototype.dispose=function(){};
var nb=function(K){this._makeBuilder=K;this._executedInstructionCount=this._borrowCount=0;this._pointTransform=null;this._builder=K(null)};
nb.prototype.clear=function(){this._reset(null)};
nb.prototype.acquire=function(K,y){for(((y===null?this._pointTransform!==null:this._pointTransform===null||this._pointTransform.a!==y.a||this._pointTransform.b!==y.b||this._pointTransform.c!==y.c||this._pointTransform.d!==y.d||this._pointTransform.e!==y.e||this._pointTransform.f!==y.f)||this._executedInstructionCount<K.length&&(this._borrowCount>0||this._builder.wasFinalized()))&&this._reset(y);this._executedInstructionCount<K.length;)K[this._executedInstructionCount++](this._builder);this._builder.finalizePath();
this._borrowCount++;return this._builder.path};
nb.prototype.releaseBorrow=function(K){this._builder!==null&&K===this._builder.path&&this._borrowCount--};
nb.prototype.dispose=function(){this._builder.dispose();this._builder=null};
nb.prototype._reset=function(K){this._builder.dispose();this._executedInstructionCount=this._borrowCount=0;this._pointTransform=K;this._builder=this._makeBuilder(K)};
var Lb=z.extend("CanvasRenderPath",{__construct:function(){this.__parent.__construct.call(this);this._pathInstructions=[];this._path2D=new nb(function(K){return new lb(K)});
this._transformedPath2D=new nb(function(K){return new lb(K)});
this._rivePaths=new Map;this._fillRule=wa;this._hasSubpath=!1},
__destruct:function(){this._path2D.dispose();this._transformedPath2D.dispose();var K=S(this._rivePaths.values()),y=K.next();try{for(;!y.done;y=K.next())y.value.dispose()}finally{ja(K,y)}this._rivePaths.clear();this.__parent.__destruct.call(this)},
rewind:function(){this._pathInstructions.length=0;this._path2D.clear();this._transformedPath2D.clear();var K=S(this._rivePaths.values()),y=K.next();try{for(;!y.done;y=K.next())y.value.clear()}finally{ja(K,y)}this._hasSubpath=!1},
addPath:function(K,y,C,P,R,ca,ha){var ea=K._pathInstructions.slice();this._addPathInstruction(function(oa){return oa.addPath(ea,y,C,P,R,ca,ha)})},
fillRule:function(K){this._fillRule=K},
moveTo:function(K,y){this._hasSubpath=!0;this._addPathInstruction(function(C){return C.moveTo(K,y)})},
lineTo:function(K,y){this._ensureSubpath();this._addPathInstruction(function(C){return C.lineTo(K,y)})},
cubicTo:function(K,y,C,P,R,ca){this._ensureSubpath();this._addPathInstruction(function(ha){return ha.cubicTo(K,y,C,P,R,ca)})},
close:function(){this._addPathInstruction(function(K){return K.close()})},
_ensureSubpath:function(){this._hasSubpath||this.moveTo(0,0)},
_addPathInstruction:function(K){this._pathInstructions.push(K)},
_acquirePath:function(K){K=K===null?this._path2D.acquire(this._pathInstructions,null):this._transformedPath2D.acquire(this._pathInstructions,K);K.ref&&K.ref();return K},
_acquireRivePath:function(K){var y=this._rivePaths.get(K);y===void 0&&(y=new nb(function(){return Ja.makeRivePathBuilder(K)}),this._rivePaths.set(K,y));
y=y.acquire(this._pathInstructions,null);y.ref&&y.ref();return y},
_releasePath:function(K){this._path2D.releaseBorrow(K);this._transformedPath2D.releaseBorrow(K);var y=S(this._rivePaths.values()),C=y.next();try{for(;!C.done;C=y.next())C.value.releaseBorrow(K)}finally{ja(y,C)}K.unref&&K.unref()}}),ad=e(0,0,0,0,!1),pd=F.extend("CanvasRenderPaint",{__construct:function(){this.__parent.__construct.call(this);
this._style=J;this._color=4278190080;this._thickness=1;this._join=G.miter;this._cap=E.butt;this._feather=0;this._blend=g(H.srcOver);this._inverseGradientTransform=this._gradientTransform=this._gradient=null;this._strokeThicknessScale=1;this._version=0;this._webGL2Paint=null;this._webGL2PaintVersion=-1},
__destruct:function(){this._webGL2Paint!==null&&(da.unrefWebGL2Paint(this._webGL2Paint),this._webGL2Paint=null);this.__parent.__destruct.call(this)},
color:function(K){this._color=K;this._gradient=null;this._version++},
thickness:function(K){this._thickness=Math.abs(K);this._version++},
join:function(K){this._join=K;this._version++},
cap:function(K){this._cap=K;this._version++},
feather:function(K){this._feather=Math.abs(K);this._version++},
style:function(K){this._style=K;this._version++},
blendMode:function(K){this._blend=g(K);this._version++},
clearGradient:function(){this._gradient=null;this._version++},
linearGradient:function(K,y,C,P){this._gradient=e(K,y,C,P,!1);this._version++},
radialGradient:function(K,y,C,P){this._gradient=e(K,y,C,P,!0);this._version++},
addStop:function(K,y){this._gradient.stops.push({color:K,stop:y});this._gradient.canvasGradient=null;this._version++},
completeGradient:function(){},
_setGradientTransform:function(K,y,C,P,R,ca,ha,ea,oa,ua,Da,gb,Bb){K===1&&y===0&&C===0&&P===1&&R===0&&ca===0?this._inverseGradientTransform=this._gradientTransform=null:(this._gradientTransform=Yf(K,y,C,P,R,ca),this._inverseGradientTransform=Yf(ha,ea,oa,ua,Da,gb));this._strokeThicknessScale=Bb;this._version++},
_acquireWebGL2Paint:function(){if(this._webGL2PaintVersion!==this._version){this._webGL2Paint!==null&&da.unrefWebGL2Paint(this._webGL2Paint);var K=this._gradient!==null?this._gradient:ad,y=null,C=null;if(this._gradient!==null){var P=K.stops;y=new Uint32Array(P.length);C=new Float32Array(P.length);for(var R=0,ca=P.length;R<ca;R++)y[R]=P[R].color,C[R]=P[R].stop}P=1;ca=R=0;var ha=1,ea=0,oa=0,ua=this._gradientTransform;ua!==null&&(P=ua.a,R=ua.b,ca=ua.c,ha=ua.d,ea=ua.e,oa=ua.f);this._webGL2Paint=da.makeWebGL2Paint(this._style,
this._color,this._thickness,this._join,this._cap,this._feather,y,C,K.isRadial,K.sx,K.sy,K.ex,K.ey,P,R,ca,ha,ea,oa);this._webGL2PaintVersion=this._version}da.refWebGL2Paint(this._webGL2Paint);return this._webGL2Paint}}),Lc=new Set,td=Object.prototype.hasOwnProperty,jg=da.CanvasRenderer=I.extend("Renderer",{__construct:function(K){this.__parent.__construct.call(this);
this._matrixStack=[1,0,0,1,0,0];this._opacityStack=[1];this._ctx=K.getContext("2d");this._canvas=K;this._drawList=[]},
save:function(){var K=this._matrixStack.length-6,y;(y=this._matrixStack).push.apply(y,qa(this._matrixStack.slice(K)));this._opacityStack.push(this._opacityStack[this._opacityStack.length-1]);this._drawList.push(this._ctx.save.bind(this._ctx))},
restore:function(){var K=this._matrixStack.length-6;if(K<6)throw"restore() called without matching save().";this._matrixStack.splice(K);this._opacityStack.pop();this._drawList.push(this._ctx.restore.bind(this._ctx))},
transform:function(K,y,C,P,R,ca){var ha=this._matrixStack,ea=ha.length-6;ha.splice(ea,6,ha[ea+0]*K+ha[ea+2]*y,ha[ea+1]*K+ha[ea+3]*y,ha[ea+0]*C+ha[ea+2]*P,ha[ea+1]*C+ha[ea+3]*P,ha[ea+0]*R+ha[ea+2]*ca+ha[ea+4],ha[ea+1]*R+ha[ea+3]*ca+ha[ea+5]);this._drawList.push(this._ctx.transform.bind(this._ctx,K,y,C,P,R,ca))},
rotate:function(K){var y=Math.sin(K);K=Math.cos(K);this.transform(K,y,-y,K,0,0)},
modulateOpacity:function(K){this._opacityStack[this._opacityStack.length-1]*=K},
_drawPath:function(K,y){var C=this,P=Math.max(0,this._opacityStack[this._opacityStack.length-1]),R=y._feather!==0?Ja.supportsPaths?2:0:y._gradient===null||y._gradientTransform===null?0:y._style!==Q||y._strokeThicknessScale>0?1:Ja.supportsPaths?2:0;if(R===2)this._delegateDrawPath(K,y,P);else{var ca=h(K,y,R,P);ca!==null&&this._drawList.push(function(){var ha=C._ctx,ea=ha.globalCompositeOperation,oa=ha.globalAlpha;ha.globalCompositeOperation=ca.blend;ha.globalAlpha=ca.opacity;if(ca.gradient!==null){var ua=
ca.gradient;if(ua.canvasGradient===null){var Da=ua.sx,gb=ua.sy,Bb=ua.ex,Xb=ua.ey;ua.isRadial?(Bb-=Da,Xb-=gb,Xb=Math.sqrt(Bb*Bb+Xb*Xb),ua.canvasGradient=ha.createRadialGradient(Da,gb,0,Da,gb,Xb)):ua.canvasGradient=ha.createLinearGradient(Da,gb,Bb,Xb);Da=ua.stops;gb=0;for(Xb=Da.length;gb<Xb;gb++)ua.canvasGradient.addColorStop(Da[gb].stop,b(Da[gb].color))}ua=ua.canvasGradient}else ua=b(ca.color);ca.gradientTransform!==null&&(ha.save(),ha.transform(ca.gradientTransform.a,ca.gradientTransform.b,ca.gradientTransform.c,
ca.gradientTransform.d,ca.gradientTransform.e,ca.gradientTransform.f));switch(ca.style){case Q:ha.strokeStyle=ua;ha.lineWidth=ca.thickness;a:{switch(ca.cap){case E.butt:ua="butt";break a;case E.round:ua="round";break a;case E.square:ua="square";break a}ua=void 0}ha.lineCap=ua;a:{switch(ca.join){case G.miter:ua="miter";break a;case G.round:ua="round";break a;case G.bevel:ua="bevel";break a}ua=void 0}ha.lineJoin=ua;ha.miterLimit=4;ha.stroke(ca.path2D);break;case J:ha.fillStyle=ua,ha.fill(ca.path2D,
ca.fillRule)}ca.gradientTransform!==null&&ha.restore();ha.globalCompositeOperation=ea;ha.globalAlpha=oa;K._releasePath(ca.path2D)})}},
_delegateDrawPath:function(K,y,C){var P=l(K,y);if(P!==null){var R=this._matrixStack.slice(this._matrixStack.length-6);y=Ba.appendDraw(this._ctx,this._ctx.canvas.width,this._ctx.canvas.height,R,y._blend,C,function(ca,ha,ea){return da.webGL2PathPixelBounds(P.path,P.paint,ca*R[0],ha*R[1],ca*R[2],ha*R[3],ca*R[4],ha*R[5],ea)},function(ca){return ca.drawPath(P.path,P.paint)},function(){K._releasePath(P.path);
da.unrefWebGL2Paint(P.paint)},p);
Lc.add(this);this._drawList.push(y)}},
_drawRiveImage:function(K,y,C){var P=K._image;if(P){var R=this._ctx,ca=g(y),ha=Math.max(0,C*this._opacityStack[this._opacityStack.length-1]);this._drawList.push(function(){R.globalCompositeOperation=ca;R.globalAlpha=ha;R.drawImage(P,0,0);R.globalAlpha=1})}},
_getMatrix:function(K){for(var y=this._matrixStack,C=y.length-6,P=0;P<6;++P)K[P]=y[C+P]},
_drawImageMesh:function(K,y,C,P,R,ca,ha,ea){var oa=K._webGL2Image;oa?this._appendImageMesh(C,P,R,ca,ha,ea,function(ua){return da.drawWebGL2PendingMesh(ua,y,oa)},function(){return y.unref()}):y.unref()},
_drawImageMeshFromHeap:function(K,y,C,P,R,ca,ha,ea,oa,ua,Da,gb,Bb){if(K._meshTexture){try{var Xb=da.HEAPF32.slice(P>>2,(P>>2)+R);var ud=da.HEAPF32.slice(ca>>2,(ca>>2)+ha);var mg=da.HEAPU16.slice(ea>>1,(ea>>1)+oa)}catch(ug){console.error("[Rive] _drawImageMesh: failed to read mesh data from WASM heap. Mesh skipped for this frame.");return}this._appendImageMesh(y,C,ua,Da,gb,Bb,{image:K,vtx:Xb,uv:ud,indices:mg},function(){})}},
_appendImageMesh:function(K,y,C,P,R,ca,ha,ea){K=Ba.appendDraw(this._ctx,this._ctx.canvas.width,this._ctx.canvas.height,this._matrixStack.slice(this._matrixStack.length-6),g(K),Math.max(0,y*this._opacityStack[this._opacityStack.length-1]),function(oa,ua,Da){Da[0]=Math.floor(C*oa);Da[1]=Math.floor(P*ua);Da[2]=Math.ceil(R*oa);Da[3]=Math.ceil(ca*ua)},ha,ea,p);
Lc.add(this);this._drawList.push(K)},
_clipPath:function(K){var y=this,C=K._fillRule===X?"evenodd":"nonzero",P=K._acquirePath(null);this._drawList.push(function(){y._ctx.clip(P,C);K._releasePath(P)})},
beginFrame:function(K){K=K===void 0?!0:K;Lc.add(this);K&&this._drawList.push(this._ctx.clearRect.bind(this._ctx,0,0,this._canvas.width,this._canvas.height))},
clear:function(){this.beginFrame(!0)},
flush:function(){},
translate:function(K,y){this.transform(1,0,0,1,K,y)}});
da.makeRenderer=function(K){var y=new jg(K),C=y._ctx,P=null,R=null,ca={attachSession:function(ea){if(ea&&P===ea)return!0;if(!ea||P||typeof da.c2dDeferredClaim!=="function"||typeof da.c2dDeferredRenderer!=="function"||!da.c2dDeferredClaim(ea))return!1;var oa=da.c2dDeferredRenderer(ea);if(!oa)return!1;P=ea;R=oa;return!0},
detachSession:function(){P&&da.c2dDeferredDetach(P);R=P=null},
deferredActive:function(){return R!==null}},ha={save:function(){da.c2dDeferredSave(P)},
restore:function(){da.c2dDeferredRestore(P)},
transform:function(ea,oa,ua,Da,gb,Bb){da.c2dDeferredTransform(P,ea,oa,ua,Da,gb,Bb)},
translate:function(ea,oa){da.c2dDeferredTransform(P,1,0,0,1,ea,oa)},
rotate:function(ea){var oa=Math.sin(ea);ea=Math.cos(ea);da.c2dDeferredTransform(P,ea,oa,-oa,ea,0,0)},
align:function(ea,oa,ua,Da,gb){da.c2dDeferredAlign(P,ea,oa,ua.minX,ua.minY,ua.maxX,ua.maxY,Da.minX,Da.minY,Da.maxX,Da.maxY,gb===void 0?1:gb)},
beginFrame:function(ea){y.beginFrame(ea===void 0?!0:ea);da.c2dDeferredBeginFrame(P)},
clear:function(){y.beginFrame(!0);da.c2dDeferredBeginFrame(P)},
flush:function(){da.c2dDeferredReplay(P,y)}};
return new Proxy(y,{get:function(ea,oa){if(td.call(ca,oa))return ca[oa];if(oa==="_deferredRecorder")return R;if(R!==null&&td.call(ha,oa))return ha[oa];if(typeof ea[oa]==="function")return function(){var ua=bb.apply(0,arguments);return ea[oa].apply(ea,ua)};
if(typeof C[oa]==="function"){if(je.indexOf(oa)>-1)throw Error("RiveException: Method call to '"+oa+"()' is not allowed, as the renderer cannot immediately pass through the return                 values of any canvas 2d context methods.");return function(){var ua=bb.apply(0,arguments),Da;y._drawList.push((Da=C[oa]).bind.apply(Da,[C].concat(qa(ua))))}}return ea[oa]},
set:function(ea,oa,ua){if(oa in C)return y._drawList.push(function(){C[oa]=ua}),!0}})};
da.decodeImage=function(K,y){(new ab({onComplete:y})).decode(K)};
da.renderFactory={makeRenderPaint:function(){return new pd},
makeRenderPath:function(){return new Lb},
makeRenderImage:function(){var K=$f;return new ab({onDecode:function(){K.total++},
onComplete:function(){K.loaded++;if(K.loaded===K.total){var y=K.ready;y&&(y(),K.ready=null)}}})}};
var ng=da.load,$f=null;da.load=function(K,y,C,P){C=C===void 0?!0:C;P=P===void 0?null:P;var R=new da.FallbackFileAssetLoader;y!==void 0&&R.addLoader(y);C&&(y=new da.CDNFileAssetLoader(P),R.addLoader(y));return new Promise(function(ca){var ha=null;$f={total:0,loaded:0,ready:function(){ca(ha)}};
var ea;ha=ng(K,R,(ea=P)!=null?ea:null);$f.total==0&&ca(ha)})};
var ag=da.Artboard.prototype.draw;da.Artboard.prototype.draw=function(K){ag.call(this,K._deferredRecorder||K)};
var og=da.RendererWrapper.prototype.align;da.RendererWrapper.prototype.align=function(K,y,C,P,R){og.call(this,K,y,C,P,R===void 0?1:R)};
r=new ia;da.requestAnimationFrame=r.requestAnimationFrame.bind(r);da.cancelAnimationFrame=r.cancelAnimationFrame.bind(r);da.enableFPSCounter=r.enableFPSCounter.bind(r);da.disableFPSCounter=r.disableFPSCounter;r.onAfterCallbacks=p;da.resolveAnimationFrame=p;da.cleanup=function(){Ba.cleanup()}};
Zd="./this.program";He=function(g,b){throw b;};
Ge&&(La=self.location.href);Md="";if(Jb||Ge){try{Md=(new URL(".",La)).href}catch(g){}Ge&&(qc=function(g){var b=new XMLHttpRequest;b.open("GET",g,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)});
Qc=function(g){var b;return xa(function(e){if(e.getNextAddressJsc()==1)return e.yield(fetch(g,{credentials:"same-origin"}),2);b=e.getYieldResultJsc();if(b.ok)return e.return(b.arrayBuffer());throw Error(b.status+" : "+b.url);})}}rc=console.log.bind(console);
pc=console.error.bind(console);ic=!1;bc=function(){};
Ca=function(){return Ka(bc,arguments,this.constructor)};
Va(Ca,bc);Ua=function(g){this.name="ExitStatus";this.message="Program terminated with exit("+g+")";this.status=g};
Pb=function(g){for(;g.length>0;)g.shift()(da)};
Wd=[];Xd=[];xc=!0;Db=function(g){return fd(g)};
Na=function(){return bf()};
eb=Ha=function(){var g=na[+Aa.varargs>>2];Aa.varargs+=4;return g};
Oa={isAbs:function(g){return g.charAt(0)==="/"},
splitPath:function(g){return/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(g).slice(1)},
normalizeArray:function(g,b){for(var e=0,h=g.length-1;h>=0;h--){var l=g[h];l==="."?g.splice(h,1):l===".."?(g.splice(h,1),e++):e&&(g.splice(h,1),e--)}if(b)for(;e;e--)g.unshift("..");return g},
normalize:function(g){var b=Oa.isAbs(g),e=g.slice(-1)==="/";(g=Oa.normalizeArray(g.split("/").filter(function(h){return!!h}),!b).join("/"))||b||(g=".");
g&&e&&(g+="/");return(b?"/":"")+g},
dirname:function(g){var b=Oa.splitPath(g);g=b[0];b=b[1];if(!g&&!b)return".";b&&(b=b.slice(0,-1));return g+b},
basename:function(g){return g&&g.match(/([^\/]+|\/)\/*$/)[1]},
join:function(){var g=bb.apply(0,arguments);return Oa.normalize(g.join("/"))},
join2:function(g,b){return Oa.normalize(g+"/"+b)}};
tb=function(){return function(g){return crypto.getRandomValues(g),0}};
id=function(g){return(id=tb())(g)};
lc={resolve:function(){for(var g=bb.apply(0,arguments),b="",e=!1,h=g.length-1;h>=-1&&!e;h--){e=h>=0?g[h]:n.cwd();if(typeof e!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!e)return"";b=e+"/"+b;e=Oa.isAbs(e)}b=Oa.normalizeArray(b.split("/").filter(function(l){return!!l}),!e).join("/");
return(e?"/":"")+b||"."},
relative:function(g,b){function e(r){for(var u=0;u<r.length&&r[u]==="";u++);for(var z=r.length-1;z>=0&&r[z]==="";z--);return u>z?[]:r.slice(u,z-u+1)}
g=lc.resolve(g).slice(1);b=lc.resolve(b).slice(1);g=e(g.split("/"));b=e(b.split("/"));for(var h=Math.min(g.length,b.length),l=h,p=0;p<h;p++)if(g[p]!==b[p]){l=p;break}h=[];for(p=l;p<g.length;p++)h.push("..");h=h.concat(b.slice(l));return h.join("/")}};
Gc=new TextDecoder;Hc=function(g,b,e,h){e=b+e;if(h)return e;for(;g[b]&&!(b>=e);)++b;return b};
mc=function(g,b,e,h){b=b===void 0?0:b;e=Hc(g,b,e,h);return Gc.decode(g.buffer?g.subarray(b,e):new Uint8Array(g.slice(b,e)))};
yc=[];Rc=function(g){for(var b=0,e=0;e<g.length;++e){var h=g.charCodeAt(e);h<=127?b++:h<=2047?b+=2:h>=55296&&h<=57343?(b+=4,++e):b+=3}return b};
jd=function(g,b,e,h){if(!(h>0))return 0;var l=e;h=e+h-1;for(var p=0;p<g.length;++p){var r=g.codePointAt(p);if(r<=127){if(e>=h)break;b[e++]=r}else if(r<=2047){if(e+1>=h)break;b[e++]=192|r>>6;b[e++]=128|r&63}else if(r<=65535){if(e+2>=h)break;b[e++]=224|r>>12;b[e++]=128|r>>6&63;b[e++]=128|r&63}else{if(e+3>=h)break;b[e++]=240|r>>18;b[e++]=128|r>>12&63;b[e++]=128|r>>6&63;b[e++]=128|r&63;p++}}b[e]=0;return e-l};
yd=function(g,b,e){e=e>0?e:Rc(g)+1;e=Array(e);g=jd(g,e,0,e.length);b&&(e.length=g);return e};
Ic=function(){if(!yc.length){var g=null,b;if((b=globalThis.window)==null?0:b.prompt)g=window.prompt("Input: "),g!==null&&(g+="\n");if(!g)return null;yc=yd(g,!0)}return yc.shift()};
vb={ttys:[],init:function(){},
shutdown:function(){},
register:function(g,b){vb.ttys[g]={input:[],output:[],ops:b};n.registerDevice(g,vb.stream_ops)},
stream_ops:{open:function(g){var b=vb.ttys[g.node.rdev];if(!b)throw new n.ErrnoError(43);g.tty=b;g.seekable=!1},
close:function(g){g.tty.ops.fsync(g.tty)},
fsync:function(g){g.tty.ops.fsync(g.tty)},
read:function(g,b,e,h){if(!g.tty||!g.tty.ops.get_char)throw new n.ErrnoError(60);for(var l=0,p=0;p<h;p++){try{var r=g.tty.ops.get_char(g.tty)}catch(u){throw new n.ErrnoError(29);}if(r===void 0&&!l)throw new n.ErrnoError(6);if(r===null||r===void 0)break;l++;b[e+p]=r;if(r===10)break}l&&(g.node.atime=Date.now());return l},
write:function(g,b,e,h){if(!g.tty||!g.tty.ops.put_char)throw new n.ErrnoError(60);try{for(var l=0;l<h;l++)g.tty.ops.put_char(g.tty,b[e+l])}catch(p){throw new n.ErrnoError(29);}h&&(g.node.mtime=g.node.ctime=Date.now());return l}},
default_tty_ops:{get_char:function(){return Ic()},
put_char:function(g,b){b===null||b===10?(rc(mc(g.output)),g.output=[]):b!=0&&g.output.push(b)},
fsync:function(g){var b;((b=g.output)==null?void 0:b.length)>0&&(rc(mc(g.output)),g.output=[])},
ioctl_tcgets:function(){return{c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},
ioctl_tcsets:function(){return 0},
ioctl_tiocgwinsz:function(){return[24,80]}},
default_tty1_ops:{put_char:function(g,b){b===null||b===10?(pc(mc(g.output)),g.output=[]):b!=0&&g.output.push(b)},
fsync:function(g){var b;((b=g.output)==null?void 0:b.length)>0&&(pc(mc(g.output)),g.output=[])}}};
Mb=function(g,b){return jb.fill(0,g,g+b)};
$d=function(g,b){return Math.ceil(g/b)*b};
Wa=function(g){g=$d(g,65536);var b=Wf(65536,g);b&&Mb(b,g);return b};
za={ops_table:null,mount:function(){return za.createNode(null,"/",16895,0)},
createNode:function(g,b,e,h){if(n.isBlkdev(e)||n.isFIFO(e))throw new n.ErrnoError(63);var l;(l=za).ops_table||(l.ops_table={dir:{node:{getattr:za.node_ops.getattr,setattr:za.node_ops.setattr,lookup:za.node_ops.lookup,mknod:za.node_ops.mknod,rename:za.node_ops.rename,unlink:za.node_ops.unlink,rmdir:za.node_ops.rmdir,readdir:za.node_ops.readdir,symlink:za.node_ops.symlink},stream:{llseek:za.stream_ops.llseek}},file:{node:{getattr:za.node_ops.getattr,setattr:za.node_ops.setattr},stream:{llseek:za.stream_ops.llseek,
read:za.stream_ops.read,write:za.stream_ops.write,mmap:za.stream_ops.mmap,msync:za.stream_ops.msync}},link:{node:{getattr:za.node_ops.getattr,setattr:za.node_ops.setattr,readlink:za.node_ops.readlink},stream:{}},chrdev:{node:{getattr:za.node_ops.getattr,setattr:za.node_ops.setattr},stream:n.chrdev_stream_ops}});e=n.createNode(g,b,e,h);if(n.isDir(e.mode))e.node_ops=za.ops_table.dir.node,e.stream_ops=za.ops_table.dir.stream,e.contents={};else if(n.isFile(e.mode)){e.node_ops=za.ops_table.file.node;e.stream_ops=
za.ops_table.file.stream;e.usedBytes=0;var p,r;e.contents=(r=(p=za).emptyFileContents)!=null?r:p.emptyFileContents=new Uint8Array(0)}else n.isLink(e.mode)?(e.node_ops=za.ops_table.link.node,e.stream_ops=za.ops_table.link.stream):n.isChrdev(e.mode)&&(e.node_ops=za.ops_table.chrdev.node,e.stream_ops=za.ops_table.chrdev.stream);e.atime=e.mtime=e.ctime=Date.now();g&&(g.contents[b]=e,g.atime=g.mtime=g.ctime=e.atime);return e},
getFileDataAsTypedArray:function(g){return g.contents.subarray(0,g.usedBytes)},
expandFileStorage:function(g,b){var e=g.contents.length;e>=b||(b=Math.max(b,e*(e<1048576?2:1.125)>>>0),e&&(b=Math.max(b,256)),e=za.getFileDataAsTypedArray(g),g.contents=new Uint8Array(b),g.contents.set(e))},
resizeFileStorage:function(g,b){if(g.usedBytes!=b){var e=g.contents;g.contents=new Uint8Array(b);g.contents.set(e.subarray(0,Math.min(b,g.usedBytes)));g.usedBytes=b}},
node_ops:{getattr:function(g){var b={};b.dev=n.isChrdev(g.mode)?g.id:1;b.ino=g.id;b.mode=g.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=g.rdev;n.isDir(g.mode)?b.size=4096:n.isFile(g.mode)?b.size=g.usedBytes:n.isLink(g.mode)?b.size=g.link.length:b.size=0;b.atime=new Date(g.atime);b.mtime=new Date(g.mtime);b.ctime=new Date(g.ctime);b.blksize=4096;b.blocks=Math.ceil(b.size/b.blksize);return b},
setattr:function(g,b){var e=S(["mode","atime","mtime","ctime"]),h=e.next();try{for(;!h.done;h=e.next()){var l=h.value;b[l]!=null&&(g[l]=b[l])}}finally{ja(e,h)}b.size!==void 0&&za.resizeFileStorage(g,b.size)},
lookup:function(){za.doesNotExistError||(za.doesNotExistError=new n.ErrnoError(44),za.doesNotExistError.stack="<generic error, no stack>");throw za.doesNotExistError;},
mknod:function(g,b,e,h){return za.createNode(g,b,e,h)},
rename:function(g,b,e){try{var h=n.lookupNode(b,e)}catch(p){}if(h){if(n.isDir(g.mode))for(var l in h.contents)throw new n.ErrnoError(55);n.hashRemoveNode(h)}delete g.parent.contents[g.name];b.contents[e]=g;g.name=e;b.ctime=b.mtime=g.parent.ctime=g.parent.mtime=Date.now()},
unlink:function(g,b){delete g.contents[b];g.ctime=g.mtime=Date.now()},
rmdir:function(g,b){var e=n.lookupNode(g,b),h;for(h in e.contents)throw new n.ErrnoError(55);delete g.contents[b];g.ctime=g.mtime=Date.now()},
readdir:function(g){return[".",".."].concat(qa(Object.keys(g.contents)))},
symlink:function(g,b,e){g=za.createNode(g,b,41471,0);g.link=e;return g},
readlink:function(g){if(!n.isLink(g.mode))throw new n.ErrnoError(28);return g.link}},
stream_ops:{read:function(g,b,e,h,l){var p=g.node.contents;if(l>=g.node.usedBytes)return 0;g=Math.min(g.node.usedBytes-l,h);b.set(p.subarray(l,l+g),e);return g},
write:function(g,b,e,h,l,p){b.buffer===dc.buffer&&(p=!1);if(!h)return 0;g=g.node;g.mtime=g.ctime=Date.now();p?(g.contents=b.subarray(e,e+h),g.usedBytes=h):g.usedBytes||l?(za.expandFileStorage(g,l+h),g.contents.set(b.subarray(e,e+h),l),g.usedBytes=Math.max(g.usedBytes,l+h)):(g.contents=b.slice(e,e+h),g.usedBytes=h);return h},
llseek:function(g,b,e){e===1?b+=g.position:e===2&&n.isFile(g.node.mode)&&(b+=g.node.usedBytes);if(b<0)throw new n.ErrnoError(28);return b},
mmap:function(g,b,e,h,l){if(!n.isFile(g.node.mode))throw new n.ErrnoError(43);g=g.node.contents;if(l&2||g.buffer!==dc.buffer){h=!0;l=Wa(b);if(!l)throw new n.ErrnoError(48);if(g){if(e>0||e+b<g.length)g=g.subarray?g.subarray(e,e+b):Array.prototype.slice.call(g,e,e+b);dc.set(g,l)}}else h=!1,l=g.byteOffset;return{ptr:l,allocated:h}},
msync:function(g,b,e,h){za.stream_ops.write(g,b,0,h,e,!1);return 0}}};
Xa=function(g){if(typeof g!="string")return g;var b={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[g];if(typeof b=="undefined")throw Error("Unknown file open mode: "+g);return b};
Od=function(g){typeof g=="string"&&(g=yd(g,!0));g.subarray||(g=new Uint8Array(g));return g};
zd=function(g,b){var e=0;g&&(e|=365);b&&(e|=146);return e};
ke=function(g){var b;return xa(function(e){if(e.getNextAddressJsc()==1)return e.yield(Qc(g),2);b=e.getYieldResultJsc();return e.return(new Uint8Array(b))})};
gf=function(){var g=bb.apply(0,arguments),b;return(b=n).createDataFile.apply(b,qa(g))};
Ie=function(g){return g};
le=null;dd=function(){return xa(function(g){return g.return(le)})};
ac=0;Sc=null;Je=function(){ac--;var g,b;(b=(g=da).monitorRunDependencies)==null||b.call(g,ac);ac||Sc()};
hf=function(){ac||(le=new Promise(function(e){return Sc=e}));
ac++;var g,b;(b=(g=da).monitorRunDependencies)==null||b.call(g,ac)};
jf=[];Ke=function(g,b){var e,h,l;return xa(function(p){typeof Browser!="undefined"&&Browser.init();h=S(jf);l=h.next();try{for(;!l.done;l=h.next())if(e=l.value,e.canHandle(b))return p.return(e.handle(g,b))}finally{ja(h,l)}return p.return(g)})};
me=function(g,b,e,h,l,p,r,u){var z,B,F,I;return xa(function(E){switch(E.getNextAddressJsc()){case 1:z=b?lc.resolve(Oa.join2(g,b)):g;B=Ie("cp "+z);hf(B);E.setFinallyBlock(2);F=e;if(typeof e!="string"){E.jumpTo(4);break}return E.yield(ke(e),5);case 5:F=E.getYieldResultJsc();case 4:return E.yield(Ke(F,z),6);case 6:F=E.getYieldResultJsc(),(I=u)==null||I(),p||gf(g,b,F,h,l,r);case 2:E.enterFinallyBlock(),Je(B),E.leaveFinallyBlock(0)}})};
Le=function(g,b,e,h,l,p,r,u,z,B){me(g,b,e,h,l,u,z,B).then(p).catch(r)};
Me=function(g){this.name="ErrnoError";this.errno=g};
Ad=function(){this.shared={}};
mb.Object.defineProperties(Ad.prototype,{object:{configurable:!0,enumerable:!0,get:function(){return this.node},
set:function(g){this.node=g}},
isRead:{configurable:!0,enumerable:!0,get:function(){return(this.flags&2097155)!==1}},
isWrite:{configurable:!0,enumerable:!0,get:function(){return(this.flags&2097155)!==0}},
isAppend:{configurable:!0,enumerable:!0,get:function(){return this.flags&1024}},
flags:{configurable:!0,enumerable:!0,get:function(){return this.shared.flags},
set:function(g){this.shared.flags=g}},
position:{configurable:!0,enumerable:!0,get:function(){return this.shared.position},
set:function(g){this.shared.position=g}}});
w=function(g,b,e,h){this.node_ops={};this.stream_ops={};this.readMode=365;this.writeMode=146;this.mounted=null;g||(g=this);this.parent=g;this.mount=g.mount;this.id=n.nextInode++;this.name=b;this.mode=e;this.rdev=h;this.atime=this.mtime=this.ctime=Date.now()};
mb.Object.defineProperties(w.prototype,{read:{configurable:!0,enumerable:!0,get:function(){return(this.mode&this.readMode)===this.readMode},
set:function(g){g?this.mode|=this.readMode:this.mode&=~this.readMode}},
write:{configurable:!0,enumerable:!0,get:function(){return(this.mode&this.writeMode)===this.writeMode},
set:function(g){g?this.mode|=this.writeMode:this.mode&=~this.writeMode}},
isFolder:{configurable:!0,enumerable:!0,get:function(){return n.isDir(this.mode)}},
isDevice:{configurable:!0,enumerable:!0,get:function(){return n.isChrdev(this.mode)}}});
w.prototype.addListener=function(g,b){g={cb:g,exclusive:b===void 0?!1:b};var e;b=(e=this.listeners)!=null?e:this.listeners=new Set;b.add(g);return{listeners:b,entry:g}};
w.prototype.notifyListeners=function(g){if(this.listeners){var b,e=S(this.listeners),h=e.next();try{for(;!h.done;h=e.next()){var l=h.value;l.exclusive?(b||(b=[])).push(l):l.cb(g)}}finally{ja(e,h)}b&&(l=(this.exclTurn||0)%b.length,this.exclTurn=l+1,b[l].cb(g))}};
n={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:!1,ignorePermissions:!0,filesystems:null,syncFSRequests:0,ErrnoError:Me,FSStream:Ad,FSNode:w,lookupPath:function(g,b){b=b===void 0?{}:b;if(!g)throw new n.ErrnoError(44);var e;(e=b).follow_mount!=null||(e.follow_mount=!0);Oa.isAbs(g)||(g=n.cwd()+"/"+g);e=0;a:for(;e<40;e++){var h=g.split("/").filter(function(u){return!!u}),l=n.root;
g="/";for(var p=0;p<h.length;p++){var r=p===h.length-1;if(r&&b.parent)break;if(h[p]!==".")if(h[p]==="..")if(g=Oa.dirname(g),n.isRoot(l)){g=g+"/"+h.slice(p+1).join("/");e--;continue a}else l=l.parent;else{g=Oa.join2(g,h[p]);try{l=n.lookupNode(l,h[p])}catch(u){e=void 0;if(((e=u)==null?void 0:e.errno)===44&&r&&b.noent_okay)return{path:g};throw u;}!n.isMountpoint(l)||r&&!b.follow_mount||(l=l.mounted.root);if(n.isLink(l.mode)&&(!r||b.follow)){if(!l.node_ops.readlink)throw new n.ErrnoError(52);r=l.node_ops.readlink(l);
Oa.isAbs(r)||(r=Oa.dirname(g)+"/"+r);g=r+"/"+h.slice(p+1).join("/");continue a}}}return{path:g,node:l}}throw new n.ErrnoError(32);},
getPath:function(g){for(var b;;){if(n.isRoot(g))return g=g.mount.mountpoint,b?g[g.length-1]!=="/"?g+"/"+b:g+b:g;b=b?g.name+"/"+b:g.name;g=g.parent}},
hashName:function(g,b){for(var e=0,h=0;h<b.length;h++)e=(e<<5)-e+b.charCodeAt(h)|0;return(g+e>>>0)%n.nameTable.length},
hashAddNode:function(g){var b=n.hashName(g.parent.id,g.name);g.name_next=n.nameTable[b];n.nameTable[b]=g},
hashRemoveNode:function(g){var b=n.hashName(g.parent.id,g.name);if(n.nameTable[b]===g)n.nameTable[b]=g.name_next;else for(b=n.nameTable[b];b;){if(b.name_next===g){b.name_next=g.name_next;break}b=b.name_next}},
lookupNode:function(g,b){var e=n.mayLookup(g);if(e)throw new n.ErrnoError(e);e=n.hashName(g.id,b);for(e=n.nameTable[e];e;e=e.name_next){var h=e.name;if(e.parent.id===g.id&&h===b)return e}return n.lookup(g,b)},
createNode:function(g,b,e,h){g=new n.FSNode(g,b,e,h);n.hashAddNode(g);return g},
destroyNode:function(g){n.hashRemoveNode(g)},
isRoot:function(g){return g===g.parent},
isMountpoint:function(g){return!!g.mounted},
isFile:function(g){return(g&61440)===32768},
isDir:function(g){return(g&61440)===16384},
isLink:function(g){return(g&61440)===40960},
isChrdev:function(g){return(g&61440)===8192},
isBlkdev:function(g){return(g&61440)===24576},
isFIFO:function(g){return(g&61440)===4096},
isSocket:function(g){return(g&49152)===49152},
flagsToPermissionString:function(g){var b=["r","w","rw"][g&3];g&512&&(b+="w");return b},
nodePermissions:function(g,b){return n.ignorePermissions?0:b.includes("r")&&!(g.mode&292)||b.includes("w")&&!(g.mode&146)||b.includes("x")&&!(g.mode&73)?2:0},
mayLookup:function(g){if(!n.isDir(g.mode))return 54;var b=n.nodePermissions(g,"x");return b?b:g.node_ops.lookup?0:2},
mayCreate:function(g,b){if(!n.isDir(g.mode))return 54;try{return n.lookupNode(g,b),20}catch(e){}return n.nodePermissions(g,"wx")},
mayDelete:function(g,b,e){try{var h=n.lookupNode(g,b)}catch(l){return l.errno}if(g=n.nodePermissions(g,"wx"))return g;if(e){if(!n.isDir(h.mode))return 54;if(n.isRoot(h)||n.getPath(h)===n.cwd())return 10}else if(n.isDir(h.mode))return 31;return 0},
mayOpen:function(g,b){if(!g)return 44;if(n.isLink(g.mode))return 32;var e=n.flagsToPermissionString(b);return n.isDir(g.mode)&&(e!=="r"||b&576)?31:n.nodePermissions(g,e)},
checkOpExists:function(g,b){if(!g)throw new n.ErrnoError(b);return g},
MAX_OPEN_FDS:4096,nextfd:function(){for(var g=0;g<=n.MAX_OPEN_FDS;g++)if(!n.streams[g])return g;throw new n.ErrnoError(33);},
getStreamChecked:function(g){g=n.getStream(g);if(!g)throw new n.ErrnoError(8);return g},
getStream:function(g){return n.streams[g]},
createStream:function(g,b){b=b===void 0?-1:b;g=Object.assign(new n.FSStream,g);b==-1&&(b=n.nextfd());g.fd=b;return n.streams[b]=g},
closeStream:function(g){n.streams[g]=null},
dupStream:function(g,b){g=n.createStream(g,b===void 0?-1:b);var e,h;(e=g.stream_ops)==null||(h=e.dup)==null||h.call(e,g);return g},
doSetAttr:function(g,b,e){var h=g==null?void 0:g.stream_ops.setattr;g=h?g:b;h!=null||(h=b.node_ops.setattr);n.checkOpExists(h,63);try{h(g,e)}catch(l){if(l instanceof RangeError)throw new n.ErrnoError(22);throw l;}},
chrdev_stream_ops:{open:function(g){var b=n.getDevice(g.node.rdev);g.stream_ops=b.stream_ops;var e,h;(h=(e=g.stream_ops).open)==null||h.call(e,g)},
llseek:function(){throw new n.ErrnoError(70);}},
major:function(g){return g>>8},
minor:function(g){return g&255},
makedev:function(g,b){return g<<8|b},
registerDevice:function(g,b){n.devices[g]={stream_ops:b}},
getDevice:function(g){return n.devices[g]},
getMounts:function(g){var b=[];for(g=[g];g.length;){var e=g.pop();b.push(e);var h;(h=g).push.apply(h,qa(e.mounts))}return b},
syncfs:function(g,b){function e(B){n.syncFSRequests--;return b(B)}
function h(B){if(B){if(!h.errored)return h.errored=!0,e(B)}else++p>=l.length&&e(null)}
typeof g=="function"&&(b=g,g=!1);n.syncFSRequests++;n.syncFSRequests>1&&pc("warning: "+n.syncFSRequests+" FS.syncfs operations in flight at once, probably just doing extra work");var l=n.getMounts(n.root.mount),p=0,r=S(l),u=r.next();try{for(;!u.done;u=r.next()){var z=u.value;z.type.syncfs?z.type.syncfs(z,g,h):h(null)}}finally{ja(r,u)}},
mount:function(g,b,e){var h=e==="/",l=!e;if(h&&n.root)throw new n.ErrnoError(10);if(!h&&!l){var p=n.lookupPath(e,{follow_mount:!1});e=p.path;p=p.node;if(n.isMountpoint(p))throw new n.ErrnoError(10);if(!n.isDir(p.mode))throw new n.ErrnoError(54);}b={type:g,opts:b,mountpoint:e,mounts:[]};g=g.mount(b);g.mount=b;b.root=g;h?n.root=g:p&&(p.mounted=b,p.mount&&p.mount.mounts.push(b));return g},
unmount:function(g){g=n.lookupPath(g,{follow_mount:!1});if(!n.isMountpoint(g.node))throw new n.ErrnoError(28);g=g.node;var b=g.mounted,e=n.getMounts(b),h,l=S(Object.entries(n.nameTable)),p=l.next();try{for(;!p.done;p=l.next()){var r=p.value;var u=S(r);u.next().value;for(h=u.next().value;h;){var z=h.name_next;e.includes(h.mount)&&n.destroyNode(h);h=z}}}finally{ja(l,p)}g.mounted=null;h=g.mount.mounts.indexOf(b);g.mount.mounts.splice(h,1)},
lookup:function(g,b){return g.node_ops.lookup(g,b)},
mknod:function(g,b,e){var h=n.lookupPath(g,{parent:!0}).node;g=Oa.basename(g);if(!g)throw new n.ErrnoError(28);if(g==="."||g==="..")throw new n.ErrnoError(20);var l=n.mayCreate(h,g);if(l)throw new n.ErrnoError(l);if(!h.node_ops.mknod)throw new n.ErrnoError(63);return h.node_ops.mknod(h,g,b,e)},
statfs:function(g){return n.statfsNode(n.lookupPath(g,{follow:!0}).node)},
statfsStream:function(g){return n.statfsNode(g.node)},
statfsNode:function(g){var b={bsize:4096,frsize:4096,blocks:1E6,bfree:5E5,bavail:5E5,files:n.nextInode,ffree:n.nextInode-1,fsid:42,flags:2,namelen:255};g.node_ops.statfs&&Object.assign(b,g.node_ops.statfs(g.mount.opts.root));return b},
create:function(g,b){return n.mknod(g,(b===void 0?438:b)&4095|32768,0)},
mkdir:function(g,b){return n.mknod(g,(b===void 0?511:b)&1023|16384,0)},
mkdirTree:function(g,b){var e=g.split("/"),h="",l;e=S(e);var p=e.next();try{for(;!p.done;p=e.next())if(l=p.value){if(h||Oa.isAbs(g))h+="/";h+=l;try{n.mkdir(h,b)}catch(r){if(r.errno!=20)throw r;}}}finally{ja(e,p)}},
mkdev:function(g,b,e){typeof e=="undefined"&&(e=b,b=438);return n.mknod(g,b|8192,e)},
symlink:function(g,b){if(!lc.resolve(g))throw new n.ErrnoError(44);var e=n.lookupPath(b,{parent:!0}).node;if(!e)throw new n.ErrnoError(44);b=Oa.basename(b);var h=n.mayCreate(e,b);if(h)throw new n.ErrnoError(h);if(!e.node_ops.symlink)throw new n.ErrnoError(63);return e.node_ops.symlink(e,b,g)},
link:function(g,b,e){var h=n.lookupPath(b,{parent:!0}).node;if(!h)throw new n.ErrnoError(44);b=Oa.basename(b);var l=n.mayCreate(h,b);if(l)throw new n.ErrnoError(l);if(!h.node_ops.link)throw new n.ErrnoError(34);return h.node_ops.link(h,b,g,e)},
rename:function(g,b){var e=Oa.dirname(g),h=Oa.dirname(b),l=Oa.basename(g),p=Oa.basename(b);var r=n.lookupPath(g,{parent:!0});var u=r.node;r=n.lookupPath(b,{parent:!0});r=r.node;if(!u||!r)throw new n.ErrnoError(44);if(u.mount!==r.mount)throw new n.ErrnoError(75);var z=n.lookupNode(u,l);g=lc.relative(g,h);if(g.charAt(0)!==".")throw new n.ErrnoError(28);g=lc.relative(b,e);if(g.charAt(0)!==".")throw new n.ErrnoError(55);try{var B=n.lookupNode(r,p)}catch(F){}if(z!==B){b=n.isDir(z.mode);if(l=n.mayDelete(u,
l,b))throw new n.ErrnoError(l);if(l=B?n.mayDelete(r,p,b):n.mayCreate(r,p))throw new n.ErrnoError(l);if(!u.node_ops.rename)throw new n.ErrnoError(63);if(n.isMountpoint(z)||B&&n.isMountpoint(B))throw new n.ErrnoError(10);if(r!==u&&(l=n.nodePermissions(u,"w")))throw new n.ErrnoError(l);n.hashRemoveNode(z);try{u.node_ops.rename(z,r,p),z.parent=r}catch(F){throw F;}finally{n.hashAddNode(z)}}},
rmdir:function(g){var b=n.lookupPath(g,{parent:!0}).node;g=Oa.basename(g);var e=n.lookupNode(b,g),h=n.mayDelete(b,g,!0);if(h)throw new n.ErrnoError(h);if(!b.node_ops.rmdir)throw new n.ErrnoError(63);if(n.isMountpoint(e))throw new n.ErrnoError(10);b.node_ops.rmdir(b,g);n.destroyNode(e)},
readdir:function(g){g=n.lookupPath(g,{follow:!0}).node;return n.checkOpExists(g.node_ops.readdir,54)(g)},
unlink:function(g){var b=n.lookupPath(g,{parent:!0}).node;if(!b)throw new n.ErrnoError(44);g=Oa.basename(g);var e=n.lookupNode(b,g),h=n.mayDelete(b,g,!1);if(h)throw new n.ErrnoError(h);if(!b.node_ops.unlink)throw new n.ErrnoError(63);if(n.isMountpoint(e))throw new n.ErrnoError(10);b.node_ops.unlink(b,g);n.destroyNode(e)},
readlink:function(g){g=n.lookupPath(g).node;if(!g)throw new n.ErrnoError(44);if(!g.node_ops.readlink)throw new n.ErrnoError(28);return g.node_ops.readlink(g)},
stat:function(g,b){g=n.lookupPath(g,{follow:!b}).node;return n.checkOpExists(g.node_ops.getattr,63)(g)},
fstat:function(g){var b=n.getStreamChecked(g);g=b.node;var e=b.stream_ops.getattr;b=e?b:g;e!=null||(e=g.node_ops.getattr);n.checkOpExists(e,63);return e(b)},
lstat:function(g){return n.stat(g,!0)},
doChmod:function(g,b,e,h){n.doSetAttr(g,b,{mode:e&4095|b.mode&-4096,ctime:Date.now(),dontFollow:h})},
chmod:function(g,b,e){g=typeof g=="string"?n.lookupPath(g,{follow:!e}).node:g;n.doChmod(null,g,b,e)},
lchmod:function(g,b){n.chmod(g,b,!0)},
fchmod:function(g,b){g=n.getStreamChecked(g);n.doChmod(g,g.node,b,!1)},
doChown:function(g,b,e){n.doSetAttr(g,b,{timestamp:Date.now(),dontFollow:e})},
chown:function(g,b,e,h){g=typeof g=="string"?n.lookupPath(g,{follow:!h}).node:g;n.doChown(null,g,h)},
lchown:function(g,b,e){n.chown(g,b,e,!0)},
fchown:function(g){g=n.getStreamChecked(g);n.doChown(g,g.node,!1)},
doTruncate:function(g,b,e){if(n.isDir(b.mode))throw new n.ErrnoError(31);if(!n.isFile(b.mode))throw new n.ErrnoError(28);var h=n.nodePermissions(b,"w");if(h)throw new n.ErrnoError(h);n.doSetAttr(g,b,{size:e,timestamp:Date.now()})},
truncate:function(g,b){if(b<0)throw new n.ErrnoError(28);g=typeof g=="string"?n.lookupPath(g,{follow:!0}).node:g;n.doTruncate(null,g,b)},
ftruncate:function(g,b){g=n.getStreamChecked(g);if(b<0||(g.flags&2097155)===0)throw new n.ErrnoError(28);n.doTruncate(g,g.node,b)},
utime:function(g,b,e,h){g=n.lookupPath(g,{follow:!h});n.doSetAttr(null,g.node,{atime:b,mtime:e,dontFollow:h})},
open:function(g,b,e){e=e===void 0?438:e;if(g==="")throw new n.ErrnoError(44);b=Xa(b);e=b&64?e&4095|32768:0;if(typeof g=="object")var h=g;else{var l=g.endsWith("/");var p=n.lookupPath(g,{follow:!(b&131072),noent_okay:!0});h=p.node;g=p.path}p=!1;if(b&64)if(h){if(b&128)throw new n.ErrnoError(20);}else{if(l)throw new n.ErrnoError(31);h=n.mknod(g,e|511,0);p=!0}if(!h)throw new n.ErrnoError(44);n.isChrdev(h.mode)&&(b&=-513);if(b&65536&&!n.isDir(h.mode))throw new n.ErrnoError(54);if(!p&&(l=n.mayOpen(h,b)))throw new n.ErrnoError(l);
b&512&&!p&&n.truncate(h,0);b&=-131713;b=n.createStream({node:h,path:n.getPath(h),flags:b,seekable:!0,position:0,stream_ops:h.stream_ops,ungotten:[],error:!1});b.stream_ops.open&&b.stream_ops.open(b);p&&n.chmod(h,e&511);return b},
close:function(g){if(n.isClosed(g))throw new n.ErrnoError(8);g.getdents&&(g.getdents=null);var b;(b=g.node)==null||b.notifyListeners(32);try{g.stream_ops.close&&g.stream_ops.close(g)}catch(e){throw e;}finally{n.closeStream(g.fd)}g.fd=null},
isClosed:function(g){return g.fd===null},
llseek:function(g,b,e){if(n.isClosed(g))throw new n.ErrnoError(8);if(!g.seekable||!g.stream_ops.llseek)throw new n.ErrnoError(70);if(e!=0&&e!=1&&e!=2)throw new n.ErrnoError(28);g.position=g.stream_ops.llseek(g,b,e);g.ungotten=[];return g.position},
read:function(g,b,e,h,l){if(h<0||l<0)throw new n.ErrnoError(28);if(n.isClosed(g))throw new n.ErrnoError(8);if((g.flags&2097155)===1)throw new n.ErrnoError(8);if(n.isDir(g.node.mode))throw new n.ErrnoError(31);if(!g.stream_ops.read)throw new n.ErrnoError(28);var p=typeof l!="undefined";if(!p)l=g.position;else if(!g.seekable)throw new n.ErrnoError(70);b=g.stream_ops.read(g,b,e,h,l);p||(g.position+=b);return b},
write:function(g,b,e,h,l,p){if(h<0||l<0)throw new n.ErrnoError(28);if(n.isClosed(g))throw new n.ErrnoError(8);if((g.flags&2097155)===0)throw new n.ErrnoError(8);if(n.isDir(g.node.mode))throw new n.ErrnoError(31);if(!g.stream_ops.write)throw new n.ErrnoError(28);g.seekable&&g.flags&1024&&n.llseek(g,0,2);var r=typeof l!="undefined";if(!r)l=g.position;else if(!g.seekable)throw new n.ErrnoError(70);b=g.stream_ops.write(g,b,e,h,l,p);r||(g.position+=b);return b},
mmap:function(g,b,e,h,l){if(h&2&&!(l&2)&&(g.flags&2097155)!==2)throw new n.ErrnoError(2);if((g.flags&2097155)===1)throw new n.ErrnoError(2);if(!g.stream_ops.mmap)throw new n.ErrnoError(43);if(!b)throw new n.ErrnoError(28);return g.stream_ops.mmap(g,b,e,h,l)},
msync:function(g,b,e,h,l){return g.stream_ops.msync?g.stream_ops.msync(g,b,e,h,l):0},
ioctl:function(g,b,e){if(!g.stream_ops.ioctl)throw new n.ErrnoError(59);return g.stream_ops.ioctl(g,b,e)},
readFile:function(g,b){b=b===void 0?{}:b;var e;b.flags=(e=b.flags)!=null?e:0;var h;b.encoding=(h=b.encoding)!=null?h:"binary";b.encoding!=="utf8"&&b.encoding!=="binary"&&Ab('Invalid encoding type "'+b.encoding+'"');e=n.open(g,b.flags);g=n.stat(g).size;h=new Uint8Array(g);n.read(e,h,0,g,0);b.encoding==="utf8"&&(h=mc(h));n.close(e);return h},
writeFile:function(g,b,e){e=e===void 0?{}:e;var h;e.flags=(h=e.flags)!=null?h:577;g=n.open(g,e.flags,e.mode);b=Od(b);n.write(g,b,0,b.byteLength,void 0,e.canOwn);n.close(g)},
cwd:function(){return n.currentPath},
chdir:function(g){g=n.lookupPath(g,{follow:!0});if(g.node===null)throw new n.ErrnoError(44);if(!n.isDir(g.node.mode))throw new n.ErrnoError(54);var b=n.nodePermissions(g.node,"x");if(b)throw new n.ErrnoError(b);n.currentPath=g.path},
createDefaultDirectories:function(){n.mkdir("/tmp");n.mkdir("/home");n.mkdir("/home/web_user")},
createDefaultDevices:function(){n.mkdir("/dev");n.registerDevice(n.makedev(1,3),{read:function(){return 0},
write:function(h,l,p,r){return r},
llseek:function(){return 0}});
n.mkdev("/dev/null",n.makedev(1,3));vb.register(n.makedev(5,0),vb.default_tty_ops);vb.register(n.makedev(6,0),vb.default_tty1_ops);n.mkdev("/dev/tty",n.makedev(5,0));n.mkdev("/dev/tty1",n.makedev(6,0));var g=new Uint8Array(1024),b=0,e=function(){b||(id(g),b=g.byteLength);return g[--b]};
n.createDevice("/dev","random",e);n.createDevice("/dev","urandom",e);n.mkdir("/dev/shm");n.mkdir("/dev/shm/tmp")},
createSpecialDirectories:function(){n.mkdir("/proc");var g=n.mkdir("/proc/self");n.mkdir("/proc/self/fd");n.mount({mount:function(){var b=n.createNode(g,"fd",16895,73);b.stream_ops={llseek:za.stream_ops.llseek};b.node_ops={lookup:function(e,h){e=+h;var l=n.getStreamChecked(e);e={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:function(){return l.path}},
id:e+1};return e.parent=e},
readdir:function(){return Array.from(n.streams.entries()).filter(function(e){e=S(e);e.next().value;return e.next().value}).map(function(e){var h=S(e);
e=h.next().value;h.next().value;return e.toString()})}};
return b}},{},"/proc/self/fd")},
createStandardStreams:function(g,b,e){g?n.createDevice("/dev","stdin",g):n.symlink("/dev/tty","/dev/stdin");b?n.createDevice("/dev","stdout",null,b):n.symlink("/dev/tty","/dev/stdout");e?n.createDevice("/dev","stderr",null,e):n.symlink("/dev/tty1","/dev/stderr");n.open("/dev/stdin",0);n.open("/dev/stdout",1);n.open("/dev/stderr",1)},
staticInit:function(){n.nameTable=Array(4096);n.mount(za,{},"/");n.createDefaultDirectories();n.createDefaultDevices();n.createSpecialDirectories();n.filesystems={MEMFS:za}},
init:function(g,b,e){n.initialized=!0;g!=null||(g=da.stdin);b!=null||(b=da.stdout);e!=null||(e=da.stderr);n.createStandardStreams(g,b,e)},
quit:function(){n.initialized=!1;var g,b=S(n.streams),e=b.next();try{for(;!e.done;e=b.next())(g=e.value)&&n.close(g)}finally{ja(b,e)}},
findObject:function(g,b){g=n.analyzePath(g,b);return g.exists?g.object:null},
analyzePath:function(g,b){try{var e=n.lookupPath(g,{follow:!b});g=e.path}catch(l){}var h={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{e=n.lookupPath(g,{parent:!0}),h.parentExists=!0,h.parentPath=e.path,h.parentObject=e.node,h.name=Oa.basename(g),e=n.lookupPath(g,{follow:!b}),h.exists=!0,h.path=e.path,h.object=e.node,h.name=e.node.name,h.isRoot=e.path==="/"}catch(l){h.error=l.errno}return h},
createPath:function(g,b){g=typeof g=="string"?g:n.getPath(g);for(b=b.split("/").reverse();b.length;){var e=b.pop();if(e){var h=Oa.join2(g,e);try{n.mkdir(h)}catch(l){if(l.errno!=20)throw l;}g=h}}return h},
createFile:function(g,b,e,h,l){g=Oa.join2(typeof g=="string"?g:n.getPath(g),b);h=zd(h,l);return n.create(g,h)},
createDataFile:function(g,b,e,h,l,p){var r=b;g&&(g=typeof g=="string"?g:n.getPath(g),r=b?Oa.join2(g,b):g);g=zd(h,l);r=n.create(r,g);e&&(e=Od(e),n.chmod(r,g|146),b=n.open(r,577),n.write(b,e,0,e.length,0,p),n.close(b),n.chmod(r,g))},
createDevice:function(g,b,e,h){g=Oa.join2(typeof g=="string"?g:n.getPath(g),b);b=zd(!!e,!!h);var l;(l=n.createDevice).major!=null||(l.major=64);l=n.makedev(n.createDevice.major++,0);n.registerDevice(l,{open:function(p){p.seekable=!1},
close:function(){var p;(h==null?0:(p=h.buffer)==null?0:p.length)&&h(10)},
read:function(p,r,u,z){for(var B=0,F=0;F<z;F++){try{var I=e()}catch(E){throw new n.ErrnoError(29);}if(I===void 0&&!B)throw new n.ErrnoError(6);if(I===null||I===void 0)break;B++;r[u+F]=I}B&&(p.node.atime=Date.now());return B},
write:function(p,r,u,z){for(var B=0;B<z;B++)try{h(r[u+B])}catch(F){throw new n.ErrnoError(29);}z&&(p.node.mtime=p.node.ctime=Date.now());return B}});
return n.mkdev(g,b,l)},
forceLoadFile:function(g){if(g.isDevice||g.isFolder||g.link||g.contents)return!0;if(globalThis.XMLHttpRequest)Ab("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");else try{g.contents=qc(g.url)}catch(b){throw new n.ErrnoError(29);}},
createLazyFile:function(g,b,e,h,l){function p(I,E,G,H,J){I=I.node.contents;if(J>=I.length)return 0;H=Math.min(I.length-J,H);if(I.slice)for(var Q=0;Q<H;Q++)E[G+Q]=I[J+Q];else for(Q=0;Q<H;Q++)E[G+Q]=I.get(J+Q);return H}
var r=function(){this.lengthKnown=!1;this.chunks=[]};
r.prototype.get=function(I){if(!(I>this.length-1||I<0)){var E=I%this.chunkSize;I=I/this.chunkSize|0;return this.getter(I)[E]}};
r.prototype.setDataGetter=function(I){this.getter=I};
r.prototype.cacheLength=function(){var I=new XMLHttpRequest;I.open("HEAD",e,!1);I.send(null);I.status>=200&&I.status<300||I.status===304||Ab("Couldn't load "+e+". Status: "+I.status);var E=Number(I.getResponseHeader("Content-length")),G,H=(G=I.getResponseHeader("Accept-Ranges"))&&G==="bytes";I=(G=I.getResponseHeader("Content-Encoding"))&&G==="gzip";var J=1048576;H||(J=E);var Q=this;Q.setDataGetter(function(X){var wa=X*J,Ba=(X+1)*J-1;Ba=Math.min(Ba,E-1);if(typeof Q.chunks[X]=="undefined"){var Ja=Q.chunks;
wa>Ba&&Ab("invalid range ("+wa+", "+Ba+") or no bytes requested!");Ba>E-1&&Ab("only "+E+" bytes available! programmer error!");var Sa=new XMLHttpRequest;Sa.open("GET",e,!1);E!==J&&Sa.setRequestHeader("Range","bytes="+wa+"-"+Ba);Sa.responseType="arraybuffer";Sa.overrideMimeType&&Sa.overrideMimeType("text/plain; charset=x-user-defined");Sa.send(null);Sa.status>=200&&Sa.status<300||Sa.status===304||Ab("Couldn't load "+e+". Status: "+Sa.status);if(Sa.response!==void 0)wa=new Uint8Array(Sa.response||[]);
else{var ab;wa=yd((ab=Sa.responseText)!=null?ab:"",!0)}Ja[X]=wa}typeof Q.chunks[X]=="undefined"&&Ab("doXHR failed!");return Q.chunks[X]});
if(I||!E)J=E=1,J=E=this.getter(0).length,rc("LazyFiles on gzip forces download of the whole file when length is accessed");this._length=E;this._chunkSize=J;this.lengthKnown=!0};
mb.Object.defineProperties(r.prototype,{length:{configurable:!0,enumerable:!0,get:function(){this.lengthKnown||this.cacheLength();return this._length}},
chunkSize:{configurable:!0,enumerable:!0,get:function(){this.lengthKnown||this.cacheLength();return this._chunkSize}}});
globalThis.XMLHttpRequest?(Ge||Ab("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc"),r={isDevice:!1,contents:new r}):r={isDevice:!1,url:e};var u=n.createFile(g,b,r,h,l);r.contents?u.contents=r.contents:r.url&&(u.contents=null,u.url=r.url);Object.defineProperties(u,{usedBytes:{get:function(){return this.contents.length}}});
g={};b=S(Object.entries(u.stream_ops));h=b.next();try{for(l={};!h.done;l={fn$jscomp$3:void 0},h=b.next()){var z=h.value,B=S(z),F=B.next().value;l.fn$jscomp$3=B.next().value;g[F]=function(I){return function(){var E=bb.apply(0,arguments);n.forceLoadFile(u);return I.fn$jscomp$3.apply(null,qa(E))}}(l)}}finally{ja(b,h)}g.read=function(I,E,G,H,J){n.forceLoadFile(u);
return p(I,E,G,H,J)};
g.mmap=function(I,E,G){n.forceLoadFile(u);var H=Wa(E);if(!H)throw new n.ErrnoError(48);p(I,dc,H,E,G);return{ptr:H,allocated:!0}};
u.stream_ops=g;return u}};
v=function(g,b,e){if(!g)return"";b=Hc(jb,g,b,e);return Gc.decode(jb.subarray(g,b))};
Aa={currentUmask:18,calculateAt:function(g,b,e){if(Oa.isAbs(b))return b;g=g===-100?n.cwd():Aa.getStreamFromFD(g).path;if(b.length==0){if(!e)throw new n.ErrnoError(44);return g}return g+"/"+b},
writeStat:function(g,b){pa[g>>2]=b.dev;pa[g+4>>2]=b.mode;pa[g+8>>2]=b.nlink;pa[g+12>>2]=b.uid;pa[g+16>>2]=b.gid;pa[g+20>>2]=b.rdev;ma=[b.size>>>0,(ta=b.size,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[g+24>>2]=ma[0];na[g+28>>2]=ma[1];na[g+32>>2]=4096;na[g+36>>2]=b.blocks;var e=b.atime.getTime(),h=b.mtime.getTime(),l=b.ctime.getTime();ma=[Math.floor(e/1E3)>>>0,(ta=Math.floor(e/1E3),+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-
+(~~ta>>>0))/4294967296)>>>0:0)];na[g+40>>2]=ma[0];na[g+44>>2]=ma[1];pa[g+48>>2]=e%1E3*1E3*1E3;ma=[Math.floor(h/1E3)>>>0,(ta=Math.floor(h/1E3),+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[g+56>>2]=ma[0];na[g+60>>2]=ma[1];pa[g+64>>2]=h%1E3*1E3*1E3;ma=[Math.floor(l/1E3)>>>0,(ta=Math.floor(l/1E3),+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[g+72>>2]=ma[0];na[g+76>>2]=ma[1];pa[g+80>>
2]=l%1E3*1E3*1E3;ma=[b.ino>>>0,(ta=b.ino,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[g+88>>2]=ma[0];na[g+92>>2]=ma[1];return 0},
writeStatFs:function(g,b){pa[g+4>>2]=b.bsize;pa[g+60>>2]=b.bsize;ma=[b.blocks>>>0,(ta=b.blocks,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[g+8>>2]=ma[0];na[g+12>>2]=ma[1];ma=[b.bfree>>>0,(ta=b.bfree,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[g+16>>2]=ma[0];na[g+20>>2]=ma[1];ma=[b.bavail>>>0,(ta=b.bavail,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>
0))/4294967296)>>>0:0)];na[g+24>>2]=ma[0];na[g+28>>2]=ma[1];ma=[b.files>>>0,(ta=b.files,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[g+32>>2]=ma[0];na[g+36>>2]=ma[1];ma=[b.ffree>>>0,(ta=b.ffree,+Math.abs(ta)>=1?ta>0?+Math.floor(ta/4294967296)>>>0:~~+Math.ceil((ta-+(~~ta>>>0))/4294967296)>>>0:0)];na[g+40>>2]=ma[0];na[g+44>>2]=ma[1];pa[g+48>>2]=b.fsid;pa[g+64>>2]=b.flags;pa[g+56>>2]=b.namelen},
doMsync:function(g,b,e,h,l){if(!n.isFile(b.node.mode))throw new n.ErrnoError(43);if(h&2)return 0;g=jb.subarray(g,g+e);n.msync(b,g,l,e,h)},
getStreamFromFD:function(g){return n.getStreamChecked(g)},
varargs:void 0,getStr:function(g){return v(g)}};
sc=function(){return Ab("")};
Dc=function(g,b){return Object.defineProperty(b,"name",{value:g})};
ec=[];Hb=[0,1,,1,null,1,!0,1,!1,1];Ra=function(g){g=Error.call(this,g);this.message=g.message;"stack"in g&&(this.stack=g.stack);this.name="BindingError"};
Va(Ra,Error);va=function(g){throw new Ra(g);};
Ea={toValue:function(g){g||va("Cannot use deleted val. handle = "+g);return Hb[g]},
toHandle:function(g){switch(g){case void 0:return 2;case null:return 4;case !0:return 6;case !1:return 8;default:var b=ec.pop()||Hb.length;Hb[b]=g;Hb[b+1]=1;return b}}};
fb=function(){var g=Error.apply(this,arguments);this.message=g.message;"stack"in g&&(this.stack=g.stack)};
Va(fb,Error);Za=function(g){for(var b="";;){var e=jb[g++];if(!e)return b;b+=String.fromCharCode(e)}};
sb={};Tc=function(g,b){for(b===void 0&&va("ptr should not be undefined");g.baseClass;)b=g.upcast(b),g=g.baseClass;return b};
Uc=function(g,b,e){b=Tc(g,b);sb.hasOwnProperty(b)?va("Tried to register registered instance: "+b):sb[b]=e};
cc={};zc=function(g){g=wd(g);var b=Za(g);Ec(g);return b};
Bd=function(g,b){var e=cc[g];void 0===e&&va(b+" has unknown type "+zc(g));return e};
Cd=function(g,b){b=Tc(g,b);sb.hasOwnProperty(b)?delete sb[b]:va("Tried to unregister unregistered instance: "+b)};
Vc=function(){};
kd=!1;ae=function(g){g.smartPtr?g.smartPtrType.rawDestructor(g.smartPtr):g.ptrType.registeredClass.rawDestructor(g.ptr)};
ld=function(g){--g.count.value;0===g.count.value&&ae(g)};
tc=function(g){if(!globalThis.FinalizationRegistry)return tc=function(b){return b},g;
kd=new FinalizationRegistry(function(b){ld(b.$$)});
tc=function(b){var e=b.$$;e.smartPtr&&(e={$$:e},kd.register(b,e,b));return b};
Vc=function(b){return kd.unregister(b)};
return tc(g)};
Wc=function(g,b,e){g=Za(g);b=Bd(b,"wrapper");e=Ea.toValue(e);var h=b.registeredClass,l=h.instancePrototype,p=h.baseClass.instancePrototype,r=h.baseClass.constructor;g=Dc(g,function(){var u=bb.apply(0,arguments),z=S(h.baseClass.pureVirtualFunctions),B=z.next();try{for(;!B.done;B=z.next()){var F=B.value;if(this[F]===p[F])throw new fb("Pure virtual function "+F+" must be implemented in JavaScript");}}finally{ja(z,B)}Object.defineProperty(this,"__parent",{value:l});this.__construct.apply(this,qa(u))});
l.__construct=function(){var u=bb.apply(0,arguments);this===l&&va('Pass correct "this" to __construct');u=r.implement.apply(r,[this].concat(qa(u)));Vc(u);var z=u.$$;u.notifyOnDestruction();z.preservePointerOnDelete=!0;Object.defineProperties(this,{$$:{value:z}});tc(this);Uc(h,z.ptr,this)};
l.__destruct=function(){this===l&&va('Pass correct "this" to __destruct');Vc(this);Cd(h,this.$$.ptr)};
g.prototype=Object.create(l);Object.assign(g.prototype,e);return Ea.toHandle(g)};
Ac={};Sb=function(g){for(;g.length;){var b=g.pop();g.pop()(b)}};
Ob={};jc={};Xc=function(g){g=Error.call(this,g);this.message=g.message;"stack"in g&&(this.stack=g.stack);this.name="InternalError"};
Va(Xc,Error);Kb=function(g){throw new Xc(g);};
ub=function(g,b,e){function h(E){E=e(E);E.length!==g.length&&Kb("Mismatched type converter count");for(var G=0;G<g.length;++G)cb(g[G],E[G])}
g.forEach(function(E){return jc[E]=b});
var l=Array(b.length),p=[],r=0,u=S(b.entries()),z=u.next();try{for(var B={};!z.done;B={i$jscomp$69:void 0,dt$jscomp$1:void 0},z=u.next()){var F=z.value,I=S(F);B.i$jscomp$69=I.next().value;B.dt$jscomp$1=I.next().value;cc.hasOwnProperty(B.dt$jscomp$1)?l[B.i$jscomp$69]=cc[B.dt$jscomp$1]:(p.push(B.dt$jscomp$1),Ob.hasOwnProperty(B.dt$jscomp$1)||(Ob[B.dt$jscomp$1]=[]),Ob[B.dt$jscomp$1].push(function(E){return function(){l[E.i$jscomp$69]=cc[E.dt$jscomp$1];++r;r===p.length&&h(l)}}(B)))}}finally{ja(u,z)}0===
p.length&&h(l)};
nc=function(g){var b=Ac[g];delete Ac[g];var e=b.rawConstructor,h=b.rawDestructor,l=b.fields,p=l.map(function(r){return r.getterReturnType}).concat(l.map(function(r){return r.setterArgumentType}));
ub([g],p,function(r){var u={},z=S(l.entries()),B=z.next();try{for(var F={};!B.done;F={getterReturnType$jscomp$4:void 0,getter$jscomp$6:void 0,getterContext$jscomp$3:void 0,setter$jscomp$4:void 0,setterContext$jscomp$3:void 0,setterArgumentType$jscomp$4:void 0},B=z.next()){var I=B.value;var E=S(I);var G=E.next().value;var H=E.next().value;F.getterReturnType$jscomp$4=r[G];F.getter$jscomp$6=H.getter;F.getterContext$jscomp$3=H.getterContext;F.setterArgumentType$jscomp$4=r[G+l.length];F.setter$jscomp$4=
H.setter;F.setterContext$jscomp$3=H.setterContext;u[H.fieldName]={read:function(J){return function(Q){return J.getterReturnType$jscomp$4.fromWireType((0,J.getter$jscomp$6)(J.getterContext$jscomp$3,Q))}}(F),
write:function(J){return function(Q,X){var wa=[];(0,J.setter$jscomp$4)(J.setterContext$jscomp$3,Q,J.setterArgumentType$jscomp$4.toWireType(wa,X));Sb(wa)}}(F),
optional:F.getterReturnType$jscomp$4.optional}}}finally{ja(z,B)}return[{name:b.name,fromWireType:function(J){var Q={},X;for(X in u)Q[X]=u[X].read(J);h(J);return Q},
toWireType:function(J,Q){for(var X in u)if(!(X in Q||u[X].optional))throw new TypeError('Missing field: "'+X+'"');var wa=e();for(X in u)u[X].write(wa,Q[X]);J!==null&&J.push(h,wa);return wa},
readValueFromPointer:rb,destructorFunction:h}]})};
kf=function(){};
lf=function(g,b,e,h){b=Za(b);cb(g,{name:b,fromWireType:function(l){return!!l},
toWireType:function(l,p){return p?e:h},
readValueFromPointer:function(l){return this.fromWireType(jb[l])},
destructorFunction:null})};
ne=function(g){return{count:g.count,deleteScheduled:g.deleteScheduled,preservePointerOnDelete:g.preservePointerOnDelete,ptr:g.ptr,ptrType:g.ptrType,smartPtr:g.smartPtr,smartPtrType:g.smartPtrType}};
Dd=function(g){va(g.$$.ptrType.registeredClass.name+" instance already deleted")};
Pd=[];oe=function(){var g=$a.prototype,b={};Object.assign(g,(b.isAliasOf=function(e){if(!(this instanceof $a&&e instanceof $a))return!1;var h=this.$$.ptrType.registeredClass,l=this.$$.ptr;e.$$=e.$$;var p=e.$$.ptrType.registeredClass;for(e=e.$$.ptr;h.baseClass;)l=h.upcast(l),h=h.baseClass;for(;p.baseClass;)e=p.upcast(e),p=p.baseClass;return h===p&&l===e},b.clone=function(){this.$$.ptr||Dd(this);
if(this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var e=tc(Object.create(Object.getPrototypeOf(this),{$$:{value:ne(this.$$)}}));e.$$.count.value+=1;e.$$.deleteScheduled=!1;return e},b["delete"]=function(){this.$$.ptr||Dd(this);
this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&va("Object already scheduled for deletion");Vc(this);ld(this.$$);this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},b.isDeleted=function(){return!this.$$.ptr},b.deleteLater=function(){this.$$.ptr||Dd(this);
this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&va("Object already scheduled for deletion");Pd.push(this);Pd.length;this.$$.deleteScheduled=!0;return this},b));
(b=Symbol.dispose)&&(g[b]=g["delete"])};
Kd={};Jc=function(g,b,e){if(void 0===g[b].overloadTable){var h=g[b];g[b]=function(){var l=bb.apply(0,arguments);g[b].overloadTable.hasOwnProperty(l.length)||va("Function '"+e+"' called with an invalid number of arguments ("+l.length+") - expects one of ("+g[b].overloadTable+")!");return g[b].overloadTable[l.length].apply(this,l)};
g[b].overloadTable=[];g[b].overloadTable[h.argCount]=h}};
Bc=function(g,b,e){da.hasOwnProperty(g)?((void 0===e||void 0!==da[g].overloadTable&&void 0!==da[g].overloadTable[e])&&va("Cannot register public name '"+g+"' twice"),Jc(da,g,g),da[g].overloadTable.hasOwnProperty(e)&&va("Cannot register multiple overloads of a function with the same number of arguments ("+e+")!"),da[g].overloadTable[e]=b):(da[g]=b,da[g].argCount=e)};
md=function(g){g=g.replace(/[^a-zA-Z0-9_]/g,"$");var b=g.charCodeAt(0);return b>=48&&b<=57?"_"+g:g};
Pc=function(g,b,e){for(;b!==e;)b.upcast||va("Expected null or instance of "+e.name+", got an instance of "+b.name),g=b.upcast(g),b=b.baseClass;return g};
Oc=function(g){if(g===null)return"null";var b=typeof g;return b==="object"||b==="array"||b==="function"?g.toString():""+g};
Ld=function(g,b,e){if(b===e)return g;if(void 0===e.baseClass)return null;g=Ld(g,b,e.baseClass);return g===null?null:e.downcast(g)};
Jd=function(g,b){b=Tc(g,b);return sb[b]};
sd=function(g,b){b.ptrType&&b.ptr||Kb("makeClassHandle requires ptr and ptrType");var e=!!b.smartPtrType,h=!!b.smartPtr;e!==h&&Kb("Both smartPtrType and smartPtr must be specified");b.count={value:1};return tc(Object.create(g,{$$:{value:b,writable:!0}}))};
Qd=function(){Object.assign(Rb.prototype,{getPointee:function(g){this.rawGetPointee&&(g=this.rawGetPointee(g));return g},
destructor:function(g){var b;(b=this.rawDestructor)==null||b.call(this,g)},
readValueFromPointer:rb,fromWireType:Ce})};
Vb=function(g,b,e){da.hasOwnProperty(g)||Kb("Replacing nonexistent public symbol");void 0!==da[g].overloadTable&&void 0!==e?da[g].overloadTable[e]=b:(da[g]=b,da[g].argCount=e)};
wb={};fc=function(g,b,e){g=g.replace(/p/g,"i");return wb[g].apply(null,[b].concat(qa(e)))};
uc=[];Ib=function(g){var b=uc[g];b||(uc[g]=b=Fe.get(g));return b};
Kc=function(g,b,e){e=e===void 0?[]:e;return g.includes("j")?fc(g,b,e):Ib(b).apply(null,qa(e))};
Wb=function(g,b,e){e=e===void 0?!1:e;return function(){var h=bb.apply(0,arguments);return Kc(g,b,h,e)}};
qb=function(g,b){g=Za(g);var e=g.includes("j")?Wb(g,b):Ib(b);typeof e!="function"&&va("unknown function pointer with signature "+g+": "+b);return e};
xb=function(){var g=Error.apply(this,arguments);this.message=g.message;"stack"in g&&(this.stack=g.stack)};
Va(xb,Error);Qb=function(g,b){function e(p){l[p]||cc[p]||(jc[p]?jc[p].forEach(e):(h.push(p),l[p]=!0))}
var h=[],l={};b.forEach(e);throw new xb(g+": "+h.map(zc).join([", "]));};
vc=function(g,b,e,h,l,p,r,u,z,B,F,I,E){F=Za(F);p=qb(l,p);u&&(u=qb(r,u));B&&(B=qb(z,B));E=qb(I,E);var G=md(F);Bc(G,function(){Qb("Cannot construct "+F+" due to unbound types",[h])});
ub([g,b,e],h?[h]:[],function(H){H=H[0];if(h){var J=H.registeredClass;var Q=J.instancePrototype}else Q=$a.prototype;H=Dc(F,function(){var Ja=bb.apply(0,arguments);if(Object.getPrototypeOf(this)!==X)throw new Ra("Use 'new' to construct "+F);if(void 0===wa.constructor_body)throw new Ra(F+" has no accessible constructor");var Sa=wa.constructor_body[Ja.length];if(void 0===Sa)throw new Ra("Tried to invoke ctor of "+F+" with invalid number of parameters ("+Ja.length+") - expected ("+Object.keys(wa.constructor_body).toString()+
") parameters instead!");return Sa.apply(this,Ja)});
var X=Object.create(Q,{constructor:{value:H}});H.prototype=X;var wa=new Ya(F,H,X,E,J,p,u,B);if(wa.baseClass){var Ba;(Ba=wa.baseClass).__derivedClasses!=null||(Ba.__derivedClasses=[]);wa.baseClass.__derivedClasses.push(wa)}J=new Rb(F,wa,!0,!1,!1);Ba=new Rb(F+"*",wa,!1,!1,!1);Q=new Rb(F+" const*",wa,!1,!0,!1);Kd[g]={pointerType:Ba,constPointerType:Q};Vb(G,H);return[J,Ba,Q]})};
Yc=function(g,b){for(var e=[],h=0;h<g;h++)e.push(pa[b+h*4>>2]);return e};
nd=function(g){g=g.trim();var b=g.indexOf("(");return b===-1?g:g.slice(0,b)};
pe=function(g,b,e,h,l,p,r,u){var z=Yc(e,h);b=Za(b);b=nd(b);p=qb(l,p,u);ub([],[g],function(B){function F(){Qb("Cannot call "+I+" due to unbound types",z)}
B=B[0];var I=B.name+"."+b;b.startsWith("@@")&&(b=Symbol[b.substring(2)]);var E=B.registeredClass.constructor;void 0===E[b]?(F.argCount=e-1,E[b]=F):(Jc(E,b,I),E[b].overloadTable[e-1]=F);ub([],z,function(G){G=[G[0],null].concat(G.slice(1));G=Cc(I,G,null,p,r,u);void 0===E[b].overloadTable?(G.argCount=e-1,E[b]=G):E[b].overloadTable[e-1]=G;if(B.registeredClass.__derivedClasses){var H=S(B.registeredClass.__derivedClasses),J=H.next();try{for(;!J.done;J=H.next()){var Q=J.value;Q.constructor.hasOwnProperty(b)||
(Q.constructor[b]=G)}}finally{ja(H,J)}}return[]});
return[]})};
mf=function(g,b,e,h,l,p,r,u){b=Za(b);p=qb(l,p);ub([],[g],function(z){z=z[0];var B=z.name+"."+b,F={get:function(){Qb("Cannot access "+B+" due to unbound types",[e])},
enumerable:!0,configurable:!0};u?F.set=function(){Qb("Cannot access "+B+" due to unbound types",[e])}:F.set=function(){va(B+" is a read-only property")};
Object.defineProperty(z.registeredClass.constructor,b,F);ub([],[e],function(I){I=I[0];var E={get:function(){return I.fromWireType(p(h))},
enumerable:!0};u&&(u=qb(r,u),E.set=function(G){var H=[];u(h,I.toWireType(H,G));Sb(H)});
Object.defineProperty(z.registeredClass.constructor,b,E);return[]});
return[]})};
nf=function(g,b,e,h,l,p){var r=Yc(b,e);l=qb(h,l);ub([],[g],function(u){u=u[0];var z="constructor "+u.name;void 0===u.registeredClass.constructor_body&&(u.registeredClass.constructor_body=[]);if(void 0!==u.registeredClass.constructor_body[b-1])throw new Ra("Cannot register multiple constructors with identical number of parameters ("+(b-1)+") for class '"+u.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");u.registeredClass.constructor_body[b-
1]=function(){Qb("Cannot construct "+u.name+" due to unbound types",r)};
ub([],r,function(B){B.splice(1,0,null);u.registeredClass.constructor_body[b-1]=Cc(z,B,null,l,p);return[]});
return[]})};
Ne=function(g,b,e,h,l,p,r,u,z){var B=Yc(e,h);b=Za(b);b=nd(b);p=qb(l,p,z);ub([],[g],function(F){function I(){Qb("Cannot call "+E+" due to unbound types",B)}
F=F[0];var E=F.name+"."+b;b.startsWith("@@")&&(b=Symbol[b.substring(2)]);u&&F.registeredClass.pureVirtualFunctions.push(b);var G=F.registeredClass.instancePrototype,H=G[b];void 0===H||void 0===H.overloadTable&&H.className!==F.name&&H.argCount===e-2?(I.argCount=e-2,I.className=F.name,G[b]=I):(Jc(G,b,E),G[b].overloadTable[e-2]=I);ub([],B,function(J){J=Cc(E,J,F,p,r,z);void 0===G[b].overloadTable?(J.argCount=e-2,G[b]=J):G[b].overloadTable[e-2]=J;return[]});
return[]})};
qe=function(g,b,e){g instanceof Object||va(e+' with invalid "this": '+g);g instanceof b.registeredClass.constructor||va(e+' incompatible with "this" of type '+g.constructor.name);g.$$.ptr||va("cannot call emscripten binding method "+e+" on deleted object");return Pc(g.$$.ptr,g.$$.ptrType.registeredClass,b.registeredClass)};
be=function(g,b,e,h,l,p,r,u,z,B){b=Za(b);l=qb(h,l);ub([],[g],function(F){F=F[0];var I=F.name+"."+b,E={get:function(){Qb("Cannot access "+I+" due to unbound types",[e,r])},
enumerable:!0,configurable:!0};z?E.set=function(){return Qb("Cannot access "+I+" due to unbound types",[e,r])}:E.set=function(){return va(I+" is a read-only property")};
Object.defineProperty(F.registeredClass.instancePrototype,b,E);ub([],z?[e,r]:[e],function(G){var H=G[0],J={get:function(){var X=qe(this,F,I+" getter");return H.fromWireType(l(p,X))},
enumerable:!0};if(z){z=qb(u,z);var Q=G[1];J.set=function(X){var wa=qe(this,F,I+" setter"),Ba=[];z(B,wa,Q.toWireType(Ba,X));Sb(Ba)}}Object.defineProperty(F.registeredClass.instancePrototype,b,J);
return[]});
return[]})};
Rd=function(g){g>9&&0===--Hb[g+1]&&(Hb[g]=void 0,ec.push(g))};
re={name:"emscripten::val",fromWireType:function(g){var b=Ea.toValue(g);Rd(g);return b},
toWireType:function(g,b){return Ea.toHandle(b)},
readValueFromPointer:rb,destructorFunction:null};ce=function(g){return cb(g,re)};
Zc=function(g,b,e){switch(b){case 1:return e?function(h){return this.fromWireType(dc[h])}:function(h){return this.fromWireType(jb[h])};
case 2:return e?function(h){return this.fromWireType(pb[h>>1])}:function(h){return this.fromWireType(Fc[h>>1])};
case 4:return e?function(h){return this.fromWireType(na[h>>2])}:function(h){return this.fromWireType(pa[h>>2])};
default:throw new TypeError("invalid integer width ("+b+"): "+g);}};
se=function(g,b,e,h,l){b=Za(b);l=l?l===1?"number":"string":"object";switch(l){case "object":var p=function(){};
p.values={};cb(g,{name:b,constructor:p,valueType:l,fromWireType:function(r){return this.constructor.values[r]},
toWireType:function(r,u){return u.value},
readValueFromPointer:Zc(b,e,h),destructorFunction:null});Bc(b,p);break;case "number":p={};cb(g,{name:b,keysMap:p,valueType:l,fromWireType:function(r){return r},
toWireType:function(r,u){return u},
readValueFromPointer:Zc(b,e,h),destructorFunction:null});Bc(b,p);delete da[b].argCount;break;case "string":p={},cb(g,{name:b,valuesMap:{},reverseMap:{},keysMap:p,valueType:l,fromWireType:function(r){return this.reverseMap[r]},
toWireType:function(r,u){return this.valuesMap[u]},
readValueFromPointer:Zc(b,e,h),destructorFunction:null}),Bc(b,p),delete da[b].argCount}};
Oe=function(g,b,e){var h=Bd(g,"enum");b=Za(b);switch(h.valueType){case "object":g=h.constructor;h=Object.create(h.constructor.prototype,{value:{value:e},constructor:{value:Dc(h.name+"_"+b,function(){})}});
g.values[e]=h;g[b]=h;break;case "number":h.keysMap[b]=e;break;case "string":h.valuesMap[b]=e,h.reverseMap[e]=b,h.keysMap[b]=b}};
Pe=function(g,b){switch(b){case 4:return function(e){return this.fromWireType(gd[e>>2])};
case 8:return function(e){return this.fromWireType(hd[e>>3])};
default:throw new TypeError("invalid float width ("+b+"): "+g);}};
of=function(g,b,e){b=Za(b);cb(g,{name:b,fromWireType:function(h){return h},
toWireType:function(h,l){return l},
readValueFromPointer:Pe(b,e),destructorFunction:null})};
pf=function(g,b,e,h,l,p,r){var u=Yc(b,e);g=Za(g);g=nd(g);l=qb(h,l,r);Bc(g,function(){Qb("Cannot call "+g+" due to unbound types",u)},b-1);
ub([],u,function(z){z=[z[0],null].concat(z.slice(1));Vb(g,Cc(g,z,null,l,p,r),b-1);return[]})};
qf=function(g,b,e){switch(b){case 1:return e?function(h){return dc[h]}:function(h){return jb[h]};
case 2:return e?function(h){return pb[h>>1]}:function(h){return Fc[h>>1]};
case 4:return e?function(h){return na[h>>2]}:function(h){return pa[h>>2]};
default:throw new TypeError("invalid integer width ("+b+"): "+g);}};
rf=function(g,b,e,h,l){b=Za(b);var p=function(u){return u};
if(h===0){var r=32-8*e;p=function(u){return u<<r>>>r};
l=p(l)}cb(g,{name:b,fromWireType:p,toWireType:function(u,z){return z},
readValueFromPointer:qf(b,e,h!==0),destructorFunction:null})};
Ed=function(g,b,e){function h(p){var r=pa[p>>2];p=pa[p+4>>2];return new l(dc.buffer,p,r)}
var l=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];e=Za(e);cb(g,{name:e,fromWireType:h,readValueFromPointer:h},{ignoreDuplicateRegistrations:!0})};
hc=function(g,b,e){return jd(g,jb,b,e)};
$c=function(g,b){b=Za(b);cb(g,{name:b,fromWireType:function(e){var h=v(e+4,pa[e>>2],!0);Ec(e);return h},
toWireType:function(e,h){h instanceof ArrayBuffer&&(h=new Uint8Array(h));var l=typeof h=="string";l||ArrayBuffer.isView(h)&&h.BYTES_PER_ELEMENT==1||va("Cannot pass non-string to std::string");var p=l?Rc(h):h.length;var r=oc(4+p+1),u=r+4;pa[r>>2]=p;l?hc(h,u,p+1):jb.set(h,u);e!==null&&e.push(Ec,r);return r},
readValueFromPointer:rb,destructorFunction:function(e){Ec(e)}})};
sf=new TextDecoder("utf-16le");tf=function(g,b,e){g>>=1;b=Hc(Fc,g,b/2,e);return sf.decode(Fc.subarray(g,b))};
uf=function(g,b,e){e=e===void 0?2147483647:e;if(e<2)return 0;e-=2;var h=b;e=e<g.length*2?e/2:g.length;for(var l=0;l<e;++l){var p=g.charCodeAt(l);pb[b>>1]=p;b+=2}pb[b>>1]=0;return b-h};
vf=function(g){return g.length*2};
wf=function(g,b,e){var h="";g>>=2;for(var l=0;!(l>=b/4);l++){var p=pa[g+l];if(!p&&!e)break;h+=String.fromCodePoint(p)}return h};
xf=function(g,b,e){e=e===void 0?2147483647:e;if(e<4)return 0;var h=b;e=h+e-4;for(var l=0;l<g.length;++l){var p=g.codePointAt(l);p>65535&&l++;na[b>>2]=p;b+=4;if(b+4>e)break}na[b>>2]=0;return b-h};
yf=function(g){for(var b=0,e=0;e<g.length;++e)g.codePointAt(e)>65535&&e++,b+=4;return b};
zf=function(g,b,e){e=Za(e);if(b===2){var h=tf;var l=uf;var p=vf}else h=wf,l=xf,p=yf;cb(g,{name:e,fromWireType:function(r){var u=h(r+4,pa[r>>2]*b,!0);Ec(r);return u},
toWireType:function(r,u){typeof u!="string"&&va("Cannot pass non-string to C++ string type "+e);var z=p(u),B=oc(4+z+b);pa[B>>2]=z/b;l(u,B+4,z+b);r!==null&&r.push(Ec,B);return B},
readValueFromPointer:rb,destructorFunction:function(r){Ec(r)}})};
Af=function(g,b,e,h,l,p){Ac[g]={name:Za(b),rawConstructor:qb(e,h),rawDestructor:qb(l,p),fields:[]}};
Bf=function(g,b,e,h,l,p,r,u,z,B){Ac[g].fields.push({fieldName:Za(b),getterReturnType:e,getter:qb(h,l),getterContext:p,setterArgumentType:r,setter:qb(u,z),setterContext:B})};
Cf=function(g,b){b=Za(b);cb(g,{isVoid:!0,name:b,fromWireType:function(){},
toWireType:function(){}})};
te=function(){throw new Ca;};
Sd=[];ue=function(g){var b=Sd.length;Sd.push(g);return b};
Df=function(g,b){for(var e=Array(g),h=0;h<g;++h)e[h]=Bd(pa[b+h*4>>2],"parameter "+h);return e};
Ef=function(g,b,e){var h=[];g=g(h,e);h.length&&(pa[b>>2]=Ea.toHandle(h));return g};
ve={};de=function(g){var b=ve[g];return b===void 0?Za(g):b};
Qe=function(g,b,e){var h=S(Df(g,b));b=h.next().value;h=yb(h);var l=b.toWireType.bind(b),p=h.map(function(u){return u.readValueFromPointer.bind(u)});
g--;var r=Array(g);b="methodCaller<("+h.map(function(u){return u.name})+") => "+b.name+">";
return ue(Dc(b,function(u,z,B,F){for(var I=0,E=0;E<g;++E)r[E]=p[E](F+I),I+=8;switch(e){case 0:var G=Ea.toValue(u).apply(null,r);break;case 2:G=Reflect.construct(Ea.toValue(u),r);break;case 3:G=r[0];break;case 1:var H;G=(H=Ea.toValue(u))[de(z)].apply(H,qa(r))}return Ef(l,B,G)}))};
Ff=function(g){g=de(g);return Ea.toHandle(da[g])};
Gf=function(g,b){g=Ea.toValue(g);b=Ea.toValue(b);return Ea.toHandle(g[b])};
Hf=function(g){g>9&&(Hb[g+1]+=1)};
If=function(g,b,e,h,l){return Sd[g](b,e,h,l)};
Jf=function(){return Ea.toHandle([])};
Kf=function(g){return Ea.toHandle(de(g))};
Lf=function(){return Ea.toHandle({})};
Mf=function(g){var b=Ea.toValue(g);Sb(b);Rd(g)};
Nf=function(g,b,e){g=Ea.toValue(g);b=Ea.toValue(b);e=Ea.toValue(e);g[b]=e};
Of=function(g,b,e,h){var l=(new Date).getFullYear(),p=new Date(l,0,1);l=new Date(l,6,1);p=p.getTimezoneOffset();l=l.getTimezoneOffset();var r=Math.max(p,l);pa[g>>2]=r*60;na[b>>2]=Number(p!=l);b=function(u){var z=u>=0?"-":"+",B=Math.abs(u);u=String(Math.floor(B/60)).padStart(2,"0");B=String(B%60).padStart(2,"0");return"UTC"+z+u+B};
g=b(p);b=b(l);l<p?(hc(g,e,17),hc(b,h,17)):(hc(g,h,17),hc(b,e,17))};
Ye=function(){return performance.now()};
We=function(){return Date.now()};
Xe=1;ie=function(g){return g>=0&&g<=3};
rd=function(g,b){return b+2097152>>>0<4194305-!!g?(g>>>0)+b*4294967296:NaN};
Td=[];Pf=function(g,b){Td.length=0;for(var e;e=jb[g++];){var h=e!=105;h&=e!=112;b+=h&&b%8?4:0;Td.push(e==112?pa[b>>2]:e==105?na[b>>2]:hd[b>>3]);b+=h?8:4}return Td};
Qf=function(g,b,e){b=Pf(b,e);return od[g].apply(od,qa(b))};
Rf=function(g,b,e){return Qf(g,b,e)};
Sf=function(){return 2147483648};
Tf=function(g){var b=Ee.buffer.byteLength;try{return Ee.grow((g-b+65535)/65536|0),gg(),1}catch(e){}};
ee=function(g){var b=jb.length;g>>>=0;var e=Sf();if(g>e)return!1;for(var h=1;h<=4;h*=2){var l=b*(1+.2/h);l=Math.min(l,g+100663296);l=Math.min(e,$d(Math.max(g,l),65536));if(Tf(l))return!0}return!1};
Ud={};U=function(){return Zd};
V=function(){if(!V.strings){var g,b,e={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:((b=(g=globalThis.navigator)==null?void 0:g.language)!=null?b:"C").replace("-","_")+".UTF-8",_:U()},h;for(h in Ud)Ud[h]===void 0?delete e[h]:e[h]=Ud[h];g=[];for(h in e)g.push(h+"="+e[h]);V.strings=g}return V.strings};
we=function(g,b){var e=0,h=0,l=S(V()),p=l.next();try{for(;!p.done;p=l.next()){var r=p.value;var u=b+e;pa[g+h>>2]=u;e+=hc(r,u,Infinity)+1;h+=4}}finally{ja(l,p)}return 0};
xe=function(g,b){var e=V();pa[g>>2]=e.length;g=0;e=S(e);var h=e.next();try{for(;!h.done;h=e.next()){var l=h.value;g+=Rc(l)+1}}finally{ja(e,h)}pa[b>>2]=g;return 0};
ye=function(){return xc||!1};
aa=function(g){if(!ye()){var b,e;(e=(b=da).onExit)==null||e.call(b,g);ic=!0}He(g,new Ua(g))};
Re=ba=function(g){aa(g)};
Vf=function(g,b,e,h){for(var l=0,p=0;p<e;p++){var r=pa[b>>2],u=pa[b+4>>2];b+=8;try{var z=n.read(g,dc,r,u,h)}catch(B){if(l>0&&B instanceof n.ErrnoError&&(B.errno==6||B.errno==6))break;throw B;}if(z<0)return-1;l+=z;if(z<u)break;typeof h!="undefined"&&(h+=z)}return l};
ed=function(g,b,e,h){if(e==1)return n.write(g,dc,pa[b>>2],pa[b+4>>2],h);for(var l=0,p=0,r=b;p<e;p++,r+=8)l+=pa[r+4>>2];r=new Uint8Array(l);var u=0;for(p=0;p<e;p++,b+=8){var z=pa[b>>2],B=pa[b+4>>2];r.set(jb.subarray(z,z+B),u);u+=B}return n.write(g,r,0,l,h)};
n.createPreloadedFile=Le;n.preloadFile=me;n.staticInit();oe();Qd();da.noExitRuntime&&(xc=da.noExitRuntime);da.print&&(rc=da.print);da.printErr&&(pc=da.printErr);da.thisProgram&&(Zd=da.thisProgram);if(wc=da.preInit)for(typeof wc=="function"&&(da.preInit=wc=[wc]);wc.length>0;)wc.shift()();od={353170:function(g,b,e,h,l){if(typeof window==="undefined"||(window.AudioContext||window.webkitAudioContext)===void 0)return 0;if(typeof window.miniaudio==="undefined"){window.miniaudio={referenceCount:0};window.miniaudio.device_type=
{};window.miniaudio.device_type.playback=g;window.miniaudio.device_type.capture=b;window.miniaudio.device_type.duplex=e;window.miniaudio.device_state={};window.miniaudio.device_state.stopped=h;window.miniaudio.device_state.started=l;var p=window.miniaudio;p.devices=[];p.track_device=function(r){for(var u=0;u<p.devices.length;++u)if(p.devices[u]==null)return p.devices[u]=r,u;p.devices.push(r);return p.devices.length-1};
p.untrack_device_by_index=function(r){for(p.devices[r]=null;p.devices.length>0;)if(p.devices[p.devices.length-1]==null)p.devices.pop();else break};
p.untrack_device=function(r){for(var u=0;u<p.devices.length;++u)if(p.devices[u]==r)return p.untrack_device_by_index(u)};
p.get_device_by_index=function(r){return p.devices[r]};
p.unlock_event_types=["touchend","click"];p.unlock=function(){for(var r=0;r<p.devices.length;++r){var u=p.devices[r];u!=null&&u.webaudio!=null&&u.state===p.device_state.started&&u.webaudio.resume().then(function(){Ze(u.pDevice)},function(z){console.error("Failed to resume audiocontext",z)})}p.unlock_event_types.map(function(z){document.removeEventListener(z,p.unlock,!0)})};
p.unlock_event_types.map(function(r){document.addEventListener(r,p.unlock,!0)})}window.miniaudio.referenceCount+=1;
return 1},
355348:function(){typeof window.miniaudio!=="undefined"&&(window.miniaudio.unlock_event_types.map(function(g){document.removeEventListener(g,window.miniaudio.unlock,!0)}),--window.miniaudio.referenceCount,window.miniaudio.referenceCount===0&&delete window.miniaudio)},
355652:function(){return navigator.mediaDevices!==void 0&&navigator.mediaDevices.getUserMedia!==void 0},
355756:function(){try{var g=new (window.AudioContext||window.webkitAudioContext),b=g.sampleRate;g.close();return b}catch(e){return 0}},
355927:function(g,b,e,h,l,p){if(typeof window.miniaudio==="undefined")return-1;var r={},u={};g==window.miniaudio.device_type.playback&&e!=0&&(u.sampleRate=e);r.webaudio=new (window.AudioContext||window.webkitAudioContext)(u);r.webaudio.suspend();r.state=window.miniaudio.device_state.stopped;e=0;g!=window.miniaudio.device_type.playback&&(e=b);r.scriptNode=r.webaudio.createScriptProcessor(h,e,b);r.scriptNode.onaudioprocess=function(z){if(r.intermediaryBufferView==null||r.intermediaryBufferView.length==
0)r.intermediaryBufferView=new Float32Array(gd.buffer,l,h*b);if(g==window.miniaudio.device_type.capture||g==window.miniaudio.device_type.duplex){for(var B=0;B<b;B+=1)for(var F=z.inputBuffer.getChannelData(B),I=r.intermediaryBufferView,E=0;E<h;E+=1)I[E*b+B]=F[E];$e(p,h,l)}if(g==window.miniaudio.device_type.playback||g==window.miniaudio.device_type.duplex)for(af(p,h,l),B=0;B<z.outputBuffer.numberOfChannels;++B)for(F=z.outputBuffer.getChannelData(B),I=r.intermediaryBufferView,E=0;E<h;E+=1)F[E]=I[E*b+
B];else for(B=0;B<z.outputBuffer.numberOfChannels;++B)z.outputBuffer.getChannelData(B).fill(0)};
g!=window.miniaudio.device_type.capture&&g!=window.miniaudio.device_type.duplex||navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(z){r.streamNode=r.webaudio.createMediaStreamSource(z);r.streamNode.connect(r.scriptNode);r.scriptNode.connect(r.webaudio.destination)}).catch(function(z){console.log("Failed to get user media: "+z)});
g==window.miniaudio.device_type.playback&&r.scriptNode.connect(r.webaudio.destination);r.pDevice=p;return window.miniaudio.track_device(r)},
358804:function(g){return window.miniaudio.get_device_by_index(g).webaudio.sampleRate},
358877:function(g){g=window.miniaudio.get_device_by_index(g);g.scriptNode!==void 0&&(g.scriptNode.onaudioprocess=function(){},g.scriptNode.disconnect(),g.scriptNode=void 0);
g.streamNode!==void 0&&(g.streamNode.disconnect(),g.streamNode=void 0);g.webaudio.close();g.webaudio=void 0;g.pDevice=void 0},
359277:function(g){window.miniaudio.untrack_device_by_index(g)},
359327:function(g){g=window.miniaudio.get_device_by_index(g);g.webaudio.resume();g.state=window.miniaudio.device_state.started},
359466:function(g){g=window.miniaudio.get_device_by_index(g);g.webaudio.suspend();g.state=window.miniaudio.device_state.stopped}};
Xf={I:eg,V:dg,T:bd,U:he,W:Cb,X:sc,y:Wc,ea:nc,O:kf,ca:lf,g:vc,p:pe,F:mf,z:nf,a:Ne,f:be,aa:ce,s:se,h:Oe,L:of,k:pf,r:rf,m:Ed,ba:$c,E:zf,fa:Af,D:Bf,da:Cf,P:te,e:Qe,b:Rd,C:Ff,A:Gf,l:Hf,d:If,n:Jf,i:Kf,t:Lf,c:Mf,j:Nf,R:Of,M:Hd,o:Rf,Q:ee,Y:we,Z:xe,_:Re,G:Gd,S:ge,N:Vd,H:vd,q:Zb,x:ib,J:Eb,K:Nb,$:ob,u:Yb,w:$b,v:Mc,B:cd};return T.yield(fg(),2)}return T.getNextAddressJsc()!=3?(De=T.getYieldResultJsc(),T.yield(kb(),3)):T.return(da)})}}();
globalThis.RiveCanvasLite=Tb}).call(globalThis,_.E,_.nt,_.db,_.Q,_.Y,_.LS,_.R,_.$v,_.Im);
var lZ_=globalThis.RiveCanvasLite;/*

 Copyright 2020-2021 Rive
 SPDX-License-Identifier: MIT
*/
_.BZ={};_.BZ.RiveFont=_.yl_;_.BZ.SemanticMode=_.AS;_.BZ.FileAsset=_.tS.FileAsset;_.BZ.AudioAsset=_.tS.AudioAsset;_.BZ.FontAsset=_.tS.FontAsset;_.BZ.ImageAsset=_.tS.ImageAsset;_.BZ.Fit=_.clw;_.BZ.Alignment=_.kcK;_.BZ.DrawOptimizationOptions=_.JlL;_.BZ.Layout=_.ui;_.BZ.RuntimeLoader=_.Rsw;_.BZ.StateMachineInputType=_.FEa;_.BZ.StateMachineInput=_.OG;_.BZ.RiveEventType=_.NkZ;_.BZ.EventType=_.CUh;_.BZ.DeprecationKeys=_.bi;_.BZ.LoopType=_.Z9Z;_.BZ.RiveFile=_.LE;_.BZ.Rive=_.W0;_.BZ.DataType=_.IZf;
_.BZ.ViewModel=_.H0;_.BZ.DataEnum=_.Xg;_.BZ.ViewModelInstance=_.RO;_.BZ.ViewModelInstanceValue=_.G3;_.BZ.ViewModelInstanceString=_.mz;_.BZ.ViewModelInstanceNumber=_.dn;_.BZ.ViewModelInstanceBoolean=_.wn;_.BZ.ViewModelInstanceTrigger=_.qJ;_.BZ.ViewModelInstanceEnum=_.pE;_.BZ.ViewModelInstanceList=_.hS;_.BZ.ViewModelInstanceColor=_.KE;_.BZ.ViewModelInstanceAssetImage=_.oO;_.BZ.ViewModelInstanceAssetFont=_.nE;_.BZ.ViewModelInstanceArtboard=_.gn;_.BZ.Testing=_.tnb;_.BZ.decodeAudio=_.iQh;
_.BZ.decodeImage=_.u3w;_.BZ.decodeFont=_.OQL;_.BZ.loader=lZ_;
_.Gp();
}catch(e){_._DumpException(e)}
}).call(this,this.default_kevlar_base);
// Google Inc.
