"use strict";_F_installCss(".ytwChannelBlocksViewModelHost{display:block}.ytwChannelBlocksViewModelListWrapper{scrollbar-color:transparent transparent;scrollbar-width:thin}.ytwChannelBlocksViewModelListWrapper::-webkit-scrollbar{background:transparent;width:16px}.ytwChannelBlocksViewModelListWrapper::-webkit-scrollbar-thumb{height:56px;border-radius:8px;border:4px solid transparent;background-clip:content-box;background-color:transparent}.ytwChannelBlocksViewModelListWrapper:hover{scrollbar-color:var(--t7e34d5baa4ea6277) transparent}.ytwChannelBlocksViewModelListWrapper:hover::-webkit-scrollbar-thumb{background-color:var(--t7e34d5baa4ea6277)}.ytwChannelBlocksViewModelListWrapper{overflow-y:auto;max-height:min(360px,100vh - 300px);min-width:min(448px,100vw - 144px);margin-right:-12px;padding-right:12px}@media (max-width:330px){.ytwChannelBlocksViewModelListWrapper{max-height:calc(100vh - 200px)}}.ytwChannelBlocksViewModelListWrapper :has(>.yt-icon-shape){background-color:var(--t7f4f2c6d54836ce0);border-radius:50%;box-sizing:content-box;padding:8px}.ytwChannelBlocksViewModelSearchContainer{position:relative;padding-bottom:8px}.ytwChannelBlocksViewModelDropdownPanel{position:absolute;background-color:var(--t518e925f61bdcb91);border:1px solid var(--tf3fc855af2285f5f);box-shadow:0 2px 10px rgba(0,0,0,0.25);border-radius:4px;z-index:2010;width:100%;max-height:min(300px,100vh - 300px);overflow-y:auto;top:100%;left:0}.ytwChannelBlocksViewModelSuggestionsListbox{padding:8px 0}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.ld("fAzdT");
var oxm;_.nxm=function(){var a;return _.n(function(b){if(b.nextAddress==1)return b.yield((0,_.ds)("DvZC9"),2);a=_.Yic;return b.return(a)})};
oxm=_.jo(function(){return _.nxm()},"continuationItemViewModel");
_.re(_.NA,function(a){a.registerLoadFn("continuationItemViewModel","DvZC9",_.nxm)});_.wkc=_.Ui(function(a){var b=a.data;var c=_.f(_.M0b(b)).next().value,e=_.f(_.zd([],void 0,"g8Gnhb",function(){}));
a=e.next().value;var g=e.next().value,k=_.f(_.zd(!1,void 0,"DMtMAc",function(){}));
e=k.next().value;var l=k.next().value;k="i"+_.lFf++;_.uf("yt-append-continuation-items-action",function(m){(m=_.bf(m,_.Iqe))&&m.targetId&&m.targetId===c().targetId&&_.Vcc(m.targetId,m.continuationItems)});
_.uf("yt-reload-continuation-items-command",function(m){m=_.bf(m,_.aYb);if(m!=null&&m.targetId){var p=_.bf(b().searchInput,_.Bbc),r;if(m.targetId===(p==null?void 0:(r=p.formSchema)==null?void 0:r.id)){var t;r=(t=m.continuationItems)!=null?t:[];g(r);l(r.length>0)}}});
return _.y("yt-channel-blocks-view-model",{el:_.Zn(_.Hcc),class:"ytwChannelBlocksViewModelHost"},_.y(pxm,{data:function(){return b().searchInput},
showDropdown:e,suggestions:a,listboxId:k}),_.y("div",{class:"ytwChannelBlocksViewModelListWrapper",role:"list","data-target-id":function(){return b().targetId}},_.y(_.mo,{data:function(){return c().contents}},{listItemViewModel:function(m){return _.y(_.QD,{data:m.data,
disableHorizontalPadding:!0})},
continuationItemViewModel:oxm})))},"fO");
var pxm=_.Ui(function(a){var b=a.data;var c=a.showDropdown;var e=a.suggestions;var g=a.listboxId;return _.y("div",{class:"ytwChannelBlocksViewModelSearchContainer",role:"combobox","aria-label":function(){var k;return(k=_.bf(b(),_.Bbc))==null?void 0:k.placeholderText},
"aria-haspopup":"listbox","aria-autocomplete":"list","aria-expanded":c,"aria-controls":function(){return c()?g():void 0}},_.y(_.mo,{data:b},{searchInputViewModel:_.Mvf}),_.y(_.B,{cond:c,
then:function(){return _.y("div",{class:"ytwChannelBlocksViewModelDropdownPanel"},_.y("div",{id:function(){return g()},
class:"ytwChannelBlocksViewModelSuggestionsListbox",role:"listbox"},_.y(_.mo,{data:e},{listItemViewModel:_.QD})))}}))},"gO");
_.md();
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
