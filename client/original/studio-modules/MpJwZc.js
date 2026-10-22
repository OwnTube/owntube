"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("MpJwZc");
var rOf=function(a){this.appContext_=a;this.configService_=this.appContext_.getOrNull(_.SNf)};
rOf.prototype.getData=function(){this.appContext_.isDisposed()||(this.configService_=this.appContext_.getOrNull(_.SNf));return this.configService_?this.configService_.getInjectedParams():{}};
var sOf=function(a){var b=new rOf(a);_.nOf.call(this,b,a.get(_.MFc).getDomHelper());this.appContext_=a;this.eventTarget_=new _.Tc;this.ijSupplier_=b};
_.G(sOf,_.nOf);sOf.prototype.getData=function(){return this.ijSupplier_.getData()};
sOf.prototype.getEventTarget=function(){return this.eventTarget_};
sOf.prototype.handleRender=function(a,b){_.nOf.prototype.handleRender.call(this,a,b);this.eventTarget_.dispatchEvent(new _.spa(_.tpa,a,b))};
sOf.prototype.renderMaybeStrict=function(a,b){var c=a(b||{},this.getData());return c instanceof _.XHc?_.qOf(this,function(){return c}):this.renderText(function(){return c})};
_.Ola(_.rpa,sOf);
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
