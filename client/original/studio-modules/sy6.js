"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.nOf=function(a,b){this.dom_=b||_.nd();this.supplier_=a||null};
_.d=_.nOf.prototype;
_.d.renderAsFragment=function(a,b,c){c=c===void 0?!1:c;var e=oOf(this),g=this.dom_;c=c===void 0?!1:c;g=g||_.nd();if(b=(a=a(b||_.WNf,e))&&a.renderAsElement?a.renderAsElement():null)c=b;else if(a=_.XNf(a),c)c=_.YNf(g),_.wa(c,a),c=_.ZNf(c),c=c.childNodes.length===1?c.removeChild(c.firstChild):c;else if(g=g.document_,c=_.Ysc(g,"DIV"),_.wa(c,a),c.childNodes.length==1)c=c.removeChild(c.firstChild);else{for(g=g.createDocumentFragment();c.firstChild;)g.appendChild(c.firstChild);c=g}this.handleRender(c,_.Hoa);
return c};
_.d.renderAsElement=function(a,b,c){c=c===void 0?!1:c;a=_.$Nf(a,b,oOf(this),this.dom_,c);this.handleRender(a,_.Hoa);return a};
_.d.renderElement=function(a,b,c){var e=oOf(this);(b=b(c||_.WNf,e))&&b.renderElement&&a?b.renderElement(a):(b=_.XNf(b),a.innerHTML=_.ua(b));this.handleRender(a,_.Hoa)};
_.d.render=function(a,b){a=a(b||{},oOf(this));this.handleRender(null,a instanceof _.XHc?a.contentKind:null);return String(a)};
_.d.renderText=function(a,b){var c=oOf(this);a=a(b||_.WNf,c);return String(a)};
_.qOf=function(a,b,c){return pOf(a,b,c,_.Hoa)};
_.nOf.prototype.renderStrictUri=function(a,b){return pOf(this,a,b,_.UHc)};
var pOf=function(a,b,c){b=b(c||{},oOf(a));a.handleRender(null,b.contentKind);return b};
_.nOf.prototype.renderSafeHtml=function(a,b){return _.qOf(this,a,b).toSafeHtml()};
_.nOf.prototype.renderSafeStyleSheet=function(a,b){a=pOf(this,a,b,_.WHc);return _.oba(a.toString())};
_.nOf.prototype.getDom=function(){return this.dom_};
_.nOf.prototype.handleRender=function(){};
var oOf=function(a){return a.supplier_?a.supplier_.getData():{}};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
