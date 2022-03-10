//SCEM-IECProject.JS
function onformload(executionContext) {
    var formContext = executionContext.getFormContext();

    RefreshGeographical(formContext);
    
}
function geographical_onchange(executionContext) {
    var formContext = executionContext.getFormContext();
    RefreshGeographical(formContext);
}
function RefreshGeographical(formContext) {
    var latlonginputtype = formContext.getAttribute("tc_latlonginputtype").getValue();

    formContext.ui.tabs.get("tab_Geographical").sections.get("tab_Geographical_section_Decimal").setVisible(latlonginputtype == 948010001);
    formContext.ui.tabs.get("tab_Geographical").sections.get("tab_Geographical_section_DMS").setVisible(latlonginputtype == 948010000);
    formContext.ui.tabs.get("tab_Geographical").sections.get("tab_Geographical_section_DMD").setVisible(latlonginputtype == 948010002);

}
