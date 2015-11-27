/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./AnalyticalBinding',"./AnalyticalTreeBindingAdapter",'./odata4analytics','./AnalyticalVersionInfo'],function(q,A,a,o,b){"use strict";var O=function(){var m=b.getVersion(this);if(this.iModelVersion===b.NONE||this.getAnalyticalExtensions){return;}this._mPreadapterFunctions={bindList:this.bindList,bindTree:this.bindTree};for(var f in O.prototype){if(O.prototype.hasOwnProperty(f)){this[f]=O.prototype[f];}}if(m===b.V1&&this.isCountSupported()){q.sap.log.info("ODataModelAdapter: switched ODataModel to use inlinecount (mandatory for analytical bindings)");this.setCountSupported(false);}};O.prototype.bindList=function(p,c,s,f,P){if(P&&P.analyticalInfo){var B=new A(this,p,c,s,f,P);a.apply(B);return B;}else{return this._mPreadapterFunctions.bindList.apply(this,arguments);}};O.prototype.bindTree=function(p,c,f,P){if(P&&P.analyticalInfo){var B=new A(this,p,c,[],f,P);return B;}else{return this._mPreadapterFunctions.bindTree.apply(this,arguments);}};O.prototype.getAnalyticalExtensions=function(){if(this.oOData4SAPAnalyticsModel!=undefined&&this.oOData4SAPAnalyticsModel!=null){return this.oOData4SAPAnalyticsModel;}var m=b.getVersion(this);if(m===b.V2&&!(this.oMetadata&&this.oMetadata.isLoaded())){throw"Failed to get the analytical extensions. The metadata have not been loaded by the model yet."+"Register for the 'metadataLoaded' event of the ODataModel(v2) to know when the analytical extensions can be retrieved.";}var s=null;if(arguments.length==1){var c=arguments[0];var r=q.sap.syncGetText(c);if(r.success){s=r.data;}}try{this.oOData4SAPAnalyticsModel=new o.Model(new o.Model.ReferenceByModel(this),{sAnnotationJSONDoc:s});}catch(e){throw"Failed to instantiate analytical extensions for given OData model: "+e.message;}return this.oOData4SAPAnalyticsModel;};return O;},true);
