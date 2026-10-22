"use strict";_F_installCss(".ytwAdImageViewModelHost,.ytwAdImageViewModelHostIsClickableAdComponent{display:flex;width:100%;height:100%}.ytwAdImageViewModelHostImageContainer,.ytwAdImageViewModelHostIsClickableAdComponentImageContainer{width:100%;height:100%;position:relative;display:inline-block}.ytwAdImageViewModelHostImage,.ytwAdImageViewModelHostIsClickableAdComponentImage{visibility:inherit}.ytwAdImageViewModelHostInGridView{width:100%;height:100%;position:absolute}.ytwAdImageViewModelHostInGridViewImageContainer{width:100%;height:100%;position:relative;display:inline-block}.ytwAdImageViewModelHostInGridViewImage{visibility:inherit}.ytwAdImageViewModelHostAdDisclosureBannerContainer{position:absolute;top:8px;left:8px;z-index:3}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Orm=function(a){if(a.querySelector("img")){var b=a.querySelector("img");b.addEventListener("error",function(){_.RWb(b.src).then(function(c){(c=_.Oaa(c).toString())?b.src=c:b.removeAttribute("src")}).catch(function(){b.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8XA8AAksBZG7LpHYAAAAASUVORK5CYII="})})}};_.yUg=_.Ri(function(a){a=_.Si(a,{targetHeight:void 0,targetWidth:void 0,preserveHeight:!1,preserveWidth:!1,useWidth:!1,setOnErrorHandler:!1,setProgressiveImageLoading:!1,listenToTapEvent:!1,isGridViewEnabled:!1,contentMode:void 0});var b=a.data,c=a.customCommandResolver;a=Object.assign({},a);var e=(delete a.data,delete a.customCommandResolver,a);a=_.uf({visibilityCallback:function(p,r){var t,v=(t=b().interaction)==null?void 0:t.onFirstVisible;p&&(v&&_.$n(v),e.setOnErrorHandler()&&Orm(r))},
showOption:_.qL});var g=_.wUg(function(){return b().interaction},c,function(){var p;
return(p=e.listenToTapEvent)==null?void 0:p.call(e)}),k=_.f(_.xd(!1,void 0,"MLcxl",function(){})),l=k.next().value,m=k.next().value;
return _.y("ad-image-view-model",{class:function(){var p,r=[((p=b().interaction)==null?0:p.onTap)?"ytwAdImageViewModelHostIsClickableAdComponent":"ytwAdImageViewModelHost"],t;((t=e.isGridViewEnabled)==null?0:t.call(e))&&r.push("ytwAdImageViewModelHostInGridView");return r.join(" ")},
el:_.Xn(a,g),"on:touchend":function(p){var r;((r=e.setTouchEndHandler)==null?0:r.call(e))&&!l()&&(p.currentTarget.click(),m(!0),setTimeout(function(){m(!1)},100));
p.stopPropagation()}},_.y("div",{class:"ytwAdImageViewModelHostImageContainer"},_.y(_.go,{data:function(){var p;
return{sources:b().imageSources,contentMode:(p=b().imageProperties)==null?void 0:p.contentMode}},
alt:function(){var p,r;return((p=b().interaction)==null?void 0:(r=p.accessibility)==null?void 0:r.label)||""},
targetHeight:e.targetHeight,targetWidth:e.targetWidth,preserveHeight:e.preserveHeight,preserveWidth:e.preserveWidth,useWidth:e.useWidth,contentMode:e.contentMode,style:function(){var p,r;return"vertical-align: bottom;"+(((p=b().background)==null?0:p.color)?"background-color:"+_.Wh((r=b().background)==null?void 0:r.color)+";":"")},
className:function(){return e.setProgressiveImageLoading()?"ytwAdImageViewModelHostImage":void 0},
draggable:function(){var p,r;return(r=(p=e.setDraggable)==null?void 0:p.call(e))!=null?r:void 0}}),_.y(_.ko,{data:function(){return b().adDisclosureBanner}},{adDisclosureBannerViewModel:function(p){return _.y("div",{class:"ytwAdImageViewModelHostAdDisclosureBannerContainer"},_.y(_.Wkc,{data:p.data,
customCommandResolver:c}))}})))},"GK");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
