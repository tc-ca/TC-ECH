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

function dmslat_onchange(executionContext) {
    var formContext = executionContext.getFormContext();

    var degree = formContext.getAttribute("tc_latitudedegree").getValue();
    var min = formContext.getAttribute("tc_latitudeminutenum").getValue();
    var sec = formContext.getAttribute("tc_latitudesecond").getValue();

    if(degree>0){
        var latitude = parseFloat((degree + min/60 + sec/3600).toFixed(5));
        formContext.getAttribute("tc_latitudenum").setValue(latitude);
    }
    else{
        var latitude = parseFloat((degree - (min/60 + sec/3600)).toFixed(5));
        formContext.getAttribute("tc_latitudenum").setValue(parseFloat(latitude));
    }
}
function dmslong_onchange(executionContext) {
    var formContext = executionContext.getFormContext();

    var degree = formContext.getAttribute("tc_longitudedegree").getValue();
    var min = formContext.getAttribute("tc_longitudeminutenum").getValue();
    var sec = formContext.getAttribute("tc_longitudesecond").getValue();

    if(degree>0){
        var longitude = parseFloat((degree + min/60 + sec/3600).toFixed(5));
        formContext.getAttribute("tc_longitudenum").setValue(longitude);
    }
    else{
        var longitude = parseFloat((degree - (min/60 + sec/3600)).toFixed(5));
        formContext.getAttribute("tc_longitudenum").setValue(longitude);
    }
    
}
function declat_onchange(executionContext) {
    var formContext = executionContext.getFormContext();
    var lat = formContext.getAttribute("tc_latitudenum").getValue();
    var tt=1;
    if(lat<0){tt=-1;}
    var convertLat = Math.abs(lat);
    var Deg = Math.floor(convertLat);
    var minutesNotTruncated = (convertLat - Deg) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    formContext.getAttribute("tc_latitudedegree").setValue(Deg * tt);
    formContext.getAttribute("tc_latitudeminutenum").setValue(minutes);
    formContext.getAttribute("tc_latitudesecond").setValue(seconds);
}
function declong_onchange(executionContext) {
    var formContext = executionContext.getFormContext();
   
    var long = formContext.getAttribute("tc_longitudenum").getValue();
    var tt=1;
    if(long<0){tt=-1;}

    var convertLong = Math.abs(long);
    var Deg = Math.floor(convertLong);
    var minutesNotTruncated = (convertLong - Deg) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    formContext.getAttribute("tc_longitudedegree").setValue(tt * Deg);
    formContext.getAttribute("tc_longitudeminutenum").setValue(minutes);
    formContext.getAttribute("tc_longitudesecond").setValue(seconds);
}