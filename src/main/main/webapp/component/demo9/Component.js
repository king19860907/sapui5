sap.ui.define([
               "sap/ui/core/UIComponent",
               "sap/ui/model/json/JSONModel",
               "sap/ui/model/resource/ResourceModel"
    ],function(UIComponent,JSONModel,ResourceModel){
	"use strict";
	return UIComponent.extend("sap.ui.demo.wt.component.demo9.Component",{
		metadata : {
			rootView:"sap.ui.demo.wt.view.demo9"
		},
		init : function(){
			//call the init function of the parent
			UIComponent.prototype.init.apply(this,arguments);
			
			var oData = {
				recipient:{
					name : "World"
				}	
			};
			
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
		}
	});
	
});