"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
var sVi=function(a,b){this.callback_=b;this.hasError_=!1;this.unscannedDirectories_=[];this.maxConcurrentScans_=5;this.fileOps_=this.directoryOps_=0;this.rootDirectory_=new _.woe("");qVi(this,a,this.rootDirectory_);rVi(this)},qVi=function(a,b,c){for(var e=0;e<b.length;e++){var g=b[e];
g.isFile?(a.fileOps_++,g.file((0,_.Vc)(a.handleFileSuccess_,a,c),(0,_.Vc)(a.handleFileError_,a))):a.unscannedDirectories_.push(new tVi(g,c))}},rVi=function(a){if(a.unscannedDirectories_.length>0&&a.directoryOps_<a.maxConcurrentScans_&&!a.hasError_){a.directoryOps_++;
var b=a.unscannedDirectories_.shift(),c=b.entry,e=new _.woe(c.name);b=b.parent;b.directoryMap_[e.getName()]=e;b.directories_.push(e);c=c.createReader();c.readEntries((0,_.Vc)(a.handleDirectorySuccess_,a,c,e),(0,_.Vc)(a.handleDirectoryError_,a))}a.directoryOps_!=0||a.fileOps_!=0||a.unscannedDirectories_.length!=0&&!a.hasError_||a.callback_(a.rootDirectory_.files_,a.rootDirectory_.directories_,a.hasError_)};
sVi.prototype.handleDirectorySuccess_=function(a,b,c){qVi(this,c,b);c.length==0?(this.directoryOps_--,rVi(this)):a.readEntries((0,_.Vc)(this.handleDirectorySuccess_,this,a,b),(0,_.Vc)(this.handleDirectoryError_,this))};
sVi.prototype.handleDirectoryError_=function(){this.hasError_=!0;this.directoryOps_--;rVi(this)};
sVi.prototype.handleFileSuccess_=function(a,b){a.files_.push(b);this.fileOps_--;rVi(this)};
sVi.prototype.handleFileError_=function(){this.hasError_=!0;this.fileOps_--;rVi(this)};
var tVi=function(a,b){this.entry=a;this.parent=b};_.uVi=function(a){_.Tc.call(this);_.Yc(a,"drop",this.onObjectsDropped_,!1,this);_.Yc(a,"dragenter",this.onFilesDragged_,!1,this);_.Yc(a,"dragover",this.onFilesDragged_,!1,this);_.Yc(a,"dragleave",this.onDragLeave_,!1,this);_.Yc(a,"dragend",this.onDragLeave_,!1,this)};
_.es(_.uVi,_.Tc);var vVi=function(a,b,c){c=c===void 0?[]:c;_.Sc.call(this,"p");this.files=a;this.directories=b;this.nonFileSystemItems=c};
_.es(vVi,_.Sc);var wVi=function(){_.Sc.call(this,"r")};
_.es(wVi,_.Sc);var xVi=function(){_.Sc.call(this,"s")};
_.es(xVi,_.Sc);var yVi=function(a){_.Sc.call(this,"q");this.errorDescription=a};
_.es(yVi,_.Sc);_.uVi.prototype.onObjectsDropped_=function(a){var b=this;a.preventDefault();var c=a.event_.dataTransfer;if((a=c&&c.items)&&a.length>0&&a[0].webkitGetAsEntry){c=[];for(var e=[],g=0;g<a.length;g++){var k=a[g].webkitGetAsEntry();k?c.push(k):e.push(a[g])}new sVi(c,function(l,m,p){p?b.dispatchEvent(new yVi("Error occurred while reading from the file system.")):b.dispatchEvent(new vVi(l,m,e))})}else(a=c&&c.files)&&this.dispatchEvent(new vVi(Array.from(a),[]))};
_.uVi.prototype.onFilesDragged_=function(a){a.type==="dragenter"&&this.dispatchEvent(new wVi);a.preventDefault()};
_.uVi.prototype.onDragLeave_=function(){this.dispatchEvent(new xVi)};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
