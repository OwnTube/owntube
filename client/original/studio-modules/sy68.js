"use strict";_F_installCss(".ytTableViewModelHost{display:block;width:100%}.ytTableViewModelRow{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin-bottom:8px}.ytTableViewModelRowBottomBorder{padding-bottom:8px}.ytTableViewModelRowBottomBorder:not(:last-child){border-bottom:1px solid var(--tf3fc855af2285f5f)}.ytTableViewModelCell{color:var(--t4a6da19e16bf221a);text-align:right;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}.ytTableViewModelRowLabel{color:var(--tffc2fd3a644f6275);font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.qCh=_.Ui(function(a){return _.y("yt-table-view-model",{class:_.Wn("ytTableViewModelHost",a.className)},_.y(_.Qd,{each:function(){return a.data().rows||[]}},function(b){var c={};
return _.y("div",{class:_.Wn("ytTableViewModelRow",(c.ytTableViewModelRowBottomBorder=function(){return a.data().showSeparators},c))},_.y(_.Qd,{each:function(){return(b==null?void 0:b.cells)||[]}},function(e,g){var k={};
return _.y("span",{class:_.Wn((k.ytTableViewModelRowLabel=function(){return g()===0&&a.data().showHorizontalHeaders},k.ytTableViewModelCell=function(){return!a.data().showHorizontalHeaders||g()>0},k))},_.y(_.Rd,null,_.y(_.Ad,{when:function(){var l;
return(l=e.text)==null?void 0:l.content}},function(){var l;
return(l=e.text)==null?void 0:l.content}),_.y(_.Ad,{when:function(){return e.cellContent}},function(){return _.y(_.mo,{data:function(){return e.cellContent}},{basicContentViewModel:_.jhf})})))}))}))},"Li");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
