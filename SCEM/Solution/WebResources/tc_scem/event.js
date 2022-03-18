//SCEM-EVENT.JS
function onformload(executionContext) {
    var formContext = executionContext.getFormContext();

    if(formContext.ui.getFormType() ===1){
        SetApp(formContext);
    }
    else{
        refreshsection(formContext);
    }
    
}
function SetApp(formContext) { 
    var userSettings = Xrm.Utility.getGlobalContext().userSettings;
    var myId = userSettings.userId;

    var req = new XMLHttpRequest();
    req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/systemusers(" + myId.substring(1, 37) + ")?$select=_businessunitid_value", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var result = JSON.parse(this.response);
                var _businessunitid_value = result["_businessunitid_value"];
                var _businessunitid_value_formatted = result["_businessunitid_value@OData.Community.Display.V1.FormattedValue"];
                var _businessunitid_value_lookuplogicalname = result["_businessunitid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

                var mybu=_businessunitid_value_formatted;
                if(mybu=='OPP'){
                    formContext.getAttribute("tc_app").setValue(948010001);
                }
                if(mybu=='Rail Safety'){
                    formContext.getAttribute("tc_app").setValue(948010003);
                }
                if(mybu=='TDG Secretariat'){
                    formContext.getAttribute("tc_app").setValue(948010004);
                }
                if(mybu=='Safety Awareness'){
                    formContext.getAttribute("tc_app").setValue(948010005);
                }
                if(mybu.indexOf('IEC')>0){
                    formContext.getAttribute("tc_app").setValue(948010002);
                }
                else{
                    formContext.getAttribute("tc_app").setValue(948010000);
                }
                refreshsection(formContext);
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();

}
function eventcategory_onchange(executionContext) {
    var formContext = executionContext.getFormContext();
    refreshsection(formContext);
}
function app_onchange(executionContext) {
    var formContext = executionContext.getFormContext();
    refreshsection(formContext);
}
function refreshsection(formContext) {
    var category = formContext.getAttribute("tc_tdgcategory").getValue();
    var app = formContext.getAttribute("tc_app").getValue();

    var isExternal = false;
    var isCommittees = false;


    var isOPP = false;
    var isIEC = false;
    var isRailSafety = false;
    var isTDGSecretariat = false;
    var isSafetyAwareness = false;
    var isNew = formContext.ui.getFormType() == 1;
    var categoryList = formContext.getControl("tc_tdgcategory");
    
    if (app == 948010000) {

    }
    else if (app == 948010001) {
        isOPP = true;
    }
    else if (app == 948010002) {
        isIEC = true;
    }
    else if (app == 948010003) {
        isRailSafety = true;
        categoryList.removeOption(948010000);
        categoryList.removeOption(948010001);
        categoryList.removeOption(948010003);
    }
    else if (app == 948010004) {
        isTDGSecretariat = true;
        categoryList.removeOption(948010000);
        categoryList.removeOption(948010002);
    }
    else if (app == 948010005) {
        isSafetyAwareness = true;
        categoryList.removeOption(948010001);
        categoryList.removeOption(948010002);
        categoryList.removeOption(948010003);
    }

    if(category==948010003){
        isCommittees=true;
    }
    else if(category==948010001){
        isExternal=true;
    }
    //SafetyAwareness=948010000
    //Indigenous Engagement=948010002

    formContext.ui.tabs.get("tab_ActionItems").setVisible(!isOPP && !isNew && !isCommittees);
    formContext.ui.tabs.get("tab_Documents").setVisible(!isNew && !isCommittees);
    formContext.ui.tabs.get("tab_ContactEvents").setVisible(isOPP && !isNew); 

    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionOPP").setVisible(isOPP);
    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionOPP2").setVisible(isOPP);
    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionPostEvent").setVisible(isOPP && !isNew);

    

    formContext.ui.tabs.get("tabGeneral").sections.get("sect_safety").setVisible(isSafetyAwareness);

    formContext.ui.tabs.get("tabGeneral").sections.get("sect_engagement").setVisible(isExternal);

    formContext.ui.tabs.get("tabGeneral").sections.get("sect_indigenous").setVisible(isRailSafety);
    formContext.ui.tabs.get("tab_Participants").sections.get("TabParticipants_StakeholdersAttendee").setVisible(isCommittees);
    formContext.ui.tabs.get("tabGeneral").sections.get("Contact_Person_Sender").setVisible(!isNew);

    formContext.ui.tabs.get("tabMarketing").setVisible(isSafetyAwareness);
    formContext.ui.tabs.get("tabAdministration").setVisible(isSafetyAwareness);
    formContext.ui.tabs.get("tabApproval").setVisible(isSafetyAwareness);
    formContext.ui.tabs.get("tabAssessment").setVisible(isSafetyAwareness);
    formContext.ui.tabs.get("tab_Participants").setVisible(!isNew);
	formContext.ui.tabs.get("tab_Address").setVisible(!isNew);

    formContext.ui.tabs.get("tab_Logisitics").setVisible(isCommittees);
    formContext.ui.tabs.get("tab_Materials").setVisible(isCommittees);
    formContext.ui.tabs.get("tab_Survey").setVisible(isCommittees);
    formContext.ui.tabs.get("tab_Travel").setVisible(isCommittees);
    formContext.ui.tabs.get("tab_Equipment").setVisible(isCommittees);

    if (!isOPP) {
        formContext.getAttribute("tc_startdte").setRequiredLevel("none")
        formContext.getAttribute("tc_enddte").setRequiredLevel("none")
    }

    formContext.getControl("tc_tdgsecretariatlead").setVisible(isExternal);
    formContext.getControl("tc_tclead").setVisible(!isExternal);
    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionTDG").setVisible(!isOPP);
}