"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.NTi=function(a){if(_.D("force_aadc_warning"))return"VIDEO_PRIVACY_PRIVATE";a=a&&a.privacyDefaults&&a.privacyDefaults.wasSet&&a.privacyDefaults.privacy||"VIDEO_PRIVACY_UNKNOWN";var b,c;return((b=_.fe("USER_SETTINGS",{}))==null?0:(c=b.creatorApp)==null?0:c.acknowledgedAadcUploadDefaultPrivacyOverride)||_.MTi?a:_.D("force_aadc_minor")?"VIDEO_PRIVACY_PRIVATE":(b=_.fe("CAN_MAKE_VIDEO_PUBLIC_WITHOUT_WARNING"))||b===void 0?a:"VIDEO_PRIVACY_PRIVATE"};
_.OTi=_.Oj(_.tHe,_.sk,_.Oj({mask:{settings:{uploadDefaults:{all:!0}}},responseType:void 0}),_.TJe,_.hcb);_.MTi=!1;
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
