"use strict";_F_installCss(".ytChipSelectionFormFieldViewModelHost{display:flex;flex-flow:row wrap}.ytChipSelectionFormFieldViewModelChipWrapper{margin:4px}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.hd("Wqoahc");
_.gjc=_.Ri(function(a){var b=function(){var p;return((p=a.controlled)==null?0:p.call(a))?2:a.data().formFieldMetadata?3:1},c=_.JOa(function(){return a.data().formFieldMetadata}),e=_.f(_.Qi(function(){if(b()!==1)return[];
var p,r,t=(r=(p=a.data())==null?void 0:p.type)!=null?r:"SELECTION_TYPE_STRING",v;return(((v=a.data())==null?void 0:v.chips)||[]).map(function(w){w=_.Qe(w,_.xbc);if(w==null?0:w.selected)return _.Sdc(w.chipValue,t)}).filter(function(w){return w!==void 0})})),g=e.next().value,k=e.next().value,l=function(p){var r,t=((r=a.data())==null?void 0:r.type)||"SELECTION_TYPE_STRING",v=_.Sdc(p.chipValue,t);
if(v!==void 0)if(b()===3){var w=c();if(w){var x=w.value.indexOf(v);x===-1?w.add(v):w.remove(x)}}else if(b()===2){var z,A;(z=a.controlled)==null||(A=z.call(a))==null||A.onTap(v)}else p=g().includes(v)?g().filter(function(C){return C!==v}):[].concat(_.u(g()),[v]),k(p),(w=a.uncontrolled)==null||(x=w.call(a))==null||x.onUpdate(p)},m=function(){if(b()===2){var p,r;
return((p=a.controlled)==null?void 0:(r=p.call(a))==null?void 0:r.selectedValues)||[]}if(b()===3){var t;return((t=c())==null?void 0:t.value)||[]}return g()||[]};
return _.y("chip-selection-form-field-view-model",{class:"ytChipSelectionFormFieldViewModelHost",role:"group"},_.y(_.Md,{each:function(){return a.data().chips||[]}},function(p){return _.y("div",{class:"ytChipSelectionFormFieldViewModelChipWrapper"},_.y(_.iqf,{data:function(){return _.Qe(p,_.xbc)},
selected:function(){var r;if(r=_.Qe(p,_.xbc)){var t,v=((t=a.data())==null?void 0:t.type)||"SELECTION_TYPE_STRING";r=_.Sdc(r.chipValue,v);r=r===void 0?!1:m().includes(r)}else r=!1;return r},
callback:l,role:"button"}))}))},"gN");
_.jd();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
