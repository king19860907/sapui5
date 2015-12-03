sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller,MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.wt.controller.demo13", {

		onShowHello : function () {
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			MessageToast.show(sRecipient);
		}
	});

});