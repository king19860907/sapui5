/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var P=C.extend("sap.ui.commons.ProgressIndicator",{metadata:{library:"sap.ui.commons",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},barColor:{type:"sap.ui.core.BarColor",group:"Appearance",defaultValue:sap.ui.core.BarColor.NEUTRAL},displayValue:{type:"string",group:"Appearance",defaultValue:'0%'},percentValue:{type:"int",group:"Data",defaultValue:0},showValue:{type:"boolean",group:"Appearance",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}}}});P.prototype.onclick=function(e){this.focus();};P.prototype.setEndBar=function(){var w=this.getPercentValue();var a;var b=this.getBarColor();var t;this.oBar=this.getDomRef("bar");this.oEnd=this.getDomRef("end");this.oBox=this.getDomRef("box");q(this.oEnd).removeClass('sapUiProgIndEndHidden');switch(b){case"POSITIVE":q(this.oEnd).addClass('sapUiProgIndPosEnd');break;case"NEGATIVE":q(this.oEnd).addClass('sapUiProgIndNegEnd');break;case"CRITICAL":q(this.oEnd).addClass('sapUiProgIndCritEnd');break;case"NEUTRAL":q(this.oEnd).addClass('sapUiProgIndEnd');break;default:q(this.oEnd).addClass('sapUiProgIndEnd');break;}if(w>100){a=(10000/w)+'%';}else{a='100%';}if(w>100){t=(w-100)*20;}else{t=(100-w)*20;}q(this.oBox).animate({width:a},0,'linear');if(this.bRtl){q(this.oEnd).animate({right:a},t,'linear');}else{q(this.oEnd).animate({left:a},t,'linear');}q(this.oBar).animate({width:w+'%'},t,'linear');if(!this.oThis){this.oThis=this.$();}this.oThis.attr('aria-valuenow',w+'%');};P.prototype.setEndBarGoesBack=function(p){var w=this.getPercentValue();var a;var b=this.getBarColor();var t;this.oBar=this.getDomRef("bar");this.oEnd=this.getDomRef("end");this.oBox=this.getDomRef("box");if(p>100){a=(10000/p)+'%';}else{a='100%';}switch(b){case"POSITIVE":q(this.oEnd).removeClass('sapUiProgIndPosEnd');break;case"NEGATIVE":q(this.oEnd).removeClass('sapUiProgIndNegEnd');break;case"CRITICAL":q(this.oEnd).removeClass('sapUiProgIndCritEnd');break;case"NEUTRAL":q(this.oEnd).removeClass('sapUiProgIndEnd');break;default:q(this.oEnd).removeClass('sapUiProgIndEnd');break;}q(this.oEnd).addClass('sapUiProgIndEndHidden');if(w>100){t=(w-100)*20;}else{t=(100-w)*20;}q(this.oBox).animate({width:a},0,'linear');if(this.bRtl){q(this.oEnd).animate({right:a},t,'linear');}else{q(this.oEnd).animate({left:a},t,'linear');}q(this.oBar).animate({width:w+'%'},t,'linear');if(!this.oThis){this.oThis=this.$();}this.oThis.attr('aria-valuenow',w+'%');};P.prototype.setPercentValue=function(p){var w=this.getPercentValue();var a;this.oBar=this.getDomRef("bar");this.oEnd=this.getDomRef("end");this.oBox=this.getDomRef("box");var t=this;var b;if(p<0){p=0;}if(p>100){a=(10000/p)+'%';}else{a='100%';}if(!this.oBar){b=p*20;this.setProperty('percentValue',p,true);q(this.oBar).animate({width:p+'%'},b,'linear');return this;}if(p>100&&w<=100){b=(100-w)*20;this.setProperty('percentValue',p,true);q(this.oBar).animate({width:'100%'},b,'linear',function(){t.setEndBar();});}else if(p<=100&&w>100){b=(w-100)*20;this.setProperty('percentValue',p,true);q(this.oBar).animate({width:'100%'},b,'linear',function(){t.setEndBarGoesBack();});}else if(p>100&&w>100){if(p>w){b=(p-w)*20;}else{b=(w-p)*20;}a=(10000/p)+'%';this.setProperty('percentValue',p,true);q(this.oBox).animate({width:a},0,'linear');if(this.bRtl){q(this.oEnd).animate({right:a},b,'linear');}else{q(this.oEnd).animate({left:a},b,'linear');}q(this.oBar).animate({width:p+'%'},b,'linear',function(){});if(!this.oThis){this.oThis=this.$();}this.oThis.attr('aria-valuenow',p+'%');}else{if(p>w){b=(p-w)*20;}else{b=(w-p)*20;}this.setProperty('percentValue',p,true);q(this.oBar).animate({width:p+'%'},b,'linear');if(!this.oThis){this.oThis=this.$();}this.oThis.attr('aria-valuenow',p+'%');}return this;};return P;},true);
