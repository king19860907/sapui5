/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/ResizeHandler','./library','jquery.sap.script'],function(q,C,R,l){"use strict";var D=C.extend("sap.ui.ux3.DataSetSimpleView",{metadata:{interfaces:["sap.ui.ux3.DataSetView"],library:"sap.ui.ux3",properties:{floating:{type:"boolean",group:"Misc",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:"Name of this View"},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconHovered:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconSelected:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},responsive:{type:"boolean",group:"Misc",defaultValue:false},itemMinWidth:{type:"int",group:"Misc",defaultValue:0},initialItemCount:{type:"int",group:"Appearance",defaultValue:0},reloadItemCount:{type:"int",group:"Appearance",defaultValue:0},scrollArea:{type:"any",group:"Appearance",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null}},aggregations:{template:{type:"sap.ui.core.Control",multiple:false}}}});D.prototype.init=function(){this._oDataSet=this.getParent();this.items=[];this._bRendered=false;if(this.getInitialItemCount()>0&&this.getReloadItemCount()<=0){this.setReloadItemCount(this.getInitialItemCount());}this._bUsePagination=false;};D.prototype.exit=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};D.prototype.handleSelection=function(e){var d=this.getParent();var i=d.getItems(),s=d.getSelectedIndices();if(s.length>1){this._clearTextSelection();}q.each(i,function(a,b){if(d.isSelectedIndex(a)){b.$().addClass("sapUiUx3DSSVSelected");}else{b.$().removeClass("sapUiUx3DSSVSelected");}});};D.prototype._clearTextSelection=function(){if(window.getSelection){if(window.getSelection().empty){window.getSelection().empty();}else if(window.getSelection().removeAllRanges){window.getSelection().removeAllRanges();}}else if(document.selection&&document.selection.empty){try{document.selection.empty();}catch(e){}}};D.prototype.isItemSelected=function(i){var I=q.inArray(i,this.items);if(I==-1){return false;}return this.getParent().isSelectedIndex(I);};D.prototype.initView=function(I){this.getParent().attachSelectionChanged(this.handleSelection,this);this.items=this.items.concat(I);for(var i=0;i<I.length;i++){var t=this.getTemplate().clone();I[i].setAggregation('_template',t,true);}};D.prototype.updateView=function(d){if(!this.getDomRef()){return;}var r=sap.ui.getCore().createRenderManager(),L=this.items.length;for(var i=0;i<d.length;i++){var I=d[i].item;var a=d[i].index;if(d[i].type==="insert"){var t=this.getTemplate().clone();I.setAggregation('_template',t,true);if(i==d.length-1&&L==0){var o={onAfterRendering:function(){this.calculateItemCounts();this.getParent().updateItems(sap.ui.model.ChangeReason.Change);t.removeDelegate(o);}};t.addDelegate(o,false,this);}this.getRenderer().renderItem(r,this,I);r.flush(this.$()[0],false,a);this.items.splice(a,0,I);}else{this.items.splice(a,1);I.$().remove();I.destroy();}}if(d.length>0&&this.getFloating()&&this.getResponsive()){this._computeWidths(true);}r.destroy();};D.prototype.exitView=function(I){this.getParent().detachSelectionChanged(this.handleSelection,this);for(var i=0;i<I.length;i++){I[i].destroyAggregation("_template",true);}this.items=[];};D.prototype.initScrollArea=function(){var $=this.getScrollArea(),t=this;var s=function(e){t.getParent().updateItems(sap.ui.model.ChangeReason.Change);};if(typeof $==='string'){$=q.sap.byId($);}if(!$){$=this.$();}else if($.is('html')){$=q(document);}if(!this._bUsePagination){$.off('scroll',s);}else{$.on('scroll',s);}};D.prototype.checkScrollItems=function(){if(!this._bRendered){return;}var b=this.getParent().mBindingInfos["items"],$=this.getScrollArea(),B=b.binding,p=this.getParent(),a=0,f,s,c,S;if(p.getItems().length===B.getLength()){return a;}if(typeof $==='string'){$=q.sap.byId($);}if(!$){$=this.$();}if(!$||$.length==0){return a;}s=$[0];c=s.clientHeight;S=s.scrollHeight;if($.is('html')){$=q(document);}if(c==S){f=c+this._iScrollTrigger;}else{f=c+this._iScrollTrigger+$.scrollTop();}if(f>0){var n=Math.floor(f/this._iRowHeight)*this._iItemsPerRow;var i=p.getItems().length;n=Math.ceil(n/this._iItemsPerRow)*this._iItemsPerRow;a=n-i;}return a;};D.prototype.getItemCount=function(){if(this._bUsePagination){var L=this.getParent().getItems().length,a=this.checkScrollItems();if(L==0){L+=this.getInitialItemCount();}else{L+=a;}return L;}else{return null;}};D.prototype.setInitialItemCount=function(v){this.setProperty("initialItemCount",v);this._bUsePagination=(v!=0);};D.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};D.prototype.onAfterRendering=function(){this._bRendered=true;this.initScrollArea();if((this.getFloating()&&this.getResponsive())||this._bUsePagination){this._height=-1;this._itemsPerRow=-1;this.onresize();this.sResizeListenerId=R.register(this.getDomRef(),q.proxy(this.onresize,this));}};D.prototype.onThemeChanged=function(){if(this._bRendered){this.calculateItemCounts();this.getParent().updateItems(sap.ui.model.ChangeReason.Change);}};D.prototype.onresize=function(){if(!this.getDomRef()){if(this.sResizeListenerId){R.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}return;}if(this.getFloating()&&this.getResponsive()){this._computeWidths();}if(this._bUsePagination&&this.items.length>0){this.calculateItemCounts();this.getParent().updateItems(sap.ui.model.ChangeReason.Change);}};D.prototype.setTemplate=function(t){this.setAggregation("template",t,true);if(this.getParent()){this.getParent().updateItems();}};D.prototype.calculateItemCounts=function(){if(this.getDomRef()){var $=this.$(),a=$.children().first();this._iItemsPerRow=Math.floor($.outerWidth(true)/a.outerWidth(true));this._iNewRows=Math.ceil(this.getReloadItemCount()/this._iItemsPerRow);this._iNewItems=this._iItemsPerRow*this._iNewRows;this._iRowHeight=a.outerHeight(true);this._iScrollTrigger=this._iNewRows*this._iRowHeight;}};D.prototype._computeWidths=function(i){var t=this.$();var I=Math.floor(t.width()/this.getItemMinWidth());var a=Math.floor(100/I);if(t.width()*a/100<this.getItemMinWidth()){I--;a=Math.floor(100/I);}if(i||this._height!=t.height()||this._itemsPerRow!=I){var c=-1;var b=this.getParent().getItems();var d,w;for(var j=0;j<b.length;j++){if(c==-1||c+1>I){c=0;d=100-(I*a);}var w=a;if(d>0){w++;d--;}b[j].$().css("width",w+"%");c++;}this._height=t.height();this._itemsPerRow=I;}};D.prototype.setScrollArea=function(s,S){if(typeof s!=='string'&&!(s instanceof q)){q.sap.log.error('You can only pass a string (ID of scroll area DOM) or an jQuery object as scrollarea');}this.setProperty('scrollArea',s,S);};return D;},true);
