"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var GBg;var HBg=function(){var a=_.P.apply(this,arguments)||this;a.disabled=!1;a.hideTimezoneTrigger=!1;a.hideTimeSelector=!1;a.datetimePickerModel=_.tUf();return a};
_.G(HBg,_.P);HBg.prototype.attached=function(){this.field&&(this.datetimePickerModel=_.tUf({timestamp:this.field.value}))};
HBg.prototype.onFieldChange=function(){this.field&&this.field.value!==_.uUf(this.datetimePickerModel)&&(this.datetimePickerModel=_.tUf({timestamp:this.field.value}))};
HBg.prototype.onScheduledTimeChange=function(a){this.field&&(this.datetimePickerModel=a.detail,this.field.value=_.uUf(a.detail))};
HBg.prototype.onFieldChange=HBg.prototype.onFieldChange;_.U([_.N(),_.V("design:type",Object)],HBg.prototype,"field",void 0);_.U([_.N(),_.V("design:type",Object)],HBg.prototype,"disabled",void 0);_.U([_.N(),_.V("design:type",Object)],HBg.prototype,"hideTimezoneTrigger",void 0);_.U([_.N(),_.V("design:type",String)],HBg.prototype,"timeOfDayGranularity",void 0);_.U([_.N(),_.V("design:type",Object)],HBg.prototype,"hideTimeSelector",void 0);
_.U([_.N(),_.V("design:type",Object)],HBg.prototype,"dateRange",void 0);_.U([_.N(),_.V("design:type",String)],HBg.prototype,"dateSelectorLabel",void 0);_.U([_.ui("field"),_.V("design:type",Function),_.V("design:paramtypes",[]),_.V("design:returntype",void 0)],HBg.prototype,"onFieldChange",null);
_.rj()(HBg,"ytcp-form-datetime",function(){if(GBg===void 0){var a=document.createElement("template");_.dg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-form-datetime--\x3e<ytcp-datetime-picker date-range="[[dateRange]]" date-selector-dropdown-label="[[dateSelectorLabel]]" disabled="[[disabled]]" hide-time-selector="[[hideTimeSelector]]" hide-timezone-trigger="[[hideTimezoneTrigger]]" model="[[datetimePickerModel]]" time-of-day-granularity="[[timeOfDayGranularity]]" on-model-change="onScheduledTimeChange" class="style-scope ytcp-form-datetime"></ytcp-datetime-picker>');GBg=
a}a=GBg;return a},{allowedProps:"dateRange disabled field hideTimeSelector hideTimezoneTrigger timeOfDayGranularity".split(" "),
mode:1});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
