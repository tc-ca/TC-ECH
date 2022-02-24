//SCEM-Contact.JS
function onformload(executionContext) {
    var formContext = executionContext.getFormContext();

    var isNew = formContext.ui.getFormType() == 1;

    formContext.ui.tabs.get("tab_Documents").setVisible(!isNew);
    formContext.ui.tabs.get("tab_Events").setVisible(!isNew);


}