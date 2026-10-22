"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var W5i;var qW=function(){var a=_.P.apply(this,arguments)||this;a.audioOnly=!1;a.videoDurationSec=0;a.showSettings=!1;a.lockToolbar=!1;a.isVerticalVideo=!1;a.showVolume=!0;return a};
_.G(qW,_.P);_.d=qW.prototype;_.d.loadWarholVideo=function(){this.videoSrcUrl&&this.videoDurationSec>0&&this.videoSource.loadVideo(this.videoDurationSec)};
_.d.pauseVideo=function(){this.videoPlayer.reqPause()};
_.d.seekTo=function(a){this.videoPlayer.reqSeek(a)};
_.d.reqPlay=function(){this.videoPlayer.reqPlay()};
_.d.reqPause=function(){this.videoPlayer.reqPause()};
_.d.reqSeek=function(a){this.videoPlayer.reqSeek(a)};
_.d.reqSetVolume=function(a){this.videoPlayer.reqSetVolume(a)};
_.d.reqSetMuted=function(a){this.videoPlayer.reqSetMuted(a)};
_.d.reqSkip=function(a){this.videoPlayer.reqSkip(a)};
qW.prototype.loadWarholVideo=qW.prototype.loadWarholVideo;_.U([_.zi("#video-source"),_.V("design:type",Object)],qW.prototype,"videoSource",void 0);_.U([_.zi("#video-player"),_.V("design:type",Object)],qW.prototype,"videoPlayer",void 0);_.U([_.N(),_.V("design:type",String)],qW.prototype,"videoSrcUrl",void 0);_.U([_.N(),_.V("design:type",Object)],qW.prototype,"audioOnly",void 0);_.U([_.N(),_.V("design:type",Object)],qW.prototype,"videoDurationSec",void 0);
_.U([_.N(),_.V("design:type",Array)],qW.prototype,"highlightList",void 0);_.U([_.N(),_.V("design:type",Number)],qW.prototype,"highlightedSegmentSec",void 0);_.U([_.N(),_.V("design:type",Object)],qW.prototype,"showSettings",void 0);_.U([_.N(),_.V("design:type",Number)],qW.prototype,"chunkDurationSec",void 0);_.U([_.N(),_.V("design:type",Object)],qW.prototype,"lockToolbar",void 0);_.U([_.N(),_.V("design:type",Object)],qW.prototype,"isVerticalVideo",void 0);
_.U([_.N(),_.V("design:type",Object)],qW.prototype,"showVolume",void 0);_.U([_.xi("videoDurationSec","videoSrcUrl"),_.V("design:type",Function),_.V("design:paramtypes",[]),_.V("design:returntype",void 0)],qW.prototype,"loadWarholVideo",null);
_.X5i=_.uj()(qW,"ytcp-warhol-video-player",function(){if(W5i===void 0){var a=document.createElement("template");_.fg(a,'\x3c!--css-build:shady--\x3e\x3c!--css_build_scope:ytcp-warhol-video-player--\x3e<ytcp-video-player id="video-player" audio-only="[[audioOnly]]" highlight-list="[[highlightList]]" highlighted-segment-sec="[[highlightedSegmentSec]]" is-vertical-video="[[isVerticalVideo]]" lock-toolbar="[[lockToolbar]]" show-settings="[[showSettings]]" show-volume="[[showVolume]]" video-duration-sec="[[videoDurationSec]]" video-src-url="[[videoSrcUrl]]" class="style-scope ytcp-warhol-video-player"><div slot="video-source" id="video-source-container" class="style-scope ytcp-warhol-video-player"><ytcp-warhol-video-source id="video-source" chunk-duration-sec="[[chunkDurationSec]]" video-src="[[videoSrcUrl]]" class="style-scope ytcp-warhol-video-player"></ytcp-warhol-video-source></div></ytcp-video-player>');W5i=
a}a=W5i;return a},{allowedProps:"chunkDurationSec highlightList isVerticalVideo lockToolbar showVolume videoDurationSec videoSrcUrl".split(" "),
mode:2,callbackProps:["onMetadataLoaded"]});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
