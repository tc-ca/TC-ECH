//https://scemdev1.api.crm3.dynamics.com/api/data/v9.2/tc_yyorganizationagreements?$select=tc_agreementnm&$filter=tc_recipient_legal_name%20eq%20%27University%20Health%20Network%27%20or%20_tc_organizationid_value%20eq%20%27c277d0ce-7280-ec11-8d20-0022486d9460%27

//SCEM-ORGANIZATION.JS
function onformload1(executionContext) { 
    var formContext = executionContext.getFormContext();

    var orgid=formContext.data.entity.getId();
    orgid = orgid.substring(1,37);
    var legalname=formContext.getAttribute("name").getValue();

    var filter = "?$select=tc_agreementnm&$filter=tc_recipient_legal_name%20eq%20%27" + legalname + "%27%20or%20_tc_organizationid_value%20eq%20%27" + orgid + "%27";

    Xrm.WebApi.retrieveMultipleRecords("tc_yyorganizationagreement", filter).then(
        function success(result) {   
            var label=formContext.ui.tabs.get("tab_Agreements").getLabel();
            formContext.ui.tabs.get("tab_Agreements").setLabel(label + " (" + result.entities.length + ")");
            if(result.entities.length>0){     
                 
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );

    var subgrid = formContext.getControl("agreementGrid");
    subgrid.setFilterXml("<filter type='or'><condition attribute='tc_organizationid' operator='eq' uitype='account' value='{" + orgid + "}' /><condition attribute='tc_recipient_legal_name' operator='eq' value='" + legalname + "' /></filter>");
    subgrid.refresh();

    var ttt=subgrid.getGrid().getTotalRecordCount();

}
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
            formContext.ui.tabs.get("tab_Agreements").setLabel("Agreements (" + result.entities.length + ")");
            if(result.entities.length>0){     
                 
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