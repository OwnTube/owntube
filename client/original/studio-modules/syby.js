"use strict";_F_installCss(".ytCollectionThumbnailViewModelHost{display:block;position:relative;width:100%}.ytCollectionThumbnailViewModelHostHasStacks{border-top:1px solid var(--t3e41d7b17b187f69);margin-top:-1px}.ytCollectionThumbnailViewModelSlideshow{position:absolute;top:0;right:0;bottom:0;left:0}.ytCollectionThumbnailSlideshowHost{display:block;position:relative}.ytCollectionThumbnailSlideshowSlideshowThumbnail{position:absolute;top:0;left:0;right:0;opacity:0;transition:opacity .8s ease}.ytCollectionThumbnailSlideshowSlideshowThumbnailFirstSlide{position:relative}.ytCollectionThumbnailSlideshowSlideshowThumbnailShowSlide{opacity:1}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var cwm=function(a){var b=_.f(_.zd(!1,void 0,"E6wDDe",function(){})),c=b.next().value,e=b.next().value;
_.Wd(function(){var g=a==null?void 0:a();if(g){var k=_.qe().resolve(_.oe(_.PWg));if(k){var l={triggeringElement:g,onDwellTriggeredFn:function(){e(!0)},
onDwellEndFn:function(){e(!1)}};
k.registerElement(l);_.yd(function(){k.unregisterElement(l)})}}});
return c};var dwm=function(a){this.setActiveSlideIndex=a;this.jobIds=[];this.isSlideshowPlaying=!1};
dwm.prototype.stopSlideshow=function(){if(this.isSlideshowPlaying){this.isSlideshowPlaying=!1;for(var a=this.jobIds,b=0,c=a.length;b<c;b++)_.$e.cancelJob(a[b]);this.jobIds.length=0}};
var gwm=function(a,b){a.isSlideshowPlaying||(a.isSlideshowPlaying=!0,ewm(a,0),fwm(a,b,0))},ewm=function(a,b){_.Dqb(_.$e,function(){a.setActiveSlideIndex(b)},1)},fwm=function(a,b,c){a.jobIds.push(_.Dqb(_.$e,function(){var e=c<b-1?c+1:0;
a.setActiveSlideIndex(e);fwm(a,b,e)},1800))};var hwm=_.Ui(function(a){var b=_.f(_.zd(-1,void 0,"nwYFZ",function(){})),c=b.next().value,e=b.next().value;
_.Wd(function(){var g=new dwm(e);gwm(g,a.data().thumbnails.length);_.yd(function(){g.stopSlideshow()})});
return _.y("yt-collection-thumbnail-slideshow",{class:"ytCollectionThumbnailSlideshowHost"},_.y(_.mo,{data:function(){return a.data().thumbnails}},{thumbnailViewModel:function(g,k){return _.y("div",{class:function(){var l=!a.data().primaryThumbnail,m=k(),p=c(),r=["ytCollectionThumbnailSlideshowSlideshowThumbnail"];
l&&m===0&&r.push("ytCollectionThumbnailSlideshowSlideshowThumbnailFirstSlide");m<=p&&r.push("ytCollectionThumbnailSlideshowSlideshowThumbnailShowSlide");return r.join(" ")}},_.y(_.Fgf,{data:g.data,
disableRounding:a.disableRounding}))}}))},"lN");_.Elc=_.Ui(function(a){var b=cwm(a.triggeringElement),c=function(){return!!a.data().primaryThumbnail},e=function(){var k,l=(k=a.data())==null?void 0:k.maxHeight,m;
k=(m=a.maxHeight)==null?void 0:m.call(a);return l!=null&&k!=null?Math.min(l,k):k!=null?k:l},g=function(){var k=e();
if(k){var l;if(c()&&(l=a.includeStackHeight)!=null&&l.call(a)){var m;l=((m=a.singleStack)==null?0:m.call(a))?4:8}else l=0;k=k-l-1;if(!(k<0)){m=Math;l=m.ceil;var p,r;var t=_.z_b((r=(p=a.aspectRatio)==null?void 0:p.call(a))!=null?r:0);return l.call(m,k*t)}}};
return _.y("yt-collection-thumbnail-view-model",{class:"ytCollectionThumbnailViewModelHost","aria-hidden":"true",style:_.ho({height:function(){return e()?e()+"px":void 0},
width:function(){return g()?g()+"px":void 0}})},_.y(iwm,{stackEnabled:c,
singleStack:a.singleStack,thumbnailSize:function(){var k,l;return _.f0b((k=a.width)==null?void 0:k.call(a),(l=a.height)==null?void 0:l.call(a))},
stackColor:function(){return a.data().stackColor},
includeStackHeight:a.includeStackHeight,transparentBackgroundColor:function(){var k;return((k=a.transparentBackgroundColor)==null?void 0:k.call(a))||a.data().transparentBackgroundColor}},_.y(_.mo,{data:function(){return a.data().primaryThumbnail}},{thumbnailViewModel:function(k){var l={};
return _.y(_.Fgf,{data:k.data,width:a.width,height:a.height,aspectRatio:a.aspectRatio,disableRounding:a.disableRounding,className:_.Wn((l.ytCollectionThumbnailViewModelHostHasStacks=function(){var m;return c()&&!((m=a.transparentBackgroundColor)==null?0:m.call(a))&&!a.data().transparentBackgroundColor},l)),
hovered:a.hovered,playbackRef:a.playbackRef})}}),_.y(_.B,{cond:function(){var k;
return b()&&((k=a.data().thumbnails)==null?void 0:k.length)},
then:function(){return _.y("div",{class:"ytCollectionThumbnailViewModelSlideshow"},_.y(hwm,{data:a.data,disableRounding:function(){return!c()}}))}})))},"mN");
var iwm=_.Ui(function(a){var b=a.children;var c=a.stackEnabled;var e=a.singleStack;var g=a.thumbnailSize;var k=a.stackColor;var l=a.includeStackHeight;var m=a.transparentBackgroundColor;var p,r=(p=_.qe().resolve(_.oe(_.ir)))==null?void 0:p();return _.y(_.B,{cond:c,then:function(){return _.y(_.kHf,{data:function(){var t,v;return{experimentEnabled:!0,thumbnailSize:g(),doubleStack:!(e==null?0:e()),color:r?k==null?void 0:(t=k())==null?void 0:t.darkTheme:k==null?void 0:(v=k())==null?void 0:v.lightTheme,
enableResponsiveMode:!1,includeStackHeight:l==null?void 0:l(),transparentBackgroundColor:m==null?void 0:m()}}},b)},
else:function(){return b}})},"nN");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
