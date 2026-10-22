"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("n73qwf");
var cNf=function(a){_.Rc.call(this);this.window_=a||window;this.listenerKey_=_.Wc(this.window_,"resize",this.handleResize_,!1,this);this.size_=_.Vra(this.window_)},dNf=function(a){_.Rc.call(this);
this.window_=a?a.getWindow():window;this.lastDensity_=this.window_.devicePixelRatio>=1.5?2:1;this.listener_=(0,_.Tc)(this.handleMediaQueryChange_,this);this.removeListener_=null;(this.mediaQueryList_=this.window_.matchMedia?this.window_.matchMedia("(min-resolution: 1.5dppx), (-webkit-min-device-pixel-ratio: 1.5)"):null)&&typeof this.mediaQueryList_.addListener!=="function"&&typeof this.mediaQueryList_.addEventListener!=="function"&&(this.mediaQueryList_=null)},eNf=function(a,b){_.Pa.call(this);
this.appContext_=a;if(b){if(this.ownerDocument_)throw Error("ty");this.ownerDocument_=b;this.domHelper_=_.md(b);this.viewportSizeMonitor_=new cNf(_.dv(b));this.viewportSizeMonitor_.setParentEventTarget(this.appContext_.getEventTarget());this.pixelDensityMonitor_=new dNf(this.domHelper_);this.pixelDensityMonitor_.start()}};
_.es(cNf,_.Rc);cNf.prototype.getSize=function(){return this.size_?this.size_.clone():null};
cNf.prototype.disposeInternal=function(){cNf.superClass_.disposeInternal.call(this);this.listenerKey_&&(_.no(this.listenerKey_),this.listenerKey_=null);this.size_=this.window_=null};
cNf.prototype.handleResize_=function(){var a=_.Vra(this.window_);_.gsc(a,this.size_)||(this.size_=a,this.dispatchEvent("resize"))};_.es(dNf,_.Rc);dNf.prototype.start=function(){var a=this;this.mediaQueryList_&&(typeof this.mediaQueryList_.addEventListener==="function"?(this.mediaQueryList_.addEventListener("change",this.listener_),this.removeListener_=function(){a.mediaQueryList_.removeEventListener("change",a.listener_)}):(this.mediaQueryList_.addListener(this.listener_),this.removeListener_=function(){a.mediaQueryList_.removeListener(a.listener_)}))};
dNf.prototype.handleMediaQueryChange_=function(){var a=this.window_.devicePixelRatio>=1.5?2:1;this.lastDensity_!=a&&(this.lastDensity_=a,this.dispatchEvent("m"))};
dNf.prototype.disposeInternal=function(){this.removeListener_&&this.removeListener_();dNf.superClass_.disposeInternal.call(this)};_.es(eNf,_.Pa);_.d=eNf.prototype;_.d.hasOwnerDocument=function(){return!!this.ownerDocument_};
_.d.getOwnerDocument=function(){return this.ownerDocument_};
_.d.getDomHelper=function(){return this.domHelper_};
_.d.getViewportSize=function(){return this.viewportSizeMonitor_.getSize()};
_.d.getViewportSizeMonitor=function(){return this.viewportSizeMonitor_};
_.d.getPixelDensityMonitor=function(){return this.pixelDensityMonitor_};
_.d.disposeInternal=function(){this.domHelper_=this.ownerDocument_=null;this.viewportSizeMonitor_&&(this.viewportSizeMonitor_.dispose(),this.viewportSizeMonitor_=null);_.Oa(this.pixelDensityMonitor_);this.pixelDensityMonitor_=null};
_.Fla(_.FFc,eNf);
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
