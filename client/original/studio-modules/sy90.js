"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.yQk=function(a){return"Step "+String(a.currentStep)+" of "+String(a.totalSteps)};
_.zQk=function(a){return[{type:"CLIENT",style:"WARNING",title:"Video A/B failed",displayText:a!=null?a:"An unexpected error occurred and your test isn\u2019t running.",isDismissable:!1,actions:[{type:"EVENT_ACTION",displayText:"Delete test",event:"delete-video-experiment"}],identifier:"video-experiment-error-banner"}]};
_.AQk=function(a,b){var c=document.createElement("ytcp-confirmation-dialog");c.id="delete-video-experiment-dialog";c.minWidth=512;c.maxWidth=512;c.dialogTitle="Delete video A/B test";c.dialogContentText="This will remove all alternative cuts, while preserving your main video.";c.confirmButtonLabel="Delete test";c.cancelButtonLabel=_.kk();c.cancelButtonSecondary=!0;c.addEventListener("ytcp-confirmation-dialog-cancelled",function(){c.close()});
c.addEventListener("ytcp-confirmation-dialog-confirmed",function(){var e;return _.n(function(g){if(g.nextAddress==1)return c.close(),g.setCatchFinallyBlocks(2),g.yield(b.videoCreatorVideoExperimentService.deleteExperiment(a),4);if(g.nextAddress!=2)return b.toastManager.enqueue({text:"Test deleted"}),g.leaveTryBlock(0);e=g.enterCatchBlock();_.mi(Error("VK`"+e));g.jumpToEnd()})});
b.popupHostBehavior.hostPopup(c,"DARK_BACKDROP");c.open()};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
