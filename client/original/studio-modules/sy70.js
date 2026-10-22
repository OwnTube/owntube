"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var zUi=function(a,b){this.callback_=b;this.hasError_=!1;this.unscannedDirectories_=[];this.maxConcurrentScans_=5;this.fileOps_=this.directoryOps_=0;this.rootDirectory_=new _.Tne("");xUi(this,a,this.rootDirectory_);yUi(this)},xUi=function(a,b,c){for(var e=0;e<b.length;e++){var g=b[e];
g.isFile?(a.fileOps_++,g.file((0,_.Tc)(a.handleFileSuccess_,a,c),(0,_.Tc)(a.handleFileError_,a))):a.unscannedDirectories_.push(new AUi(g,c))}},yUi=function(a){if(a.unscannedDirectories_.length>0&&a.directoryOps_<a.maxConcurrentScans_&&!a.hasError_){a.directoryOps_++;
var b=a.unscannedDirectories_.shift(),c=b.entry,e=new _.Tne(c.name);b=b.parent;b.directoryMap_[e.getName()]=e;b.directories_.push(e);c=c.createReader();c.readEntries((0,_.Tc)(a.handleDirectorySuccess_,a,c,e),(0,_.Tc)(a.handleDirectoryError_,a))}a.directoryOps_!=0||a.fileOps_!=0||a.unscannedDirectories_.length!=0&&!a.hasError_||a.callback_(a.rootDirectory_.files_,a.rootDirectory_.directories_,a.hasError_)};
zUi.prototype.handleDirectorySuccess_=function(a,b,c){xUi(this,c,b);c.length==0?(this.directoryOps_--,yUi(this)):a.readEntries((0,_.Tc)(this.handleDirectorySuccess_,this,a,b),(0,_.Tc)(this.handleDirectoryError_,this))};
zUi.prototype.handleDirectoryError_=function(){this.hasError_=!0;this.directoryOps_--;yUi(this)};
zUi.prototype.handleFileSuccess_=function(a,b){a.files_.push(b);this.fileOps_--;yUi(this)};
zUi.prototype.handleFileError_=function(){this.hasError_=!0;this.fileOps_--;yUi(this)};
var AUi=function(a,b){this.entry=a;this.parent=b};_.BUi=function(a){_.Rc.call(this);_.Wc(a,"drop",this.onObjectsDropped_,!1,this);_.Wc(a,"dragenter",this.onFilesDragged_,!1,this);_.Wc(a,"dragover",this.onFilesDragged_,!1,this);_.Wc(a,"dragleave",this.onDragLeave_,!1,this);_.Wc(a,"dragend",this.onDragLeave_,!1,this)};
_.es(_.BUi,_.Rc);var CUi=function(a,b,c){c=c===void 0?[]:c;_.Qc.call(this,"p");this.files=a;this.directories=b;this.nonFileSystemItems=c};
_.es(CUi,_.Qc);var DUi=function(){_.Qc.call(this,"r")};
_.es(DUi,_.Qc);var EUi=function(){_.Qc.call(this,"s")};
_.es(EUi,_.Qc);var FUi=function(a){_.Qc.call(this,"q");this.errorDescription=a};
_.es(FUi,_.Qc);_.BUi.prototype.onObjectsDropped_=function(a){var b=this;a.preventDefault();var c=a.event_.dataTransfer;if((a=c&&c.items)&&a.length>0&&a[0].webkitGetAsEntry){c=[];for(var e=[],g=0;g<a.length;g++){var k=a[g].webkitGetAsEntry();k?c.push(k):e.push(a[g])}new zUi(c,function(l,m,p){p?b.dispatchEvent(new FUi("Error occurred while reading from the file system.")):b.dispatchEvent(new CUi(l,m,e))})}else(a=c&&c.files)&&this.dispatchEvent(new CUi(Array.from(a),[]))};
_.BUi.prototype.onFilesDragged_=function(a){a.type==="dragenter"&&this.dispatchEvent(new DUi);a.preventDefault()};
_.BUi.prototype.onDragLeave_=function(){this.dispatchEvent(new EUi)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
