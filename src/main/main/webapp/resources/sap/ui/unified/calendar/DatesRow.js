/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','sap/ui/core/date/UniversalDate','sap/ui/unified/calendar/Month','sap/ui/unified/library'],function(q,C,L,I,D,a,U,M,l){"use strict";var b=M.extend("sap.ui.unified.calendar.DatesRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Misc"},days:{type:"int",group:"Misc",defaultValue:7}}}});(function(){b.prototype.init=function(){M.prototype.init.apply(this,arguments);this._iColumns=1;};b.prototype.setStartDate=function(s){if(!(s instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}var y=s.getFullYear();if(y<1||y>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}var u=a._createUniversalUTCDate(s);this.setProperty("startDate",s,true);this._oUTCStartDate=u;if(this.getDomRef()){var o=a._createLocalDate(this._getDate());this._bNoRangeCheck=true;this.displayDate(s);this._bNoRangeCheck=false;if(o&&this.checkDateFocusable(o)){this.setDate(o);}}return this;};b.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=a._createUniversalUTCDate(new Date());}return this._oUTCStartDate;};b.prototype.setDate=function(d){if(!this._bNoRangeCheck&&!this.checkDateFocusable(d)){throw new Error("Date must be in visible date range; "+this);}M.prototype.setDate.apply(this,arguments);return this;};b.prototype.displayDate=function(d){if(!this._bNoRangeCheck&&!this.checkDateFocusable(d)){throw new Error("Date must be in visible date range; "+this);}M.prototype.displayDate.apply(this,arguments);return this;};b.prototype.setFirstDayOfWeek=function(f){if(f==-1){this.setProperty("firstDayOfWeek",f,false);}else{throw new Error("Property firstDayOfWeek not supported "+this);}};b.prototype._handleBorderReached=function(c){var e=c.getParameter("event");var d=this.getDays();var o=this._getDate();var f=new U(o.getTime());if(e.type){switch(e.type){case"sapnext":case"sapnextmodifiers":f.setUTCDate(f.getUTCDate()+1);break;case"sapprevious":case"sappreviousmodifiers":f.setUTCDate(f.getUTCDate()-1);break;case"sappagedown":f.setUTCDate(f.getUTCDate()+d);break;case"sappageup":f.setUTCDate(f.getUTCDate()-d);break;default:break;}this.fireFocus({date:f,otherMonth:true});}};b.prototype.checkDateFocusable=function(d){if(!(d instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}if(this._bNoRangeCheck){return false;}var s=this._getStartDate();var e=new U(s.getTime());e.setUTCDate(e.getUTCDate()+this.getDays());var u=a._createUniversalUTCDate(d);if(u.getTime()>=s.getTime()&&u.getTime()<e.getTime()){return true;}else{return false;}};b.prototype._renderHeader=function(){var s=this._getStartDate();var S=s.getUTCDay();var o=this._getLocaleData();var w=this.$("Names").children();var W=[];if(this._bLongWeekDays||!this._bNamesLengthChecked){W=o.getDaysStandAlone("abbreviated");}else{W=o.getDaysStandAlone("narrow");}var c=o.getDaysStandAlone("wide");var i=0;for(i=0;i<w.length;i++){var $=q(w[i]);$.text(W[(i+S)%7]);$.attr("aria-label",c[(i+S)%7]);}if(this._getShowHeader()){var d=this.$("Head");if(d.length>0){var r=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(r,this,o,s);r.flush(d[0]);r.destroy();}}};b.prototype._getFirstWeekDay=function(){var s=this._getStartDate();return s.getUTCDay();};}());return b;},true);
