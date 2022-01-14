//SCEM-ORGANIZATION.JS
function onformload(executionContext) {
    var formContext = executionContext.getFormContext();
    refreshorgtype(formContext);

    var isNew = formContext.ui.getFormType() == 1;

    formContext.ui.tabs.get("tab_General").setVisible(!isNew);
    formContext.ui.tabs.get("tab_Documents").setVisible(!isNew);
    formContext.ui.tabs.get("tab_Connections").setVisible(!isNew);
    formContext.ui.tabs.get("tab_Files").setVisible(!isNew);
    formContext.ui.tabs.get("tab_Events").setVisible(!isNew);
    if(isNew){
        formContext.ui.tabs.get("tab_Details").sections.get("tab_Details_section_Indigenous").setVisible(false);
    }
    

}
function orgtype_onchange(executionContext) {
    var formContext = executionContext.getFormContext();
    refreshorgtype(formContext);
}
function refreshorgtype(formContext) {
    var orgType = formContext.getAttribute("tc_oppaccounttypeid").getValue();

    if (orgType) {
        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/tc_tyaccounttypes(" + orgType[0].id.substring(1, 37) + ")?$select=tc_categorycd", true);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var result = JSON.parse(this.response);
                    var tc_categorycd = result["tc_categorycd"];
                    if (tc_categorycd== 948010000) {
                        formContext.ui.tabs.get("tab_Details").sections.get("tab_Details_section_Indigenous").setVisible(true);
                    }
                    else {
                        formContext.ui.tabs.get("tab_Details").sections.get("tab_Details_section_Indigenous").setVisible(false);
                    }
                } else {
                    //Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send();
    }

    
}