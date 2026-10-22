"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.BNf=function(a,b){this.dom_=b||_.md();this.supplier_=a||null};
_.d=_.BNf.prototype;
_.d.renderAsFragment=function(a,b,c){c=c===void 0?!1:c;var e=CNf(this),g=this.dom_;c=c===void 0?!1:c;g=g||_.md();if(b=(a=a(b||_.jNf,e))&&a.renderAsElement?a.renderAsElement():null)c=b;else if(a=_.kNf(a),c)c=_.lNf(g),_.wa(c,a),c=_.mNf(c),c=c.childNodes.length===1?c.removeChild(c.firstChild):c;else if(g=g.document_,c=_.Lsc(g,"DIV"),_.wa(c,a),c.childNodes.length==1)c=c.removeChild(c.firstChild);else{for(g=g.createDocumentFragment();c.firstChild;)g.appendChild(c.firstChild);c=g}this.handleRender(c,_.zoa);
return c};
_.d.renderAsElement=function(a,b,c){c=c===void 0?!1:c;a=_.nNf(a,b,CNf(this),this.dom_,c);this.handleRender(a,_.zoa);return a};
_.d.renderElement=function(a,b,c){var e=CNf(this);(b=b(c||_.jNf,e))&&b.renderElement&&a?b.renderElement(a):(b=_.kNf(b),a.innerHTML=_.ta(b));this.handleRender(a,_.zoa)};
_.d.render=function(a,b){a=a(b||{},CNf(this));this.handleRender(null,a instanceof _.NHc?a.contentKind:null);return String(a)};
_.d.renderText=function(a,b){var c=CNf(this);a=a(b||_.jNf,c);return String(a)};
_.ENf=function(a,b,c){return DNf(a,b,c,_.zoa)};
_.BNf.prototype.renderStrictUri=function(a,b){return DNf(this,a,b,_.KHc)};
var DNf=function(a,b,c){b=b(c||{},CNf(a));a.handleRender(null,b.contentKind);return b};
_.BNf.prototype.renderSafeHtml=function(a,b){return _.ENf(this,a,b).toSafeHtml()};
_.BNf.prototype.renderSafeStyleSheet=function(a,b){a=DNf(this,a,b,_.MHc);return _.oba(a.toString())};
_.BNf.prototype.getDom=function(){return this.dom_};
_.BNf.prototype.handleRender=function(){};
var CNf=function(a){return a.supplier_?a.supplier_.getData():{}};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
