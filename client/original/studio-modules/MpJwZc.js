"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("MpJwZc");
var FNf=function(a){this.appContext_=a;this.configService_=this.appContext_.getOrNull(_.fNf)};
FNf.prototype.getData=function(){this.appContext_.isDisposed()||(this.configService_=this.appContext_.getOrNull(_.fNf));return this.configService_?this.configService_.getInjectedParams():{}};
var GNf=function(a){var b=new FNf(a);_.BNf.call(this,b,a.get(_.FFc).getDomHelper());this.appContext_=a;this.eventTarget_=new _.Rc;this.ijSupplier_=b};
_.G(GNf,_.BNf);GNf.prototype.getData=function(){return this.ijSupplier_.getData()};
GNf.prototype.getEventTarget=function(){return this.eventTarget_};
GNf.prototype.handleRender=function(a,b){_.BNf.prototype.handleRender.call(this,a,b);this.eventTarget_.dispatchEvent(new _.mpa(_.npa,a,b))};
GNf.prototype.renderMaybeStrict=function(a,b){var c=a(b||{},this.getData());return c instanceof _.NHc?_.ENf(this,function(){return c}):this.renderText(function(){return c})};
_.Fla(_.lpa,GNf);
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
