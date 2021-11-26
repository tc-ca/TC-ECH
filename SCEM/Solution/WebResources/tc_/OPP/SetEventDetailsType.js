"use strict";

function setEventDetailType() {
	debugger;
	var globalContext = Xrm.Utility.getGlobalContext();
	var selection = Xrm.Page.getAttribute("tc_eventdetailtypecd").getValue();
	var appName = globalContext.getCurrentAppName()
		.then(function (appName) {
			var fieldName = "tc_eventdetailtypecd";
			if (appName === "OPPSES" || appName === "BDCPPO") {
				//var eventDetailTypeValue = 3;//Action Item
				Xrm.Page.getControl(fieldName).removeOption(2);
				Xrm.Page.getControl(fieldName).removeOption(1);
				//Xrm.Page.getAttribute(fieldName).setValue(eventDetailTypeValue);
				//Xrm.Page.getAttribute(fieldName).fireOnChange();

				//Xrm.Page.getControl(fieldName).setDisabled(true);
				//Xrm.Page.getControl("tc_commitmentid").setVisible(false);
			}
			else if (appName === "SCEM" || appName === "GMCI") {
				Xrm.Page.getAttribute(fieldName).setValue(3);
				Xrm.Page.getControl(fieldName).setDisabled(true);
				Xrm.Page.getControl("tc_actionnumber").setVisible(true);
				Xrm.Page.getControl("tc_opi").setVisible(true);
				Xrm.Page.getControl("tc_coordinator").setVisible(true);
			}
			else if (appName === "ASIES" || appName === "SMISA"){
				if (selection == 3){
					Xrm.Page.getControl("tc_commitmentid").setVisible(true);
				}else{
					Xrm.Page.getControl("tc_commitmentid").setVisible(false);
				}
				Xrm.Page.getControl(fieldName).removeOption(4);//Issue
			}					
			else {
				Xrm.Page.getControl(fieldName).removeOption(4);//Issue
			}
		},
		function (error) {
			console.log(error.message);
		});
}