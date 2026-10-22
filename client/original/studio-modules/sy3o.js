"use strict";this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.WUg=new _.Nv("postsCreationOptionImageUriValidationRule");_.XUg=new _.Nv("postsCreationOptionsLengthValidationRule");_.YUg=function(a,b){this.rule=a;this.getDependentField=b};
_.YUg.prototype.validate=function(a){var b;if(!this.getDependentField||(b=this.rule.dependencies)==null||!b.idIsImageType)return null;var c;if((c=this.getDependentField(this.rule.dependencies.idIsImageType))==null?0:c.value){a=_.f(a);b=a.next();try{for(;!b.done;b=a.next()){var e=b.value;if(!e.uri)return{message:"Image URI is required."};if(e.imageUploadingState!=="IMAGE_UPLOADING_STATE_SUCCEED")return{message:"Image is still uploading."}}}finally{_.h(a,b)}}return null};_.ZUg=function(a,b){this.rule=a;this.getDependentField=b};
_.ZUg.prototype.validate=function(a){var b,c,e=(c=(b=this.rule.dependencies)==null?void 0:b.idIsImageType)!=null?c:"",g,k;b=((g=this.getDependentField)==null?0:(k=g.call(this,e))==null?0:k.value)?this.rule.imageMaxLength:this.rule.textMaxLength;var l;b=(l=b)!=null?l:Number.MAX_SAFE_INTEGER;var m;e=typeof a==="string"?Array.from(a).length:(m=a==null?void 0:a.length)!=null?m:0;if(typeof a==="string"&&e===0)return{message:""};if(e>b){var p,r;return{message:(r=(p=this.rule.translations)==null?void 0:
p.maxLengthErrorMessage)!=null?r:""}}return null};
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
