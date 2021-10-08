//SCEM-EVENT.JS
function onformload(executionContext) {
    var formContext = executionContext.getFormContext();
    refreshsection(formContext);
}
function eventcategory_onchange(executionContext) {
    var formContext = executionContext.getFormContext();
    refreshsection(formContext);
}
function refreshsection(formContext) {
    var category = formContext.getAttribute("tc_tdgcategory").getValue();
    var isEngagement = false;
    var isIndigenous = false;
    var isSafety= false;
    if (category == 948010000) {
        isSafety = true;
    }
    else if (category == 948010001) {
        isEngagement = true;
    }
    else if (category == 948010002) {
        isIndigenous = true;
    }

    formContext.ui.tabs.get("tabGeneral").sections.get("sect_safety").setVisible(isSafety);
    formContext.ui.tabs.get("tabGeneral").sections.get("sect_engagement").setVisible(isEngagement);
    formContext.ui.tabs.get("tabGeneral").sections.get("sect_indigenous").setVisible(isIndigenous);

    formContext.ui.tabs.get("tabLocation").setVisible(isSafety);
    formContext.ui.tabs.get("tabMarketing").setVisible(isSafety);
    formContext.ui.tabs.get("tabAdministration").setVisible(isSafety);
    formContext.ui.tabs.get("tabApproval").setVisible(isSafety);
    formContext.ui.tabs.get("tabAssessment").setVisible(isSafety);
}