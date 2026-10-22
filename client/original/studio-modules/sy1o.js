"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Fi({is:"scale-up-animation",_template:null,behaviors:[_.uke],configure:function(a){var b=a.node,c="scale(0)";a.axis==="x"?c="scale(0, 1)":a.axis==="y"&&(c="scale(1, 0)");this._effect=new KeyframeEffect(b,[{transform:c},{transform:"scale(1, 1)"}],this.timingFromConfig(a));a.transformOrigin&&this.setPrefixedProperty(b,"transformOrigin",a.transformOrigin);return this._effect}});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
