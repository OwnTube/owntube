"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var tCg;var uCg=function(){var a=_.P.apply(this,arguments)||this;a.disabled=!1;a.hideTimezoneTrigger=!1;a.hideTimeSelector=!1;a.datetimePickerModel=_.gVf();return a};
_.G(uCg,_.P);uCg.prototype.attached=function(){this.field&&(this.datetimePickerModel=_.gVf({timestamp:this.field.value}))};
uCg.prototype.onFieldChange=function(){this.field&&this.field.value!==_.hVf(this.datetimePickerModel)&&(this.datetimePickerModel=_.gVf({timestamp:this.field.value}))};
uCg.prototype.onScheduledTimeChange=function(a){this.field&&(this.datetimePickerModel=a.detail,this.field.value=_.hVf(a.detail))};
uCg.prototype.onFieldChange=uCg.prototype.onFieldChange;_.U([_.N(),_.V("design:type",Object)],uCg.prototype,"field",void 0);_.U([_.N(),_.V("design:type",Object)],uCg.prototype,"disabled",void 0);_.U([_.N(),_.V("design:type",Object)],uCg.prototype,"hideTimezoneTrigger",void 0);_.U([_.N(),_.V("design:type",String)],uCg.prototype,"timeOfDayGranularity",void 0);_.U([_.N(),_.V("design:type",Object)],uCg.prototype,"hideTimeSelector",void 0);
_.U([_.N(),_.V("design:type",Object)],uCg.prototype,"dateRange",void 0);_.U([_.N(),_.V("design:type",String)],uCg.prototype,"dateSelectorLabel",void 0);_.U([_.xi("field"),_.V("design:type",Function),_.V("design:paramtypes",[]),_.V("design:returntype",void 0)],uCg.prototype,"onFieldChange",null);
_.uj()(uCg,"ytcp-form-datetime",function(){if(tCg===void 0){var a=document.createElement("template");_.fg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-form-datetime--\x3e<ytcp-datetime-picker date-range="[[dateRange]]" date-selector-dropdown-label="[[dateSelectorLabel]]" disabled="[[disabled]]" hide-time-selector="[[hideTimeSelector]]" hide-timezone-trigger="[[hideTimezoneTrigger]]" model="[[datetimePickerModel]]" time-of-day-granularity="[[timeOfDayGranularity]]" on-model-change="onScheduledTimeChange" class="style-scope ytcp-form-datetime"></ytcp-datetime-picker>');tCg=
a}a=tCg;return a},{allowedProps:"dateRange disabled field hideTimeSelector hideTimezoneTrigger timeOfDayGranularity".split(" "),
mode:1});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
