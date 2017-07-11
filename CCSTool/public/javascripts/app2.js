'use strict';

var app = angular.module('BlurAdmin', [

    'nvd3',
    'ngAnimate',
    'ngStorage',
    'ui.bootstrap',
    'ngDragDrop',
    'ngDraggable',
    'slickCarousel',
    'ui.sortable',
    'ui.router',
    'ngRoute',
    'ngTouch',
    'toastr',
    'smart-table',
    "xeditable",
    'checklist-model',
    'ui.slimscroll',
    'ngJsTree',
    'angular-progress-button-styles',
    'ngDropdowns',
    'BlurAdmin.theme',
    'BlurAdmin.pages',
    'BlurAdmin.pages.charts.d3'

]);

angular.module('d3', []);
angular.module('BlurAdmin.pages.charts.d3', ['d3']);
angular.module('BlurAdmin.pages.charts.d3medium', ['d3']);



app.factory('dataService', ['$http', dataService]);

function dataService($scope) {

    var lunghezza =  "# 0 ";
    var lunghezza2 = "# 0 ";
    var lunghezza3 = "# 0 ";
    var lunghezza4 = "# 0 ";

    var piechartlunghezza2 = 0;
    var piechartlunghezza3 = 0;
    var piechartlunghezza4 = 0;

    $scope.feed = [];

    var projectID = "";
    var projectNAME = "";
    var projectDESCRIPTION ="";

    var templateID = "";
    var templateNAME = "";
    var templateDESCRIPTION ="";

    var applicationID ="";
    var applicationNAME="";
    var applicationDESCRIPTION="";
    var applicationOWNER="";
    var applicationTECHNOLOGY="";
    var applicationBUSINNESSAREA="";
    var applicationHASTEMPLATE= "";
    var applicationAUTHOR="";
    var applicationHASALLCRITERIA="";

    var applicationLASTDECISIONCOMPUTEDAT = "";
    var applicationLASTCRITERIACREATEDAT="";
    var applicationREADINESSSTATUS="";

    var applicationPUBLICSCORE="";
    var applicationPRIVATESCORE="";

    var data = "";
    var options = "";
    var isFiltered = "";
    var selectedComponents = "";
    var READINESSSTATUS = "";
    var ONECOMPONENTAPPLICATION = "";


    function setPieChartLunghezza2(value) {
       piechartlunghezza2 = value;
    }

    function setPieChartLunghezza3(value) {
        piechartlunghezza3 = value;
    }

    function setPieChartLunghezza4(value) {
        piechartlunghezza4 = value;
    }

    function setFeed(value) {
        $scope.feed = value;
    }

    function setLunghezza(value) {
        lunghezza = value;
    }

    function setLunghezza2(value) {
        lunghezza2 = value;
    }

    function setLunghezza3(value) {
        lunghezza3 = value;
    }

    function setLunghezza4(value) {
        lunghezza4 = value;
    }

    function setProjectID(value) {
        projectID = value;
    }

    function setProjectNAME(value) {
        projectNAME = value;
    }

    function setProjectDESCRIPTION(value) {
        projectDESCRIPTION = value;
    }

    function setTemplateID(value) {
        templateID = value;
    }

    function setTemplateNAME(value) {
        templateNAME = value;
    }

    function setTemplateDESCRIPTION(value) {
        templateDESCRIPTION = value;
    }

    function setApplicationID(value) {
        applicationID = value;
    }

    function setApplicationNAME(value) {
        applicationNAME = value;
    }

    function setApplicationDESCRIPTION(value) {
        applicationDESCRIPTION = value;
    }

    function setApplicationOWNER(value) {
        applicationOWNER = value;
    }

    function setApplicationTECHNOLOGY(value) {
        applicationTECHNOLOGY = value;
    }

    function setApplicationBUSINESS_AREA(value) {
        applicationBUSINNESSAREA = value;
    }

    function setApplicationHASTEMPLATE(value) {
        applicationHASTEMPLATE = value;
    }

    function setApplicationHASALLCRITERIA(value) {
        applicationHASALLCRITERIA = value;
    }

    function setApplicationAUTHOR(value) {
        applicationAUTHOR = value;
    }

    function setApplicationLASTDECISIONCOMPUTEDAT(value) {
        applicationLASTDECISIONCOMPUTEDAT = value;
    }

    function setApplicationLASTCRITERIACREATEDAT(value) {
        applicationLASTCRITERIACREATEDAT = value;
    }

    function setApplicationPUBLICSCORE(value) {
        applicationPUBLICSCORE = value;
    }

    function setApplicationPRIVATESCORE(value) {
        applicationPRIVATESCORE = value;
    }

    function setApplicationREADINESSSTATUS(value) {
        applicationREADINESSSTATUS = value;
    }

    function setData(value) {
        data = value;
    }

    function setOptions(value) {
        options = value;
    }

    function setisFiltered(value) {
        isFiltered = value;
    }

    function setselectedComponents(value) {
        selectedComponents = value;
    }

    function setREADINESSSTATUS(value) {
        READINESSSTATUS = value;
    }

    function setONECOMPONENTAPPLICATION(value) {
        ONECOMPONENTAPPLICATION = value;
    }

    function getPieChartLunghezza2() {
        return piechartlunghezza2;
    }

    function getPieChartLunghezza3() {
        return piechartlunghezza3;
    }

    function getPieChartLunghezza4() {
        return piechartlunghezza4;
    }

    function getFeed() {
        return $scope.feed;
    }

    function getLunghezza() {
        return lunghezza;
    }

    function getLunghezza2() {
        return lunghezza2;
    }

    function getLunghezza3() {
         return lunghezza3;
    }

    function getLunghezza4() {
        return lunghezza4;
    }

    function getProjectID() {
        return projectID;
    }

    function getProjectNAME() {
        return projectNAME;
    }

    function getProjectDESCRIPTION() {
        return projectDESCRIPTION;
    }

    function getTemplateID() {
        return templateID;
    }

    function getTemplateNAME() {
        return templateNAME;
    }

    function getTemplateDESCRIPTION() {
        return templateDESCRIPTION;
    }

    function getApplicationID() {
        return applicationID;
    }

    function getApplicationNAME() {
        return applicationNAME;
    }

    function getApplicationDESCRIPTION() {
        return applicationDESCRIPTION;
    }

    function getApplicationOWNER() {
        return applicationOWNER;
    }

    function getApplicationTECHNOLOGY() {
        return applicationTECHNOLOGY;
    }

    function getApplicationBUSINESS_AREA() {
        return applicationBUSINNESSAREA;
    }

    function getApplicationHASTEMPLATE() {
        return applicationHASTEMPLATE;
    }

    function getApplicationHASALLCRITERIA() {
        return applicationHASALLCRITERIA;
    }

    function getApplicationAUTHOR() {
        return applicationAUTHOR;
    }

    function getApplicationLASTDECISIONCOMPUTEDAT() {
        return applicationLASTDECISIONCOMPUTEDAT;
    }

    function getApplicationLASTCRITERIACREATEDAT() {
        return applicationLASTCRITERIACREATEDAT;
    }

    function getApplicationPUBLICSCORE() {
        return applicationPUBLICSCORE;
    }

    function getApplicationPRIVATESCORE() {
        return applicationPRIVATESCORE;
    }

    function getApplicationREADINESSSTATUS() {
        return applicationREADINESSSTATUS;
    }

    function getData() {
       return data;
    }

    function getOptions() {
        return options;
    }

    function getisFiltered() {
        return isFiltered;
    }

    function getselectedComponents() {
        return selectedComponents;
    }

    function getREADINESSSTATUS() {
        return READINESSSTATUS;
    }

    function getONECOMPONENTAPPLICATION() {
        return ONECOMPONENTAPPLICATION;
    }


    return {

        setFeed: setFeed,
        getFeed: getFeed,

        setPieChartLunghezza2: setPieChartLunghezza2,
        getPieChartLunghezza2: getPieChartLunghezza2,
        setPieChartLunghezza3: setPieChartLunghezza3,
        getPieChartLunghezza3: getPieChartLunghezza3,
        setPieChartLunghezza4: setPieChartLunghezza4,
        getPieChartLunghezza4: getPieChartLunghezza4,

        setLunghezza: setLunghezza,
        getLunghezza: getLunghezza,
        setLunghezza2: setLunghezza2,
        getLunghezza2: getLunghezza2,
        setLunghezza3: setLunghezza3,
        getLunghezza3: getLunghezza3,
        setLunghezza4: setLunghezza4,
        getLunghezza4: getLunghezza4,

        setProjectID: setProjectID,
        getProjectID: getProjectID,
        setProjectNAME: setProjectNAME,
        getProjectNAME: getProjectNAME,
        setProjectDESCRIPTION: setProjectDESCRIPTION,
        getProjectDESCRIPTION: getProjectDESCRIPTION,

        setTemplateID: setTemplateID,
        getTemplateID: getTemplateID,
        setTemplateNAME: setTemplateNAME,
        getTemplateNAME: getTemplateNAME,
        setTemplateDESCRIPTION: setTemplateDESCRIPTION,
        getTemplateDESCRIPTION: getTemplateDESCRIPTION,

        setApplicationID: setApplicationID,
        getApplicationID: getApplicationID,
        setApplicationNAME: setApplicationNAME,
        getApplicationNAME: getApplicationNAME,
        setApplicationDESCRIPTION: setApplicationDESCRIPTION,
        getApplicationDESCRIPTION: getApplicationDESCRIPTION,
        setApplicationOWNER: setApplicationOWNER,
        getApplicationOWNER: getApplicationOWNER,
        setApplicationTECHNOLOGY: setApplicationTECHNOLOGY,
        getApplicationTECHNOLOGY: getApplicationTECHNOLOGY,
        setApplicationBUSINESS_AREA: setApplicationBUSINESS_AREA,
        getApplicationBUSINESS_AREA: getApplicationBUSINESS_AREA,
        setApplicationHASTEMPLATE: setApplicationHASTEMPLATE,
        getApplicationHASTEMPLATE: getApplicationHASTEMPLATE,
        setApplicationHASALLCRITERIA: setApplicationHASALLCRITERIA,
        getApplicationHASALLCRITERIA: getApplicationHASALLCRITERIA,
        setApplicationAUTHOR: setApplicationAUTHOR,
        getApplicationAUTHOR: getApplicationAUTHOR,
        setApplicationLASTDECISIONCOMPUTEDAT: setApplicationLASTDECISIONCOMPUTEDAT,
        getApplicationLASTDECISIONCOMPUTEDAT: getApplicationLASTDECISIONCOMPUTEDAT,
        setApplicationLASTCRITERIACREATEDAT: setApplicationLASTCRITERIACREATEDAT,
        getApplicationLASTCRITERIACREATEDAT: getApplicationLASTCRITERIACREATEDAT,

        setApplicationPUBLICSCORE: setApplicationPUBLICSCORE,
        getApplicationPUBLICSCORE: getApplicationPUBLICSCORE,
        setApplicationPRIVATESCORE: setApplicationPRIVATESCORE,
        getApplicationPRIVATESCORE: getApplicationPRIVATESCORE,

        setApplicationREADINESSSTATUS: setApplicationREADINESSSTATUS,
        getApplicationREADINESSSTATUS: getApplicationREADINESSSTATUS,

        setData: setData,
        getData: getData,
        setOptions: setOptions,
        getOptions: getOptions,
        setisFiltered: setisFiltered,
        getisFiltered: getisFiltered,
        setselectedComponents: setselectedComponents,
        getselectedComponents: getselectedComponents,
        setREADINESSSTATUS: setREADINESSSTATUS,
        getREADINESSSTATUS: getREADINESSSTATUS,
        setONECOMPONENTAPPLICATION: setONECOMPONENTAPPLICATION,
        getONECOMPONENTAPPLICATION: getONECOMPONENTAPPLICATION
    };
}




