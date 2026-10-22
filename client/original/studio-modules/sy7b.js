"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.USi=function(a){if(_.D("force_aadc_warning"))return"VIDEO_PRIVACY_PRIVATE";a=a&&a.privacyDefaults&&a.privacyDefaults.wasSet&&a.privacyDefaults.privacy||"VIDEO_PRIVACY_UNKNOWN";var b,c;return((b=_.$d("USER_SETTINGS",{}))==null?0:(c=b.creatorApp)==null?0:c.acknowledgedAadcUploadDefaultPrivacyOverride)||_.TSi?a:_.D("force_aadc_minor")?"VIDEO_PRIVACY_PRIVATE":(b=_.$d("CAN_MAKE_VIDEO_PUBLIC_WITHOUT_WARNING"))||b===void 0?a:"VIDEO_PRIVACY_PRIVATE"};
_.VSi=_.Nj(_.PGe,_.pk,_.Nj({mask:{settings:{uploadDefaults:{all:!0}}},responseType:void 0}),_.oJe,_.Xbb);_.TSi=!1;
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
