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
    req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/systemusers(" + myId.substring(1, 37) + ")?$select=_businessunitid_value", false);
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
                if(_businessunitid_value_formatted.indexOf('OPP')>=0){
                    formContext.getAttribute("tc_app").setValue(948010001);
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

    var isEngagement = false;
    var isIndigenous = false;
    var isCommittees = false;
    var isSafety = false;
    var isOPP = false;
    var isSCEM= false;
    var isNew = formContext.ui.getFormType() == 1;

    if (app == 948010000) {
        isSCEM = true;
        if (category == 948010000) {
            isSafety = true;
        }
        else if (category == 948010001) {
            isEngagement = true;
        }
        else if (category == 948010002) {
            isIndigenous = true;
        }
        else if (category == 948010003) {
            isCommittees = true;
        }
    }
    else if (app == 948010001) {
        isOPP = true;
    }

    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_section_App").setVisible(isNew);

    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionOPP").setVisible(isOPP);
    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionOPP2").setVisible(isOPP);
    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionPostEvent").setVisible(isOPP && !isNew);
    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionTDG").setVisible(isSCEM);
    formContext.ui.tabs.get("tabGeneral").sections.get("tabGeneral_sectionContactPerson").setVisible(!isOPP && !isNew);

    formContext.ui.tabs.get("tabGeneral").sections.get("sect_safety").setVisible(isSafety);
    formContext.ui.tabs.get("tabGeneral").sections.get("sect_engagement").setVisible(isEngagement);
    formContext.ui.tabs.get("tabGeneral").sections.get("sect_indigenous").setVisible(isIndigenous);

    formContext.ui.tabs.get("tab_ActionItems").setVisible(!isOPP && !isNew && !isCommittees);
    formContext.ui.tabs.get("tab_Documents").setVisible(!isNew && !isCommittees);
    formContext.ui.tabs.get("tab_ContactEvents").setVisible(isOPP && !isNew);

    //formContext.ui.tabs.get("tabLocation").setVisible(isSafety);
    formContext.ui.tabs.get("tabMarketing").setVisible(isSafety);
    formContext.ui.tabs.get("tabAdministration").setVisible(isSafety);
    formContext.ui.tabs.get("tabApproval").setVisible(isSafety);
    formContext.ui.tabs.get("tabAssessment").setVisible(isSafety);

    formContext.ui.tabs.get("tab_Logisitics").setVisible(isCommittees);
    formContext.ui.tabs.get("tab_Materials").setVisible(isCommittees);
    formContext.ui.tabs.get("tab_Survey").setVisible(isCommittees);

    if (!isOPP) {
        formContext.getAttribute("tc_startdte").setRequiredLevel("none")
        formContext.getAttribute("tc_enddte").setRequiredLevel("none")
    }
    if (!isSafety) {
        formContext.getAttribute("tc_citynm").setRequiredLevel("none")
    }
}