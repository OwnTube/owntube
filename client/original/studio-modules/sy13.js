"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var s3f,t3f,v3f;s3f=0;t3f=/tone[1-5]/;_.u3f=Number.MAX_SAFE_INTEGER;v3f=RegExp("\ufe0f","g");_.zH=function(a){this.skinTone=0;this.emojiSize=24;this.emojis=[];this.emojiMap={};this.emojiRegex=/$./;this.emojiShortcutMap={};this.pickerCustomEmojiIds=[];this.emojiShortcutCharMap={};this.hasInitializedShortcutCharMap=!1;a&&_.w3f(this,a)};
_.w3f=function(a,b){try{_.ssa(b,{context:a,onSuccess:function(e,g){Array.isArray(g)?a.load(g):(e=new _.ye("Emoji manager JSON response was not an array!",{response:g}),_.of(e))},
onError:function(e){e=new _.ye("Failed to retrieve emoji manager initial JSON data!",{url:b,statusCode:_.isa(e).toString()});_.rf(e)}})}catch(e){var c=new _.ye("Failed to parse unicode emoji JSON data! Error: {e.message}",{url:b});
_.rf(c)}};
_.zH.prototype.clear=function(){this.emojis=[];this.emojiMap={};this.emojiRegex=/$./;this.emojiShortcutMap={};this.emojiShortcutCharMap={};this.hasInitializedShortcutCharMap=!1};
_.zH.prototype.load=function(a,b){if(b)if(a.length)a=a.concat(b.emojis);else{this.emojis=b.emojis;this.emojiMap=b.emojiMap;this.emojiShortcutMap=b.emojiShortcutMap;this.emojiShortcutCharMap=_.x3f(b);this.hasInitializedShortcutCharMap=!0;this.emojiRegex=b.emojiRegex;return}this.emojis=[].concat(_.u(new Set(this.emojis.concat(a))));this.hasInitializedShortcutCharMap=!1;a=Array(this.emojis.length);for(b=0;b<this.emojis.length;b++){var c=this.emojis[b];if(c.emojiId){this.emojiMap[c.emojiId]=c;this.emojiMap[c.emojiId].index=
b;for(var e=0;c.shortcuts&&e<c.shortcuts.length;e++)this.emojiShortcutMap[c.shortcuts[e].toLocaleLowerCase()]=c;a[b]=c.isCustomEmoji&&c.shortcuts?c.shortcuts[0]:c.emojiId}}a.sort(function(g,k){return k.length-g.length});
if(a.length)try{this.emojiRegex=new RegExp(a.join("|").replace("*","\\*"),"gi")}catch(g){this.emojiRegex=/$./}else this.emojiRegex=/$./};
_.AH=function(a,b,c){return(a=a.emojiMap[b])&&(!a.isLocked||c!==void 0&&c)?a:void 0};
_.y3f=function(a,b,c){return(a=a.emojiShortcutMap[b.toLocaleLowerCase()])&&(!a.isLocked||c!==void 0&&c)?a:null};
_.x3f=function(a,b){b=b===void 0?!1:b;if(!a.hasInitializedShortcutCharMap){a.hasInitializedShortcutCharMap=!0;for(var c=0;c<a.emojis.length;c++){var e=a.emojis[c];if(!(e.isLocked||b&&e.isCustomEmoji&&e.emojiId&&!a.pickerCustomEmojiIds.includes(e.emojiId)))for(var g=0;e.shortcuts&&g<e.shortcuts.length;g++){var k=e.shortcuts[g];k.startsWith(":_")&&e.isCustomEmoji&&(a.emojiShortcutCharMap[":_"]==null&&(a.emojiShortcutCharMap[":_"]=Object.create(null)),a.emojiShortcutCharMap[":_"][k]=e);if(!(k.length<
3||!e.isCustomEmoji&&t3f.test(k))){var l=k.substr(0,3).toLocaleLowerCase();a.emojiShortcutCharMap[l]==null&&(a.emojiShortcutCharMap[l]=Object.create(null));a.emojiShortcutCharMap[l][k]=e}}}}return a.emojiShortcutCharMap};
_.zH.prototype.createEmoji=function(a,b){b=b===void 0?!0:b;var c=document.createElement("img");a.isCustomEmoji||c.classList.add("small-emoji");c.classList.add("emoji");c.classList.add("yt-formatted-string");c.src=a.image?_.qo(a.image.thumbnails,this.emojiSize)||"":"";var e=void 0;a.image&&a.image.accessibility&&a.image.accessibility.accessibilityData&&(e=a.image.accessibility.accessibilityData.label);c.alt=e?e:(a.isCustomEmoji&&a.shortcuts?a.shortcuts[0]:a.emojiId)||"";a.isCustomEmoji&&(c.dataset.emojiId=
a.emojiId);_.is&&(c.setAttribute("contenteditable","false"),c.setAttribute("unselectable","on"));b&&(a.shortcuts&&a.shortcuts.length&&c.setAttribute("shared-tooltip-text",a.shortcuts[0]),c.id="emoji-"+s3f++);return c};
_.zH.prototype.createDocumentFragment=function(a,b,c,e){b=b===void 0?!1:b;c=c===void 0?!0:c;e=e===void 0?!1:e;a=a.replace(v3f,"");for(var g=document.createDocumentFragment(),k=0,l,m=0;(l=this.emojiRegex.exec(a))!=null;){var p=_.AH(this,l[0])||_.y3f(this,l[0]);!p||p.isCustomEmoji&&!b||(p=this.createEmoji(p,c),k!==l.index&&g.appendChild(document.createTextNode(a.substring(k,l.index))),g.appendChild(p),k=l.index+l[0].length,m++)}if(!e||m)return g.appendChild(document.createTextNode(a.substr(k))),g};
_.BH=new _.zH;
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
