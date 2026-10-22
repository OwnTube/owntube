"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var Gvg,Ivg,Jvg,Kvg,Lvg,Mvg,Nvg,Ovg,Pvg,Qvg,Rvg,Svg,Tvg;_.Dvg=function(a,b,c,e){b=_.Bg(b,function(g){var k=_.BEb(a[g],c);return k&&_.sl(k,function(l){return e(l,g)})});
return _.wg(b,function(g,k){return!!k})};
_.Evg=function(){return"Total views"};
_.Fvg=function(){return"Subscribers"};
Gvg=function(){return"Your content"};
_.Hvg=function(){return"This number may freeze or fluctuate, especially for newly uploaded videos.\n  An arrow next to the number indicates rapidly rising viewership."};
Ivg=function(a){switch(a){case "PENDING":return"COMPLAINT_DECISION_FILTER_PENDING";case "APPROVED":return"COMPLAINT_DECISION_FILTER_APPROVED";case "REJECTED":return"COMPLAINT_DECISION_FILTER_REJECTED";default:_.pa(a,"Unhandled decision: "+a)}};
Jvg=function(a){var b=a.channelId,c=a.contentOwnerId;var e=a.filters;if(e&&e.length!==0){a={};e=_.f(e);var g=e.next();try{for(;!g.done;g=e.next()){var k=g.value;var l=k.name;switch(l){case "VIDEO_ID":a.reuploadVideoIdIs=_.Zp(k.value.value);break;case "ASSET_ID":a.originalReconciledAssetIdIs=_.Zp(k.value.value);break;case "DECISION":a.complaintDecisionIn=k.value.map(Ivg);break;default:_.Uaa(l,"Unhandled filter: "+JSON.stringify(k))}}}finally{_.h(e,g)}k=a}else k=void 0;return{channelId:b,contentOwnerId:c,
filter:k}};
Kvg=function(a,b,c){return _.jA(b,c.firstComplaintIndex,c.pageSize,function(e){return _.Dvg(a.complaintVideosById,e,_.A9a,function(g){return g})})};
Lvg=function(a,b,c){b=Kvg(a,b,c);if(!_.ol(b))return[];a=new Set;b=_.f(b.data.items);c=b.next();try{for(;!c.done;c=b.next()){var e=void 0,g=(e=c.value.reuploadData)==null?void 0:e.channelId;g&&a.add(g)}}finally{_.h(b,c)}return Array.from(a)};
Mvg=function(a,b,c){b=Kvg(a,b,c);if(!_.ol(b))return[];a=new Set;b=_.f(b.data.items);c=b.next();try{for(;!c.done;c=b.next()){var e=c.value,g=void 0;if((g=e.complaintIssue)==null?0:g.videoId)g=void 0,a.add((g=e.complaintIssue)==null?void 0:g.videoId)}}finally{_.h(b,c)}return Array.from(a)};
Nvg=function(a,b,c){b=Kvg(a,b,c);if(!_.ol(b))return[];a=[];b=_.f(b.data.items);c=b.next();try{for(;!c.done;c=b.next()){var e=c.value,g=void 0;e.videoId&&((g=e.complaintIssue)==null?0:g.infringingAudioTrackId)&&a.push({videoId:e.videoId,audioTrackId:e.complaintIssue.infringingAudioTrackId})}}finally{_.h(b,c)}return a};
Ovg=function(a,b,c){_.Tl(a.fetch(c,{freshnessRequirement:"CACHED_DATA"}))};
Pvg=function(a){return a.claimId};
Qvg=function(a,b){b.context=a.baseContextFactory();a=a.copyrightApi;return _.Gy(a.$apiClient,{body:b,httpMethod:"POST",methodId:"youtubei.copyright.list_complaint_videos",path:"/"+a.gapiVersion+"/copyright/list_complaint_videos"})};
Rvg=function(a,b){b.context=a.baseContextFactory();a=a.copyrightApi;return _.Gy(a.$apiClient,{body:b,httpMethod:"POST",methodId:"youtubei.copyright.get_creator_received_claim_matches",path:"/"+a.gapiVersion+"/copyright/get_creator_received_claim_matches"})};
Svg=function(a,b){return{type:"FETCH_COMPLAINT_VIDEOS_ERROR",payload:{key:a,mask:b}}};
Tvg=function(a,b,c,e){var g={},k,l;if(((k=c.baseEntities)==null?0:k.reuploadVideoEntities)||((l=c.baseEntities)==null?0:l.originalVideoEntities)){var m,p,r,t;g=_.ll([{entities:(m=c.baseEntities.reuploadVideoEntities)!=null?m:[],mask:(p=e.reuploadVideoMask)!=null?p:_.hq},{entities:(r=c.baseEntities.originalVideoEntities)!=null?r:[],mask:(t=e.originalVideoMask)!=null?t:_.hq}],function(z){return z.videoId})}k={};
var v;if((v=c.baseEntities)==null?0:v.channelEntities)k=_.ml(e.reuploadChannelMask||_.hq,c.baseEntities.channelEntities,function(z){return z.channelId});
var w,x;v=_.Cg((x=(w=c.baseEntities)==null?void 0:w.videoPublicAudioTrackEntities)!=null?x:[],function(z){return z.externalVideoId});
return{type:"FETCH_COMPLAINT_VIDEOS_SUCCESS",payload:{key:a,request:b,response:c,mask:e},meta:_.Ej("END",{"#CreatorVideoData":g,"#CreatorChannelData":k,"#VideoPublicAudioTracks":v})}};var Uvg=[_.bm("Videos and channels that use your content.",{bold:!0})],Vvg=[_.bm("Content found in matching videos.",{bold:!0})],Wvg=[_.bm("Asset found in matching videos.",{bold:!0})],Xvg=[_.bm("This shows how many times real viewers have watched the matching video.",{bold:!0}),_.bm(_.Hvg())],Yvg=[_.bm("Number of subscribers for the channel that used your content.",{bold:!0})],Zvg=[_.bm("This shows the date when the matching video was published or uploaded.",{bold:!0})],$vg=[_.bm("This shows the amount of matching content.",
{bold:!0}),_.bm("This shows how much of their video contains your content. If it is 100%, it\u2019s an exact match.")],awg,bwg;_.bm("This shows what you can do.",{bold:!0});_.bm("You can take action in 3 different ways: ask YouTube to remove the video,\n  contact the other channel, or monitor the situation but take no action.");awg=[_.bm("This shows when the match was archived.",{bold:!0}),_.bm("You still have the option of contacting the other channel or requesting\n  video removal, if you have not already.")];
bwg=[_.bm("This shows when you first sent a message to the other channel.",{bold:!0}),_.bm("You can continue the conversation by email.")];_.cwg={};
_.dwg={selection:{cssClass:"tablecell-selection",isSelectionCheckbox:!0},theirVideo:{headerName:"Matching videos",headerTooltipParagraphs:Uvg,cssClass:"tablecell-reupload"},views:{headerName:_.Evg(),cssClass:"tablecell-views",sortOrders:["DESCENDING","ASCENDING"],headerTooltipParagraphs:Xvg,rightAlignHeader:!0},subscribers:{headerName:_.Fvg(),cssClass:"tablecell-subscribers",sortOrders:["DESCENDING"],headerTooltipParagraphs:Yvg,rightAlignHeader:!0},date:{headerName:"Date",cssClass:"tablecell-date",
sortOrders:["DESCENDING","ASCENDING"],headerTooltipParagraphs:Zvg},type:{headerName:"% match",headerTooltipParagraphs:$vg},yourContent:{headerName:Gvg(),headerTooltipParagraphs:Vvg},yourAsset:{headerName:"Your asset",headerTooltipParagraphs:Wvg},expander:_.cwg};
_.ewg={theirVideo:{headerName:"Matching videos",headerTooltipParagraphs:Uvg,cssClass:"tablecell-reupload"},views:{headerName:_.Evg(),cssClass:"tablecell-views",headerTooltipParagraphs:Xvg,rightAlignHeader:!0},yourContent:{headerName:Gvg(),headerTooltipParagraphs:Vvg},yourAsset:{headerName:"Your asset",headerTooltipParagraphs:Wvg},date:{headerName:"Archived",cssClass:"tablecell-date",headerTooltipParagraphs:awg,sortOrders:["DESCENDING"]},type:{headerName:"% match",headerTooltipParagraphs:$vg},actions:{cssClass:"tablecell-actions"}};
_.fwg={theirVideo:{headerName:"Matching videos",headerTooltipParagraphs:Uvg,cssClass:"tablecell-reupload"},date:{headerName:"Sent",cssClass:"tablecell-date",headerTooltipParagraphs:bwg,sortOrders:["DESCENDING"]},views:{headerName:_.Evg(),cssClass:"tablecell-views",headerTooltipParagraphs:Xvg,rightAlignHeader:!0},yourContent:{headerName:Gvg(),headerTooltipParagraphs:Vvg},type:{headerName:"% match",headerTooltipParagraphs:$vg},actions:{cssClass:"tablecell-actions"}};_.Rj(_.lHe);_.dJ={cancelButton:function(){return"Cancel"},
copyEmailAddress:function(){return"Copy address"},
deleteForeverButton:function(){return"Delete forever"},
sendFeedback:function(){return"Send feedback"},
closeButton:function(){return"Close"},
tryAgainButton:function(){return"Try again"},
done:function(){return"Done"},
continueButton:function(){return"Continue"},
saveButton:function(){return"Save"},
returnToUpload:function(){return"Return to upload"},
confirm:function(){return"Confirm"},
verifyButton:function(){return"Verify"},
activateLicenseButton:function(){return"Add license"},
startNow:function(){return"Start now"},
help:function(){return"Help"},
learnMore:function(){return"Learn more"},
seeHowItWorks:function(){return"See how it works"},
deleteVideoForever:function(){return"Delete video forever"},
optional:function(){return"optional"},
deletedVideoTitle:function(){return"You deleted this video"},
videoUnavailable:function(){return"Video is unavailable"},
pleaseTryAgain:function(){return"Please try again."},
requiredLabel:function(a){return String(a.label)+" (required)"},
signatureLabel:function(){return"Signature"},
signatureInvalidTooltip:function(){return"Signature must match your full legal name"},
email:function(){return"Email"},
fullLegalName:function(){return"Full legal name"},
signatureNote:function(){return"Enter your full legal name (usually a first and last name), not a company or channel name."},
phoneLabel:function(){return"Phone"},
phoneTooltip:function(){return"Phone number in the international format, for example +1 555 555-5555"},
countryLabel:function(){return"Country"},
streetLabel:function(){return"Street address"},
cityLabel:function(){return"City"},
stateLabel:function(){return"State or province"},
zipLabel:function(){return"Zip code"},
dropdownPlaceholder:function(){return"Select"},
collapseButtonLabel:function(){return"Collapse"},
expandButtonLabel:function(){return"Expand"},
issueTypeVideo:function(){return"Video"},
issueTypeLogo:function(){return"Logo or brand identity"},
issueTypeCopyrightedLogo:function(){return"Copyrighted logo"},
issueTypeSoftware:function(){return"Software"},
issueTypeOriginalSong:function(){return"Original song"},
issueTypeAudio:function(){return"Audio"},
issueTypeArtwork:function(){return"Artwork"},
issueTypePerformance:function(){return"Live performance"},
issueTypeWrittenWork:function(){return"Written work"},
issueTypePerformingArts:function(){return"Performing arts"},
issueTypeNonMusicalAudio:function(){return"Non-musical audio"},
typeCharacter:function(){return"Character"},
otherType:function(){return"Other"},
issueTypeVideoInternet:function(){return"Internet video"},
issueTypeVideoMovie:function(){return"Movie"},
issueTypeVideoSportsBroadcast:function(){return"Sports broadcast"},
issueTypeVideoTvEpisode:function(){return"TV episode"},
issueTypeVideoLiveStream:function(){return"Live stream"},
issueTypeVideoOther:function(){return"Other type of video"},
issueTypeArtworkPainting:function(){return"Painting/Drawing"},
issueTypeArtworkPhoto:function(){return"Photo"},
issueTypeArtworkFilm:function(){return"Film"},
issueTypeArtworkComicBook:function(){return"Comic book"},
issueTypeArtwork3DModel:function(){return"3D model"},
issueTypeArtworkCopyrightedLogo:function(){return"Copyrighted logo"},
issueTypeLivePerformanceChoreography:function(){return"Choreography"},
issueTypeLivePerformanceMusic:function(){return"Music"},
issueTypeLivePerformanceTheatricalWork:function(){return"Theatrical work"},
issueTypePerformingArtsChoreography:function(){return"Choreography"},
issueTypePerformingArtsTheatricalWork:function(){return"Theatrical work"},
issueTypePerformingArtsScriptedSpeech:function(){return"Scripted speech"},
issueTypeWrittenWorkBook:function(){return"Book"},
issueTypeWrittenWorkArticle:function(){return"Article"},
issueTypeWrittenWorkPoem:function(){return"Poem"},
issueTypeSoftwareVideoGame:function(){return"Video game"},
issueTypeSoftwareWebsite:function(){return"Website"},
issueTypeSoftwareEnterprise:function(){return"Creation or Enterprise software"},
issueTypeSoftwareSourceCode:function(){return"Source code"},
issueTypeNonMusicalAudioPodcast:function(){return"Podcast or Talk Radio"},
issueTypeNonMusicalAudioAudiobook:function(){return"Audiobook"},
issueTypeOriginalSongSoundRecording:function(){return"Sound recording"},
issueTypeOriginalSongComposition:function(){return"Composition"},
issueTypeOriginalSongSoundRecordingAndComposition:function(){return"Sound recording and composition"},
ytVideoLabel:function(){return"Video (YouTube video)"},
externalVideoLabel:function(){return"Video (not from YouTube)"},
ytVideoSource:function(){return"from YouTube"},
externalVideoSource:function(){return"not from YouTube"},
issueTypeVideoWithSubtypeAndSource:function(a){return"Video ("+String(a.typeOfVideo)+") - "+String(a.sourceOfVideo)},
issueTypeVideoWithSource:function(a){return"Video - "+String(a.sourceOfVideo)},
artworkWithSubtype:function(a){return"Artwork ("+String(a.typeOfArtwork)+")"},
livePerformanceWithSubtype:function(a){return"Live performance ("+String(a.typeOfArtwork)+")"},
issueTypeSoftwareWithSubtype:function(a){return"Software ("+String(a.typeOfSoftware)+")"},
issueTypeOriginalSongWithSubtype:function(a){return"Original song ("+String(a.typeOfOriginalSong)+")"},
issueTypeWrittenWorkWithSubtype:function(a){return"Written work ("+String(a.typeOfWrittenWork)+")"},
issueTypePerformingArtsWithSubtype:function(a){return"Performing arts ("+String(a.typeOfPerformingArts)+")"},
issueTypeNonMusicalAudioWithSubtype:function(a){return"Non-musical audio ("+String(a.typeOfNonMusicalAudio)+")"},
informationOnRequest:function(){return"Info available on request"},
takedownContactInstructions:function(a){return"For more information about this removal request, email "+String(a.email)+"."},
editMsg:function(){return"Edit"},
statusIneligible:function(){return"Ineligible"},
selectAnOptionError:function(){return"Please select an option"},
exceedsMaxLength:function(){return"The text entered exceeds the maximum length"}};var gwg,hwg,iwg,jwg,kwg,lwg,mwg,nwg,owg,pwg;gwg=_.Rj(_.nm,_.lm);hwg=_.Nj(_.fA,_.wr,_.gA,_.hA);iwg={reuploadChannelMask:hwg.mask,originalVideoMask:gwg.mask};jwg=[_.bm("This shows the type of content for which you\u2019ve made a removal request.",{bold:!0})];kwg=[_.bm("This shows the type of request, scheduled or standard, you believe was copied.",{bold:!0})];lwg=[_.bm("This shows when you requested the removal of the targeted video.",{bold:!0})];
mwg=[_.bm("This shows the current state of your removal request.",{bold:!0})];nwg=[_.bm("This shows if YouTube is searching for videos that match your removal request.",{bold:!0}),_.bm("When the status here is active, YouTube is searching for other videos that match your removal\n  request. You can view these in the Matches tab.")];owg=[_.bm("This shows if YouTube is preventing others from uploading videos that are copies of your\n  removal request.",{bold:!0}),_.bm("When the status is active, YouTube is preventing others from uploading videos that are copies\n  of your removal request.")];
pwg={};
_.qwg={"issue-type":{headerName:"Type",headerTooltipParagraphs:jwg},"their-video":{headerName:"Title",headerTooltipParagraphs:Uvg,cssClass:"tablecell-reupload"},"video-player":pwg,"your-content":{headerName:Gvg(),headerTooltipParagraphs:Vvg},"your-asset":{headerName:"Your asset",headerTooltipParagraphs:Wvg},"request-type":{headerName:"Request type",headerTooltipParagraphs:kwg},"submit-date":{headerName:"Request submitted",headerTooltipParagraphs:lwg,sortOrders:["DESCENDING"]},"request-status":{headerName:"Request status",headerTooltipParagraphs:mwg},
"find-matches-status":{headerName:"Find matches",headerTooltipParagraphs:nwg},"exact-copy-status":{headerName:"Automatically prevented",headerTooltipParagraphs:owg},expander:pwg,details:pwg,"takedown-buttons":pwg};var swg;
_.rwg=new Map([["TAKEDOWN_ISSUE_TYPE_VIDEO","av:videocam"],["TAKEDOWN_ISSUE_TYPE_VIDEO_INTERNET_VIDEO","av:videocam"],["TAKEDOWN_ISSUE_TYPE_VIDEO_MOVIE","av:videocam"],["TAKEDOWN_ISSUE_TYPE_VIDEO_SPORTS_BROADCAST","av:videocam"],["TAKEDOWN_ISSUE_TYPE_VIDEO_TV_EPISODE","av:videocam"],["TAKEDOWN_ISSUE_TYPE_VIDEO_LIVE_STREAM","av:videocam"],["TAKEDOWN_ISSUE_TYPE_VIDEO_OTHER","av:videocam"],["TAKEDOWN_ISSUE_TYPE_CONTENT_ID_VIDEO","av:videocam"],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG","image:music-note"],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_SOUND_RECORDING",
"image:music-note"],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_COMPOSITION","image:music-note"],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_SOUND_RECORDING_AND_COMPOSITION","image:music-note"],["TAKEDOWN_ISSUE_TYPE_CONTENT_ID_SONG","image:music-note"],["TAKEDOWN_ISSUE_TYPE_SOFTWARE","yt-studio-system-icons:browser"],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_VIDEO_GAME","yt-studio-system-icons:browser"],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_WEBSITE","yt-studio-system-icons:browser"],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_ENTERPRISE","yt-studio-system-icons:browser"],
["TAKEDOWN_ISSUE_TYPE_SOFTWARE_SOURCE_CODE","yt-studio-system-icons:browser"],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_OTHER","yt-studio-system-icons:browser"],["TAKEDOWN_ISSUE_TYPE_ARTWORK","yt-studio-icons:hallway"],["TAKEDOWN_ISSUE_TYPE_ARTWORK_PAINTING","yt-studio-icons:hallway"],["TAKEDOWN_ISSUE_TYPE_ARTWORK_PHOTO","yt-studio-icons:hallway"],["TAKEDOWN_ISSUE_TYPE_ARTWORK_COMIC_BOOK","yt-studio-icons:hallway"],["TAKEDOWN_ISSUE_TYPE_ARTWORK_3D_MODEL","yt-studio-icons:hallway"],["TAKEDOWN_ISSUE_TYPE_ARTWORK_COPYRIGHTED_LOGO",
"yt-studio-icons:hallway"],["TAKEDOWN_ISSUE_TYPE_ARTWORK_OTHER","yt-studio-icons:hallway"],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS","yt-studio-system-icons:spotlight"],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_CHOREOGRAPHY","yt-studio-system-icons:spotlight"],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_THEATRICAL_WORK","yt-studio-system-icons:spotlight"],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_SCRIPTED_SPEECH","yt-studio-system-icons:spotlight"],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_OTHER","yt-studio-system-icons:spotlight"],
["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK","yt-studio-system-icons:article"],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_BOOK","yt-studio-system-icons:article"],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_ARTICLE","yt-studio-system-icons:article"],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_POEM","yt-studio-system-icons:article"],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_OTHER","yt-studio-system-icons:article"],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO","yt-studio-system-icons:audio_book"],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_AUDIOBOOK",
"yt-studio-system-icons:audio_book"],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_PODCAST","yt-studio-system-icons:audio_book"],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_OTHER","yt-studio-system-icons:audio_book"],["TAKEDOWN_ISSUE_TYPE_CONTENT_ID_CHARACTER","yt-studio-icons:theater_comedy"],["TAKEDOWN_ISSUE_TYPE_OTHER","icons:help"],["TAKEDOWN_ISSUE_TYPE_UNKNOWN","icons:help"]]);swg=(0,_.dJ.issueTypeArtwork)();
_.twg=new Map([["TAKEDOWN_ISSUE_TYPE_VIDEO",(0,_.dJ.issueTypeVideo)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_INTERNET_VIDEO",(0,_.dJ.issueTypeVideo)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_MOVIE",(0,_.dJ.issueTypeVideo)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_SPORTS_BROADCAST",(0,_.dJ.issueTypeVideo)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_TV_EPISODE",(0,_.dJ.issueTypeVideo)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_LIVE_STREAM",(0,_.dJ.issueTypeVideo)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_OTHER",(0,_.dJ.issueTypeVideo)()],["TAKEDOWN_ISSUE_TYPE_CONTENT_ID_VIDEO",
(0,_.dJ.issueTypeVideo)()],["TAKEDOWN_ISSUE_TYPE_SOFTWARE",(0,_.dJ.issueTypeSoftware)()],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_VIDEO_GAME",(0,_.dJ.issueTypeSoftware)()],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_WEBSITE",(0,_.dJ.issueTypeSoftware)()],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_ENTERPRISE",(0,_.dJ.issueTypeSoftware)()],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_SOURCE_CODE",(0,_.dJ.issueTypeSoftware)()],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_OTHER",(0,_.dJ.issueTypeSoftware)()],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG",(0,_.dJ.issueTypeOriginalSong)()],
["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_SOUND_RECORDING",(0,_.dJ.issueTypeOriginalSong)()],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_COMPOSITION",(0,_.dJ.issueTypeOriginalSong)()],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_SOUND_RECORDING_AND_COMPOSITION",(0,_.dJ.issueTypeOriginalSong)()],["TAKEDOWN_ISSUE_TYPE_CONTENT_ID_SONG",(0,_.dJ.issueTypeAudio)()],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS",(0,_.dJ.issueTypePerformingArts)()],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_CHOREOGRAPHY",(0,_.dJ.issueTypePerformingArts)()],
["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_THEATRICAL_WORK",(0,_.dJ.issueTypePerformingArts)()],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_SCRIPTED_SPEECH",(0,_.dJ.issueTypePerformingArts)()],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_OTHER",(0,_.dJ.issueTypePerformingArts)()],["TAKEDOWN_ISSUE_TYPE_ARTWORK",swg],["TAKEDOWN_ISSUE_TYPE_ARTWORK_PAINTING",swg],["TAKEDOWN_ISSUE_TYPE_ARTWORK_PHOTO",swg],["TAKEDOWN_ISSUE_TYPE_ARTWORK_COMIC_BOOK",swg],["TAKEDOWN_ISSUE_TYPE_ARTWORK_3D_MODEL",swg],["TAKEDOWN_ISSUE_TYPE_ARTWORK_COPYRIGHTED_LOGO",
swg],["TAKEDOWN_ISSUE_TYPE_ARTWORK_OTHER",swg],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK",(0,_.dJ.issueTypeWrittenWork)()],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_BOOK",(0,_.dJ.issueTypeWrittenWork)()],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_ARTICLE",(0,_.dJ.issueTypeWrittenWork)()],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_POEM",(0,_.dJ.issueTypeWrittenWork)()],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_OTHER",(0,_.dJ.issueTypeWrittenWork)()],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO",(0,_.dJ.issueTypeNonMusicalAudio)()],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_AUDIOBOOK",
(0,_.dJ.issueTypeNonMusicalAudio)()],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_PODCAST",(0,_.dJ.issueTypeNonMusicalAudio)()],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_OTHER",(0,_.dJ.issueTypeNonMusicalAudio)()],["TAKEDOWN_ISSUE_TYPE_CONTENT_ID_CHARACTER",(0,_.dJ.typeCharacter)()],["TAKEDOWN_ISSUE_TYPE_OTHER",(0,_.dJ.otherType)()],["TAKEDOWN_ISSUE_TYPE_UNKNOWN",(0,_.dJ.otherType)()]]);
_.uwg=new Map([["TAKEDOWN_ISSUE_TYPE_VIDEO_INTERNET_VIDEO",(0,_.dJ.issueTypeVideoInternet)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_MOVIE",(0,_.dJ.issueTypeVideoMovie)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_SPORTS_BROADCAST",(0,_.dJ.issueTypeVideoSportsBroadcast)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_TV_EPISODE",(0,_.dJ.issueTypeVideoTvEpisode)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_LIVE_STREAM",(0,_.dJ.issueTypeVideoLiveStream)()],["TAKEDOWN_ISSUE_TYPE_VIDEO_OTHER",(0,_.dJ.issueTypeVideoOther)()]]);
_.vwg=new Map([["ISSUE_CONTENT_SOURCE_YOUTUBE_VIDEO",(0,_.dJ.ytVideoSource)()],["ISSUE_CONTENT_SOURCE_YOUTUBE_VIDEO_NOT_OWNED",(0,_.dJ.ytVideoSource)()],["ISSUE_CONTENT_SOURCE_EXTERNAL_VIDEO",(0,_.dJ.externalVideoSource)()]]);
_.wwg=new Map([["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG",(0,_.dJ.issueTypeOriginalSong)()],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_SOUND_RECORDING",(0,_.dJ.issueTypeOriginalSongWithSubtype)({typeOfOriginalSong:(0,_.dJ.issueTypeOriginalSongSoundRecording)()})],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_COMPOSITION",(0,_.dJ.issueTypeOriginalSongWithSubtype)({typeOfOriginalSong:(0,_.dJ.issueTypeOriginalSongComposition)()})],["TAKEDOWN_ISSUE_TYPE_ORIGINAL_SONG_SOUND_RECORDING_AND_COMPOSITION",(0,_.dJ.issueTypeOriginalSongWithSubtype)({typeOfOriginalSong:(0,_.dJ.issueTypeOriginalSongSoundRecordingAndComposition)()})],
["TAKEDOWN_ISSUE_TYPE_SOFTWARE",(0,_.dJ.issueTypeSoftware)()],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_VIDEO_GAME",(0,_.dJ.issueTypeSoftwareWithSubtype)({typeOfSoftware:(0,_.dJ.issueTypeSoftwareVideoGame)()})],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_WEBSITE",(0,_.dJ.issueTypeSoftwareWithSubtype)({typeOfSoftware:(0,_.dJ.issueTypeSoftwareWebsite)()})],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_ENTERPRISE",(0,_.dJ.issueTypeSoftwareWithSubtype)({typeOfSoftware:(0,_.dJ.issueTypeSoftwareEnterprise)()})],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_SOURCE_CODE",
(0,_.dJ.issueTypeSoftwareWithSubtype)({typeOfSoftware:(0,_.dJ.issueTypeSoftwareSourceCode)()})],["TAKEDOWN_ISSUE_TYPE_SOFTWARE_OTHER",(0,_.dJ.issueTypeSoftwareWithSubtype)({typeOfSoftware:(0,_.dJ.otherType)()})],["TAKEDOWN_ISSUE_TYPE_ARTWORK",(0,_.dJ.issueTypeArtwork)()],["TAKEDOWN_ISSUE_TYPE_ARTWORK_PAINTING",(0,_.dJ.artworkWithSubtype)({typeOfArtwork:(0,_.dJ.issueTypeArtworkPainting)()})],["TAKEDOWN_ISSUE_TYPE_ARTWORK_PHOTO",(0,_.dJ.artworkWithSubtype)({typeOfArtwork:(0,_.dJ.issueTypeArtworkPhoto)()})],
["TAKEDOWN_ISSUE_TYPE_ARTWORK_COMIC_BOOK",(0,_.dJ.artworkWithSubtype)({typeOfArtwork:(0,_.dJ.issueTypeArtworkComicBook)()})],["TAKEDOWN_ISSUE_TYPE_ARTWORK_3D_MODEL",(0,_.dJ.artworkWithSubtype)({typeOfArtwork:(0,_.dJ.issueTypeArtwork3DModel)()})],["TAKEDOWN_ISSUE_TYPE_ARTWORK_COPYRIGHTED_LOGO",(0,_.dJ.artworkWithSubtype)({typeOfArtwork:(0,_.dJ.issueTypeCopyrightedLogo)()})],["TAKEDOWN_ISSUE_TYPE_ARTWORK_OTHER",(0,_.dJ.artworkWithSubtype)({typeOfArtwork:(0,_.dJ.otherType)()})],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS",
(0,_.dJ.issueTypePerformingArts)()],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_CHOREOGRAPHY",(0,_.dJ.issueTypePerformingArtsWithSubtype)({typeOfPerformingArts:(0,_.dJ.issueTypePerformingArtsChoreography)()})],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_THEATRICAL_WORK",(0,_.dJ.issueTypePerformingArtsWithSubtype)({typeOfPerformingArts:(0,_.dJ.issueTypePerformingArtsTheatricalWork)()})],["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_SCRIPTED_SPEECH",(0,_.dJ.issueTypePerformingArtsWithSubtype)({typeOfPerformingArts:(0,_.dJ.issueTypePerformingArtsScriptedSpeech)()})],
["TAKEDOWN_ISSUE_TYPE_PERFORMING_ARTS_OTHER",(0,_.dJ.issueTypePerformingArtsWithSubtype)({typeOfPerformingArts:(0,_.dJ.otherType)()})],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK",(0,_.dJ.issueTypeWrittenWork)()],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_BOOK",(0,_.dJ.issueTypeWrittenWorkWithSubtype)({typeOfWrittenWork:(0,_.dJ.issueTypeWrittenWorkBook)()})],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_ARTICLE",(0,_.dJ.issueTypeWrittenWorkWithSubtype)({typeOfWrittenWork:(0,_.dJ.issueTypeWrittenWorkArticle)()})],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_POEM",
(0,_.dJ.issueTypeWrittenWorkWithSubtype)({typeOfWrittenWork:(0,_.dJ.issueTypeWrittenWorkPoem)()})],["TAKEDOWN_ISSUE_TYPE_WRITTEN_WORK_OTHER",(0,_.dJ.issueTypeWrittenWorkWithSubtype)({typeOfWrittenWork:(0,_.dJ.otherType)()})],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO",(0,_.dJ.issueTypeNonMusicalAudio)()],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_AUDIOBOOK",(0,_.dJ.issueTypeNonMusicalAudioWithSubtype)({typeOfNonMusicalAudio:(0,_.dJ.issueTypeNonMusicalAudioAudiobook)()})],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_PODCAST",
(0,_.dJ.issueTypeNonMusicalAudioWithSubtype)({typeOfNonMusicalAudio:(0,_.dJ.issueTypeNonMusicalAudioPodcast)()})],["TAKEDOWN_ISSUE_TYPE_NON_MUSICAL_AUDIO_OTHER",(0,_.dJ.issueTypeNonMusicalAudioWithSubtype)({typeOfNonMusicalAudio:(0,_.dJ.otherType)()})],["TAKEDOWN_ISSUE_TYPE_OTHER",(0,_.dJ.otherType)()]]);_.xwg=function(a,b,c){_.GB.call(this,"#VideoPublicAudioTracks",a,b);this.audioTracksService=c};
_.G(_.xwg,_.GB);
_.xwg.prototype.fetchData=function(a){var b=this,c,e,g,k,l,m,p,r,t;return _.n(function(v){if(v.nextAddress==1){c={externalVideoIds:a};var w=v.yield,x=b.audioTracksService;var z=c;z=Object.assign({},z,{context:x.baseContextFactory()});x=x.creatorApi;z=_.Gy(x.$apiClient,{body:z,httpMethod:"POST",methodId:"youtubei.creator.list_public_audio_tracks",path:"/"+x.gapiVersion+"/creator/list_public_audio_tracks"});return w.call(v,z,2)}e=v.yieldResult;k=_.QNa((g=e.videoPublicAudioTracks)!=null?g:[]);l=_.f(a);
m=l.next();try{for(;!m.done;m=l.next())p=m.value,t=r=void 0,(r=k)[t=p]!=null||(r[t]={})}finally{_.h(l,m)}return v.return(k)})};
_.Di([_.Ci(_.xwg,[_.sj,_.Xz,_.mgc])]);_.ywg=function(a,b,c,e,g){this.dispatch=a;this.videoDictFetcher=b;this.channelDictFetcher=c;this.publicAudioTracksFetcher=e;this.copyrightService=g};
_.ywg.prototype.get=function(a,b){if(a){var c=_.hj(Jvg(b)),e=a.complaintVideoIdsByRequest[c];if(e){c=Kvg(a,e,b);var g=Lvg(a,e,b),k=Mvg(a,e,b);b=Nvg(a,e,b);if(!_.ol(c))return c;e=_.f(c.data.items);var l=e.next();try{for(;!l.done;l=e.next()){var m=l.value,p=void 0;if(!m.videoId||(p=m.complaint)==null||!p.complaintId)return _.ki(Error("UA")),_.rl()}}finally{_.h(e,l)}if(m=k.length>0?this.videoDictFetcher.get(a,k,gwg):void 0){if(_.zg(m).some(_.pl))return _.ul;if(_.Eg(m)!==k.length)return}k=this.channelDictFetcher.get(a,
g,hwg);if(_.zg(k).some(_.pl))return _.ul;if(_.Eg(k)===g.length){var r=_.xl(k),t=m?_.xl(m):void 0;if(b.length>0){var v=b.map(function(C){return C.videoId});
v=this.publicAudioTracksFetcher.get(a,v);if(_.zg(v).some(_.pl))return _.ul;if(_.Eg(v)!==b.length)return;v=_.xl(v)}var w={};a=_.f(b);g=a.next();try{for(b={};!g.done;b={audioTrackId$jscomp$2:void 0},g=a.next()){var x=g.value,z=x.videoId;b.audioTrackId$jscomp$2=x.audioTrackId;e=m=k=void 0;var A=((e=(m=(k=v)==null?void 0:k.data[z])==null?void 0:m.additionalTracks)!=null?e:[]).find(function(C){return function(E){return(E==null?void 0:E.audioTrackId)===C.audioTrackId$jscomp$2}}(b));
A?w[z]=A:_.ki(Error("VA`"+b.audioTrackId$jscomp$2+"`"+z))}}finally{_.h(a,g)}x=c.data.items.map(function(C){var E,F=(E=C.reuploadData)==null?void 0:E.channelId;var H=(E=(H=C.complaintIssue)==null?void 0:H.videoId)&&(t==null?0:t.data[E])?t.data[E]:void 0;return{originalVideo:H,reuploadChannel:F?r.data[F]:void 0,complaint:C,infringingAudioTrack:C.videoId?w[C.videoId]:void 0}});
return _.ql(Object.assign({},c.data,{items:x}))}}}};
_.ywg.prototype.fetch=function(a,b){var c=this,e,g,k,l,m,p,r,t,v,w,x,z,A,C;return _.n(function(E){if(E.nextAddress==1){if(!a)return E.return();e=_.hj(Jvg(b));g=a.complaintVideoIdsByRequest[e];k=_.Bl(g,b.firstComplaintIndex,b.pageSize);if(!k){if(!g)return _.ki(Error("WA")),E.return();l=Lvg(a,g,b);m=Mvg(a,g,b);p=Nvg(a,g,b);_.Tl(c.channelDictFetcher.fetch(l,hwg,{freshnessRequirement:"CACHED_DATA"}));_.Tl(c.videoDictFetcher.fetch(m,gwg,{freshnessRequirement:"CACHED_DATA"}));Ovg(c.publicAudioTracksFetcher,
a,p.map(function(F){return F.videoId}));
return E.return()}v=(t=(r=a.copyrightEntityState)==null?void 0:r.latestCopyrightComplaintUpdateTime)!=null?t:0;w=Date.now()-v<_.R2e;z=Object.assign({},Jvg(b),{pageInfo:{pageSize:k,pageToken:(x=g)==null?void 0:x.continuationToken},baseEntitiesMask:iwg,criticalRead:w});c.dispatch({type:"FETCH_COMPLAINT_VIDEOS_START",payload:{key:e,mask:iwg}});E.setCatchFinallyBlocks(2);return E.yield(Qvg(c.copyrightService,z),4)}if(E.nextAddress!=2)return(A=E.yieldResult)?c.dispatch(Tvg(e,z,A,iwg)):(c.dispatch(Svg(e,
iwg)),_.ki(Error("XA"))),E.leaveTryBlock(0);C=E.enterCatchBlock();c.dispatch(Svg(e,iwg));_.pi("Fetch Complaint Video",C);E.jumpToEnd()})};
_.ywg.prototype.getWithAutoFetch=function(a,b){var c=this.get(a,b);c||this.fetch(a,b);return c||_.ul};
_.ywg[_.Tr]=[_.Xz,_.Ar,_.pA,_.xwg,_.Wr];_.ne().addProvider({provide:_.ywg,useClass:_.ywg});_.zwg=function(a,b,c){this.select=a;this.dispatch=b;this.copyrightService=c};
_.zwg.prototype.get=function(a,b){return(a=_.Dyb(this.getCache(a),{claimId:b},Pvg))&&_.sl(a,function(c){var e;return(e=c.matches)!=null?e:{}})};
var Awg=function(a,b,c){c=[].concat(_.u(new Set(c)));a=_.Cyb(a.getCache(b),c.map(function(k){return{claimId:k}}),Pvg);
b={};for(var e=0;e<c.length;e++){var g=a[e];g&&(b[c[e]]=_.sl(g,function(k){var l;return(l=k.matches)!=null?l:{}}))}return b};
_.d=_.zwg.prototype;_.d.fetch=function(a,b){b=b===void 0?{freshnessRequirement:"FETCH"}:b;var c=this;return _.n(function(e){return e.yield(_.Iyb("#CreatorReceivedClaimMatches",a,Pvg,function(){return c.getCache(c.select(_.Pl))},function(){var g,k,l,m;
return _.n(function(p){if(p.nextAddress==1)return p.yield(Rvg(c.copyrightService,a),2);g=p.yieldResult;k=a.claimId;m={};return p.return({"#CreatorReceivedClaimMatches":(m[k]={claimId:k,responseStatus:{statusCode:"CREATOR_ENTITY_STATUS_OK"},matches:(l=g.matches)!=null?l:{}},m)})})},c.dispatch,b),0)})};
_.d.fetchBatch=function(a,b){b=b===void 0?{freshnessRequirement:"FETCH"}:b;var c=this,e;return _.n(function(g){e=[].concat(_.u(new Set(a.claimIds)));return e.length===0?g.return():g.yield(_.Hyb("#CreatorReceivedClaimMatches",e.map(function(k){return{claimId:k}}),Pvg,function(){return c.getCache(c.select(_.Pl))},function(k){var l,m,p,r,t,v,w,x;
return _.n(function(z){if(z.nextAddress==1)return l=k.map(function(A){return A.claimId}),z.yield(Rvg(c.copyrightService,{videoId:a.videoId,
claimIds:l}),2);m=z.yieldResult;p=_.Bg(l,function(A){return{claimId:A,responseStatus:{statusCode:"CREATOR_ENTITY_STATUS_FAILURE"}}});
t=_.f((r=m.multiClaimMatchesData)!=null?r:[]);v=t.next();try{for(;!v.done;v=t.next())w=v.value,w.claimId&&(x=void 0,p[w.claimId]=Object.assign({},w,{matches:(x=w.matches)!=null?x:{}}))}finally{_.h(t,v)}return z.return({"#CreatorReceivedClaimMatches":p})})},c.dispatch,b),0)})};
_.d.getWithAutoFetch=function(a,b){if(a=this.get(a,b.claimId))return a;_.Tl(this.fetch(b));return _.ul};
_.d.getBatchWithAutoFetch=function(a,b){var c=[].concat(_.u(new Set(b.claimIds)));if(c.length===0)return{};var e=Awg(this,a,c);a=c.filter(function(g){return!e[g]});
a.length>0&&_.Tl(this.fetchBatch({videoId:b.videoId,claimIds:a},{freshnessRequirement:"CACHED_DATA"}));return _.Bg(c,function(g){var k;return(k=e[g])!=null?k:_.ul})};
_.d.getCache=function(a){return a.normalizedResponses["#CreatorReceivedClaimMatches"]};
_.zwg[_.Tr]=[_.sj,_.Xz,_.Wr];_.ne().addProvider({provide:_.zwg,useClass:_.zwg});
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
