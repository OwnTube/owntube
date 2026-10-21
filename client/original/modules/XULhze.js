"use strict";this.default_kevlar_base=this.default_kevlar_base||{};(function(_){var window=this;
try{
_.gi("XULhze");
(function(xa,bb,qa,S,ja,Ka,Va,mb,yb){var Tb=function(){var Ma,Qa,La=(Ma=globalThis.document)==null?void 0:(Qa=Ma.currentScript)==null?void 0:Qa.src;return function(Fa){function kb(){var M,d,a;return xa(function(c){switch(c.getNextAddressJsc()){case 1:ig();if(!Sc){c.jumpTo(2);break}return c.yield(ac(),2);case 2:M=fa.setStatus;if(!M){c.jumpTo(4);break}M("Running...");return c.yield(new Promise(function(f){return setTimeout(f,1)}),5);
case 5:setTimeout(M,1,"");case 4:if(bc)return c.return();fa.noFSInit||v.initialized||v.init();jb.init();vg.xc();v.ignorePermissions=!1;(a=(d=fa).onRuntimeInitialized)==null||a.call(d);Ge();c.jumpToEnd()}})}
function ob(M,d,a,c,f,k,m,q,t,x){var A=na();try{return Kc(M)(d,a,c,f,k,m,q,t,x)}catch(D){Na(A);if(!(D instanceof Ca))throw D;Se(1,0)}}
function $b(M,d,a){var c=na();try{Kc(M)(d,a)}catch(f){Na(c);if(!(f instanceof Ca))throw f;Se(1,0)}}
function Eb(M,d,a,c){var f=na();try{return Kc(M)(d,a,c)}catch(k){Na(f);if(!(k instanceof Ca))throw k;Se(1,0)}}
function Nb(M,d,a,c,f){var k=na();try{return Kc(M)(d,a,c,f)}catch(m){Na(k);if(!(m instanceof Ca))throw m;Se(1,0)}}
function ib(M,d,a){var c=na();try{return Kc(M)(d,a)}catch(f){Na(c);if(!(f instanceof Ca))throw f;Se(1,0)}}
function Mc(M,d,a,c){var f=na();try{Kc(M)(d,a,c)}catch(k){Na(f);if(!(k instanceof Ca))throw k;Se(1,0)}}
function Yb(M,d){var a=na();try{Kc(M)(d)}catch(c){Na(a);if(!(c instanceof Ca))throw c;Se(1,0)}}
function Zb(M,d){var a=na();try{return Kc(M)(d)}catch(c){Na(a);if(!(c instanceof Ca))throw c;Se(1,0)}}
function cd(){return navigator.platform.indexOf("Win")>-1}
function vd(M,d){(M=ba.getContext(M).GLctx.pv)&&M.provokingVertexWEBGL(d)}
function Vd(M){M=ba.getContext(M).GLctx;M.pv=M.getExtension("WEBGL_provoking_vertex");return!!M.pv}
function ge(M,d,a){(M=ba.getContext(M).GLctx.pls)&&M.endPixelLocalStorageWEBGL(fa.HEAPU32.subarray(a,a+d))}
function Gd(M,d,a){(M=ba.getContext(M).GLctx.pls)&&M.beginPixelLocalStorageWEBGL(fa.HEAPU32.subarray(a,a+d))}
function Hd(M,d,a,c,f,k){(M=ba.getContext(M).GLctx.pls)&&M.framebufferPixelLocalClearValuefvWEBGL(d,[a,c,f,k])}
function Cc(M,d,a,c,f,k){(M=ba.getContext(M).GLctx.pls)&&M.framebufferTexturePixelLocalStorageWEBGL(d,ba.textures[a],c,f,k)}
function Be(M){M=ba.getContext(M).GLctx;var d=M.getExtension("WEBGL_shader_pixel_local_storage");return d&&d.isCoherent()&&d.framebufferTexturePixelLocalStorageWEBGL.length==5?(M.pls=d,!0):!1}
function Rb(M){var d=fa.images;d&&d.get(M)&&d.delete(M)}
function Ce(M,d){var a=fa.images;a&&(d=a.get(d))&&(M=ba.getContext(M).GLctx,M.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),M.texImage2D(M.TEXTURE_2D,0,M.RGBA,M.RGBA,M.UNSIGNED_BYTE,d),M.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1))}
function cg(M,d,a){var c=fa.images;c||(c=new Map,fa.images=c);var f=new Image;c.set(M,f);d=fa.HEAP8.subarray(d,d+a);a=new Uint8Array(a);a.set(d);f.src=URL.createObjectURL(new Blob([a],{type:"image/png"}));f.onload=function(){fa._setWebImage(M,f.width,f.height)}}
function ya(M,d,a,c){try{var f=pb.getStreamFromFD(M),k=Ee(f,d,a);Aa[c>>2]=k;return 0}catch(m){if(typeof v=="undefined"||m.name!=="ErrnoError")throw m;return m.errno}}
function Pa(M,d,a,c,f){d=rd(d,a);try{if(isNaN(d))return 22;var k=pb.getStreamFromFD(M);v.llseek(k,d,c);Ua=[k.position>>>0,(ma=k.position,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[f>>2]=Ua[0];Ha[f+4>>2]=Ua[1];k.getdents&&!d&&c===0&&(k.getdents=null);return 0}catch(m){if(typeof v=="undefined"||m.name!=="ErrnoError")throw m;return m.errno}}
function Ya(M,d,a,c){try{var f=pb.getStreamFromFD(M),k=bf(f,d,a);Aa[c>>2]=k;return 0}catch(m){if(typeof v=="undefined"||m.name!=="ErrnoError")throw m;return m.errno}}
function $a(M){try{var d=pb.getStreamFromFD(M);v.close(d);return 0}catch(a){if(typeof v=="undefined"||a.name!=="ErrnoError")throw a;return a.errno}}
function cb(M,d,a,c){rd(d,a);if(!ie(M))return 28;if(M===0)M=We();else if(Xe)M=Ye();else return 52;M=Math.round(M*1E3*1E3);Ua=[M>>>0,(ma=M,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[c>>2]=Ua[0];Ha[c+4>>2]=Ua[1];return 0}
function zb(M,d,a,c,f){var k=d.length;k<2&&Ea("argTypes array size mismatch! Must at least get return value and receiver (this) types!");var m=d[1]!==null&&a!==null,q=rb(d),t=!d[0].isVoid,x=k-2,A=Array(x),D=[],L=[];return ec(M,function(){var O=bb.apply(0,arguments);L.length=0;D.length=m?2:1;D[0]=f;if(m){var Z=d[1].toWireType(L,this);D[1]=Z}for(var Y=0;Y<x;++Y)A[Y]=d[Y+2].toWireType(L,O[Y]),D.push(A[Y]);O=c.apply(null,qa(D));if(q)Ob(L);else for(Y=m?1:2;Y<d.length;Y++){var N=Y===1?Z:A[Y-2];d[Y].destructorFunction!==
null&&d[Y].destructorFunction(N)}Z=t?d[0].fromWireType(O):void 0;return Z})}
function rb(M){for(var d=1;d<M.length;++d)if(M[d]!==null&&M[d].destructorFunction===void 0)return!0;return!1}
function Cb(M,d,a,c,f,k,m,q,t,x,A){this.name=M;this.registeredClass=d;this.isReference=a;this.isConst=c;this.isSmartPointer=f;this.pointeeType=k;this.sharingPolicy=m;this.rawGetPointee=q;this.rawConstructor=t;this.rawShare=x;this.rawDestructor=A;f||d.baseClass!==void 0?this.toWireType=dg:(c?this.toWireType=eg:this.toWireType=bd,this.destructorFunction=null)}
function he(M){function d(){return this.isSmartPointer?Qd(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:a,smartPtrType:this,smartPtr:M}):Qd(this.registeredClass.instancePrototype,{ptrType:this,ptr:M})}
var a=this.getPointee(M);if(!a)return this.destructor(M),null;var c=sd(this.registeredClass,a);if(void 0!==c){if(0===c.$$.count.value)return c.$$.ptr=a,c.$$.smartPtr=M,c.clone();c=c.clone();this.destructor(M);return c}c=this.registeredClass.getActualType(a);c=Jc[c];if(!c)return d.call(this);c=this.isConst?c.constPointerType:c.pointerType;var f=Jd(a,this.registeredClass,c.registeredClass);return f===null?d.call(this):this.isSmartPointer?Qd(c.registeredClass.instancePrototype,{ptrType:c,ptr:f,smartPtrType:this,
smartPtr:M}):Qd(c.registeredClass.instancePrototype,{ptrType:c,ptr:f})}
function bd(M,d){if(d===null)return this.isReference&&Ea("null is not a valid "+this.name),0;d.$$||Ea('Cannot pass "'+Ld(d)+'" as a '+this.name);d.$$.ptr||Ea("Cannot pass deleted object as a pointer of type "+this.name);d.$$.ptrType.isConst&&Ea("Cannot convert argument of type "+d.$$.ptrType.name+" to parameter type "+this.name);M=d.$$.ptrType.registeredClass;return Oc(d.$$.ptr,M,this.registeredClass)}
function dg(M,d){if(d===null){this.isReference&&Ea("null is not a valid "+this.name);if(this.isSmartPointer){var a=this.rawConstructor();M!==null&&M.push(this.rawDestructor,a);return a}return 0}d&&d.$$||Ea('Cannot pass "'+Ld(d)+'" as a '+this.name);d.$$.ptr||Ea("Cannot pass deleted object as a pointer of type "+this.name);!this.isConst&&d.$$.ptrType.isConst&&Ea("Cannot convert argument of type "+(d.$$.smartPtrType?d.$$.smartPtrType.name:d.$$.ptrType.name)+" to parameter type "+this.name);a=d.$$.ptrType.registeredClass;
a=Oc(d.$$.ptr,a,this.registeredClass);if(this.isSmartPointer)switch(void 0===d.$$.smartPtr&&Ea("Passing raw pointer to smart pointer is illegal"),this.sharingPolicy){case 0:d.$$.smartPtrType===this?a=d.$$.smartPtr:Ea("Cannot convert argument of type "+(d.$$.smartPtrType?d.$$.smartPtrType.name:d.$$.ptrType.name)+" to parameter type "+this.name);break;case 1:a=d.$$.smartPtr;break;case 2:if(d.$$.smartPtrType===this)a=d.$$.smartPtr;else{var c=d.clone();a=this.rawShare(a,fb.toHandle(function(){return c["delete"]()}));
M!==null&&M.push(this.rawDestructor,a)}break;default:Ea("Unsupported sharing policy")}return a}
function eg(M,d){if(d===null)return this.isReference&&Ea("null is not a valid "+this.name),0;d.$$||Ea('Cannot pass "'+Ld(d)+'" as a '+this.name);d.$$.ptr||Ea("Cannot pass deleted object as a pointer of type "+this.name);M=d.$$.ptrType.registeredClass;return Oc(d.$$.ptr,M,this.registeredClass)}
function fg(M,d,a,c,f,k,m,q){this.name=M;this.constructor=d;this.instancePrototype=a;this.rawDestructor=c;this.baseClass=f;this.getActualType=k;this.upcast=m;this.downcast=q;this.pureVirtualFunctions=[]}
function Id(){}
function Fb(M,d,a){a=a===void 0?{}:a;return lg(M,d,a)}
function lg(M,d,a){a=a===void 0?{}:a;var c=d.name;M||Ea('type "'+c+'" must have a positive integer typeid pointer');if(zc.hasOwnProperty(M)){if(a.ignoreDuplicateRegistrations)return;Ea("Cannot register type '"+c+"' twice")}zc[M]=d;delete Xc[M];jc.hasOwnProperty(M)&&(d=jc[M],delete jc[M],d.forEach(function(f){return f()}))}
function Ab(M){return this.fromWireType(Aa[M>>2])}
function Nc(M,d,a,c){pb.varargs=c;try{d=pb.getStr(d);d=pb.calculateAt(M,d);var f=c?eb():0;a&64&&(f&=~pb.currentUmask);return v.open(d,a,f).fd}catch(k){if(typeof v=="undefined"||k.name!=="ErrnoError")throw k;return-k.errno}}
function tg(M,d,a,c){try{d=pb.getStr(d);var f=c&256;d=pb.calculateAt(M,d,c&4096);return pb.writeStat(a,f?v.lstat(d):v.stat(d))}catch(k){if(typeof v=="undefined"||k.name!=="ErrnoError")throw k;return-k.errno}}
function gg(M,d,a){pb.varargs=a;try{var c=pb.getStreamFromFD(M);switch(d){case 21509:return c.tty?0:-59;case 21505:if(!c.tty)return-59;if(c.tty.ops.ioctl_tcgets){var f=c.tty.ops.ioctl_tcgets(c),k=Oa();Ha[k>>2]=f.c_iflag||0;Ha[k+4>>2]=f.c_oflag||0;Ha[k+8>>2]=f.c_cflag||0;Ha[k+12>>2]=f.c_lflag||0;for(var m=0;m<32;m++)Pb[k+m+17]=f.c_cc[m]||0}return 0;case 21510:case 21511:case 21512:return c.tty?0:-59;case 21506:case 21507:case 21508:if(!c.tty)return-59;if(c.tty.ops.ioctl_tcsets){k=Oa();var q=Ha[k>>
2],t=Ha[k+4>>2],x=Ha[k+8>>2],A=Ha[k+12>>2];M=[];for(m=0;m<32;m++)M.push(Pb[k+m+17]);return c.tty.ops.ioctl_tcsets(c.tty,d,{c_iflag:q,c_oflag:t,c_cflag:x,c_lflag:A,c_cc:M})}return 0;case 21519:if(!c.tty)return-59;k=Oa();return Ha[k>>2]=0;case 21520:return c.tty?-28:-59;case 21537:case 21531:return k=Oa(),v.ioctl(c,d,k);case 21523:if(!c.tty)return-59;if(c.tty.ops.ioctl_tiocgwinsz){var D=c.tty.ops.ioctl_tiocgwinsz(c.tty);k=Oa();sc[k>>1]=D[0];sc[k+2>>1]=D[1]}return 0;case 21524:return c.tty?0:-59;case 21515:return c.tty?
0:-59;default:return-28}}catch(L){if(typeof v=="undefined"||L.name!=="ErrnoError")throw L;return-L.errno}}
function hg(M,d){try{return pb.writeStat(d,v.fstat(M))}catch(a){if(typeof v=="undefined"||a.name!=="ErrnoError")throw a;return-a.errno}}
function Yf(M,d,a){pb.varargs=a;try{var c=pb.getStreamFromFD(M);switch(d){case 0:var f=eb();if(f<0)break;for(;v.streams[f];)f++;return v.dupStream(c,f).fd;case 1:case 2:return 0;case 3:return c.flags;case 4:return f=eb(),c.flags=c.flags&-289793|f&289792,0;case 12:return f=Oa(),sc[f+0>>1]=2,0;case 13:case 14:return 0}return-28}catch(k){if(typeof v=="undefined"||k.name!=="ErrnoError")throw k;return-k.errno}}
function cf(){function M(k){k=vg=k.exports;Te=k.zc;ze=k.Ac;fa._setWebImage=k.Bc;wg=k.Cc;Gg=fa._ma_device__on_notification_unlocked=k.Dc;fa._ma_malloc_emscripten=k.Ec;fa._ma_free_emscripten=k.Fc;Hg=fa._ma_device_process_pcm_frames_capture__webaudio=k.Gc;Ig=fa._ma_device_process_pcm_frames_playback__webaudio=k.Hc;Jg=k.Ic;Se=k.Jc;Ue=k.Kc;Kg=k.Lc;fc.vijj=k.Mc;fc.iiiji=k.Nc;fc.iij=k.Oc;fc.iiji=k.Pc;fc.jii=k.Qc;fc.jiii=k.Rc;fc.iijjiiiii=k.Sc;fc.jiji=k.Tc;fc.viijii=k.Uc;fc.iiiiij=k.Vc;fc.iiiiijj=k.Wc;fc.iiiiiijj=
k.Xc;xg=k.wc;yg=k.yc;df();return vg}
var d,a,c,f;return xa(function(k){if(k.getNextAddressJsc()==1){d={a:Lg};if(a=fa.instantiateWasm)return k.return(new Promise(function(m){a(d,function(q){return m(M(q))})}));
ta!=null||(ta=ef("webgl2_advanced_cc.wasm"));return k.yield(Zf(ic,ta,d),2)}c=k.getYieldResultJsc();f=M(c.instance);return k.return(f)})}
function Zf(M,d,a){var c,f,k;return xa(function(m){switch(m.getNextAddressJsc()){case 1:if(M){m.jumpTo(2);break}m.setCatchFinallyBlocks(3);c=fetch(d,{credentials:"same-origin"});return m.yield(WebAssembly.instantiateStreaming(c,a),5);case 5:return f=m.getYieldResultJsc(),m.return(f);case 3:k=m.enterCatchBlock(),Gb("wasm streaming compile failed: "+k),Gb("falling back to ArrayBuffer instantiation");case 2:return m.return(ia(d,a))}})}
function ia(M,d){var a,c,f;return xa(function(k){switch(k.getNextAddressJsc()){case 1:return k.setCatchFinallyBlocks(2),k.yield(da(M),4);case 4:return a=k.getYieldResultJsc(),k.yield(WebAssembly.instantiate(a,d),5);case 5:return c=k.getYieldResultJsc(),k.return(c);case 2:f=k.enterCatchBlock(),Gb("failed to asynchronously prepare wasm: "+f),Jb(f),k.jumpToEnd()}})}
function da(M){var d;return xa(function(a){switch(a.getNextAddressJsc()){case 1:if(ic){a.jumpTo(2);break}a.setCatchFinallyBlocks(3);return a.yield(qc(M),5);case 5:return d=a.getYieldResultJsc(),a.return(new Uint8Array(d));case 3:a.enterCatchBlock();case 2:var c=a.return;if(rc)var f=rc(M);else throw"both async and sync fetching of the wasm failed";return c.call(a,f)}})}
function Jb(M){var d,a;(a=(d=fa).onAbort)==null||a.call(d,M);M="Aborted("+M+")";Gb(M);bc=!0;throw new WebAssembly.RuntimeError(M+". Build with -sASSERTIONS for more info.");}
function Ge(){var M=fa.postRun;if(M){typeof M=="function"&&(M=[M]);var d;(d=Xd).push.apply(d,qa(M))}Wd(Xd)}
function ig(){var M=fa.preRun;if(M){typeof M=="function"&&(M=[M]);var d;(d=xc).push.apply(d,qa(M))}Wd(xc)}
function df(){var M,d;((M=Pb)==null?0:(d=M.buffer)==null?0:d.resizable)||(M=xg.buffer,fa.HEAP8=Pb=new Int8Array(M),sc=new Int16Array(M),fa.HEAPU8=Mb=new Uint8Array(M),fa.HEAPU16=Zc=new Uint16Array(M),fa.HEAP32=Ha=new Int32Array(M),fa.HEAPU32=Aa=new Uint32Array(M),fa.HEAPF32=hd=new Float32Array(M),Pe=new Float64Array(M))}
function ef(M){return fa.locateFile?fa.locateFile(M,Qc):Qc+M}
function Yd(M,d){console.assert(M>0);var a=new Map,c=-Infinity;this.push=function(f){f=f+((1<<d)-1)>>d;a.has(f)&&clearTimeout(a.get(f));a.set(f,setTimeout(function(){a.delete(f);if(a.length==0)c=-Infinity;else if(f==c){var k;c=(k=Math).max.apply(k,qa(a.keys()));console.assert(c<f)}},M));
c=Math.max(f,c);return c<<d}}
function la(){function M(m){var q=c;a=d=0;c=new Map;q.forEach(function(t){try{t(m)}catch(x){console.error(x)}});
this.onAfterCallbacks();f&&f.frameComplete()}
var d=0,a=0,c=new Map,f=null,k=null;this.requestAnimationFrame=function(m){d||(d=requestAnimationFrame(M.bind(this)));var q=++a;c.set(q,m);return q};
this.cancelAnimationFrame=function(m){c.delete(m);d&&c.size==0&&(cancelAnimationFrame(d),d=0)};
this.enableFPSCounter=function(m){k&&(document.body.remove(k),k=null);m||(k=document.createElement("div"),k.style.backgroundColor="black",k.style.position="fixed",k.style.right=0,k.style.top=0,k.style.color="white",k.style.padding="4px",k.textContent="RIVE FPS",m=function(q){k.textContent="RIVE FPS "+q.toFixed(1)},document.body.appendChild(k));
f=new function(){var q=0,t=0;this.frameComplete=function(){var x=performance.now();t?(++q,x-=t,x>1E3&&(m(q*1E3/x),q=t=0)):(t=x,q=0)}}};
this.disableFPSCounter=function(){k&&(document.body.remove(k),k=null);f=null};
this.onAfterCallbacks=function(){}}
Fa=Fa===void 0?{}:Fa;var fa,Ub,kc,xd,ff,je,Nd,Zd,He,Md,Qc,qc,rc,pc,Gb,ic,bc,Ca,sa,ta,ma,Ua,dc,Pb,Wd,Xd,xc,Db,Na,na,Ha,eb,Oa,tb,id,lc,Gc,Hc,mc,yc,Rc,jd,yd,Ic,vb,jb,Mb,$d,Wa,za,Xa,Od,zd,ke,gf,Ie,le,dd,ac,Sc,Je,hf,jf,Ke,me,Le,Me,Ad,w,n,v,pa,Aa,pb,sc,Dc,ec,Hb,Ra,va,Ea,fb,Za,sb,Tc,Uc,cc,zc,Bd,Cd,Vc,kd,ae,ld,tc,Wc,Ac,Sb,Ob,jc,Xc,Kb,ub,nc,kf,lf,ne,Dd,Pd,oe,Kd,Jc,Bc,md,Pc,Oc,Ld,Jd,sd,Qd,Vb,wb,fc,uc,Ib,Kc,Wb,qb,xb,Qb,vc,Yc,nd,pe,mf,nf,Ne,qe,be,Rd,re,ce,Fc,Zc,se,Oe,gd,hd,Pe,of,pf,qf,rf,Ed,hc,$c,sf,tf,uf,vf,
wf,xf,yf,zf,Af,Bf,Cf,te,Sd,ue,Df,Ef,ve,de,Qe,Ff,Gf,Hf,If,Jf,Kf,Lf,Mf,Nf,Of,Ye,We,Xe,ie,rd,Td,Pf,Qf,Rf,Sf,Tf,ee,Ud,U,V,we,xe,ye,aa,ba,Re,Vf,ed,wc,od,Ec,oc,wd,Ze,$e,af,Wf,qd,fd,bf,Ee,Fe,Xf,De,T,g,b,e,h,l,p,r,u,z,B,F,I,E,G,H,J,Q,X,wa,Ba,Ja,Sa,ab,lb,nb,Lb,ad,pd,Lc,td,jg,ng,$f,ag,og,K,y,C,P,R,ca,ha,ea,oa,ua,Da,gb,Bb,Xb,ud,mg,ug,Fg,Ug,Vg,Wg,Xg,Yg,Zg,$g,ah,bh,ch,dh,eh,fh,gh,hh,ih,jh,kh,lh,mh,nh,oh,ph,qh,rh,sh,th,uh,vh,wh,xh,yh,zh,Ah,Bh,Ch,Dh,Eh,Fh,Gh,Hh,zg,Bg,Ih,Jh,Kh,Lh,Mh,Nh,Oh,Ph,Qh,Rh,Sh,Th,Uh,Vh,Wh,
Xh,Yh,Zh,$h,ai,bi,ci,di,ei,fi,gi,hi,ii,ji,ki,li,mi,ni,oi,pi,Mg,Ag,pg,Ng,qi,ri,si,ti,ui,vi,wi,xi,yi,zi,Ai,Bi,Ci,kg,qg,Di,Ei,Fi,Gi,Hi,Og,Cg,Dg,Ii,Ji,Ki,Li,Mi,Ni,Oi,Pi,Qi,Ri,Si,Ti,Ui,Vi,Wi,Xi,Yi,Zi,$i,aj,rg,Ve,sg,bj,cj,dj,ej,fj,gj,hj,ij,jj,kj,lj,mj,nj,oj,pj,qj,rj,sj,tj,uj,vj,wj,xj,yj,zj,Aj,Bj,Cj,Dj,Ej,Fj,Pg,Qg,Rg,Gj,Hj,Ij,Jj,Sg,Tg,Kj,Lj,Mj,Nj,Oj,Pj,Qj,Rj,Sj,Tj,Uj,Vj,Wj,Xj,Ae,fe,Uf,bg,Te,ze,wg,Gg,Hg,Ig,Jg,Se,Ue,Kg,xg,yg,Lg,vg;return xa(function(M){if(M.getNextAddressJsc()==1){fa=Fa;Ub=!!globalThis.window;
kc=!!globalThis.WorkerGlobalScope;((xd=globalThis.process)==null?0:(ff=xd.versions)==null?0:ff.node)&&((je=globalThis.process)==null||je.type);Nd=fa.onRuntimeInitialized;fa.onRuntimeInitialized=function(){Nd&&Nd();var d=fa.decodeAudio;fa.decodeAudio=function(q,t,x){var A;q=d(q,(A=x===void 0?null:x)!=null?A:null);t(q)};
var a=fa.decodeFont;fa.decodeFont=function(q,t,x){var A;q=a(q,(A=x===void 0?null:x)!=null?A:null);t(q)};
var c=fa.FileAsset.prototype.decode;fa.FileAsset.prototype.decode=function(q,t){return c.call(this,q,t!=null?t:null)};
var f=fa.setFallbackFontCb;fa.setFallbackFontCallback=typeof f==="function"?function(q){f(q)}:function(){console.warn("Module.setFallbackFontCallback called, but text support is not enabled in this build.")};
var k=fa.FileAssetLoader;fa.ptrToAsset=function(q){var t=fa.ptrToFileAsset(q);return t.isImage?fa.ptrToImageAsset(q):t.isFont?fa.ptrToFontAsset(q):t.isAudio?fa.ptrToAudioAsset(q):t};
fa.CustomFileAssetLoader=k.extend("CustomFileAssetLoader",{__construct:function(q){q=q.loadContents;this.__parent.__construct.call(this);this._loadContents=q},
loadContents:function(q,t){q=fa.ptrToAsset(q);return this._loadContents(q,t)}});
fa.CDNFileAssetLoader=k.extend("CDNFileAssetLoader",{__construct:function(q){this.__parent.__construct.call(this);this._session=q!=null?q:null},
loadContents:function(q){var t=fa.ptrToAsset(q);q=t.cdnUuid;if(q==="")return!1;var x,A=(x=this._session)!=null?x:null;(function(D,L){var O=new XMLHttpRequest;O.responseType="arraybuffer";O.onreadystatechange=function(){O.readyState==4&&O.status==200&&L(O)};
O.open("GET",D,!0);O.send(null)})(t.cdnBaseUrl+"/"+q,function(D){t.decode(new Uint8Array(D.response),A)});
return!0}});
fa.FallbackFileAssetLoader=k.extend("FallbackFileAssetLoader",{__construct:function(){this.__parent.__construct.call(this);this.loaders=[]},
addLoader:function(q){this.loaders.push(q)},
loadContents:function(q,t){var x=S(this.loaders),A=x.next();try{for(;!A.done;A=x.next())if(A.value.loadContents(q,t))return!0}finally{ja(x,A)}return!1}});
var m=fa.computeAlignment;fa.computeAlignment=function(q,t,x,A,D){return m.call(this,q,t,x,A,D===void 0?1:D)}};
Zd=fa.onRuntimeInitialized;fa.onRuntimeInitialized=function(){function d(Y){this._canvas=Y;this._ctx=Y.getContext("2d");this._realRenderer=f;this._drawList=[];this._saveCount=0;this.clear=function(){console.assert(this._saveCount==0);this._drawList=[];k.delete(this)};
this.save=function(){++this._saveCount;this._drawList.push(f.save.bind(f))};
this.restore=function(){this._saveCount>0&&(this._drawList.push(f.restore.bind(f)),--this._saveCount)};
this.transform=function(N){this._drawList.push(f.transform.bind(f,N))};
this.align=function(N,W,ka,ra,Ga){this._drawList.push(f.align.bind(f,N,W,ka,ra,Ga===void 0?1:Ga))};
this.flush=function(){console.assert(this._saveCount==0);k.add(this);f._hasPixelLocalStorage||c()};
this.bindContext=function(){var N=this._realRenderer;N&&N._handle&&ba.makeContextCurrent(N._handle)};
this["delete"]=function(){}}
function a(Y,N){N=N===void 0?!1:N;var W={alpha:!0,depth:N,stencil:N,antialias:N,premultipliedAlpha:!0,preserveDrawingBuffer:0,powerPreference:"high-performance",failIfMajorPerformanceCaveat:0,enableExtensionsByDefault:!1,explicitSwapControl:0,renderViaOffscreenBackBuffer:0};N=Y.getContext("webgl2",W);if(!N)return null;W=ba.registerContext(N,W);ba.makeContextCurrent(W);var ka=m(Y.width,Y.height);ka._handle=W;ka._canvas=Y;ka._width=Y.width;ka._height=Y.height;ka._gl=N;ka.bindContext=function(){this._handle&&
ba.makeContextCurrent(this._handle)};
var ra=ka.delete;ka.delete=function(){this.bindContext();ra.call(this);ba.deleteContext(this._handle);this._handle=this._canvas=this._width=this._height=this._gl=null};
return ka}
function c(){if(f){var Y=f._maxRTSize,N=0,W=0,ka=0,ra=Array(k.size),Ga=0,hb=S(k),Ta=hb.next();try{for(;!Ta.done;Ta=hb.next()){var Ia=Ta.value;Ia._backingWidth=Math.min(Ia._canvas.width,Y);Ia._backingHeight=Math.min(Ia._canvas.height,Y);Ia._backingArea=Ia._backingHeight*Ia._backingWidth;N=Math.max(N,Ia._backingWidth);W=Math.max(W,Ia._backingHeight);ka+=Ia._backingArea;ra[Ga++]=Ia}}finally{ja(hb,Ta)}k.clear();if(!(ka<=0)){N=1<<(N<=0?0:32-Math.clz32(N-1));for(W=1<<(W<=0?0:32-Math.clz32(W-1));W*N<ka;)N<=
W?N*=2:W*=2;N=Math.min(N,Y);N=Math.min(W,Y);ra.sort(function(Yj,Zj){return Zj._backingArea-Yj._backingArea});
ka=new fa.DynamicRectanizer(Y);for(hb=0;hb<ra.length;){ka.reset(N,W);for(Ga=hb;Ga<ra.length;++Ga){Ta=ra[Ga];Ia=ka.addRect(Ta._backingWidth,Ta._backingHeight);if(Ia<0){console.assert(Ga>hb);break}Ta._atlasX=Ia&65535;Ta._atlasY=Ia>>16}Ta=x.push(ka.drawWidth());Ia=A.push(ka.drawHeight());console.assert(Ta>=ka.drawWidth());console.assert(Ia>=ka.drawHeight());console.assert(Ta<=Y);console.assert(Ia<=Y);f._canvas.width!=Ta&&(f._canvas.width=Ta);f._canvas.height!=Ia&&(f._canvas.height=Ia);f.clear();for(Ta=
hb;Ta<Ga;++Ta){Ia=ra[Ta];f.saveClipRect(Ia._atlasX,Ia._atlasY,Ia._atlasX+Ia._backingWidth,Ia._atlasY+Ia._backingHeight);var db=new fa.Mat2D;db.xx=Ia._backingWidth/Ia._canvas.width;db.yy=Ia._backingHeight/Ia._canvas.height;db.xy=db.yx=0;db.tx=Ia._atlasX;db.ty=Ia._atlasY;f.transform(db);db=S(Ia._drawList);var Fd=db.next();try{for(;!Fd.done;Fd=db.next()){var Eg=Fd.value;Eg()}}finally{ja(db,Fd)}f.restoreClipRect();Ia._drawList=[]}for(f.flush();hb<Ga;++hb)Ta=ra[hb],Ia=Ta._ctx,Ia.globalCompositeOperation=
"copy",Ia.drawImage(f._canvas,Ta._atlasX,Ta._atlasY,Ta._backingWidth,Ta._backingHeight,0,0,Ta._canvas.width,Ta._canvas.height);hb=Ga}}}}
Zd&&Zd();var f=null,k=new Set,m=fa.makeRenderer;fa.makeRenderer=function(Y,N){if(!f){var W=function(ka){var ra=document.createElement("canvas");ra.width=1;ra.height=1;f=a(ra,ka);if(!f)return null;f._hasPixelLocalStorage=!!f._gl.getExtension("WEBGL_shader_pixel_local_storage");f._maxRTSize=Math.min(f._gl.getParameter(f._gl.MAX_RENDERBUFFER_SIZE),f._gl.getParameter(f._gl.MAX_TEXTURE_SIZE));f._enableAntialiasCanvas=!f._hasPixelLocalStorage;if(ra=f._gl.getExtension("WEBGL_debug_renderer_info"))ka=f._gl.getParameter(ra.UNMASKED_VENDOR_WEBGL),
ra=f._gl.getParameter(ra.UNMASKED_RENDERER_WEBGL),ka.includes("Google")&&ra.includes("ANGLE Metal Renderer")&&(f._enableAntialiasCanvas=!1);return f};
f=W(!0);if(!f)throw"Unable to create WebGL context, your environment may not support WebGL. Try out @rive-app/canvas as an alternative.";f._enableAntialiasCanvas||(f=W(!1))}return N?new d(Y):a(Y,f._enableAntialiasCanvas)};
var q=fa.Artboard.prototype["delete"];fa.Artboard.prototype["delete"]=function(){this.artboardDeleted=!0;q.call(this)};
var t=fa.Artboard.prototype.draw;fa.Artboard.prototype.draw=function(Y){var N=this;Y._drawList?Y._drawList.push(function(){N.artboardDeleted||t.call(N,Y._realRenderer)}):t.call(this,Y)};
var x=new Yd(1E3,8),A=new Yd(1E3,8),D=new la;fa.requestAnimationFrame=D.requestAnimationFrame.bind(D);fa.cancelAnimationFrame=D.cancelAnimationFrame.bind(D);fa.enableFPSCounter=D.enableFPSCounter.bind(D);D.onAfterCallbacks=c;fa.resolveAnimationFrame=c;var L=fa.load;fa.load=function(Y,N,W,ka){W=W===void 0?!0:W;ka=ka===void 0?null:ka;var ra=new fa.FallbackFileAssetLoader;N!==void 0&&ra.addLoader(N);W&&(N=new fa.CDNFileAssetLoader(ka),ra.addLoader(N));var Ga;return Promise.resolve(L(Y,ra,(Ga=ka)!=null?
Ga:null))};
var O=fa.WebGL2Renderer.prototype.clear;fa.WebGL2Renderer.prototype.clear=function(){ba.makeContextCurrent(this._handle);var Y=this._canvas;if(this._width!=Y.width||this._height!=Y.height)this.resize(Y.width,Y.height),this._width=Y.width,this._height=Y.height;O.call(this)};
fa.decodeImage=function(Y,N,W){var ka;Y=fa.decodeWebGL2Image(Y,(ka=W===void 0?null:W)!=null?ka:null);N(Y)};
var Z=fa.Renderer.prototype.align;fa.Renderer.prototype.align=function(Y,N,W,ka,ra){Z.call(this,Y,N,W,ka,ra===void 0?1:ra)}};
He="./this.program";Md=function(d,a){throw a;};
kc&&(La=self.location.href);Qc="";if(Ub||kc){try{Qc=(new URL(".",La)).href}catch(d){}kc&&(rc=function(d){var a=new XMLHttpRequest;a.open("GET",d,!1);a.responseType="arraybuffer";a.send(null);return new Uint8Array(a.response)});
qc=function(d){var a;return xa(function(c){if(c.getNextAddressJsc()==1)return c.yield(fetch(d,{credentials:"same-origin"}),2);a=c.getYieldResultJsc();if(a.ok)return c.return(a.arrayBuffer());throw Error(a.status+" : "+a.url);})}}pc=console.log.bind(console);
Gb=console.error.bind(console);bc=!1;Ca=function(){};
sa=function(){return Ka(Ca,arguments,this.constructor)};
Va(sa,Ca);dc=function(d){this.name="ExitStatus";this.message="Program terminated with exit("+d+")";this.status=d};
Wd=function(d){for(;d.length>0;)d.shift()(fa)};
Xd=[];xc=[];Db=!0;Na=function(d){return Ue(d)};
na=function(){return Kg()};
Oa=eb=function(){var d=Ha[+pb.varargs>>2];pb.varargs+=4;return d};
tb={isAbs:function(d){return d.charAt(0)==="/"},
splitPath:function(d){return/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(d).slice(1)},
normalizeArray:function(d,a){for(var c=0,f=d.length-1;f>=0;f--){var k=d[f];k==="."?d.splice(f,1):k===".."?(d.splice(f,1),c++):c&&(d.splice(f,1),c--)}if(a)for(;c;c--)d.unshift("..");return d},
normalize:function(d){var a=tb.isAbs(d),c=d.slice(-1)==="/";(d=tb.normalizeArray(d.split("/").filter(function(f){return!!f}),!a).join("/"))||a||(d=".");
d&&c&&(d+="/");return(a?"/":"")+d},
dirname:function(d){var a=tb.splitPath(d);d=a[0];a=a[1];if(!d&&!a)return".";a&&(a=a.slice(0,-1));return d+a},
basename:function(d){return d&&d.match(/([^\/]+|\/)\/*$/)[1]},
join:function(){var d=bb.apply(0,arguments);return tb.normalize(d.join("/"))},
join2:function(d,a){return tb.normalize(d+"/"+a)}};
id=function(){return function(d){return crypto.getRandomValues(d),0}};
lc=function(d){return(lc=id())(d)};
Gc={resolve:function(){for(var d=bb.apply(0,arguments),a="",c=!1,f=d.length-1;f>=-1&&!c;f--){c=f>=0?d[f]:v.cwd();if(typeof c!="string")throw new TypeError("Arguments to path.resolve must be strings");if(!c)return"";a=c+"/"+a;c=tb.isAbs(c)}a=tb.normalizeArray(a.split("/").filter(function(k){return!!k}),!c).join("/");
return(c?"/":"")+a||"."},
relative:function(d,a){function c(q){for(var t=0;t<q.length&&q[t]==="";t++);for(var x=q.length-1;x>=0&&q[x]==="";x--);return t>x?[]:q.slice(t,x-t+1)}
d=Gc.resolve(d).slice(1);a=Gc.resolve(a).slice(1);d=c(d.split("/"));a=c(a.split("/"));for(var f=Math.min(d.length,a.length),k=f,m=0;m<f;m++)if(d[m]!==a[m]){k=m;break}f=[];for(m=k;m<d.length;m++)f.push("..");f=f.concat(a.slice(k));return f.join("/")}};
Hc=new TextDecoder;mc=function(d,a,c,f){c=a+c;if(f)return c;for(;d[a]&&!(a>=c);)++a;return a};
yc=function(d,a,c,f){a=a===void 0?0:a;c=mc(d,a,c,f);return Hc.decode(d.buffer?d.subarray(a,c):new Uint8Array(d.slice(a,c)))};
Rc=[];jd=function(d){for(var a=0,c=0;c<d.length;++c){var f=d.charCodeAt(c);f<=127?a++:f<=2047?a+=2:f>=55296&&f<=57343?(a+=4,++c):a+=3}return a};
yd=function(d,a,c,f){if(!(f>0))return 0;var k=c;f=c+f-1;for(var m=0;m<d.length;++m){var q=d.codePointAt(m);if(q<=127){if(c>=f)break;a[c++]=q}else if(q<=2047){if(c+1>=f)break;a[c++]=192|q>>6;a[c++]=128|q&63}else if(q<=65535){if(c+2>=f)break;a[c++]=224|q>>12;a[c++]=128|q>>6&63;a[c++]=128|q&63}else{if(c+3>=f)break;a[c++]=240|q>>18;a[c++]=128|q>>12&63;a[c++]=128|q>>6&63;a[c++]=128|q&63;m++}}a[c]=0;return c-k};
Ic=function(d,a,c){c=c>0?c:jd(d)+1;c=Array(c);d=yd(d,c,0,c.length);a&&(c.length=d);return c};
vb=function(){if(!Rc.length){var d=null,a;if((a=globalThis.window)==null?0:a.prompt)d=window.prompt("Input: "),d!==null&&(d+="\n");if(!d)return null;Rc=Ic(d,!0)}return Rc.shift()};
jb={ttys:[],init:function(){},
shutdown:function(){},
register:function(d,a){jb.ttys[d]={input:[],output:[],ops:a};v.registerDevice(d,jb.stream_ops)},
stream_ops:{open:function(d){var a=jb.ttys[d.node.rdev];if(!a)throw new v.ErrnoError(43);d.tty=a;d.seekable=!1},
close:function(d){d.tty.ops.fsync(d.tty)},
fsync:function(d){d.tty.ops.fsync(d.tty)},
read:function(d,a,c,f){if(!d.tty||!d.tty.ops.get_char)throw new v.ErrnoError(60);for(var k=0,m=0;m<f;m++){try{var q=d.tty.ops.get_char(d.tty)}catch(t){throw new v.ErrnoError(29);}if(q===void 0&&!k)throw new v.ErrnoError(6);if(q===null||q===void 0)break;k++;a[c+m]=q;if(q===10)break}k&&(d.node.atime=Date.now());return k},
write:function(d,a,c,f){if(!d.tty||!d.tty.ops.put_char)throw new v.ErrnoError(60);try{for(var k=0;k<f;k++)d.tty.ops.put_char(d.tty,a[c+k])}catch(m){throw new v.ErrnoError(29);}f&&(d.node.mtime=d.node.ctime=Date.now());return k}},
default_tty_ops:{get_char:function(){return vb()},
put_char:function(d,a){a===null||a===10?(pc(yc(d.output)),d.output=[]):a!=0&&d.output.push(a)},
fsync:function(d){var a;((a=d.output)==null?void 0:a.length)>0&&(pc(yc(d.output)),d.output=[])},
ioctl_tcgets:function(){return{c_iflag:25856,c_oflag:5,c_cflag:191,c_lflag:35387,c_cc:[3,28,127,21,4,0,1,0,17,19,26,0,18,15,23,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}},
ioctl_tcsets:function(){return 0},
ioctl_tiocgwinsz:function(){return[24,80]}},
default_tty1_ops:{put_char:function(d,a){a===null||a===10?(Gb(yc(d.output)),d.output=[]):a!=0&&d.output.push(a)},
fsync:function(d){var a;((a=d.output)==null?void 0:a.length)>0&&(Gb(yc(d.output)),d.output=[])}}};
$d=function(d,a){return Mb.fill(0,d,d+a)};
Wa=function(d,a){return Math.ceil(d/a)*a};
za=function(d){d=Wa(d,65536);var a=Jg(65536,d);a&&$d(a,d);return a};
Xa={ops_table:null,mount:function(){return Xa.createNode(null,"/",16895,0)},
createNode:function(d,a,c,f){if(v.isBlkdev(c)||v.isFIFO(c))throw new v.ErrnoError(63);var k;(k=Xa).ops_table||(k.ops_table={dir:{node:{getattr:Xa.node_ops.getattr,setattr:Xa.node_ops.setattr,lookup:Xa.node_ops.lookup,mknod:Xa.node_ops.mknod,rename:Xa.node_ops.rename,unlink:Xa.node_ops.unlink,rmdir:Xa.node_ops.rmdir,readdir:Xa.node_ops.readdir,symlink:Xa.node_ops.symlink},stream:{llseek:Xa.stream_ops.llseek}},file:{node:{getattr:Xa.node_ops.getattr,setattr:Xa.node_ops.setattr},stream:{llseek:Xa.stream_ops.llseek,
read:Xa.stream_ops.read,write:Xa.stream_ops.write,mmap:Xa.stream_ops.mmap,msync:Xa.stream_ops.msync}},link:{node:{getattr:Xa.node_ops.getattr,setattr:Xa.node_ops.setattr,readlink:Xa.node_ops.readlink},stream:{}},chrdev:{node:{getattr:Xa.node_ops.getattr,setattr:Xa.node_ops.setattr},stream:v.chrdev_stream_ops}});c=v.createNode(d,a,c,f);if(v.isDir(c.mode))c.node_ops=Xa.ops_table.dir.node,c.stream_ops=Xa.ops_table.dir.stream,c.contents={};else if(v.isFile(c.mode)){c.node_ops=Xa.ops_table.file.node;c.stream_ops=
Xa.ops_table.file.stream;c.usedBytes=0;var m,q;c.contents=(q=(m=Xa).emptyFileContents)!=null?q:m.emptyFileContents=new Uint8Array(0)}else v.isLink(c.mode)?(c.node_ops=Xa.ops_table.link.node,c.stream_ops=Xa.ops_table.link.stream):v.isChrdev(c.mode)&&(c.node_ops=Xa.ops_table.chrdev.node,c.stream_ops=Xa.ops_table.chrdev.stream);c.atime=c.mtime=c.ctime=Date.now();d&&(d.contents[a]=c,d.atime=d.mtime=d.ctime=c.atime);return c},
getFileDataAsTypedArray:function(d){return d.contents.subarray(0,d.usedBytes)},
expandFileStorage:function(d,a){var c=d.contents.length;c>=a||(a=Math.max(a,c*(c<1048576?2:1.125)>>>0),c&&(a=Math.max(a,256)),c=Xa.getFileDataAsTypedArray(d),d.contents=new Uint8Array(a),d.contents.set(c))},
resizeFileStorage:function(d,a){if(d.usedBytes!=a){var c=d.contents;d.contents=new Uint8Array(a);d.contents.set(c.subarray(0,Math.min(a,d.usedBytes)));d.usedBytes=a}},
node_ops:{getattr:function(d){var a={};a.dev=v.isChrdev(d.mode)?d.id:1;a.ino=d.id;a.mode=d.mode;a.nlink=1;a.uid=0;a.gid=0;a.rdev=d.rdev;v.isDir(d.mode)?a.size=4096:v.isFile(d.mode)?a.size=d.usedBytes:v.isLink(d.mode)?a.size=d.link.length:a.size=0;a.atime=new Date(d.atime);a.mtime=new Date(d.mtime);a.ctime=new Date(d.ctime);a.blksize=4096;a.blocks=Math.ceil(a.size/a.blksize);return a},
setattr:function(d,a){var c=S(["mode","atime","mtime","ctime"]),f=c.next();try{for(;!f.done;f=c.next()){var k=f.value;a[k]!=null&&(d[k]=a[k])}}finally{ja(c,f)}a.size!==void 0&&Xa.resizeFileStorage(d,a.size)},
lookup:function(){Xa.doesNotExistError||(Xa.doesNotExistError=new v.ErrnoError(44),Xa.doesNotExistError.stack="<generic error, no stack>");throw Xa.doesNotExistError;},
mknod:function(d,a,c,f){return Xa.createNode(d,a,c,f)},
rename:function(d,a,c){try{var f=v.lookupNode(a,c)}catch(m){}if(f){if(v.isDir(d.mode))for(var k in f.contents)throw new v.ErrnoError(55);v.hashRemoveNode(f)}delete d.parent.contents[d.name];a.contents[c]=d;d.name=c;a.ctime=a.mtime=d.parent.ctime=d.parent.mtime=Date.now()},
unlink:function(d,a){delete d.contents[a];d.ctime=d.mtime=Date.now()},
rmdir:function(d,a){var c=v.lookupNode(d,a),f;for(f in c.contents)throw new v.ErrnoError(55);delete d.contents[a];d.ctime=d.mtime=Date.now()},
readdir:function(d){return[".",".."].concat(qa(Object.keys(d.contents)))},
symlink:function(d,a,c){d=Xa.createNode(d,a,41471,0);d.link=c;return d},
readlink:function(d){if(!v.isLink(d.mode))throw new v.ErrnoError(28);return d.link}},
stream_ops:{read:function(d,a,c,f,k){var m=d.node.contents;if(k>=d.node.usedBytes)return 0;d=Math.min(d.node.usedBytes-k,f);a.set(m.subarray(k,k+d),c);return d},
write:function(d,a,c,f,k,m){a.buffer===Pb.buffer&&(m=!1);if(!f)return 0;d=d.node;d.mtime=d.ctime=Date.now();m?(d.contents=a.subarray(c,c+f),d.usedBytes=f):d.usedBytes||k?(Xa.expandFileStorage(d,k+f),d.contents.set(a.subarray(c,c+f),k),d.usedBytes=Math.max(d.usedBytes,k+f)):(d.contents=a.slice(c,c+f),d.usedBytes=f);return f},
llseek:function(d,a,c){c===1?a+=d.position:c===2&&v.isFile(d.node.mode)&&(a+=d.node.usedBytes);if(a<0)throw new v.ErrnoError(28);return a},
mmap:function(d,a,c,f,k){if(!v.isFile(d.node.mode))throw new v.ErrnoError(43);d=d.node.contents;if(k&2||d.buffer!==Pb.buffer){f=!0;k=za(a);if(!k)throw new v.ErrnoError(48);if(d){if(c>0||c+a<d.length)d=d.subarray?d.subarray(c,c+a):Array.prototype.slice.call(d,c,c+a);Pb.set(d,k)}}else f=!1,k=d.byteOffset;return{ptr:k,allocated:f}},
msync:function(d,a,c,f){Xa.stream_ops.write(d,a,0,f,c,!1);return 0}}};
Od=function(d){if(typeof d!="string")return d;var a={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[d];if(typeof a=="undefined")throw Error("Unknown file open mode: "+d);return a};
zd=function(d){typeof d=="string"&&(d=Ic(d,!0));d.subarray||(d=new Uint8Array(d));return d};
ke=function(d,a){var c=0;d&&(c|=365);a&&(c|=146);return c};
gf=function(d){var a;return xa(function(c){if(c.getNextAddressJsc()==1)return c.yield(qc(d),2);a=c.getYieldResultJsc();return c.return(new Uint8Array(a))})};
Ie=function(){var d=bb.apply(0,arguments),a;return(a=v).createDataFile.apply(a,qa(d))};
le=function(d){return d};
dd=null;ac=function(){return xa(function(d){return d.return(dd)})};
Sc=0;Je=null;hf=function(){Sc--;var d,a;(a=(d=fa).monitorRunDependencies)==null||a.call(d,Sc);Sc||Je()};
jf=function(){Sc||(dd=new Promise(function(c){return Je=c}));
Sc++;var d,a;(a=(d=fa).monitorRunDependencies)==null||a.call(d,Sc)};
Ke=[];me=function(d,a){var c,f,k;return xa(function(m){typeof Browser!="undefined"&&Browser.init();f=S(Ke);k=f.next();try{for(;!k.done;k=f.next())if(c=k.value,c.canHandle(a))return m.return(c.handle(d,a))}finally{ja(f,k)}return m.return(d)})};
Le=function(d,a,c,f,k,m,q,t){var x,A,D,L;return xa(function(O){switch(O.getNextAddressJsc()){case 1:x=a?Gc.resolve(tb.join2(d,a)):d;A=le("cp "+x);jf(A);O.setFinallyBlock(2);D=c;if(typeof c!="string"){O.jumpTo(4);break}return O.yield(gf(c),5);case 5:D=O.getYieldResultJsc();case 4:return O.yield(me(D,x),6);case 6:D=O.getYieldResultJsc(),(L=t)==null||L(),m||Ie(d,a,D,f,k,q);case 2:O.enterFinallyBlock(),hf(A),O.leaveFinallyBlock(0)}})};
Me=function(d,a,c,f,k,m,q,t,x,A){Le(d,a,c,f,k,t,x,A).then(m).catch(q)};
Ad=function(d){this.name="ErrnoError";this.errno=d};
w=function(){this.shared={}};
mb.Object.defineProperties(w.prototype,{object:{configurable:!0,enumerable:!0,get:function(){return this.node},
set:function(d){this.node=d}},
isRead:{configurable:!0,enumerable:!0,get:function(){return(this.flags&2097155)!==1}},
isWrite:{configurable:!0,enumerable:!0,get:function(){return(this.flags&2097155)!==0}},
isAppend:{configurable:!0,enumerable:!0,get:function(){return this.flags&1024}},
flags:{configurable:!0,enumerable:!0,get:function(){return this.shared.flags},
set:function(d){this.shared.flags=d}},
position:{configurable:!0,enumerable:!0,get:function(){return this.shared.position},
set:function(d){this.shared.position=d}}});
n=function(d,a,c,f){this.node_ops={};this.stream_ops={};this.readMode=365;this.writeMode=146;this.mounted=null;d||(d=this);this.parent=d;this.mount=d.mount;this.id=v.nextInode++;this.name=a;this.mode=c;this.rdev=f;this.atime=this.mtime=this.ctime=Date.now()};
mb.Object.defineProperties(n.prototype,{read:{configurable:!0,enumerable:!0,get:function(){return(this.mode&this.readMode)===this.readMode},
set:function(d){d?this.mode|=this.readMode:this.mode&=~this.readMode}},
write:{configurable:!0,enumerable:!0,get:function(){return(this.mode&this.writeMode)===this.writeMode},
set:function(d){d?this.mode|=this.writeMode:this.mode&=~this.writeMode}},
isFolder:{configurable:!0,enumerable:!0,get:function(){return v.isDir(this.mode)}},
isDevice:{configurable:!0,enumerable:!0,get:function(){return v.isChrdev(this.mode)}}});
n.prototype.addListener=function(d,a){d={cb:d,exclusive:a===void 0?!1:a};var c;a=(c=this.listeners)!=null?c:this.listeners=new Set;a.add(d);return{listeners:a,entry:d}};
n.prototype.notifyListeners=function(d){if(this.listeners){var a,c=S(this.listeners),f=c.next();try{for(;!f.done;f=c.next()){var k=f.value;k.exclusive?(a||(a=[])).push(k):k.cb(d)}}finally{ja(c,f)}a&&(k=(this.exclTurn||0)%a.length,this.exclTurn=k+1,a[k].cb(d))}};
v={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:!1,ignorePermissions:!0,filesystems:null,syncFSRequests:0,ErrnoError:Ad,FSStream:w,FSNode:n,lookupPath:function(d,a){a=a===void 0?{}:a;if(!d)throw new v.ErrnoError(44);var c;(c=a).follow_mount!=null||(c.follow_mount=!0);tb.isAbs(d)||(d=v.cwd()+"/"+d);c=0;a:for(;c<40;c++){var f=d.split("/").filter(function(t){return!!t}),k=v.root;
d="/";for(var m=0;m<f.length;m++){var q=m===f.length-1;if(q&&a.parent)break;if(f[m]!==".")if(f[m]==="..")if(d=tb.dirname(d),v.isRoot(k)){d=d+"/"+f.slice(m+1).join("/");c--;continue a}else k=k.parent;else{d=tb.join2(d,f[m]);try{k=v.lookupNode(k,f[m])}catch(t){c=void 0;if(((c=t)==null?void 0:c.errno)===44&&q&&a.noent_okay)return{path:d};throw t;}!v.isMountpoint(k)||q&&!a.follow_mount||(k=k.mounted.root);if(v.isLink(k.mode)&&(!q||a.follow)){if(!k.node_ops.readlink)throw new v.ErrnoError(52);q=k.node_ops.readlink(k);
tb.isAbs(q)||(q=tb.dirname(d)+"/"+q);d=q+"/"+f.slice(m+1).join("/");continue a}}}return{path:d,node:k}}throw new v.ErrnoError(32);},
getPath:function(d){for(var a;;){if(v.isRoot(d))return d=d.mount.mountpoint,a?d[d.length-1]!=="/"?d+"/"+a:d+a:d;a=a?d.name+"/"+a:d.name;d=d.parent}},
hashName:function(d,a){for(var c=0,f=0;f<a.length;f++)c=(c<<5)-c+a.charCodeAt(f)|0;return(d+c>>>0)%v.nameTable.length},
hashAddNode:function(d){var a=v.hashName(d.parent.id,d.name);d.name_next=v.nameTable[a];v.nameTable[a]=d},
hashRemoveNode:function(d){var a=v.hashName(d.parent.id,d.name);if(v.nameTable[a]===d)v.nameTable[a]=d.name_next;else for(a=v.nameTable[a];a;){if(a.name_next===d){a.name_next=d.name_next;break}a=a.name_next}},
lookupNode:function(d,a){var c=v.mayLookup(d);if(c)throw new v.ErrnoError(c);c=v.hashName(d.id,a);for(c=v.nameTable[c];c;c=c.name_next){var f=c.name;if(c.parent.id===d.id&&f===a)return c}return v.lookup(d,a)},
createNode:function(d,a,c,f){d=new v.FSNode(d,a,c,f);v.hashAddNode(d);return d},
destroyNode:function(d){v.hashRemoveNode(d)},
isRoot:function(d){return d===d.parent},
isMountpoint:function(d){return!!d.mounted},
isFile:function(d){return(d&61440)===32768},
isDir:function(d){return(d&61440)===16384},
isLink:function(d){return(d&61440)===40960},
isChrdev:function(d){return(d&61440)===8192},
isBlkdev:function(d){return(d&61440)===24576},
isFIFO:function(d){return(d&61440)===4096},
isSocket:function(d){return(d&49152)===49152},
flagsToPermissionString:function(d){var a=["r","w","rw"][d&3];d&512&&(a+="w");return a},
nodePermissions:function(d,a){return v.ignorePermissions?0:a.includes("r")&&!(d.mode&292)||a.includes("w")&&!(d.mode&146)||a.includes("x")&&!(d.mode&73)?2:0},
mayLookup:function(d){if(!v.isDir(d.mode))return 54;var a=v.nodePermissions(d,"x");return a?a:d.node_ops.lookup?0:2},
mayCreate:function(d,a){if(!v.isDir(d.mode))return 54;try{return v.lookupNode(d,a),20}catch(c){}return v.nodePermissions(d,"wx")},
mayDelete:function(d,a,c){try{var f=v.lookupNode(d,a)}catch(k){return k.errno}if(d=v.nodePermissions(d,"wx"))return d;if(c){if(!v.isDir(f.mode))return 54;if(v.isRoot(f)||v.getPath(f)===v.cwd())return 10}else if(v.isDir(f.mode))return 31;return 0},
mayOpen:function(d,a){if(!d)return 44;if(v.isLink(d.mode))return 32;var c=v.flagsToPermissionString(a);return v.isDir(d.mode)&&(c!=="r"||a&576)?31:v.nodePermissions(d,c)},
checkOpExists:function(d,a){if(!d)throw new v.ErrnoError(a);return d},
MAX_OPEN_FDS:4096,nextfd:function(){for(var d=0;d<=v.MAX_OPEN_FDS;d++)if(!v.streams[d])return d;throw new v.ErrnoError(33);},
getStreamChecked:function(d){d=v.getStream(d);if(!d)throw new v.ErrnoError(8);return d},
getStream:function(d){return v.streams[d]},
createStream:function(d,a){a=a===void 0?-1:a;d=Object.assign(new v.FSStream,d);a==-1&&(a=v.nextfd());d.fd=a;return v.streams[a]=d},
closeStream:function(d){v.streams[d]=null},
dupStream:function(d,a){d=v.createStream(d,a===void 0?-1:a);var c,f;(c=d.stream_ops)==null||(f=c.dup)==null||f.call(c,d);return d},
doSetAttr:function(d,a,c){var f=d==null?void 0:d.stream_ops.setattr;d=f?d:a;f!=null||(f=a.node_ops.setattr);v.checkOpExists(f,63);try{f(d,c)}catch(k){if(k instanceof RangeError)throw new v.ErrnoError(22);throw k;}},
chrdev_stream_ops:{open:function(d){var a=v.getDevice(d.node.rdev);d.stream_ops=a.stream_ops;var c,f;(f=(c=d.stream_ops).open)==null||f.call(c,d)},
llseek:function(){throw new v.ErrnoError(70);}},
major:function(d){return d>>8},
minor:function(d){return d&255},
makedev:function(d,a){return d<<8|a},
registerDevice:function(d,a){v.devices[d]={stream_ops:a}},
getDevice:function(d){return v.devices[d]},
getMounts:function(d){var a=[];for(d=[d];d.length;){var c=d.pop();a.push(c);var f;(f=d).push.apply(f,qa(c.mounts))}return a},
syncfs:function(d,a){function c(A){v.syncFSRequests--;return a(A)}
function f(A){if(A){if(!f.errored)return f.errored=!0,c(A)}else++m>=k.length&&c(null)}
typeof d=="function"&&(a=d,d=!1);v.syncFSRequests++;v.syncFSRequests>1&&Gb("warning: "+v.syncFSRequests+" FS.syncfs operations in flight at once, probably just doing extra work");var k=v.getMounts(v.root.mount),m=0,q=S(k),t=q.next();try{for(;!t.done;t=q.next()){var x=t.value;x.type.syncfs?x.type.syncfs(x,d,f):f(null)}}finally{ja(q,t)}},
mount:function(d,a,c){var f=c==="/",k=!c;if(f&&v.root)throw new v.ErrnoError(10);if(!f&&!k){var m=v.lookupPath(c,{follow_mount:!1});c=m.path;m=m.node;if(v.isMountpoint(m))throw new v.ErrnoError(10);if(!v.isDir(m.mode))throw new v.ErrnoError(54);}a={type:d,opts:a,mountpoint:c,mounts:[]};d=d.mount(a);d.mount=a;a.root=d;f?v.root=d:m&&(m.mounted=a,m.mount&&m.mount.mounts.push(a));return d},
unmount:function(d){d=v.lookupPath(d,{follow_mount:!1});if(!v.isMountpoint(d.node))throw new v.ErrnoError(28);d=d.node;var a=d.mounted,c=v.getMounts(a),f,k=S(Object.entries(v.nameTable)),m=k.next();try{for(;!m.done;m=k.next()){var q=m.value;var t=S(q);t.next().value;for(f=t.next().value;f;){var x=f.name_next;c.includes(f.mount)&&v.destroyNode(f);f=x}}}finally{ja(k,m)}d.mounted=null;f=d.mount.mounts.indexOf(a);d.mount.mounts.splice(f,1)},
lookup:function(d,a){return d.node_ops.lookup(d,a)},
mknod:function(d,a,c){var f=v.lookupPath(d,{parent:!0}).node;d=tb.basename(d);if(!d)throw new v.ErrnoError(28);if(d==="."||d==="..")throw new v.ErrnoError(20);var k=v.mayCreate(f,d);if(k)throw new v.ErrnoError(k);if(!f.node_ops.mknod)throw new v.ErrnoError(63);return f.node_ops.mknod(f,d,a,c)},
statfs:function(d){return v.statfsNode(v.lookupPath(d,{follow:!0}).node)},
statfsStream:function(d){return v.statfsNode(d.node)},
statfsNode:function(d){var a={bsize:4096,frsize:4096,blocks:1E6,bfree:5E5,bavail:5E5,files:v.nextInode,ffree:v.nextInode-1,fsid:42,flags:2,namelen:255};d.node_ops.statfs&&Object.assign(a,d.node_ops.statfs(d.mount.opts.root));return a},
create:function(d,a){return v.mknod(d,(a===void 0?438:a)&4095|32768,0)},
mkdir:function(d,a){return v.mknod(d,(a===void 0?511:a)&1023|16384,0)},
mkdirTree:function(d,a){var c=d.split("/"),f="",k;c=S(c);var m=c.next();try{for(;!m.done;m=c.next())if(k=m.value){if(f||tb.isAbs(d))f+="/";f+=k;try{v.mkdir(f,a)}catch(q){if(q.errno!=20)throw q;}}}finally{ja(c,m)}},
mkdev:function(d,a,c){typeof c=="undefined"&&(c=a,a=438);return v.mknod(d,a|8192,c)},
symlink:function(d,a){if(!Gc.resolve(d))throw new v.ErrnoError(44);var c=v.lookupPath(a,{parent:!0}).node;if(!c)throw new v.ErrnoError(44);a=tb.basename(a);var f=v.mayCreate(c,a);if(f)throw new v.ErrnoError(f);if(!c.node_ops.symlink)throw new v.ErrnoError(63);return c.node_ops.symlink(c,a,d)},
link:function(d,a,c){var f=v.lookupPath(a,{parent:!0}).node;if(!f)throw new v.ErrnoError(44);a=tb.basename(a);var k=v.mayCreate(f,a);if(k)throw new v.ErrnoError(k);if(!f.node_ops.link)throw new v.ErrnoError(34);return f.node_ops.link(f,a,d,c)},
rename:function(d,a){var c=tb.dirname(d),f=tb.dirname(a),k=tb.basename(d),m=tb.basename(a);var q=v.lookupPath(d,{parent:!0});var t=q.node;q=v.lookupPath(a,{parent:!0});q=q.node;if(!t||!q)throw new v.ErrnoError(44);if(t.mount!==q.mount)throw new v.ErrnoError(75);var x=v.lookupNode(t,k);d=Gc.relative(d,f);if(d.charAt(0)!==".")throw new v.ErrnoError(28);d=Gc.relative(a,c);if(d.charAt(0)!==".")throw new v.ErrnoError(55);try{var A=v.lookupNode(q,m)}catch(D){}if(x!==A){a=v.isDir(x.mode);if(k=v.mayDelete(t,
k,a))throw new v.ErrnoError(k);if(k=A?v.mayDelete(q,m,a):v.mayCreate(q,m))throw new v.ErrnoError(k);if(!t.node_ops.rename)throw new v.ErrnoError(63);if(v.isMountpoint(x)||A&&v.isMountpoint(A))throw new v.ErrnoError(10);if(q!==t&&(k=v.nodePermissions(t,"w")))throw new v.ErrnoError(k);v.hashRemoveNode(x);try{t.node_ops.rename(x,q,m),x.parent=q}catch(D){throw D;}finally{v.hashAddNode(x)}}},
rmdir:function(d){var a=v.lookupPath(d,{parent:!0}).node;d=tb.basename(d);var c=v.lookupNode(a,d),f=v.mayDelete(a,d,!0);if(f)throw new v.ErrnoError(f);if(!a.node_ops.rmdir)throw new v.ErrnoError(63);if(v.isMountpoint(c))throw new v.ErrnoError(10);a.node_ops.rmdir(a,d);v.destroyNode(c)},
readdir:function(d){d=v.lookupPath(d,{follow:!0}).node;return v.checkOpExists(d.node_ops.readdir,54)(d)},
unlink:function(d){var a=v.lookupPath(d,{parent:!0}).node;if(!a)throw new v.ErrnoError(44);d=tb.basename(d);var c=v.lookupNode(a,d),f=v.mayDelete(a,d,!1);if(f)throw new v.ErrnoError(f);if(!a.node_ops.unlink)throw new v.ErrnoError(63);if(v.isMountpoint(c))throw new v.ErrnoError(10);a.node_ops.unlink(a,d);v.destroyNode(c)},
readlink:function(d){d=v.lookupPath(d).node;if(!d)throw new v.ErrnoError(44);if(!d.node_ops.readlink)throw new v.ErrnoError(28);return d.node_ops.readlink(d)},
stat:function(d,a){d=v.lookupPath(d,{follow:!a}).node;return v.checkOpExists(d.node_ops.getattr,63)(d)},
fstat:function(d){var a=v.getStreamChecked(d);d=a.node;var c=a.stream_ops.getattr;a=c?a:d;c!=null||(c=d.node_ops.getattr);v.checkOpExists(c,63);return c(a)},
lstat:function(d){return v.stat(d,!0)},
doChmod:function(d,a,c,f){v.doSetAttr(d,a,{mode:c&4095|a.mode&-4096,ctime:Date.now(),dontFollow:f})},
chmod:function(d,a,c){d=typeof d=="string"?v.lookupPath(d,{follow:!c}).node:d;v.doChmod(null,d,a,c)},
lchmod:function(d,a){v.chmod(d,a,!0)},
fchmod:function(d,a){d=v.getStreamChecked(d);v.doChmod(d,d.node,a,!1)},
doChown:function(d,a,c){v.doSetAttr(d,a,{timestamp:Date.now(),dontFollow:c})},
chown:function(d,a,c,f){d=typeof d=="string"?v.lookupPath(d,{follow:!f}).node:d;v.doChown(null,d,f)},
lchown:function(d,a,c){v.chown(d,a,c,!0)},
fchown:function(d){d=v.getStreamChecked(d);v.doChown(d,d.node,!1)},
doTruncate:function(d,a,c){if(v.isDir(a.mode))throw new v.ErrnoError(31);if(!v.isFile(a.mode))throw new v.ErrnoError(28);var f=v.nodePermissions(a,"w");if(f)throw new v.ErrnoError(f);v.doSetAttr(d,a,{size:c,timestamp:Date.now()})},
truncate:function(d,a){if(a<0)throw new v.ErrnoError(28);d=typeof d=="string"?v.lookupPath(d,{follow:!0}).node:d;v.doTruncate(null,d,a)},
ftruncate:function(d,a){d=v.getStreamChecked(d);if(a<0||(d.flags&2097155)===0)throw new v.ErrnoError(28);v.doTruncate(d,d.node,a)},
utime:function(d,a,c,f){d=v.lookupPath(d,{follow:!f});v.doSetAttr(null,d.node,{atime:a,mtime:c,dontFollow:f})},
open:function(d,a,c){c=c===void 0?438:c;if(d==="")throw new v.ErrnoError(44);a=Od(a);c=a&64?c&4095|32768:0;if(typeof d=="object")var f=d;else{var k=d.endsWith("/");var m=v.lookupPath(d,{follow:!(a&131072),noent_okay:!0});f=m.node;d=m.path}m=!1;if(a&64)if(f){if(a&128)throw new v.ErrnoError(20);}else{if(k)throw new v.ErrnoError(31);f=v.mknod(d,c|511,0);m=!0}if(!f)throw new v.ErrnoError(44);v.isChrdev(f.mode)&&(a&=-513);if(a&65536&&!v.isDir(f.mode))throw new v.ErrnoError(54);if(!m&&(k=v.mayOpen(f,a)))throw new v.ErrnoError(k);
a&512&&!m&&v.truncate(f,0);a&=-131713;a=v.createStream({node:f,path:v.getPath(f),flags:a,seekable:!0,position:0,stream_ops:f.stream_ops,ungotten:[],error:!1});a.stream_ops.open&&a.stream_ops.open(a);m&&v.chmod(f,c&511);return a},
close:function(d){if(v.isClosed(d))throw new v.ErrnoError(8);d.getdents&&(d.getdents=null);var a;(a=d.node)==null||a.notifyListeners(32);try{d.stream_ops.close&&d.stream_ops.close(d)}catch(c){throw c;}finally{v.closeStream(d.fd)}d.fd=null},
isClosed:function(d){return d.fd===null},
llseek:function(d,a,c){if(v.isClosed(d))throw new v.ErrnoError(8);if(!d.seekable||!d.stream_ops.llseek)throw new v.ErrnoError(70);if(c!=0&&c!=1&&c!=2)throw new v.ErrnoError(28);d.position=d.stream_ops.llseek(d,a,c);d.ungotten=[];return d.position},
read:function(d,a,c,f,k){if(f<0||k<0)throw new v.ErrnoError(28);if(v.isClosed(d))throw new v.ErrnoError(8);if((d.flags&2097155)===1)throw new v.ErrnoError(8);if(v.isDir(d.node.mode))throw new v.ErrnoError(31);if(!d.stream_ops.read)throw new v.ErrnoError(28);var m=typeof k!="undefined";if(!m)k=d.position;else if(!d.seekable)throw new v.ErrnoError(70);a=d.stream_ops.read(d,a,c,f,k);m||(d.position+=a);return a},
write:function(d,a,c,f,k,m){if(f<0||k<0)throw new v.ErrnoError(28);if(v.isClosed(d))throw new v.ErrnoError(8);if((d.flags&2097155)===0)throw new v.ErrnoError(8);if(v.isDir(d.node.mode))throw new v.ErrnoError(31);if(!d.stream_ops.write)throw new v.ErrnoError(28);d.seekable&&d.flags&1024&&v.llseek(d,0,2);var q=typeof k!="undefined";if(!q)k=d.position;else if(!d.seekable)throw new v.ErrnoError(70);a=d.stream_ops.write(d,a,c,f,k,m);q||(d.position+=a);return a},
mmap:function(d,a,c,f,k){if(f&2&&!(k&2)&&(d.flags&2097155)!==2)throw new v.ErrnoError(2);if((d.flags&2097155)===1)throw new v.ErrnoError(2);if(!d.stream_ops.mmap)throw new v.ErrnoError(43);if(!a)throw new v.ErrnoError(28);return d.stream_ops.mmap(d,a,c,f,k)},
msync:function(d,a,c,f,k){return d.stream_ops.msync?d.stream_ops.msync(d,a,c,f,k):0},
ioctl:function(d,a,c){if(!d.stream_ops.ioctl)throw new v.ErrnoError(59);return d.stream_ops.ioctl(d,a,c)},
readFile:function(d,a){a=a===void 0?{}:a;var c;a.flags=(c=a.flags)!=null?c:0;var f;a.encoding=(f=a.encoding)!=null?f:"binary";a.encoding!=="utf8"&&a.encoding!=="binary"&&Jb('Invalid encoding type "'+a.encoding+'"');c=v.open(d,a.flags);d=v.stat(d).size;f=new Uint8Array(d);v.read(c,f,0,d,0);a.encoding==="utf8"&&(f=yc(f));v.close(c);return f},
writeFile:function(d,a,c){c=c===void 0?{}:c;var f;c.flags=(f=c.flags)!=null?f:577;d=v.open(d,c.flags,c.mode);a=zd(a);v.write(d,a,0,a.byteLength,void 0,c.canOwn);v.close(d)},
cwd:function(){return v.currentPath},
chdir:function(d){d=v.lookupPath(d,{follow:!0});if(d.node===null)throw new v.ErrnoError(44);if(!v.isDir(d.node.mode))throw new v.ErrnoError(54);var a=v.nodePermissions(d.node,"x");if(a)throw new v.ErrnoError(a);v.currentPath=d.path},
createDefaultDirectories:function(){v.mkdir("/tmp");v.mkdir("/home");v.mkdir("/home/web_user")},
createDefaultDevices:function(){v.mkdir("/dev");v.registerDevice(v.makedev(1,3),{read:function(){return 0},
write:function(f,k,m,q){return q},
llseek:function(){return 0}});
v.mkdev("/dev/null",v.makedev(1,3));jb.register(v.makedev(5,0),jb.default_tty_ops);jb.register(v.makedev(6,0),jb.default_tty1_ops);v.mkdev("/dev/tty",v.makedev(5,0));v.mkdev("/dev/tty1",v.makedev(6,0));var d=new Uint8Array(1024),a=0,c=function(){a||(lc(d),a=d.byteLength);return d[--a]};
v.createDevice("/dev","random",c);v.createDevice("/dev","urandom",c);v.mkdir("/dev/shm");v.mkdir("/dev/shm/tmp")},
createSpecialDirectories:function(){v.mkdir("/proc");var d=v.mkdir("/proc/self");v.mkdir("/proc/self/fd");v.mount({mount:function(){var a=v.createNode(d,"fd",16895,73);a.stream_ops={llseek:Xa.stream_ops.llseek};a.node_ops={lookup:function(c,f){c=+f;var k=v.getStreamChecked(c);c={parent:null,mount:{mountpoint:"fake"},node_ops:{readlink:function(){return k.path}},
id:c+1};return c.parent=c},
readdir:function(){return Array.from(v.streams.entries()).filter(function(c){c=S(c);c.next().value;return c.next().value}).map(function(c){var f=S(c);
c=f.next().value;f.next().value;return c.toString()})}};
return a}},{},"/proc/self/fd")},
createStandardStreams:function(d,a,c){d?v.createDevice("/dev","stdin",d):v.symlink("/dev/tty","/dev/stdin");a?v.createDevice("/dev","stdout",null,a):v.symlink("/dev/tty","/dev/stdout");c?v.createDevice("/dev","stderr",null,c):v.symlink("/dev/tty1","/dev/stderr");v.open("/dev/stdin",0);v.open("/dev/stdout",1);v.open("/dev/stderr",1)},
staticInit:function(){v.nameTable=Array(4096);v.mount(Xa,{},"/");v.createDefaultDirectories();v.createDefaultDevices();v.createSpecialDirectories();v.filesystems={MEMFS:Xa}},
init:function(d,a,c){v.initialized=!0;d!=null||(d=fa.stdin);a!=null||(a=fa.stdout);c!=null||(c=fa.stderr);v.createStandardStreams(d,a,c)},
quit:function(){v.initialized=!1;var d,a=S(v.streams),c=a.next();try{for(;!c.done;c=a.next())(d=c.value)&&v.close(d)}finally{ja(a,c)}},
findObject:function(d,a){d=v.analyzePath(d,a);return d.exists?d.object:null},
analyzePath:function(d,a){try{var c=v.lookupPath(d,{follow:!a});d=c.path}catch(k){}var f={isRoot:!1,exists:!1,error:0,name:null,path:null,object:null,parentExists:!1,parentPath:null,parentObject:null};try{c=v.lookupPath(d,{parent:!0}),f.parentExists=!0,f.parentPath=c.path,f.parentObject=c.node,f.name=tb.basename(d),c=v.lookupPath(d,{follow:!a}),f.exists=!0,f.path=c.path,f.object=c.node,f.name=c.node.name,f.isRoot=c.path==="/"}catch(k){f.error=k.errno}return f},
createPath:function(d,a){d=typeof d=="string"?d:v.getPath(d);for(a=a.split("/").reverse();a.length;){var c=a.pop();if(c){var f=tb.join2(d,c);try{v.mkdir(f)}catch(k){if(k.errno!=20)throw k;}d=f}}return f},
createFile:function(d,a,c,f,k){d=tb.join2(typeof d=="string"?d:v.getPath(d),a);f=ke(f,k);return v.create(d,f)},
createDataFile:function(d,a,c,f,k,m){var q=a;d&&(d=typeof d=="string"?d:v.getPath(d),q=a?tb.join2(d,a):d);d=ke(f,k);q=v.create(q,d);c&&(c=zd(c),v.chmod(q,d|146),a=v.open(q,577),v.write(a,c,0,c.length,0,m),v.close(a),v.chmod(q,d))},
createDevice:function(d,a,c,f){d=tb.join2(typeof d=="string"?d:v.getPath(d),a);a=ke(!!c,!!f);var k;(k=v.createDevice).major!=null||(k.major=64);k=v.makedev(v.createDevice.major++,0);v.registerDevice(k,{open:function(m){m.seekable=!1},
close:function(){var m;(f==null?0:(m=f.buffer)==null?0:m.length)&&f(10)},
read:function(m,q,t,x){for(var A=0,D=0;D<x;D++){try{var L=c()}catch(O){throw new v.ErrnoError(29);}if(L===void 0&&!A)throw new v.ErrnoError(6);if(L===null||L===void 0)break;A++;q[t+D]=L}A&&(m.node.atime=Date.now());return A},
write:function(m,q,t,x){for(var A=0;A<x;A++)try{f(q[t+A])}catch(D){throw new v.ErrnoError(29);}x&&(m.node.mtime=m.node.ctime=Date.now());return A}});
return v.mkdev(d,a,k)},
forceLoadFile:function(d){if(d.isDevice||d.isFolder||d.link||d.contents)return!0;if(globalThis.XMLHttpRequest)Jb("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");else try{d.contents=rc(d.url)}catch(a){throw new v.ErrnoError(29);}},
createLazyFile:function(d,a,c,f,k){function m(L,O,Z,Y,N){L=L.node.contents;if(N>=L.length)return 0;Y=Math.min(L.length-N,Y);if(L.slice)for(var W=0;W<Y;W++)O[Z+W]=L[N+W];else for(W=0;W<Y;W++)O[Z+W]=L.get(N+W);return Y}
var q=function(){this.lengthKnown=!1;this.chunks=[]};
q.prototype.get=function(L){if(!(L>this.length-1||L<0)){var O=L%this.chunkSize;L=L/this.chunkSize|0;return this.getter(L)[O]}};
q.prototype.setDataGetter=function(L){this.getter=L};
q.prototype.cacheLength=function(){var L=new XMLHttpRequest;L.open("HEAD",c,!1);L.send(null);L.status>=200&&L.status<300||L.status===304||Jb("Couldn't load "+c+". Status: "+L.status);var O=Number(L.getResponseHeader("Content-length")),Z,Y=(Z=L.getResponseHeader("Accept-Ranges"))&&Z==="bytes";L=(Z=L.getResponseHeader("Content-Encoding"))&&Z==="gzip";var N=1048576;Y||(N=O);var W=this;W.setDataGetter(function(ka){var ra=ka*N,Ga=(ka+1)*N-1;Ga=Math.min(Ga,O-1);if(typeof W.chunks[ka]=="undefined"){var hb=
W.chunks;ra>Ga&&Jb("invalid range ("+ra+", "+Ga+") or no bytes requested!");Ga>O-1&&Jb("only "+O+" bytes available! programmer error!");var Ta=new XMLHttpRequest;Ta.open("GET",c,!1);O!==N&&Ta.setRequestHeader("Range","bytes="+ra+"-"+Ga);Ta.responseType="arraybuffer";Ta.overrideMimeType&&Ta.overrideMimeType("text/plain; charset=x-user-defined");Ta.send(null);Ta.status>=200&&Ta.status<300||Ta.status===304||Jb("Couldn't load "+c+". Status: "+Ta.status);if(Ta.response!==void 0)ra=new Uint8Array(Ta.response||
[]);else{var Ia;ra=Ic((Ia=Ta.responseText)!=null?Ia:"",!0)}hb[ka]=ra}typeof W.chunks[ka]=="undefined"&&Jb("doXHR failed!");return W.chunks[ka]});
if(L||!O)N=O=1,N=O=this.getter(0).length,pc("LazyFiles on gzip forces download of the whole file when length is accessed");this._length=O;this._chunkSize=N;this.lengthKnown=!0};
mb.Object.defineProperties(q.prototype,{length:{configurable:!0,enumerable:!0,get:function(){this.lengthKnown||this.cacheLength();return this._length}},
chunkSize:{configurable:!0,enumerable:!0,get:function(){this.lengthKnown||this.cacheLength();return this._chunkSize}}});
globalThis.XMLHttpRequest?(kc||Jb("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc"),q={isDevice:!1,contents:new q}):q={isDevice:!1,url:c};var t=v.createFile(d,a,q,f,k);q.contents?t.contents=q.contents:q.url&&(t.contents=null,t.url=q.url);Object.defineProperties(t,{usedBytes:{get:function(){return this.contents.length}}});
d={};a=S(Object.entries(t.stream_ops));f=a.next();try{for(k={};!f.done;k={fn$jscomp$12:void 0},f=a.next()){var x=f.value,A=S(x),D=A.next().value;k.fn$jscomp$12=A.next().value;d[D]=function(L){return function(){var O=bb.apply(0,arguments);v.forceLoadFile(t);return L.fn$jscomp$12.apply(null,qa(O))}}(k)}}finally{ja(a,f)}d.read=function(L,O,Z,Y,N){v.forceLoadFile(t);
return m(L,O,Z,Y,N)};
d.mmap=function(L,O,Z){v.forceLoadFile(t);var Y=za(O);if(!Y)throw new v.ErrnoError(48);m(L,Pb,Y,O,Z);return{ptr:Y,allocated:!0}};
t.stream_ops=d;return t}};
pa=function(d,a,c){if(!d)return"";a=mc(Mb,d,a,c);return Hc.decode(Mb.subarray(d,a))};
pb={currentUmask:18,calculateAt:function(d,a,c){if(tb.isAbs(a))return a;d=d===-100?v.cwd():pb.getStreamFromFD(d).path;if(a.length==0){if(!c)throw new v.ErrnoError(44);return d}return d+"/"+a},
writeStat:function(d,a){Aa[d>>2]=a.dev;Aa[d+4>>2]=a.mode;Aa[d+8>>2]=a.nlink;Aa[d+12>>2]=a.uid;Aa[d+16>>2]=a.gid;Aa[d+20>>2]=a.rdev;Ua=[a.size>>>0,(ma=a.size,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+24>>2]=Ua[0];Ha[d+28>>2]=Ua[1];Ha[d+32>>2]=4096;Ha[d+36>>2]=a.blocks;var c=a.atime.getTime(),f=a.mtime.getTime(),k=a.ctime.getTime();Ua=[Math.floor(c/1E3)>>>0,(ma=Math.floor(c/1E3),+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-
+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+40>>2]=Ua[0];Ha[d+44>>2]=Ua[1];Aa[d+48>>2]=c%1E3*1E3*1E3;Ua=[Math.floor(f/1E3)>>>0,(ma=Math.floor(f/1E3),+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+56>>2]=Ua[0];Ha[d+60>>2]=Ua[1];Aa[d+64>>2]=f%1E3*1E3*1E3;Ua=[Math.floor(k/1E3)>>>0,(ma=Math.floor(k/1E3),+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+72>>2]=Ua[0];Ha[d+76>>2]=Ua[1];Aa[d+80>>
2]=k%1E3*1E3*1E3;Ua=[a.ino>>>0,(ma=a.ino,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+88>>2]=Ua[0];Ha[d+92>>2]=Ua[1];return 0},
writeStatFs:function(d,a){Aa[d+4>>2]=a.bsize;Aa[d+60>>2]=a.bsize;Ua=[a.blocks>>>0,(ma=a.blocks,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+8>>2]=Ua[0];Ha[d+12>>2]=Ua[1];Ua=[a.bfree>>>0,(ma=a.bfree,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+16>>2]=Ua[0];Ha[d+20>>2]=Ua[1];Ua=[a.bavail>>>0,(ma=a.bavail,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>
0))/4294967296)>>>0:0)];Ha[d+24>>2]=Ua[0];Ha[d+28>>2]=Ua[1];Ua=[a.files>>>0,(ma=a.files,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+32>>2]=Ua[0];Ha[d+36>>2]=Ua[1];Ua=[a.ffree>>>0,(ma=a.ffree,+Math.abs(ma)>=1?ma>0?+Math.floor(ma/4294967296)>>>0:~~+Math.ceil((ma-+(~~ma>>>0))/4294967296)>>>0:0)];Ha[d+40>>2]=Ua[0];Ha[d+44>>2]=Ua[1];Aa[d+48>>2]=a.fsid;Aa[d+64>>2]=a.flags;Aa[d+56>>2]=a.namelen},
doMsync:function(d,a,c,f,k){if(!v.isFile(a.node.mode))throw new v.ErrnoError(43);if(f&2)return 0;d=Mb.subarray(d,d+c);v.msync(a,d,k,c,f)},
getStreamFromFD:function(d){return v.getStreamChecked(d)},
varargs:void 0,getStr:function(d){return pa(d)}};
Dc=function(){return Jb("")};
ec=function(d,a){return Object.defineProperty(a,"name",{value:d})};
Hb=[];Ra=[0,1,,1,null,1,!0,1,!1,1];va=function(d){d=Error.call(this,d);this.message=d.message;"stack"in d&&(this.stack=d.stack);this.name="BindingError"};
Va(va,Error);Ea=function(d){throw new va(d);};
fb={toValue:function(d){d||Ea("Cannot use deleted val. handle = "+d);return Ra[d]},
toHandle:function(d){switch(d){case void 0:return 2;case null:return 4;case !0:return 6;case !1:return 8;default:var a=Hb.pop()||Ra.length;Ra[a]=d;Ra[a+1]=1;return a}}};
Za=function(){var d=Error.apply(this,arguments);this.message=d.message;"stack"in d&&(this.stack=d.stack)};
Va(Za,Error);sb=function(d){for(var a="";;){var c=Mb[d++];if(!c)return a;a+=String.fromCharCode(c)}};
Tc={};Uc=function(d,a){for(a===void 0&&Ea("ptr should not be undefined");d.baseClass;)a=d.upcast(a),d=d.baseClass;return a};
cc=function(d,a,c){a=Uc(d,a);Tc.hasOwnProperty(a)?Ea("Tried to register registered instance: "+a):Tc[a]=c};
zc={};Bd=function(d){d=wg(d);var a=sb(d);Te(d);return a};
Cd=function(d,a){var c=zc[d];void 0===c&&Ea(a+" has unknown type "+Bd(d));return c};
Vc=function(d,a){a=Uc(d,a);Tc.hasOwnProperty(a)?delete Tc[a]:Ea("Tried to unregister unregistered instance: "+a)};
kd=function(){};
ae=!1;ld=function(d){d.smartPtr?d.smartPtrType.rawDestructor(d.smartPtr):d.ptrType.registeredClass.rawDestructor(d.ptr)};
tc=function(d){--d.count.value;0===d.count.value&&ld(d)};
Wc=function(d){if(!globalThis.FinalizationRegistry)return Wc=function(a){return a},d;
ae=new FinalizationRegistry(function(a){tc(a.$$)});
Wc=function(a){var c=a.$$;c.smartPtr&&(c={$$:c},ae.register(a,c,a));return a};
kd=function(a){return ae.unregister(a)};
return Wc(d)};
Ac=function(d,a,c){d=sb(d);a=Cd(a,"wrapper");c=fb.toValue(c);var f=a.registeredClass,k=f.instancePrototype,m=f.baseClass.instancePrototype,q=f.baseClass.constructor;d=ec(d,function(){var t=bb.apply(0,arguments),x=S(f.baseClass.pureVirtualFunctions),A=x.next();try{for(;!A.done;A=x.next()){var D=A.value;if(this[D]===m[D])throw new Za("Pure virtual function "+D+" must be implemented in JavaScript");}}finally{ja(x,A)}Object.defineProperty(this,"__parent",{value:k});this.__construct.apply(this,qa(t))});
k.__construct=function(){var t=bb.apply(0,arguments);this===k&&Ea('Pass correct "this" to __construct');t=q.implement.apply(q,[this].concat(qa(t)));kd(t);var x=t.$$;t.notifyOnDestruction();x.preservePointerOnDelete=!0;Object.defineProperties(this,{$$:{value:x}});Wc(this);cc(f,x.ptr,this)};
k.__destruct=function(){this===k&&Ea('Pass correct "this" to __destruct');kd(this);Vc(f,this.$$.ptr)};
d.prototype=Object.create(k);Object.assign(d.prototype,c);return fb.toHandle(d)};
Sb={};Ob=function(d){for(;d.length;){var a=d.pop();d.pop()(a)}};
jc={};Xc={};Kb=function(d){d=Error.call(this,d);this.message=d.message;"stack"in d&&(this.stack=d.stack);this.name="InternalError"};
Va(Kb,Error);ub=function(d){throw new Kb(d);};
nc=function(d,a,c){function f(O){O=c(O);O.length!==d.length&&ub("Mismatched type converter count");for(var Z=0;Z<d.length;++Z)Fb(d[Z],O[Z])}
d.forEach(function(O){return Xc[O]=a});
var k=Array(a.length),m=[],q=0,t=S(a.entries()),x=t.next();try{for(var A={};!x.done;A={i$jscomp$193:void 0,dt$jscomp$4:void 0},x=t.next()){var D=x.value,L=S(D);A.i$jscomp$193=L.next().value;A.dt$jscomp$4=L.next().value;zc.hasOwnProperty(A.dt$jscomp$4)?k[A.i$jscomp$193]=zc[A.dt$jscomp$4]:(m.push(A.dt$jscomp$4),jc.hasOwnProperty(A.dt$jscomp$4)||(jc[A.dt$jscomp$4]=[]),jc[A.dt$jscomp$4].push(function(O){return function(){k[O.i$jscomp$193]=zc[O.dt$jscomp$4];++q;q===m.length&&f(k)}}(A)))}}finally{ja(t,
x)}0===m.length&&f(k)};
kf=function(d){var a=Sb[d];delete Sb[d];var c=a.rawConstructor,f=a.rawDestructor,k=a.fields,m=k.map(function(q){return q.getterReturnType}).concat(k.map(function(q){return q.setterArgumentType}));
nc([d],m,function(q){var t={},x=S(k.entries()),A=x.next();try{for(var D={};!A.done;D={getterReturnType$jscomp$16:void 0,getter$jscomp$21:void 0,getterContext$jscomp$12:void 0,setter$jscomp$16:void 0,setterContext$jscomp$12:void 0,setterArgumentType$jscomp$16:void 0},A=x.next()){var L=A.value;var O=S(L);var Z=O.next().value;var Y=O.next().value;D.getterReturnType$jscomp$16=q[Z];D.getter$jscomp$21=Y.getter;D.getterContext$jscomp$12=Y.getterContext;D.setterArgumentType$jscomp$16=q[Z+k.length];D.setter$jscomp$16=
Y.setter;D.setterContext$jscomp$12=Y.setterContext;t[Y.fieldName]={read:function(N){return function(W){return N.getterReturnType$jscomp$16.fromWireType((0,N.getter$jscomp$21)(N.getterContext$jscomp$12,W))}}(D),
write:function(N){return function(W,ka){var ra=[];(0,N.setter$jscomp$16)(N.setterContext$jscomp$12,W,N.setterArgumentType$jscomp$16.toWireType(ra,ka));Ob(ra)}}(D),
optional:D.getterReturnType$jscomp$16.optional}}}finally{ja(x,A)}return[{name:a.name,fromWireType:function(N){var W={},ka;for(ka in t)W[ka]=t[ka].read(N);f(N);return W},
toWireType:function(N,W){for(var ka in t)if(!(ka in W||t[ka].optional))throw new TypeError('Missing field: "'+ka+'"');var ra=c();for(ka in t)t[ka].write(ra,W[ka]);N!==null&&N.push(f,ra);return ra},
readValueFromPointer:Ab,destructorFunction:f}]})};
lf=function(){};
ne=function(d,a,c,f){a=sb(a);Fb(d,{name:a,fromWireType:function(k){return!!k},
toWireType:function(k,m){return m?c:f},
readValueFromPointer:function(k){return this.fromWireType(Mb[k])},
destructorFunction:null})};
Dd=function(d){return{count:d.count,deleteScheduled:d.deleteScheduled,preservePointerOnDelete:d.preservePointerOnDelete,ptr:d.ptr,ptrType:d.ptrType,smartPtr:d.smartPtr,smartPtrType:d.smartPtrType}};
Pd=function(d){Ea(d.$$.ptrType.registeredClass.name+" instance already deleted")};
oe=[];Kd=function(){var d=Id.prototype,a={};Object.assign(d,(a.isAliasOf=function(c){if(!(this instanceof Id&&c instanceof Id))return!1;var f=this.$$.ptrType.registeredClass,k=this.$$.ptr;c.$$=c.$$;var m=c.$$.ptrType.registeredClass;for(c=c.$$.ptr;f.baseClass;)k=f.upcast(k),f=f.baseClass;for(;m.baseClass;)c=m.upcast(c),m=m.baseClass;return f===m&&k===c},a.clone=function(){this.$$.ptr||Pd(this);
if(this.$$.preservePointerOnDelete)return this.$$.count.value+=1,this;var c=Wc(Object.create(Object.getPrototypeOf(this),{$$:{value:Dd(this.$$)}}));c.$$.count.value+=1;c.$$.deleteScheduled=!1;return c},a["delete"]=function(){this.$$.ptr||Pd(this);
this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&Ea("Object already scheduled for deletion");kd(this);tc(this.$$);this.$$.preservePointerOnDelete||(this.$$.smartPtr=void 0,this.$$.ptr=void 0)},a.isDeleted=function(){return!this.$$.ptr},a.deleteLater=function(){this.$$.ptr||Pd(this);
this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete&&Ea("Object already scheduled for deletion");oe.push(this);oe.length;this.$$.deleteScheduled=!0;return this},a));
(a=Symbol.dispose)&&(d[a]=d["delete"])};
Jc={};Bc=function(d,a,c){if(void 0===d[a].overloadTable){var f=d[a];d[a]=function(){var k=bb.apply(0,arguments);d[a].overloadTable.hasOwnProperty(k.length)||Ea("Function '"+c+"' called with an invalid number of arguments ("+k.length+") - expects one of ("+d[a].overloadTable+")!");return d[a].overloadTable[k.length].apply(this,k)};
d[a].overloadTable=[];d[a].overloadTable[f.argCount]=f}};
md=function(d,a,c){fa.hasOwnProperty(d)?((void 0===c||void 0!==fa[d].overloadTable&&void 0!==fa[d].overloadTable[c])&&Ea("Cannot register public name '"+d+"' twice"),Bc(fa,d,d),fa[d].overloadTable.hasOwnProperty(c)&&Ea("Cannot register multiple overloads of a function with the same number of arguments ("+c+")!"),fa[d].overloadTable[c]=a):(fa[d]=a,fa[d].argCount=c)};
Pc=function(d){d=d.replace(/[^a-zA-Z0-9_]/g,"$");var a=d.charCodeAt(0);return a>=48&&a<=57?"_"+d:d};
Oc=function(d,a,c){for(;a!==c;)a.upcast||Ea("Expected null or instance of "+c.name+", got an instance of "+a.name),d=a.upcast(d),a=a.baseClass;return d};
Ld=function(d){if(d===null)return"null";var a=typeof d;return a==="object"||a==="array"||a==="function"?d.toString():""+d};
Jd=function(d,a,c){if(a===c)return d;if(void 0===c.baseClass)return null;d=Jd(d,a,c.baseClass);return d===null?null:c.downcast(d)};
sd=function(d,a){a=Uc(d,a);return Tc[a]};
Qd=function(d,a){a.ptrType&&a.ptr||ub("makeClassHandle requires ptr and ptrType");var c=!!a.smartPtrType,f=!!a.smartPtr;c!==f&&ub("Both smartPtrType and smartPtr must be specified");a.count={value:1};return Wc(Object.create(d,{$$:{value:a,writable:!0}}))};
Vb=function(){Object.assign(Cb.prototype,{getPointee:function(d){this.rawGetPointee&&(d=this.rawGetPointee(d));return d},
destructor:function(d){var a;(a=this.rawDestructor)==null||a.call(this,d)},
readValueFromPointer:Ab,fromWireType:he})};
wb=function(d,a,c){fa.hasOwnProperty(d)||ub("Replacing nonexistent public symbol");void 0!==fa[d].overloadTable&&void 0!==c?fa[d].overloadTable[c]=a:(fa[d]=a,fa[d].argCount=c)};
fc={};uc=function(d,a,c){d=d.replace(/p/g,"i");return fc[d].apply(null,[a].concat(qa(c)))};
Ib=[];Kc=function(d){var a=Ib[d];a||(Ib[d]=a=yg.get(d));return a};
Wb=function(d,a,c){c=c===void 0?[]:c;return d.includes("j")?uc(d,a,c):Kc(a).apply(null,qa(c))};
qb=function(d,a,c){c=c===void 0?!1:c;return function(){var f=bb.apply(0,arguments);return Wb(d,a,f,c)}};
xb=function(d,a){d=sb(d);var c=d.includes("j")?qb(d,a):Kc(a);typeof c!="function"&&Ea("unknown function pointer with signature "+d+": "+a);return c};
Qb=function(){var d=Error.apply(this,arguments);this.message=d.message;"stack"in d&&(this.stack=d.stack)};
Va(Qb,Error);vc=function(d,a){function c(m){k[m]||zc[m]||(Xc[m]?Xc[m].forEach(c):(f.push(m),k[m]=!0))}
var f=[],k={};a.forEach(c);throw new Qb(d+": "+f.map(Bd).join([", "]));};
Yc=function(d,a,c,f,k,m,q,t,x,A,D,L,O){D=sb(D);m=xb(k,m);t&&(t=xb(q,t));A&&(A=xb(x,A));O=xb(L,O);var Z=Pc(D);md(Z,function(){vc("Cannot construct "+D+" due to unbound types",[f])});
nc([d,a,c],f?[f]:[],function(Y){Y=Y[0];if(f){var N=Y.registeredClass;var W=N.instancePrototype}else W=Id.prototype;Y=ec(D,function(){var hb=bb.apply(0,arguments);if(Object.getPrototypeOf(this)!==ka)throw new va("Use 'new' to construct "+D);if(void 0===ra.constructor_body)throw new va(D+" has no accessible constructor");var Ta=ra.constructor_body[hb.length];if(void 0===Ta)throw new va("Tried to invoke ctor of "+D+" with invalid number of parameters ("+hb.length+") - expected ("+Object.keys(ra.constructor_body).toString()+
") parameters instead!");return Ta.apply(this,hb)});
var ka=Object.create(W,{constructor:{value:Y}});Y.prototype=ka;var ra=new fg(D,Y,ka,O,N,m,t,A);if(ra.baseClass){var Ga;(Ga=ra.baseClass).__derivedClasses!=null||(Ga.__derivedClasses=[]);ra.baseClass.__derivedClasses.push(ra)}N=new Cb(D,ra,!0,!1,!1);Ga=new Cb(D+"*",ra,!1,!1,!1);W=new Cb(D+" const*",ra,!1,!0,!1);Jc[d]={pointerType:Ga,constPointerType:W};wb(Z,Y);return[N,Ga,W]})};
nd=function(d,a){for(var c=[],f=0;f<d;f++)c.push(Aa[a+f*4>>2]);return c};
pe=function(d){d=d.trim();var a=d.indexOf("(");return a===-1?d:d.slice(0,a)};
mf=function(d,a,c,f,k,m,q,t){var x=nd(c,f);a=sb(a);a=pe(a);m=xb(k,m,t);nc([],[d],function(A){function D(){vc("Cannot call "+L+" due to unbound types",x)}
A=A[0];var L=A.name+"."+a;a.startsWith("@@")&&(a=Symbol[a.substring(2)]);var O=A.registeredClass.constructor;void 0===O[a]?(D.argCount=c-1,O[a]=D):(Bc(O,a,L),O[a].overloadTable[c-1]=D);nc([],x,function(Z){Z=[Z[0],null].concat(Z.slice(1));Z=zb(L,Z,null,m,q,t);void 0===O[a].overloadTable?(Z.argCount=c-1,O[a]=Z):O[a].overloadTable[c-1]=Z;if(A.registeredClass.__derivedClasses){var Y=S(A.registeredClass.__derivedClasses),N=Y.next();try{for(;!N.done;N=Y.next()){var W=N.value;W.constructor.hasOwnProperty(a)||
(W.constructor[a]=Z)}}finally{ja(Y,N)}}return[]});
return[]})};
nf=function(d,a,c,f,k,m,q,t){a=sb(a);m=xb(k,m);nc([],[d],function(x){x=x[0];var A=x.name+"."+a,D={get:function(){vc("Cannot access "+A+" due to unbound types",[c])},
enumerable:!0,configurable:!0};t?D.set=function(){vc("Cannot access "+A+" due to unbound types",[c])}:D.set=function(){Ea(A+" is a read-only property")};
Object.defineProperty(x.registeredClass.constructor,a,D);nc([],[c],function(L){L=L[0];var O={get:function(){return L.fromWireType(m(f))},
enumerable:!0};t&&(t=xb(q,t),O.set=function(Z){var Y=[];t(f,L.toWireType(Y,Z));Ob(Y)});
Object.defineProperty(x.registeredClass.constructor,a,O);return[]});
return[]})};
Ne=function(d,a,c,f,k,m){var q=nd(a,c);k=xb(f,k);nc([],[d],function(t){t=t[0];var x="constructor "+t.name;void 0===t.registeredClass.constructor_body&&(t.registeredClass.constructor_body=[]);if(void 0!==t.registeredClass.constructor_body[a-1])throw new va("Cannot register multiple constructors with identical number of parameters ("+(a-1)+") for class '"+t.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");t.registeredClass.constructor_body[a-
1]=function(){vc("Cannot construct "+t.name+" due to unbound types",q)};
nc([],q,function(A){A.splice(1,0,null);t.registeredClass.constructor_body[a-1]=zb(x,A,null,k,m);return[]});
return[]})};
qe=function(d,a,c,f,k,m,q,t,x){var A=nd(c,f);a=sb(a);a=pe(a);m=xb(k,m,x);nc([],[d],function(D){function L(){vc("Cannot call "+O+" due to unbound types",A)}
D=D[0];var O=D.name+"."+a;a.startsWith("@@")&&(a=Symbol[a.substring(2)]);t&&D.registeredClass.pureVirtualFunctions.push(a);var Z=D.registeredClass.instancePrototype,Y=Z[a];void 0===Y||void 0===Y.overloadTable&&Y.className!==D.name&&Y.argCount===c-2?(L.argCount=c-2,L.className=D.name,Z[a]=L):(Bc(Z,a,O),Z[a].overloadTable[c-2]=L);nc([],A,function(N){N=zb(O,N,D,m,q,x);void 0===Z[a].overloadTable?(N.argCount=c-2,Z[a]=N):Z[a].overloadTable[c-2]=N;return[]});
return[]})};
be=function(d,a,c){d instanceof Object||Ea(c+' with invalid "this": '+d);d instanceof a.registeredClass.constructor||Ea(c+' incompatible with "this" of type '+d.constructor.name);d.$$.ptr||Ea("cannot call emscripten binding method "+c+" on deleted object");return Oc(d.$$.ptr,d.$$.ptrType.registeredClass,a.registeredClass)};
Rd=function(d,a,c,f,k,m,q,t,x,A){a=sb(a);k=xb(f,k);nc([],[d],function(D){D=D[0];var L=D.name+"."+a,O={get:function(){vc("Cannot access "+L+" due to unbound types",[c,q])},
enumerable:!0,configurable:!0};x?O.set=function(){return vc("Cannot access "+L+" due to unbound types",[c,q])}:O.set=function(){return Ea(L+" is a read-only property")};
Object.defineProperty(D.registeredClass.instancePrototype,a,O);nc([],x?[c,q]:[c],function(Z){var Y=Z[0],N={get:function(){var ka=be(this,D,L+" getter");return Y.fromWireType(k(m,ka))},
enumerable:!0};if(x){x=xb(t,x);var W=Z[1];N.set=function(ka){var ra=be(this,D,L+" setter"),Ga=[];x(A,ra,W.toWireType(Ga,ka));Ob(Ga)}}Object.defineProperty(D.registeredClass.instancePrototype,a,N);
return[]});
return[]})};
re=function(d){d>9&&0===--Ra[d+1]&&(Ra[d]=void 0,Hb.push(d))};
ce={name:"emscripten::val",fromWireType:function(d){var a=fb.toValue(d);re(d);return a},
toWireType:function(d,a){return fb.toHandle(a)},
readValueFromPointer:Ab,destructorFunction:null};Fc=function(d){return Fb(d,ce)};
se=function(d,a,c){switch(a){case 1:return c?function(f){return this.fromWireType(Pb[f])}:function(f){return this.fromWireType(Mb[f])};
case 2:return c?function(f){return this.fromWireType(sc[f>>1])}:function(f){return this.fromWireType(Zc[f>>1])};
case 4:return c?function(f){return this.fromWireType(Ha[f>>2])}:function(f){return this.fromWireType(Aa[f>>2])};
default:throw new TypeError("invalid integer width ("+a+"): "+d);}};
Oe=function(d,a,c,f,k){a=sb(a);k=k?k===1?"number":"string":"object";switch(k){case "object":var m=function(){};
m.values={};Fb(d,{name:a,constructor:m,valueType:k,fromWireType:function(q){return this.constructor.values[q]},
toWireType:function(q,t){return t.value},
readValueFromPointer:se(a,c,f),destructorFunction:null});md(a,m);break;case "number":m={};Fb(d,{name:a,keysMap:m,valueType:k,fromWireType:function(q){return q},
toWireType:function(q,t){return t},
readValueFromPointer:se(a,c,f),destructorFunction:null});md(a,m);delete fa[a].argCount;break;case "string":m={},Fb(d,{name:a,valuesMap:{},reverseMap:{},keysMap:m,valueType:k,fromWireType:function(q){return this.reverseMap[q]},
toWireType:function(q,t){return this.valuesMap[t]},
readValueFromPointer:se(a,c,f),destructorFunction:null}),md(a,m),delete fa[a].argCount}};
gd=function(d,a,c){var f=Cd(d,"enum");a=sb(a);switch(f.valueType){case "object":d=f.constructor;f=Object.create(f.constructor.prototype,{value:{value:c},constructor:{value:ec(f.name+"_"+a,function(){})}});
d.values[c]=f;d[a]=f;break;case "number":f.keysMap[a]=c;break;case "string":f.valuesMap[a]=c,f.reverseMap[c]=a,f.keysMap[a]=a}};
of=function(d,a){switch(a){case 4:return function(c){return this.fromWireType(hd[c>>2])};
case 8:return function(c){return this.fromWireType(Pe[c>>3])};
default:throw new TypeError("invalid float width ("+a+"): "+d);}};
pf=function(d,a,c){a=sb(a);Fb(d,{name:a,fromWireType:function(f){return f},
toWireType:function(f,k){return k},
readValueFromPointer:of(a,c),destructorFunction:null})};
qf=function(d,a,c,f,k,m,q){var t=nd(a,c);d=sb(d);d=pe(d);k=xb(f,k,q);md(d,function(){vc("Cannot call "+d+" due to unbound types",t)},a-1);
nc([],t,function(x){x=[x[0],null].concat(x.slice(1));wb(d,zb(d,x,null,k,m,q),a-1);return[]})};
rf=function(d,a,c){switch(a){case 1:return c?function(f){return Pb[f]}:function(f){return Mb[f]};
case 2:return c?function(f){return sc[f>>1]}:function(f){return Zc[f>>1]};
case 4:return c?function(f){return Ha[f>>2]}:function(f){return Aa[f>>2]};
default:throw new TypeError("invalid integer width ("+a+"): "+d);}};
Ed=function(d,a,c,f,k){a=sb(a);var m=function(t){return t};
if(f===0){var q=32-8*c;m=function(t){return t<<q>>>q};
k=m(k)}Fb(d,{name:a,fromWireType:m,toWireType:function(t,x){return x},
readValueFromPointer:rf(a,c,f!==0),destructorFunction:null})};
hc=function(d,a,c){function f(m){var q=Aa[m>>2];m=Aa[m+4>>2];return new k(Pb.buffer,m,q)}
var k=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][a];c=sb(c);Fb(d,{name:c,fromWireType:f,readValueFromPointer:f},{ignoreDuplicateRegistrations:!0})};
$c=function(d,a,c){return yd(d,Mb,a,c)};
sf=function(d,a){a=sb(a);Fb(d,{name:a,fromWireType:function(c){var f=pa(c+4,Aa[c>>2],!0);Te(c);return f},
toWireType:function(c,f){f instanceof ArrayBuffer&&(f=new Uint8Array(f));var k=typeof f=="string";k||ArrayBuffer.isView(f)&&f.BYTES_PER_ELEMENT==1||Ea("Cannot pass non-string to std::string");var m=k?jd(f):f.length;var q=ze(4+m+1),t=q+4;Aa[q>>2]=m;k?$c(f,t,m+1):Mb.set(f,t);c!==null&&c.push(Te,q);return q},
readValueFromPointer:Ab,destructorFunction:function(c){Te(c)}})};
tf=new TextDecoder("utf-16le");uf=function(d,a,c){d>>=1;a=mc(Zc,d,a/2,c);return tf.decode(Zc.subarray(d,a))};
vf=function(d,a,c){c=c===void 0?2147483647:c;if(c<2)return 0;c-=2;var f=a;c=c<d.length*2?c/2:d.length;for(var k=0;k<c;++k){var m=d.charCodeAt(k);sc[a>>1]=m;a+=2}sc[a>>1]=0;return a-f};
wf=function(d){return d.length*2};
xf=function(d,a,c){var f="";d>>=2;for(var k=0;!(k>=a/4);k++){var m=Aa[d+k];if(!m&&!c)break;f+=String.fromCodePoint(m)}return f};
yf=function(d,a,c){c=c===void 0?2147483647:c;if(c<4)return 0;var f=a;c=f+c-4;for(var k=0;k<d.length;++k){var m=d.codePointAt(k);m>65535&&k++;Ha[a>>2]=m;a+=4;if(a+4>c)break}Ha[a>>2]=0;return a-f};
zf=function(d){for(var a=0,c=0;c<d.length;++c)d.codePointAt(c)>65535&&c++,a+=4;return a};
Af=function(d,a,c){c=sb(c);if(a===2){var f=uf;var k=vf;var m=wf}else f=xf,k=yf,m=zf;Fb(d,{name:c,fromWireType:function(q){var t=f(q+4,Aa[q>>2]*a,!0);Te(q);return t},
toWireType:function(q,t){typeof t!="string"&&Ea("Cannot pass non-string to C++ string type "+c);var x=m(t),A=ze(4+x+a);Aa[A>>2]=x/a;k(t,A+4,x+a);q!==null&&q.push(Te,A);return A},
readValueFromPointer:Ab,destructorFunction:function(q){Te(q)}})};
Bf=function(d,a,c,f,k,m){Sb[d]={name:sb(a),rawConstructor:xb(c,f),rawDestructor:xb(k,m),fields:[]}};
Cf=function(d,a,c,f,k,m,q,t,x,A){Sb[d].fields.push({fieldName:sb(a),getterReturnType:c,getter:xb(f,k),getterContext:m,setterArgumentType:q,setter:xb(t,x),setterContext:A})};
te=function(d,a){a=sb(a);Fb(d,{isVoid:!0,name:a,fromWireType:function(){},
toWireType:function(){}})};
Sd=function(){throw new sa;};
ue=[];Df=function(d){var a=ue.length;ue.push(d);return a};
Ef=function(d,a){for(var c=Array(d),f=0;f<d;++f)c[f]=Cd(Aa[a+f*4>>2],"parameter "+f);return c};
ve=function(d,a,c){var f=[];d=d(f,c);f.length&&(Aa[a>>2]=fb.toHandle(f));return d};
de={};Qe=function(d){var a=de[d];return a===void 0?sb(d):a};
Ff=function(d,a,c){var f=S(Ef(d,a));a=f.next().value;f=yb(f);var k=a.toWireType.bind(a),m=f.map(function(t){return t.readValueFromPointer.bind(t)});
d--;var q=Array(d);a="methodCaller<("+f.map(function(t){return t.name})+") => "+a.name+">";
return Df(ec(a,function(t,x,A,D){for(var L=0,O=0;O<d;++O)q[O]=m[O](D+L),L+=8;switch(c){case 0:var Z=fb.toValue(t).apply(null,q);break;case 2:Z=Reflect.construct(fb.toValue(t),q);break;case 3:Z=q[0];break;case 1:var Y;Z=(Y=fb.toValue(t))[Qe(x)].apply(Y,qa(q))}return ve(k,A,Z)}))};
Gf=function(d,a){d=fb.toValue(d);a=fb.toValue(a);return fb.toHandle(d[a])};
Hf=function(d){d>9&&(Ra[d+1]+=1)};
If=function(d,a,c,f,k){return ue[d](a,c,f,k)};
Jf=function(){return fb.toHandle([])};
Kf=function(d){return fb.toHandle(Qe(d))};
Lf=function(){return fb.toHandle({})};
Mf=function(d){var a=fb.toValue(d);Ob(a);re(d)};
Nf=function(d,a,c){d=fb.toValue(d);a=fb.toValue(a);c=fb.toValue(c);d[a]=c};
Of=function(d,a,c,f){var k=(new Date).getFullYear(),m=new Date(k,0,1);k=new Date(k,6,1);m=m.getTimezoneOffset();k=k.getTimezoneOffset();var q=Math.max(m,k);Aa[d>>2]=q*60;Ha[a>>2]=Number(m!=k);a=function(t){var x=t>=0?"-":"+",A=Math.abs(t);t=String(Math.floor(A/60)).padStart(2,"0");A=String(A%60).padStart(2,"0");return"UTC"+x+t+A};
d=a(m);a=a(k);k<m?($c(d,c,17),$c(a,f,17)):($c(d,f,17),$c(a,c,17))};
Ye=function(){return performance.now()};
We=function(){return Date.now()};
Xe=1;ie=function(d){return d>=0&&d<=3};
rd=function(d,a){return a+2097152>>>0<4194305-!!d?(d>>>0)+a*4294967296:NaN};
Td=[];Pf=function(d,a){Td.length=0;for(var c;c=Mb[d++];){var f=c!=105;f&=c!=112;a+=f&&a%8?4:0;Td.push(c==112?Aa[a>>2]:c==105?Ha[a>>2]:Pe[a>>3]);a+=f?8:4}return Td};
Qf=function(d,a,c){a=Pf(a,c);return bg[d].apply(bg,qa(a))};
Rf=function(d,a,c){return Qf(d,a,c)};
Sf=function(){return 2147483648};
Tf=function(d){var a=xg.buffer.byteLength;try{return xg.grow((d-a+65535)/65536|0),df(),1}catch(c){}};
ee=function(d){var a=Mb.length;d>>>=0;var c=Sf();if(d>c)return!1;for(var f=1;f<=4;f*=2){var k=a*(1+.2/f);k=Math.min(k,d+100663296);k=Math.min(c,Wa(Math.max(d,k),65536));if(Tf(k))return!0}return!1};
Ud=function(d){return!!(d.dibvbi=d.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"))};
U=function(d){return!!(d.mdibvbi=d.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"))};
we=function(d){return!!(d.extClipControl=d.getExtension("EXT_clip_control"))};
xe=function(d){return!!(d.webglPolygonMode=d.getExtension("WEBGL_polygon_mode"))};
ye=function(d){return!!(d.multiDrawWebgl=d.getExtension("WEBGL_multi_draw"))};
aa=function(d){var a="EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" "),
c,f;return(f=(c=d.getSupportedExtensions())==null?void 0:c.filter(function(k){return a.includes(k)}))!=null?f:[]};
ba={counter:1,buffers:[],programs:[],framebuffers:[],renderbuffers:[],textures:[],shaders:[],vaos:[],contexts:[],offscreenCanvases:{},queries:[],samplers:[],transformFeedbacks:[],syncs:[],stringCache:{},stringiCache:{},unpackAlignment:4,unpackRowLength:0,recordError:function(d){ba.lastError||(ba.lastError=d)},
getNewId:function(d){for(var a=ba.counter++,c=d.length;c<a;c++)d[c]=null;return a},
genObject:function(d,a,c,f){for(var k=0;k<d;k++){var m=V[c](),q=m&&ba.getNewId(f);m?(m.name=q,f[q]=m):ba.recordError(1282);Ha[a+k*4>>2]=q}},
getSource:function(d,a,c,f){d="";for(var k=0;k<a;++k)d+=pa(Aa[c+k*4>>2],f?Aa[f+k*4>>2]:void 0);return d},
createContext:function(d,a){d.getContextSafariWebGL2Fixed||(d.getContextSafariWebGL2Fixed=d.getContext,d.getContext=function(f,k){k=d.getContextSafariWebGL2Fixed(f,k);return f=="webgl"==k instanceof WebGLRenderingContext?k:null});
var c=d.getContext("webgl2",a);return c?ba.registerContext(c,a):0},
registerContext:function(d,a){var c=ba.getNewId(ba.contexts),f={handle:c,attributes:a,version:a.majorVersion,GLctx:d};d.canvas&&(d.canvas.GLctxObject=f);ba.contexts[c]=f;(typeof a.enableExtensionsByDefault=="undefined"||a.enableExtensionsByDefault)&&ba.initExtensions(f);return c},
makeContextCurrent:function(d){ba.currentContext=ba.contexts[d];var a;fa.ctx=V=(a=ba.currentContext)==null?void 0:a.GLctx;return!(d&&!V)},
getContext:function(d){return ba.contexts[d]},
deleteContext:function(d){ba.currentContext===ba.contexts[d]&&(ba.currentContext=null);typeof JSEvents=="object"&&JSEvents.removeAllHandlersOnTarget(ba.contexts[d].GLctx.canvas);var a;if((a=ba.contexts[d])==null?0:a.GLctx.canvas)ba.contexts[d].GLctx.canvas.GLctxObject=void 0;ba.contexts[d]=null},
initExtensions:function(d){d||(d=ba.currentContext);if(!d.initExtensionsDone){d.initExtensionsDone=!0;var a=d.GLctx;ye(a);Re(a);we(a);xe(a);Ud(a);U(a);d.version>=2&&(a.disjointTimerQueryExt=a.getExtension("EXT_disjoint_timer_query_webgl2"));if(d.version<2||!a.disjointTimerQueryExt)a.disjointTimerQueryExt=a.getExtension("EXT_disjoint_timer_query");d=S(aa(a));var c=d.next();try{for(;!c.done;c=d.next()){var f=c.value;f.includes("lose_context")||f.includes("debug")||a.getExtension(f)}}finally{ja(d,c)}}}};
Re=function(d){return!!(d.extPolygonOffsetClamp=d.getExtension("EXT_polygon_offset_clamp"))};
Vf=function(d,a){d=ba.getContext(d);a=pa(a);a.startsWith("GL_")&&(a=a.slice(3));a=="WEBGL_draw_instanced_base_vertex_base_instance"&&Ud(V);a=="WEBGL_multi_draw_instanced_base_vertex_base_instance"&&U(V);a=="WEBGL_multi_draw"&&ye(V);a=="EXT_polygon_offset_clamp"&&Re(V);a=="EXT_clip_control"&&we(V);a=="WEBGL_polygon_mode"&&xe(V);return!!d.GLctx.getExtension(a)};
wc=ed=function(){return ba.currentContext?ba.currentContext.handle:0};
od=function(d){return ba.makeContextCurrent(d)?0:-5};
Ec={};oc=function(){return He};
wd=function(){if(!wd.strings){var d,a,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:((a=(d=globalThis.navigator)==null?void 0:d.language)!=null?a:"C").replace("-","_")+".UTF-8",_:oc()},f;for(f in Ec)Ec[f]===void 0?delete c[f]:c[f]=Ec[f];d=[];for(f in c)d.push(f+"="+c[f]);wd.strings=d}return wd.strings};
Ze=function(d,a){var c=0,f=0,k=S(wd()),m=k.next();try{for(;!m.done;m=k.next()){var q=m.value;var t=a+c;Aa[d+f>>2]=t;c+=$c(q,t,Infinity)+1;f+=4}}finally{ja(k,m)}return 0};
$e=function(d,a){var c=wd();Aa[d>>2]=c.length;d=0;c=S(c);var f=c.next();try{for(;!f.done;f=c.next()){var k=f.value;d+=jd(k)+1}}finally{ja(c,f)}Aa[a>>2]=d;return 0};
af=function(){return Db||!1};
Wf=function(d){if(!af()){var a,c;(c=(a=fa).onExit)==null||c.call(a,d);bc=!0}Md(d,new dc(d))};
fd=qd=function(d){Wf(d)};
bf=function(d,a,c,f){for(var k=0,m=0;m<c;m++){var q=Aa[a>>2],t=Aa[a+4>>2];a+=8;try{var x=v.read(d,Pb,q,t,f)}catch(A){if(k>0&&A instanceof v.ErrnoError&&(A.errno==6||A.errno==6))break;throw A;}if(x<0)return-1;k+=x;if(x<t)break;typeof f!="undefined"&&(f+=x)}return k};
Ee=function(d,a,c,f){if(c==1)return v.write(d,Pb,Aa[a>>2],Aa[a+4>>2],f);for(var k=0,m=0,q=a;m<c;m++,q+=8)k+=Aa[q+4>>2];q=new Uint8Array(k);var t=0;for(m=0;m<c;m++,a+=8){var x=Aa[a>>2],A=Aa[a+4>>2];q.set(Mb.subarray(x,x+A),t);t+=A}return v.write(d,q,0,k,f)};
Xf=Fe=function(d){return V.activeTexture(d)};
T=De=function(d,a){V.attachShader(ba.programs[d],ba.shaders[a])};
b=g=function(d,a,c){V.bindAttribLocation(ba.programs[d],a,pa(c))};
h=e=function(d,a){d==35051?V.currentPixelPackBufferBinding=a:d==35052&&(V.currentPixelUnpackBufferBinding=a);V.bindBuffer(d,ba.buffers[a])};
p=l=function(d,a,c,f,k){V.bindBufferRange(d,a,ba.buffers[c],f,k)};
u=r=function(d,a){V.bindFramebuffer(d,ba.framebuffers[a])};
B=z=function(d,a){V.bindRenderbuffer(d,ba.renderbuffers[a])};
I=F=function(d,a){V.bindSampler(d,ba.samplers[a])};
G=E=function(d,a){V.bindTexture(d,ba.textures[a])};
J=H=function(d){V.bindVertexArray(ba.vaos[d])};
X=Q=function(d,a,c,f){return V.blendColor(d,a,c,f)};
Ba=wa=function(d){return V.blendEquation(d)};
Sa=Ja=function(d,a){return V.blendEquationSeparate(d,a)};
lb=ab=function(d,a){return V.blendFunc(d,a)};
Lb=nb=function(d,a,c,f){return V.blendFuncSeparate(d,a,c,f)};
pd=ad=function(d,a,c,f,k,m,q,t,x,A){return V.blitFramebuffer(d,a,c,f,k,m,q,t,x,A)};
td=Lc=function(d,a,c,f){c&&a?V.bufferData(d,Mb,f,c,a):V.bufferData(d,a,f)};
jg=function(d,a,c,f,k){k=k===void 0?Mb:k;c&&V.bufferSubData(d,a,k,f,c)};
$f=ng=function(d,a,c,f){return jg(d,a,c,f)};
og=ag=function(d){return V.checkFramebufferStatus(d)};
y=K=function(d){return V.clear(d)};
P=C=function(d,a,c,f){return V.clearBufferfi(d,a,c,f)};
ca=R=function(d,a,c){V.clearBufferfv(d,a,hd,c>>2)};
ea=ha=function(d,a,c){V.clearBufferiv(d,a,Ha,c>>2)};
ua=oa=function(d,a,c){V.clearBufferuiv(d,a,Aa,c>>2)};
gb=Da=function(d,a,c,f){return V.clearColor(d,a,c,f)};
Xb=Bb=function(d){return V.clearDepth(d)};
mg=ud=function(d){return V.clearStencil(d)};
Fg=ug=function(d,a,c,f){V.colorMask(!!d,!!a,!!c,!!f)};
Vg=Ug=function(d){V.compileShader(ba.shaders[d])};
Xg=Wg=function(d,a,c,f,k,m,q,t,x){V.currentPixelUnpackBufferBinding||!t?V.compressedTexSubImage2D(d,a,c,f,k,m,q,t,x):V.compressedTexSubImage2D(d,a,c,f,k,m,q,Mb,x,t)};
Zg=Yg=function(d,a,c,f,k,m,q,t,x,A,D){V.currentPixelUnpackBufferBinding?V.compressedTexSubImage3D(d,a,c,f,k,m,q,t,x,A,D):V.compressedTexSubImage3D(d,a,c,f,k,m,q,t,x,Mb,D,A)};
ah=$g=function(){var d=ba.getNewId(ba.programs),a=V.createProgram();a.name=d;a.maxUniformLength=a.maxAttributeLength=a.maxUniformBlockNameLength=0;a.uniformIdCounter=1;ba.programs[d]=a;return d};
ch=bh=function(d){var a=ba.getNewId(ba.shaders);ba.shaders[a]=V.createShader(d);return a};
eh=dh=function(d){return V.cullFace(d)};
gh=fh=function(d,a){for(var c=0;c<d;c++){var f=Ha[a+c*4>>2],k=ba.buffers[f];k&&(V.deleteBuffer(k),k.name=0,ba.buffers[f]=null,f==V.currentPixelPackBufferBinding&&(V.currentPixelPackBufferBinding=0),f==V.currentPixelUnpackBufferBinding&&(V.currentPixelUnpackBufferBinding=0))}};
ih=hh=function(d,a){for(var c=0;c<d;++c){var f=Ha[a+c*4>>2],k=ba.framebuffers[f];k&&(V.deleteFramebuffer(k),k.name=0,ba.framebuffers[f]=null)}};
kh=jh=function(d){if(d){var a=ba.programs[d];a?(V.deleteProgram(a),a.name=0,ba.programs[d]=null):ba.recordError(1281)}};
mh=lh=function(d,a){for(var c=0;c<d;c++){var f=Ha[a+c*4>>2],k=ba.renderbuffers[f];k&&(V.deleteRenderbuffer(k),k.name=0,ba.renderbuffers[f]=null)}};
oh=nh=function(d,a){for(var c=0;c<d;c++){var f=Ha[a+c*4>>2],k=ba.samplers[f];k&&(V.deleteSampler(k),k.name=0,ba.samplers[f]=null)}};
qh=ph=function(d){if(d){var a=ba.shaders[d];a?(V.deleteShader(a),ba.shaders[d]=null):ba.recordError(1281)}};
sh=rh=function(d,a){for(var c=0;c<d;c++){var f=Ha[a+c*4>>2],k=ba.textures[f];k&&(V.deleteTexture(k),k.name=0,ba.textures[f]=null)}};
uh=th=function(d,a){for(var c=0;c<d;c++){var f=Ha[a+c*4>>2];V.deleteVertexArray(ba.vaos[f]);ba.vaos[f]=null}};
wh=vh=function(d){return V.depthFunc(d)};
yh=xh=function(d){V.depthMask(!!d)};
Ah=zh=function(d,a){return V.depthRange(d,a)};
Ch=Bh=function(d){return V.disable(d)};
Eh=Dh=function(d){V.disableVertexAttribArray(d)};
Gh=Fh=function(d,a,c){V.drawArrays(d,a,c)};
zg=Hh=function(d,a,c,f){V.drawArraysInstanced(d,a,c,f)};
Bg=[];Jh=Ih=function(d,a){for(var c=Bg[d],f=0;f<d;f++)c[f]=Ha[a+f*4>>2];V.drawBuffers(c)};
Lh=Kh=function(d,a,c,f){V.drawElements(d,a,c,f)};
Nh=Mh=function(d,a,c,f,k){V.drawElementsInstanced(d,a,c,f,k)};
Ph=Oh=function(d){return V.enable(d)};
Rh=Qh=function(d){V.enableVertexAttribArray(d)};
Th=Sh=function(){return V.finish()};
Vh=Uh=function(){return V.flush()};
Xh=Wh=function(d,a,c,f){V.framebufferRenderbuffer(d,a,c,ba.renderbuffers[f])};
Zh=Yh=function(d,a,c,f,k){V.framebufferTexture2D(d,a,c,ba.textures[f],k)};
ai=$h=function(d,a,c,f,k){V.framebufferTextureLayer(d,a,ba.textures[c],f,k)};
ci=bi=function(d){return V.frontFace(d)};
ei=di=function(d,a){ba.genObject(d,a,"createBuffer",ba.buffers)};
gi=fi=function(d,a){ba.genObject(d,a,"createFramebuffer",ba.framebuffers)};
ii=hi=function(d,a){ba.genObject(d,a,"createRenderbuffer",ba.renderbuffers)};
ki=ji=function(d,a){ba.genObject(d,a,"createSampler",ba.samplers)};
mi=li=function(d,a){ba.genObject(d,a,"createTexture",ba.textures)};
oi=ni=function(d,a){ba.genObject(d,a,"createVertexArray",ba.vaos)};
Mg=pi=function(d){return V.generateMipmap(d)};
Ag=function(d,a){Aa[d>>2]=a;Aa[d+4>>2]=(a-Aa[d>>2])/4294967296};
pg=function(){var d=aa(V);return d=d.concat(d.map(function(a){return"GL_"+a}))};
Ng=function(d,a,c){if(a){var f=void 0;switch(d){case 36346:f=1;break;case 36344:c!=0&&c!=1&&ba.recordError(1280);return;case 34814:case 36345:f=0;break;case 34466:var k=V.getParameter(34467);f=k?k.length:0;break;case 33309:if(ba.currentContext.version<2){ba.recordError(1282);return}f=pg().length;break;case 33307:case 33308:if(ba.currentContext.version<2){ba.recordError(1280);return}f=d==33307?3:0}if(f===void 0)switch(k=V.getParameter(d),typeof k){case "number":f=k;break;case "boolean":f=k?1:0;break;
case "string":ba.recordError(1280);return;case "object":if(k===null)switch(d){case 34964:case 35725:case 34965:case 36006:case 36007:case 32873:case 34229:case 36662:case 36663:case 35053:case 35055:case 36010:case 35097:case 35869:case 32874:case 36389:case 35983:case 35368:case 34068:f=0;break;default:ba.recordError(1280);return}else{if(k instanceof Float32Array||k instanceof Uint32Array||k instanceof Int32Array||k instanceof Array){for(d=0;d<k.length;++d)switch(c){case 0:Ha[a+d*4>>2]=k[d];break;
case 2:hd[a+d*4>>2]=k[d];break;case 4:Pb[a+d]=k[d]?1:0}return}try{f=k.name|0}catch(m){ba.recordError(1280);Gb("GL_INVALID_ENUM in glGet"+c+"v: Unknown object returned from WebGL getParameter("+d+")! (error: "+m+")");return}}break;default:ba.recordError(1280);Gb("GL_INVALID_ENUM in glGet"+c+"v: Native code calling glGet"+c+"v("+d+") and it returns "+k+" of type "+typeof k+"!");return}switch(c){case 1:Ag(a,f);break;case 0:Ha[a>>2]=f;break;case 2:hd[a>>2]=f;break;case 4:Pb[a]=f?1:0}}else ba.recordError(1281)};
ri=qi=function(d,a){return Ng(d,a,2)};
ti=si=function(d,a,c,f){d=V.getFramebufferAttachmentParameter(d,a,c);if(d instanceof WebGLRenderbuffer||d instanceof WebGLTexture)d=d.name|0;Ha[f>>2]=d};
vi=ui=function(d,a){return Ng(d,a,0)};
xi=wi=function(d,a,c,f){d=V.getProgramInfoLog(ba.programs[d]);d===null&&(d="(unknown error)");a=a>0&&f?$c(d,f,a):0;c&&(Ha[c>>2]=a)};
zi=yi=function(d,a,c){if(c)if(d>=ba.counter)ba.recordError(1281);else if(d=ba.programs[d],a==35716)d=V.getProgramInfoLog(d),d===null&&(d="(unknown error)"),Ha[c>>2]=d.length+1;else if(a==35719){if(!d.maxUniformLength){var f=V.getProgramParameter(d,35718);for(a=0;a<f;++a)d.maxUniformLength=Math.max(d.maxUniformLength,V.getActiveUniform(d,a).name.length+1)}Ha[c>>2]=d.maxUniformLength}else if(a==35722){if(!d.maxAttributeLength)for(f=V.getProgramParameter(d,35721),a=0;a<f;++a)d.maxAttributeLength=Math.max(d.maxAttributeLength,
V.getActiveAttrib(d,a).name.length+1);Ha[c>>2]=d.maxAttributeLength}else if(a==35381){if(!d.maxUniformBlockNameLength)for(f=V.getProgramParameter(d,35382),a=0;a<f;++a)d.maxUniformBlockNameLength=Math.max(d.maxUniformBlockNameLength,V.getActiveUniformBlockName(d,a).length+1);Ha[c>>2]=d.maxUniformBlockNameLength}else Ha[c>>2]=V.getProgramParameter(d,a);else ba.recordError(1281)};
Bi=Ai=function(d,a,c,f){d=V.getShaderInfoLog(ba.shaders[d]);d===null&&(d="(unknown error)");a=a>0&&f?$c(d,f,a):0;c&&(Ha[c>>2]=a)};
kg=Ci=function(d,a,c){c?a==35716?(d=V.getShaderInfoLog(ba.shaders[d]),d===null&&(d="(unknown error)"),d=d?d.length+1:0,Ha[c>>2]=d):a==35720?(d=(d=V.getShaderSource(ba.shaders[d]))?d.length+1:0,Ha[c>>2]=d):Ha[c>>2]=V.getShaderParameter(ba.shaders[d],a):ba.recordError(1281)};
qg=function(d){var a=jd(d)+1,c=ze(a);c&&$c(d,c,a);return c};
Ei=Di=function(d){var a=ba.stringCache[d];if(!a){switch(d){case 7939:a=qg(pg().join(" "));break;case 7936:case 7937:case 37445:case 37446:(a=V.getParameter(d))||ba.recordError(1280);a=a?qg(a):0;break;case 7938:a="OpenGL ES 3.0 ("+V.getParameter(7938)+")";a=qg(a);break;case 35724:a=V.getParameter(35724);var c=a.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);c!==null&&(c[1].length==3&&(c[1]+="0"),a="OpenGL ES GLSL ES "+c[1]+" ("+a+")");a=qg(a);break;default:ba.recordError(1280)}ba.stringCache[d]=
a}return a};
Gi=Fi=function(d,a){if(ba.currentContext.version<2)return ba.recordError(1282),0;var c=ba.stringiCache[d];if(c)return a<0||a>=c.length?(ba.recordError(1281),0):c[a];switch(d){case 7939:return c=pg().map(qg),c=ba.stringiCache[d]=c,a<0||a>=c.length?(ba.recordError(1281),0):c[a];default:return ba.recordError(1280),0}};
Og=Hi=function(d,a){return V.getUniformBlockIndex(ba.programs[d],pa(a))};
Cg=function(d){return parseInt(d)};
Dg=function(d){return d.slice(-1)=="]"&&d.lastIndexOf("[")};
Ii=function(d){var a=d.uniformLocsById,c=d.uniformSizeAndIdsByName,f;if(!a){d.uniformLocsById=a={};d.uniformArrayNamesById={};var k=V.getProgramParameter(d,35718);for(f=0;f<k;++f){var m=V.getActiveUniform(d,f);var q=m.name;m=m.size;var t=Dg(q);t=t>0?q.slice(0,t):q;var x=d.uniformIdCounter;d.uniformIdCounter+=m;c[t]=[m,x];for(q=0;q<m;++q)a[x]=q,d.uniformArrayNamesById[x++]=t}}};
Ki=Ji=function(d,a){a=pa(a);if(d=ba.programs[d]){Ii(d);var c=d.uniformLocsById,f=0,k=a,m=Dg(a);m>0&&(f=Cg(a.slice(m+1))>>>0,k=a.slice(0,m));if((k=d.uniformSizeAndIdsByName[k])&&f<k[0]&&(f+=k[1],c[f]=c[f]||V.getUniformLocation(d,a)))return f}else ba.recordError(1281);return-1};
Mi=Li=function(d,a,c){for(var f=Bg[a],k=0;k<a;k++)f[k]=Ha[c+k*4>>2];V.invalidateFramebuffer(d,f)};
Oi=Ni=function(d){return(d=ba.buffers[d])?V.isBuffer(d):0};
Qi=Pi=function(d){return(d=ba.framebuffers[d])?V.isFramebuffer(d):0};
Si=Ri=function(d){return(d=ba.programs[d])?V.isProgram(d):0};
Ui=Ti=function(d){return(d=ba.vaos[d])?V.isVertexArray(d):0};
Wi=Vi=function(d){d=ba.programs[d];V.linkProgram(d);d.uniformLocsById=0;d.uniformSizeAndIdsByName={}};
Yi=Xi=function(d,a){d==3317?ba.unpackAlignment=a:d==3314&&(ba.unpackRowLength=a);V.pixelStorei(d,a)};
$i=Zi=function(d,a){return V.polygonOffset(d,a)};
rg=aj=function(d){return V.readBuffer(d)};
Ve=function(d){d-=5120;return d==0?Pb:d==1?Mb:d==2?sc:d==4?Ha:d==6?hd:d==5||d==28922||d==28520||d==30779||d==30782?Aa:Zc};
sg=function(d,a){return d>>>31-Math.clz32(a.BYTES_PER_ELEMENT)};
cj=bj=function(d,a,c,f,k,m,q){if(V.currentPixelPackBufferBinding)V.readPixels(d,a,c,f,k,m,q);else{var t=Ve(m);q=sg(q,t);V.readPixels(d,a,c,f,k,m,t,q)}};
ej=dj=function(d,a,c,f){return V.renderbufferStorage(d,a,c,f)};
gj=fj=function(d,a,c,f,k){return V.renderbufferStorageMultisample(d,a,c,f,k)};
ij=hj=function(d,a,c){V.samplerParameterf(ba.samplers[d],a,c)};
kj=jj=function(d,a,c){V.samplerParameteri(ba.samplers[d],a,c)};
mj=lj=function(d,a,c,f){return V.scissor(d,a,c,f)};
oj=nj=function(d,a,c,f){a=ba.getSource(d,a,c,f);V.shaderSource(ba.shaders[d],a)};
qj=pj=function(d,a,c){return V.stencilFunc(d,a,c)};
sj=rj=function(d,a,c,f){return V.stencilFuncSeparate(d,a,c,f)};
uj=tj=function(d){return V.stencilMask(d)};
wj=vj=function(d,a){return V.stencilMaskSeparate(d,a)};
yj=xj=function(d,a,c){return V.stencilOp(d,a,c)};
Aj=zj=function(d,a,c,f){return V.stencilOpSeparate(d,a,c,f)};
Cj=Bj=function(d,a,c){return V.texParameteri(d,a,c)};
Ej=Dj=function(d,a,c,f,k){return V.texStorage2D(d,a,c,f,k)};
Pg=Fj=function(d,a,c,f,k,m){return V.texStorage3D(d,a,c,f,k,m)};
Qg=function(d,a,c){d=(ba.unpackRowLength||d)*c;c=ba.unpackAlignment;return a*(d+c-1&-c)};
Rg=function(d){return{5:3,6:4,8:2,29502:3,29504:4,26917:2,26918:2,29846:3,29847:4}[d-6402]||1};
Gj=function(d,a,c,f,k){d=Ve(d);a=Rg(a)*d.BYTES_PER_ELEMENT;c=Qg(c,f,a);return d.subarray(sg(k,d),sg(k+c,d))};
Ij=Hj=function(d,a,c,f,k,m,q,t,x){if(V.currentPixelUnpackBufferBinding)V.texSubImage2D(d,a,c,f,k,m,q,t,x);else if(x){var A=Ve(t);V.texSubImage2D(d,a,c,f,k,m,q,t,A,sg(x,A))}else x=x?Gj(t,q,k,m,x):null,V.texSubImage2D(d,a,c,f,k,m,q,t,x)};
Sg=Jj=function(d,a,c,f,k,m,q,t,x,A,D){if(V.currentPixelUnpackBufferBinding)V.texSubImage3D(d,a,c,f,k,m,q,t,x,A,D);else if(D){var L=Ve(A);V.texSubImage3D(d,a,c,f,k,m,q,t,x,A,L,sg(D,L))}else V.texSubImage3D(d,a,c,f,k,m,q,t,x,A,null)};
Tg=function(d,a){if(d){var c=d.uniformLocsById[a];typeof c=="number"&&(d.uniformLocsById[a]=c=V.getUniformLocation(d,d.uniformArrayNamesById[a]+(c>0?"["+c+"]":"")));return c}ba.recordError(1282)};
Kj=function(d){return Tg(V.currentProgram,d)};
Mj=Lj=function(d,a){V.uniform1i(Kj(d),a)};
Oj=Nj=function(d,a,c){d=ba.programs[d];V.uniformBlockBinding(d,a,c)};
Qj=Pj=function(d){d=ba.programs[d];V.useProgram(d);V.currentProgram=d};
Sj=Rj=function(d,a){V.vertexAttribDivisor(d,a)};
Uj=Tj=function(d,a,c,f,k){V.vertexAttribIPointer(d,a,c,f,k)};
Wj=Vj=function(d,a,c,f,k,m){V.vertexAttribPointer(d,a,c,!!f,k,m)};
Ae=Xj=function(d,a,c,f){return V.viewport(d,a,c,f)};
v.createPreloadedFile=Me;v.preloadFile=Le;v.staticInit();Kd();Vb();for(fe=0;fe<32;++fe)Bg.push(Array(fe));fa.noExitRuntime&&(Db=fa.noExitRuntime);fa.print&&(pc=fa.print);fa.printErr&&(Gb=fa.printErr);fa.thisProgram&&(He=fa.thisProgram);if(Uf=fa.preInit)for(typeof Uf=="function"&&(fa.preInit=Uf=[Uf]);Uf.length>0;)Uf.shift()();bg={404352:function(d,a,c,f,k){if(typeof window==="undefined"||(window.AudioContext||window.webkitAudioContext)===void 0)return 0;if(typeof window.miniaudio==="undefined"){window.miniaudio=
{referenceCount:0};window.miniaudio.device_type={};window.miniaudio.device_type.playback=d;window.miniaudio.device_type.capture=a;window.miniaudio.device_type.duplex=c;window.miniaudio.device_state={};window.miniaudio.device_state.stopped=f;window.miniaudio.device_state.started=k;var m=window.miniaudio;m.devices=[];m.track_device=function(q){for(var t=0;t<m.devices.length;++t)if(m.devices[t]==null)return m.devices[t]=q,t;m.devices.push(q);return m.devices.length-1};
m.untrack_device_by_index=function(q){for(m.devices[q]=null;m.devices.length>0;)if(m.devices[m.devices.length-1]==null)m.devices.pop();else break};
m.untrack_device=function(q){for(var t=0;t<m.devices.length;++t)if(m.devices[t]==q)return m.untrack_device_by_index(t)};
m.get_device_by_index=function(q){return m.devices[q]};
m.unlock_event_types=["touchend","click"];m.unlock=function(){for(var q=0;q<m.devices.length;++q){var t=m.devices[q];t!=null&&t.webaudio!=null&&t.state===m.device_state.started&&t.webaudio.resume().then(function(){Gg(t.pDevice)},function(x){console.error("Failed to resume audiocontext",x)})}m.unlock_event_types.map(function(x){document.removeEventListener(x,m.unlock,!0)})};
m.unlock_event_types.map(function(q){document.addEventListener(q,m.unlock,!0)})}window.miniaudio.referenceCount+=1;
return 1},
406530:function(){typeof window.miniaudio!=="undefined"&&(window.miniaudio.unlock_event_types.map(function(d){document.removeEventListener(d,window.miniaudio.unlock,!0)}),--window.miniaudio.referenceCount,window.miniaudio.referenceCount===0&&delete window.miniaudio)},
406834:function(){return navigator.mediaDevices!==void 0&&navigator.mediaDevices.getUserMedia!==void 0},
406938:function(){try{var d=new (window.AudioContext||window.webkitAudioContext),a=d.sampleRate;d.close();return a}catch(c){return 0}},
407109:function(d,a,c,f,k,m){if(typeof window.miniaudio==="undefined")return-1;var q={},t={};d==window.miniaudio.device_type.playback&&c!=0&&(t.sampleRate=c);q.webaudio=new (window.AudioContext||window.webkitAudioContext)(t);q.webaudio.suspend();q.state=window.miniaudio.device_state.stopped;c=0;d!=window.miniaudio.device_type.playback&&(c=a);q.scriptNode=q.webaudio.createScriptProcessor(f,c,a);q.scriptNode.onaudioprocess=function(x){if(q.intermediaryBufferView==null||q.intermediaryBufferView.length==
0)q.intermediaryBufferView=new Float32Array(hd.buffer,k,f*a);if(d==window.miniaudio.device_type.capture||d==window.miniaudio.device_type.duplex){for(var A=0;A<a;A+=1)for(var D=x.inputBuffer.getChannelData(A),L=q.intermediaryBufferView,O=0;O<f;O+=1)L[O*a+A]=D[O];Hg(m,f,k)}if(d==window.miniaudio.device_type.playback||d==window.miniaudio.device_type.duplex)for(Ig(m,f,k),A=0;A<x.outputBuffer.numberOfChannels;++A)for(D=x.outputBuffer.getChannelData(A),L=q.intermediaryBufferView,O=0;O<f;O+=1)D[O]=L[O*a+
A];else for(A=0;A<x.outputBuffer.numberOfChannels;++A)x.outputBuffer.getChannelData(A).fill(0)};
d!=window.miniaudio.device_type.capture&&d!=window.miniaudio.device_type.duplex||navigator.mediaDevices.getUserMedia({audio:!0,video:!1}).then(function(x){q.streamNode=q.webaudio.createMediaStreamSource(x);q.streamNode.connect(q.scriptNode);q.scriptNode.connect(q.webaudio.destination)}).catch(function(x){console.log("Failed to get user media: "+x)});
d==window.miniaudio.device_type.playback&&q.scriptNode.connect(q.webaudio.destination);q.pDevice=m;return window.miniaudio.track_device(q)},
409986:function(d){return window.miniaudio.get_device_by_index(d).webaudio.sampleRate},
410059:function(d){d=window.miniaudio.get_device_by_index(d);d.scriptNode!==void 0&&(d.scriptNode.onaudioprocess=function(){},d.scriptNode.disconnect(),d.scriptNode=void 0);
d.streamNode!==void 0&&(d.streamNode.disconnect(),d.streamNode=void 0);d.webaudio.close();d.webaudio=void 0;d.pDevice=void 0},
410459:function(d){window.miniaudio.untrack_device_by_index(d)},
410509:function(d){d=window.miniaudio.get_device_by_index(d);d.webaudio.resume();d.state=window.miniaudio.device_state.started},
410648:function(d){d=window.miniaudio.get_device_by_index(d);d.webaudio.suspend();d.state=window.miniaudio.device_state.stopped}};
Lg={ib:Yf,Tb:hg,Rb:gg,Sb:tg,Ub:Nc,Vb:Dc,fb:Ac,Ib:kf,Lb:lf,zb:ne,e:Yc,Ca:mf,Sa:nf,sa:Ne,a:qe,d:Rd,xb:Fc,lb:Oe,y:gd,bb:pf,x:qf,Q:Ed,u:hc,yb:sf,Qa:Af,Nb:Bf,Da:Cf,Ab:te,Mb:Sd,i:Ff,b:re,na:Gf,s:Hf,h:If,H:Jf,l:Kf,S:Lf,g:Mf,n:Nf,Pb:Of,db:Gd,Jb:cb,Gb:cg,Fb:Rb,N:Rf,Ob:ee,I:Vf,j:wc,C:od,Cb:Vd,Eb:Be,cb:ge,Wb:Ze,Xb:$e,Yb:fd,gb:$a,Qb:Ya,Kb:Pa,hb:ya,Db:Hd,ga:Cc,f:Xf,T:T,jc:b,w:h,ma:p,o:u,Ha:B,r:I,c:G,xa:J,ac:X,t:Ba,bc:Sa,Aa:lb,cc:Lb,La:pd,M:td,Ka:$f,gc:og,sc:y,fc:P,Ya:ca,ec:ea,uc:ua,tc:gb,wb:Xb,vb:mg,pa:Fg,Ma:Vg,
Za:Xg,$b:Zg,W:ah,Oa:ch,_a:eh,ua:gh,Y:ih,wa:kh,Pa:mh,mb:oh,G:qh,K:sh,va:uh,$a:wh,ea:yh,ab:Ah,m:Ch,Ra:Eh,ia:Gh,rb:zg,Ja:Jh,U:Lh,$:Nh,D:Ph,k:Rh,sb:Th,ja:Vh,Ga:Xh,v:Zh,hc:ai,fa:ci,O:ei,E:gi,Xa:ii,mc:ki,B:mi,P:oi,eb:Mg,lc:ri,Fa:ti,q:vi,ic:xi,Ia:zi,kc:Bi,ob:kg,qb:Ei,qc:Gi,ba:Og,ca:Ki,ka:Mi,pb:Oi,nc:Qi,pc:Si,oc:Ui,X:Wi,L:Yi,dc:$i,Ua:rg,vc:cj,rc:ej,Wa:gj,Ta:ij,_:kj,Ba:mj,Na:oj,ub:qj,da:sj,za:uj,nb:wj,tb:yj,ya:Aj,A:Cj,z:Ej,Va:Pg,V:Ij,_b:Sg,F:Mj,aa:Oj,oa:Qj,p:Sj,ta:Uj,J:Wj,la:Ae,R:Zb,ra:ib,jb:Eb,kb:Nb,Zb:ob,
Z:Yb,qa:$b,ha:Mc,Ea:cd,Bb:vd,Hb:Ce};return M.yield(cf(),2)}return M.getNextAddressJsc()!=3?(vg=M.getYieldResultJsc(),M.yield(kb(),3)):M.return(fa)})}}();
globalThis.Rive=Tb}).call(globalThis,_.E,_.nt,_.db,_.Q,_.Y,_.LS,_.R,_.$v,_.Im);
var L9w=globalThis.Rive;/*

 Copyright 2020-2021 Rive
 SPDX-License-Identifier: MIT
*/
_.IR={};_.IR.RiveFont=_.yl_;_.IR.SemanticMode=_.AS;_.IR.FileAsset=_.tS.FileAsset;_.IR.AudioAsset=_.tS.AudioAsset;_.IR.FontAsset=_.tS.FontAsset;_.IR.ImageAsset=_.tS.ImageAsset;_.IR.Fit=_.clw;_.IR.Alignment=_.kcK;_.IR.DrawOptimizationOptions=_.JlL;_.IR.Layout=_.ui;_.IR.RuntimeLoader=_.Rsw;_.IR.StateMachineInputType=_.FEa;_.IR.StateMachineInput=_.OG;_.IR.RiveEventType=_.NkZ;_.IR.EventType=_.CUh;_.IR.DeprecationKeys=_.bi;_.IR.LoopType=_.Z9Z;_.IR.RiveFile=_.LE;_.IR.Rive=_.W0;_.IR.DataType=_.IZf;
_.IR.ViewModel=_.H0;_.IR.DataEnum=_.Xg;_.IR.ViewModelInstance=_.RO;_.IR.ViewModelInstanceValue=_.G3;_.IR.ViewModelInstanceString=_.mz;_.IR.ViewModelInstanceNumber=_.dn;_.IR.ViewModelInstanceBoolean=_.wn;_.IR.ViewModelInstanceTrigger=_.qJ;_.IR.ViewModelInstanceEnum=_.pE;_.IR.ViewModelInstanceList=_.hS;_.IR.ViewModelInstanceColor=_.KE;_.IR.ViewModelInstanceAssetImage=_.oO;_.IR.ViewModelInstanceAssetFont=_.nE;_.IR.ViewModelInstanceArtboard=_.gn;_.IR.Testing=_.tnb;_.IR.decodeAudio=_.iQh;
_.IR.decodeImage=_.u3w;_.IR.decodeFont=_.OQL;_.IR.loader=L9w;
_.Gp();
}catch(e){_._DumpException(e)}
}).call(this,this.default_kevlar_base);
// Google Inc.
