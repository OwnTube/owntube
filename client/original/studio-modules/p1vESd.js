"use strict";_F_installCss(".ytOverlayStickerHost{--sticker-width:100;display:block;position:absolute;transform-origin:top left;pointer-events:all;cursor:pointer;border-radius:6px}.ytOverlayStickerHost>:only-child{height:100%;width:100%;box-sizing:border-box}.ytOverlayStickerHostRelative{position:relative}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("p1vESd");
var W$=function(a,b){if(a instanceof W$)this.array_=a.toArray();else{var c;if(c=_.Fa(a))a:{for(var e=c=0;e<a.length;e++){if(!_.Fa(a[e])||c>0&&a[e].length!=c){c=!1;break a}for(var g=0;g<a[e].length;g++)if(typeof a[e][g]!=="number"){c=!1;break a}c==0&&(c=a[e].length)}c=c!=0}if(c)this.array_=_.Da(a);else if(a instanceof _.Hc)this.array_=Asm(a.height,a.width);else if(typeof a==="number"&&typeof b==="number"&&a>0&&b>0)this.array_=Asm(a,b);else throw Error("ZS");}this.size_=new _.Hc(this.array_[0].length,
this.array_.length)},Bsm=function(a,b,c,e){a=b-a;
c=e-c;return Math.sqrt(a*a+c*c)},Csm=function(a,b,c){for(var e=0;e<a.getSize().height;e++)for(var g=0;g<a.getSize().width;g++)b.call(c,a.array_[e][g],e,g,a)},Dsm=function(a,b,c){var e=new W$(a.getSize());
Csm(a,function(g,k,l){e.array_[k][l]=b.call(c,g,k,l,a)});
return e},Asm=function(a,b){for(var c=[],e=0;e<a;e++){c[e]=[];
for(var g=0;g<b;g++)c[e][g]=0}return c};
W$.prototype.add=function(a){if(!_.tsc(this.size_,a.getSize()))throw Error("$S");return Dsm(this,function(b,c,e){return b+a.array_[c][e]})};
var Esm=function(a,b){if(a.size_.height!=b.getSize().height)throw Error("aT`"+b.size_.height+"`"+a.size_.height);var c=new W$(a.size_.height,a.size_.width+b.size_.width);Csm(a,function(e,g,k){c.array_[g][k]=e});
Csm(b,function(e,g,k){c.array_[g][this.size_.width+k]=e},a);
return c};
_.d=W$.prototype;_.d.appendRows=function(a){if(this.size_.width!=a.getSize().width)throw Error("bT`"+a.size_.width+"`"+this.size_.width);var b=new W$(this.size_.height+a.size_.height,this.size_.width);Csm(this,function(c,e,g){b.array_[e][g]=c});
Csm(a,function(c,e,g){b.array_[this.size_.height+e][g]=c},this);
return b};
_.d.equals=function(a,b){if(this.size_.width!=a.size_.width||this.size_.height!=a.size_.height)return!1;b=b||0;for(var c=0;c<this.size_.height;c++)for(var e=0;e<this.size_.width;e++)if(!(Math.abs(this.array_[c][e]-a.array_[c][e])<=(b||1E-6)))return!1;return!0};
_.d.getDeterminant=function(){if(!this.isSquare())throw Error("cT");return Fsm(this)};
_.d.getInverse=function(){if(!this.isSquare())throw Error("dT");if(this.getSize().width==1){var a=this.getValueAt(0,0);return a==0?null:new W$([[1/Number(a)]])}a=this.size_.height;for(var b=[],c=0;c<a;c++){b[c]=[];for(var e=0;e<a;e++)b[c][e]=c==e?1:0}a=new W$(b);a:{b=Esm(this,a);c=new W$(b);for(var g=e=0;g<c.size_.height&&!(e>=c.size_.width);g++){for(var k=g;c.array_[k][e]==0;)if(k++,k==c.size_.height&&(k=g,e++,e==c.size_.width)){b=c;break a}var l=b,m=g,p=l.array_[k];l.array_[k]=l.array_[m];l.array_[m]=
p;l=c.array_[g][e];for(k=e;k<c.size_.width;k++)c.array_[g][k]/=l;for(k=0;k<c.size_.height;k++)if(k!=g)for(l=c.array_[k][e],m=e;m<c.size_.width;m++)c.array_[k][m]-=l*c.array_[g][m];e++}b=c}return Gsm(b,0,0,a.size_.width-1,a.size_.height-1).equals(a)?Gsm(b,0,a.size_.width):null};
_.d.getSize=function(){return this.size_};
_.d.getTranspose=function(){var a=new W$(this.size_.width,this.size_.height);Csm(this,function(b,c,e){a.array_[e][c]=b});
return a};
_.d.getValueAt=function(a,b){return a>=0&&a<this.size_.height&&b>=0&&b<this.size_.width?this.array_[a][b]:null};
_.d.isSquare=function(){return this.size_.width==this.size_.height};
var Hsm=function(a,b,c,e){if(!(b>=0&&b<a.size_.height&&c>=0&&c<a.size_.width))throw Error("eT`"+b+"`"+c+"`"+a.size_.height+"`"+a.size_.width);a.array_[b][c]=e};
W$.prototype.multiply=function(a){if(a instanceof W$){if(this.size_.width!=a.getSize().height)throw Error("fT");return Ism(this,a)}if(typeof a==="number")return Jsm(this,a);throw Error("gT");};
W$.prototype.subtract=function(a){if(!_.tsc(this.size_,a.getSize()))throw Error("hT");return Dsm(this,function(b,c,e){return b-a.array_[c][e]})};
W$.prototype.toArray=function(){return this.array_};
var Fsm=function(a){if(a.getSize().area()==1)return a.array_[0][0];for(var b=0,c=0;c<a.size_.width;c++)b+=a.array_[0][c]*((c%2==0?1:-1)*Fsm(Ksm(a,0,c)));return b},Gsm=function(a,b,c,e,g){var k=new W$((e?e:a.size_.height-1)-b+1,(g?g:a.size_.width-1)-c+1);
Csm(k,function(l,m,p){k.array_[m][p]=this.array_[b+m][c+p]},a);
return k},Ksm=function(a,b,c){var e=new W$(a.size_.width-1,a.size_.height-1);
Csm(e,function(g,k,l){Hsm(e,k,l,this.array_[k>=b?k+1:k][l>=c?l+1:l])},a);
return e},Ism=function(a,b){var c=new W$(a.size_.height,b.getSize().width);
Csm(c,function(e,g,k){for(var l=e=0;l<this.size_.width;l++)e+=this.getValueAt(g,l)*b.getValueAt(l,k);Hsm(c,g,k,e)},a);
return c},Jsm=function(a,b){return Dsm(a,function(c){return c*b})};_.mjc=_.Ui(function(a){a=_.Vi(a,{mainBodyWidth:0,mainBodyHeight:0});var b=a.children,c=a.region,e=a.mainBodyWidth,g=a.mainBodyHeight;a=_.f(_.zd(void 0,void 0,"s2reUc",function(){}));
var k=a.next().value,l=a.next().value;a=_.f(_.zd("0px",void 0,"mc1myf",function(){}));
var m=a.next().value,p=a.next().value;a=_.f(_.zd("0px",void 0,"Pjh5nb",function(){}));
var r=a.next().value,t=a.next().value;a=_.f(_.zd(0,void 0,"uqi3dd",function(){}));
var v=a.next().value,w=a.next().value;a=_.f(_.zd(0,void 0,"kVn3s",function(){}));
var x=a.next().value,z=a.next().value,A=function(H){var I=H==null?void 0:H.getPlayerState(),K;return!H||typeof I==="undefined"||I===-1E3||I===-1||I===5||(H==null?void 0:H.isMutedByMutedAutoplay())||Math.round(((K=H==null?void 0:H.getVideoAspectRatio())!=null?K:0)*100)!==Math.round(v()/x()*100)},C=function(){var H=k();
if(H){var I=_.G4a();A(I)?H.style.display="none":(H.style.display="inherit",I==null||I.removeEventListener("onStateChange",C),I==null||I.removeEventListener("onMutedAutoplayChange",C));E()}},E=function(){var H=_.G4a();
if(H){H=H.getVideoContentRect();var I=H.left,K=H.top,M=H.height;w(H.width);z(M);p(I+"px");t(K+"px")}};
_.Md(function(){var H=k();if(H){var I=_.G4a();if(A(I)){H.style.display="none";var K;z(v()/((K=I==null?void 0:I.getVideoAspectRatio())!=null?K:1))}}},"uFcFub","FK");
_.Vd(function(){E();var H=c==null?void 0:c();if(H&&!((H==null?0:H.transformationMatrix)||(H==null?0:H.x)))throw Error("lT");var I;(I=_.G4a())==null||I.addEventListener("onStateChange",C);var K;(K=_.G4a())==null||K.addEventListener("onMutedAutoplayChange",C);window.addEventListener("resize",E);var M;(M=screen.orientation)==null||M.addEventListener("change",E);_.yd(function(){var O;(O=_.G4a())==null||O.removeEventListener("onStateChange",C);var S;(S=_.G4a())==null||S.removeEventListener("onMutedAutoplayChange",
C);window.removeEventListener("resize",E);var W;(W=screen.orientation)==null||W.removeEventListener("change",E)})},"GK");
var F=function(){var H,I=c==null?void 0:c(),K,M,O,S;if(I&&"x"in I)var W={left:(K=I.x)!=null?K:0,top:(M=I.y)!=null?M:0,width:(O=I.w)!=null?O:0,height:(H=I.h)!=null?H:0,rotation:(S=I.r)!=null?S:0};else{M=(W=I==null?void 0:I.transformationMatrix)!=null?W:[];I=v();K=x();O=[];H=0;for(S=-1;H<M.length;H++)H%3===0&&(S++,O[S]=[]),O[S].push(M[H]);M=new W$(O);O=new W$([[0,1,1,0],[0,0,1,1],[1,1,1,1]]);O=M.multiply(O);M=new W$([[0,0],[0,0],[0,0],[0,0]]);for(H=0;H<O.getSize().width;H++){S=O.getValueAt(0,H);W=O.getValueAt(1,
H);if(S===null||W===null)throw Error("kT`"+(H+1).toString());Hsm(M,H,0,S*I);Hsm(M,H,1,W*K)}I=M.getValueAt(0,0);H=M.getValueAt(1,0);K=M.getValueAt(0,1);S=M.getValueAt(1,1);if(I===null||H===null||K===null||S===null)throw Error("iT");O=Bsm(I,H,K,S);W=M.getValueAt(3,0);M=M.getValueAt(3,1);if(W===null||M===null)throw Error("jT");M=Bsm(I,W,K,M);S=(Number((S*-1).toFixed(2))-Number((K*-1).toFixed(2)))/(Number(H.toFixed(2))-Number(I.toFixed(2)));W=Math.atan(S)*180/Math.PI;H=S===Number.POSITIVE_INFINITY?-90:
S===Number.NEGATIVE_INFINITY?90:Object.is(S,-0)?180:S===0?0:S>0?W*-1:I<H?W*-1:Math.abs(W)+180;W={top:K,left:I,width:O,height:M,rotation:H}}H=W;I=H.left;K=H.top;M=H.width;O=H.height;H=H.rotation;return(S=c==null?void 0:c())&&"x"in S?"left:calc("+I*100+"% + "+m()+"); top:calc("+(K*100+"% + "+r()+"); width:")+(M*e()+"px; height:")+(O*g()+"px; transform:rotate(")+(H+"deg);"):"left:calc("+I+"px + "+m()+"); top:calc("+(K+"px + "+r()+"); width:")+(M+"px; height:")+(O+"px; transform:rotate(")+(H+"deg); --sticker-width:")+
(M+";")};
return _.y(_.B,{cond:function(){return!(c==null||!c())},
then:function(){return _.y(_.sra,{root:"#sticker-layer"},function(){return _.y("yt-overlay-sticker",{el:_.Zn(l),style:F,class:"ytOverlayStickerHost"},b)})},
else:function(){return _.y("yt-overlay-sticker",{el:_.Zn(l),class:_.Wn("ytOverlayStickerHost","ytOverlayStickerHostRelative")},b)}})},"HK");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
