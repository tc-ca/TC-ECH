//SCEM-ORGANIZATION.JS
function onformload(executionContext) {
    var formContext = executionContext.getFormContext();
    refreshorgtype(formContext);

    var isNew = formContext.ui.getFormType() == 1;

    formContext.ui.tabs.get("tab_General").setVisible(!isNew);
    formContext.ui.tabs.get("tab_Documents").setVisible(!isNew);
    formContext.ui.tabs.get("tab_Agreements").setVisible(!isNew);    

    if(isNew){
        formContext.ui.tabs.get("tab_Details").sections.get("tab_Details_section_Indigenous").setVisible(false);
    }
    //var AgreementsCount = Xrm.Page.getControl("subgrid_Agreements").getGrid().getTotalRecordCount();
    //formContext.ui.tabs.get("tab_Agreements").setLabel("Agreements(" + AgreementsCount + ")");
    var orgid=formContext.data.entity.getId();
    Xrm.WebApi.retrieveMultipleRecords("tc_yyorganizationagreement", "?$select=tc_agreementnm&$filter=_tc_organizationid_value%20eq%20%27" + orgid + "%27").then(
        function success(result) {   
            if(result.entities.length>0){     
                formContext.ui.tabs.get("tab_Agreements").setLabel("Agreements(" + result.entities.length + ")");
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

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