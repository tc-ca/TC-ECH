//SCEM-GPSCoordinate.JS
function onformload(executionContext) {
    var formContext = executionContext.getFormContext();

    RefreshGeographical(formContext);
    
}
function inputtype_onchange(executionContext) {
    var formContext = executionContext.getFormContext();
    RefreshGeographical(formContext);
}
function RefreshGeographical(formContext) {
    var latlonginputtype = formContext.getAttribute("tc_latlonginputtypecd").getValue();

    formContext.ui.tabs.get("tab_General").sections.get("tab_General_section_Decimal").setVisible(latlonginputtype == 948010001);
    formContext.ui.tabs.get("tab_General").sections.get("tab_General_section_DMS").setVisible(latlonginputtype == 948010000);
    formContext.ui.tabs.get("tab_General").sections.get("tab_General_section_DMD").setVisible(latlonginputtype == 948010002);

}