"use strict";_F_installCss(".ytSelectionListItemFormViewModelHost{display:block}.ytSelectionListItemFormViewModelParagraph{margin-bottom:12px;font-family:Roboto,Arial,sans-serif;font-size:1.4rem;font-weight:400;line-height:2rem}sentinel{}");
this.default_cs=this.default_cs||{};(function(_){var window=this;
try{
_.Bkc=_.Ui(function(a){function b(m){if(m&&(m=_.bf(m,_.Fr)))return Object.assign({},m,{isSelected:k()})}
var c=_.f(_.Ti(function(){var m,p;return(p=(m=_.bf(a.data().option,_.Fr))==null?void 0:m.isSelected)!=null?p:!1})),e=c.next().value,g=c.next().value,k=e;
_.Wd(function(){var m;_.XCh((m=a.data().formSchema)==null?void 0:m.id,{onSubmit:function(){var p=_.qe().resolve(_.co),r=!!a.data().selectedCommand,t=!!a.data().unselectedCommand;if(k()){if(r)var v=a.data().selectedCommand}else t&&(v=a.data().unselectedCommand);v=_.Sh(v);b(a.data().option)&&!v?(p="",!r&&t?p="selected ":r&&!t&&(p="unselected "),r=new _.ye("No "+p+"command found for SelectionListItemFormViewModel"),_.of(r)):v&&p.resolveCommand(v)},
isValid:function(){return!0}})});
var l=function(){g(!k())};
_.yd(function(){var m,p,r=(m=a.data())==null?void 0:(p=m.formSchema)==null?void 0:p.id;r&&_.VCh()().delete(r)});
return _.y("yt-selection-list-item-form-view-model",{class:"ytSelectionListItemFormViewModelHost"},_.y("div",{class:"ytSelectionListItemFormViewModelParagraph"},_.y(_.MA,{text:function(){return a.data().paragraph}})),_.y(_.B,{cond:function(){return b(a.data().option)},
then:function(m){return _.y(_.QD,{data:m,isCompact:!0,hideSelectionTextChevron:!0,onTap:l,disableHorizontalPadding:!0})}}))},"qN");
}catch(e){_._DumpException(e)}
}).call(this,this.default_cs);
// Google Inc.
