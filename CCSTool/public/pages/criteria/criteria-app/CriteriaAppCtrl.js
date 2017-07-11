(function () {
    'use strict';

    angular.module('BlurAdmin.pages.criteria')
        .controller('CriteriaAppCtrl', CriteriaAppCtrl);


    /** @ngInject */
    function CriteriaAppCtrl($scope, $http, $filter, dataService, $state, $uibModal) {

        $scope.dataHasLoaded = false;

        $scope.oldAnswerTemplate = [];

        $scope.Criteria = [];
        $scope.Criteria2 = [];

        $scope.CriteriaValues = [];
        $scope.CriteriaValues2 = [];

        $scope.CriteriaValue = [];
        $scope.CriteriaValue2 = [];

        $scope.CriteriaNameID = [];
        $scope.CriteriaNameID2 = [];

        $scope.CriteriaValueID = [];
        $scope.CriteriaValueID2 = [];

        $scope.projectID = dataService.getProjectID();

        $scope.CriteriaValueSelected = [];
        $scope.CriteriaValueSelected2 = [];

        $scope.CriteriaValueSelectedAtStart = [];
        $scope.CriteriaValueSelectedAtStart2 = [];

        // Dati dell' Applicazione aperta.
        $scope.applicationID = dataService.getApplicationID();
        $scope.applicationNAME = dataService.getApplicationNAME();
        $scope.applicationDESCRIPTION = dataService.getApplicationDESCRIPTION();
        $scope.applicationOWNER = dataService.getApplicationOWNER();
        $scope.applicationTECHNOLOGY = dataService.getApplicationTECHNOLOGY();
        $scope.applicationBUSINESSAREA = dataService.getApplicationBUSINESS_AREA();
        $scope.applicationHASTEMPLATE = dataService.getApplicationHASTEMPLATE();
        $scope.applicationHASALLCRITERIA = dataService.getApplicationHASALLCRITERIA();
        $scope.applicationAUTHOR = dataService.getApplicationAUTHOR();
        $scope.applicationLASTDECISIONCOMPUTEDAT = dataService.getApplicationLASTDECISIONCOMPUTEDAT();
        $scope.applicationLASTCRITERIACREATEDAT = dataService.getApplicationLASTCRITERIACREATEDAT();

        $scope.applicationPUBLICSCORE = dataService.getApplicationPUBLICSCORE();
        $scope.applicationPRIVATESCORE = dataService.getApplicationPRIVATESCORE();

        $scope.applicationREADINESSSTATUS = dataService.getApplicationREADINESSSTATUS();


        $scope.checked = true;

        if ($scope.applicationHASTEMPLATE == 0) {

            $scope.checked = false;
        }

        $scope.feed2 = [

            {   author: $scope.applicationAUTHOR,
                type: 'video-message'
            }

        ];

        $scope.CriteriaValueSelected = [];

        $scope.slickPanels = {
            method: {},
            dots:false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoPlay: false,
            adaptiveHeight: true,
            event: {
                beforeChange: function() {
                    console.log("before change called");
                },
                afterChange: function() {
                    console.log("after called");
                }
            }
        };

        // Se l'applicazione ho un template entro qua
        if( $scope.applicationHASTEMPLATE == 1) {

            $scope.showPanelSwitchTemplate = true;

            $http.get('api/v1/application_template?application_id=' + $scope.applicationID + '&project_id=' + $scope.projectID + '&enabled=1' )
                .then(function(response) {

                    for (var x = 0; x < response.data.length; x++) {


                        $scope.CriteriaValueSelected.push(response.data[x].CRITERIAVALUEID.toString());
                        $scope.CriteriaValueSelectedAtStart.push(response.data[x].CRITERIAVALUEID.toString());

                    }

                    getTextAreaAnswer();
                    calcolaPagina();


                });


        }

        // Se l'applicazione non ho un template entro qua
        if ($scope.applicationHASTEMPLATE == 0) {

            $http.get('/api/v1/application_criteria?application_id=' + $scope.applicationID + '&project_id=' + $scope.projectID)
                .then(function(response) {


                for (var x = 0; x < response.data.length; x++) {

                    $scope.CriteriaNameID.push(response.data[x].CRITERIANAMEID.toString());
                    $scope.CriteriaValueID.push(response.data[x].CRITERIAVALUEID.toString());

                }

                    // alert("I criteria name id della get su application_criteria sono" +JSON.stringify($scope.CriteriaNameID));
                    //alert("I criteria value id della get su application_criteria sono" +JSON.stringify($scope.CriteriaValueID));

                    calcolaPossibileVecchioTemplate();
                    getTextAreaAnswer();
                    calcolaPagina();
                });


        }

        $scope.oldCriteriaValueSelected = [];
        $scope.oldCriteriaValueSelectedAtStart = [];

        // Se l'applicazione non ha un template, vedo se ne aveva uno in passato
        function calcolaPossibileVecchioTemplate() {

            $http.get('api/v1/application_template?application_id=' + $scope.applicationID + '&project_id=' + $scope.projectID + '&enabled=0' )
                .then(function(response) {

                    for (var x = 0; x < response.data.length; x++) {


                        $scope.oldCriteriaValueSelected.push(response.data[x].CRITERIAVALUEID.toString());
                        $scope.oldCriteriaValueSelectedAtStart.push(response.data[x].CRITERIAVALUEID.toString());

                    }

                    for (var r = 0; r < response.data.length; r++) {

                        if ( $scope.oldCriteriaValueSelected[r] == $scope.CriteriaValueID[r] ) {

                            $scope.oldAnswerTemplate.push(false);

                        }

                        else $scope.oldAnswerTemplate.push(true);

                    }

                   // alert("LE RISPOSTE DEL VECCHIO TEMPLATE SONO: " +JSON.stringify($scope.oldCriteriaValueSelected));
                    //alert("LE RISPOSTE DEL NUOVO TEMPLATE SONO: " + JSON.stringify($scope.CriteriaValueID));

                    //alert("L'array oldAnswerTemplate è: " + JSON.stringify($scope.oldAnswerTemplate));

                });


        }


        // Prendo tutti i dati per costruire la pagina dei Criteria 1A
        function calcolaPagina() {

            $http.get('api/v1/criteria_name_value')
                .then(function (response) {

                    var count = 0;

                    for (var i = 0; i < response.data.length; i++) {

                        //tutti i dati
                        $scope.Criteria.push(response.data[i]);

                        //gli id dei criteria value da associare alle risposte che vedo
                        $scope.CriteriaValues.push.apply($scope.CriteriaValues, response.data[i].CRITERIANAMEVALUES);

                        //alert("criteriaNameID1: " +JSON.stringify($scope.CriteriaNameID[count]));
                       // alert("criteriaNameID2: " + JSON.stringify(response.data[i].CRITERIANAME.CRITERIANAMEID));

                        if ($scope.CriteriaNameID[count] == response.data[i].CRITERIANAME.CRITERIANAMEID) {

                            $scope.CriteriaValueSelected.push($scope.CriteriaValueID[count].toString());
                            $scope.CriteriaValueSelectedAtStart.push($scope.CriteriaValueID[count].toString());

                            count++;

                        }

                        else {
                            $scope.CriteriaValueSelected.push("0");
                            $scope.CriteriaValueSelectedAtStart.push("0")

                        };
                    }

                   // alert(JSON.stringify($scope.CriteriaValueSelected));


                });
        }

        // Prendo le risposte associate alla parte dei criteria 1B e dopo carico la pagina dei criteria 1B
        function getTextAreaAnswer() {

            $http.get('/api/v1/application_data_collection?application_id=' + $scope.applicationID + '&project_id=' + $scope.projectID)
                .then(function(response) {

                    for (var x = 0; x < response.data.length; x++) {

                        $scope.CriteriaNameID2.push(response.data[x].DATACOLLECTIONID.toString());
                        $scope.CriteriaValueID2.push(response.data[x].VALUE.toString());

                    }

                    calcoloPagina2();

                });

        }

        // Calcolo la pagina dei criteria 1B
        function calcoloPagina2() {

            $http.get('api/v1/data_collection')
                .then(function (response) {

                    var count = 0;

                    for (var i = 0; i < response.data.length; i++) {

                        $scope.Criteria2.push(response.data[i]);

                        if ($scope.CriteriaNameID2[count] == response.data[i].DATACOLLECTIONID) {

                            $scope.CriteriaValueSelected2.push($scope.CriteriaValueID2[count].toString());
                            $scope.CriteriaValueSelectedAtStart2.push($scope.CriteriaValueID2[count].toString());

                            count++;

                        }

                        else {

                            $scope.CriteriaValueSelected2.push(null);
                            $scope.CriteriaValueSelectedAtStart2.push(null)

                        };


                    }


                });


        }

        $scope.NewCriteriaValueSelected =[];
        $scope.NewCriteriaValueSelected2 =[];

        // Se ho dissociato un template lancio questo metodo
        $scope.SwitchMethod = function(checked) {

            if ( checked == true) {

                $state.reload();

            }

        }

        // metodo che parte quando salvo i criteria 1A
        $scope.Salvamodulo = function(CriteriaValueSelected) {

            cancelloTemplate();

        $scope.NewCriteriaValueSelected = CriteriaValueSelected;


    var parameter = [];
    var count = 0;


    for (var i = 0; i < $scope.Criteria.length; i++) {

        parameter.push({

            application_id: $scope.applicationID,
            criteria_name_id: $scope.Criteria[i].CRITERIANAME.CRITERIANAMEID,
            criteria_value_id: $scope.NewCriteriaValueSelected[i],
            project_id: $scope.projectID
        });

    }

    var parameter2 =JSON.stringify(parameter);
    //alert("parameter 2 è:" +parameter2);

            $http.post('/api/v1/application_criteria/batch', parameter2)
                .success(function (data, status) {

                    //alert(JSON.stringify(data));
                   // alert("Post fatta: criteria salvati nell'applicazione POST, adesso faccio la PUT");
                    faccioLaPut(parameter2);

                }).error(function (data, status, headers, config) {

                  //  alert("Error: POST Criteria not saved, lancio la PUT");
                    faccioLaPut(parameter2);

            });


}

        // metodo che parte quando salvo i criteria 1B
        $scope.SalvamoduloB = function(CriteriaValueSelected2) {

            $scope.NewCriteriaValueSelected2 = CriteriaValueSelected2;

            var parameter = [];
            var count = 0;


            for (var i = 0; i < $scope.Criteria2.length; i++) {

                parameter.push({

                    application_id: $scope.applicationID,
                    data_collection_id: $scope.Criteria2[i].DATACOLLECTIONID,
                    value: $scope.NewCriteriaValueSelected2[i],
                    project_id: $scope.projectID
                });

            }

            //alert("parameter 2 è:" + parameter[0].value);

            //alert("la lunghezza di parameter è: " + parameter.length);

            var nonLanciare = false;

            for (var g = 0; g < parameter.length; g++) {

                if ((parameter[g].value == "") && ($scope.CriteriaValueSelectedAtStart2[g] == null)) {

                    parameter[g].value = null;

                }

                if ((parameter[g].value == "") && ($scope.CriteriaValueSelectedAtStart2[g] != null)) {


                    open('pages/ui/modals/modalTemplates/dangerTextAreaMissingValue.html');
                    nonLanciare = true;
                }

            }

            var parameter2 = JSON.stringify(parameter);

            if (nonLanciare == false) {

                confermaLancioB(parameter2);

            }

        }

        function confermaLancioB(parameter2) {

            $http.post('/api/v1/application_data_collection/batch', parameter2)
                .success(function (data, status) {

                    //alert(JSON.stringify(data));
                    // alert("Post fatta: criteria salvati nell'applicazione POST, adesso faccio la PUT");
                   // faccioLaPut(parameter2);
                    faccioLaPutB(parameter2);


                }).error(function (data, status, headers, config) {

                 //alert("Error: POST Criteria not saved, lancio la PUT");
                // faccioLaPut(parameter2);
                faccioLaPutB(parameter2);


            });


        }


        function faccioLaPut(parameter2) {

    $http.put('/api/v1/application_criteria/batch', parameter2)
        .success(function (data, status) {

           // alert("criteria salvati nell'applicazione effettuando la  PUT");

            refreshPage();

        }).error(function (data, status, headers, config) {


            //alert("Error: Criteria not saved effettuando la PUT");
            refreshPage();
        });

}

        function faccioLaPutB(parameter2) {

            $http.put('/api/v1/application_data_collection/batch', parameter2)
                .success(function (data, status) {

                    // alert("criteria salvati nell'applicazione effettuando la  PUT");

                    $state.reload();

                }).error(function (data, status, headers, config) {

                    $state.reload();

                //alert("Error: Criteria not saved effettuando la PUT");
            });

        }


        function refreshPage() {

            $http.get("/api/v1/application?" + "project_id=" + $scope.projectID)
                .then(function(response) {

                    //alert("Numero di applicazioni: " + JSON.stringify(response));
                    for (var m = 0; m < response.data.length; m++) {

                        if (response.data[m].APPLICATIONID == $scope.applicationID) {

                            $scope.feed = (response.data[m]);


                                if (response.data[m].HASALLCRITERIA == 0 && response.data[m].HASTEMPLATE == 0) {

                                    $scope.feed.READINESSSTATUS = "readinessNotReady";

                                }

                                else if ( (response.data[m].HASALLCRITERIA == 1 || response.data[m].HASTEMPLATE == 1) &&  response.data[m].LASTDECISIONCOMPUTEDAT == null ) {

                                    $scope.feed.READINESSSTATUS = "readinessReady";

                                }

                                //caso in cui ho calcolato la readiness ed ho aggiornaot dopo l'applicazione
                                else if ( (response.data[m].LASTDECISIONCOMPUTEDAT < response.data[m].LASTCRITERIACREATEDAT) && response.data[m].LASTDECISIONCOMPUTEDAT != null ) {


                                    $scope.feed.READINESSSTATUS = "readinessNotUpdated";

                                }

                                // Caso in cui ho calcolato la readiness ma non ho mai aggiornato l'applicazione
                                else if ( response.data[m].LASTDECISIONCOMPUTEDAT != null && response.data[m].LASTCRITERIACREATEDAT == null ) {

                                    $scope.feed.READINESSSTATUS = "readinessOk";

                                }

                                //caso in cui ho calcolato la readiness ed ho aggiornato prima l'applicazione
                                else if ( response.data[m].LASTDECISIONCOMPUTEDAT >= response.data[m].LASTCRITERIACREATEDAT ) {

                                    $scope.feed.READINESSSTATUS = "readinessOk";

                                }


                        }

                    }

                    refreshData($scope.feed);

                });

        }

        function refreshData(feed) {

            dataService.setApplicationHASTEMPLATE(feed.HASTEMPLATE);
            dataService.setApplicationHASALLCRITERIA(feed.HASALLCRITERIA);
            dataService.setApplicationLASTDECISIONCOMPUTEDAT(feed.LASTDECISIONCOMPUTEDAT);
            dataService.setApplicationLASTCRITERIACREATEDAT(feed.LASTCRITERIACREATEDAT);
            dataService.setApplicationREADINESSSTATUS(feed.READINESSSTATUS);

            if ( feed.HASTEMPLATE == 0 && feed.HASALLCRITERIA == 1 ) {

                dataService.setApplicationAUTHOR('app_logo_completed');


            }

            $state.reload();

        }

        function cancelloTemplate() {

            if ($scope.checked == false) {

                $http({
                    url: '/api/v1/application_template',
                    method: 'DELETE',
                    data: {
                        application_id: $scope.applicationID,
                        project_id: $scope.projectID
                    },
                    headers: {
                        "Content-Type": "application/json;" +
                        "charset=utf-8"
                    }
                }).then(function(res) {

                    dataService.setApplicationHASTEMPLATE(0);
                    dataService.setApplicationHASALLCRITERIA(1);
                    dataService.setApplicationAUTHOR('app_logo_completed');

                    console.log(res.data);
                }, function(error) {
                    console.log(error);
                });

            }

        }

        $scope.calcolaReadiness = function() {

            $scope.appID = {

                "application_id": $scope.applicationID,
                "project_id": $scope.projectID

            }

            $http.put('/api/v1/decision', $scope.appID)
                .success(function (data, status) {

                    $scope.applicationPUBLICSCORE = data.PUBLICSCORE;
                    $scope.applicationPRIVATESCORE = data.PRIVATESCORE;

                    dataService.setApplicationPUBLICSCORE(data.PUBLICSCORE);
                    dataService.setApplicationPRIVATESCORE(data.PRIVATESCORE);

                    ricalcolaStatus();
                    //alert("Readiness calculated with success");

                }).error(function (data, status, headers, config) {

                alert("Error: Readiness not calculated");

            });

        }

        function ricalcolaStatus() {

            $http.get("/api/v1/application?" + "project_id=" + $scope.projectID)
                .then(function(response) {

                    //alert("Numero di applicazioni: " + JSON.stringify(response));
                    for (var m = 0; m < response.data.length; m++) {

                        if (response.data[m].APPLICATIONID == $scope.applicationID) {

                            if (response.data[m].HASALLCRITERIA == 0 && response.data[m].HASTEMPLATE == 0) {

                                $scope.applicationREADINESSSTATUS = "readinessNotReady";

                            }

                            else if ( (response.data[m].HASALLCRITERIA == 1 || response.data[m].HASTEMPLATE == 1) &&  response.data[m].LASTDECISIONCOMPUTEDAT == null ) {

                                $scope.applicationREADINESSSTATUS = "readinessReady";

                            }

                            //caso in cui ho calcolato la readiness ed ho aggiornaot dopo l'applicazione
                            else if ( (response.data[m].LASTDECISIONCOMPUTEDAT < response.data[m].LASTCRITERIACREATEDAT) && response.data[m].LASTDECISIONCOMPUTEDAT != null ) {


                                $scope.applicationREADINESSSTATUS = "readinessNotUpdated";

                            }

                            // Caso in cui ho calcolato la readiness ma non ho mai aggiornato l'applicazione
                            else if ( response.data[m].LASTDECISIONCOMPUTEDAT != null && response.data[m].LASTCRITERIACREATEDAT == null ) {

                                $scope.applicationREADINESSSTATUS = "readinessOk";

                            }

                            //caso in cui ho calcolato la readiness ed ho aggiornato prima l'applicazione
                            else if ( response.data[m].LASTDECISIONCOMPUTEDAT >= response.data[m].LASTCRITERIACREATEDAT ) {

                                $scope.applicationREADINESSSTATUS = "readinessOk";

                            }


                        }

                    }


                });
        }

        function open(page, size) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };


        $scope.dependencyAppLow = [];
        $scope.dependencyAppMedium = [];
        $scope.dependencyAppHigh = [];
        $scope.dependencyApp = [];

        $http.get('/api/v1/application_related?application_id_from=' + $scope.applicationID + '&project_id=' + $scope.projectID)
            .then(function(response) {

                //alert(JSON.stringify(response.data));
                /*
                for ( var i = 0; i < response.data.length; i++) {

                    if (response.data[i].RELATIONSHIP == "L") {

                        $scope.dependencyAppLow.push(response.data[i].APPLICATIONTOID);

                    }

                    if (response.data[i].RELATIONSHIP == "M") {

                        $scope.dependencyAppMedium.push(response.data[i].APPLICATIONTOID);

                    }

                    if (response.data[i].RELATIONSHIP == "H") {

                        $scope.dependencyAppHigh.push(response.data[i].APPLICATIONTOID);

                    }

                }

                */

                for ( var i = 0; i < response.data.length; i++) {

                        $scope.dependencyApp.push(response.data[i].APPLICATIONTOID);

                }

                prendoTutteLeApp();

                });


        $scope.allApplications = [];
        $scope.AllApplicationsID = [];
        $scope.dependencyAppDefault = [];
        $scope.appInfo = [];

        $scope.dependencyApp2 = [];
        $scope.dependencyAppLow2 = [];
        $scope.dependencyAppMedium2 = [];
        $scope.dependencyAppHigh2 = [];

        function prendoTutteLeApp() {

            $http.get("/api/v1/application?" + "project_id=" + $scope.projectID)
                .then(function (response) {

                    for (var i = 0; i < response.data.length; i++) {

                        if (response.data[i].APPLICATIONID != $scope.applicationID) {

                            $scope.AllApplicationsID.push({

                                ID: response.data[i].APPLICATIONID,
                                NAME: response.data[i].NAME

                            })

                        }

                        for ( var z = 0; z < $scope.dependencyApp.length; z++) {

                            if (response.data[i].APPLICATIONID == $scope.dependencyApp[z]) {

                                $scope.dependencyApp2.push({

                                    ID: response.data[i].APPLICATIONID,
                                    NAME: response.data[i].NAME,
                                    author: 'app_logo_low'

                                });
                            }

                        }

                        for ( var a = 0; a < $scope.dependencyAppLow.length; a++) {

                            if (response.data[i].APPLICATIONID == $scope.dependencyAppLow[a]) {

                                $scope.dependencyAppLow2.push({

                                    ID: response.data[i].APPLICATIONID,
                                    NAME: response.data[i].NAME,
                                    author: 'app_logo_low',
                                    relationship: "L"

                                });
                            }

                        }

                        for ( var b = 0; b < $scope.dependencyAppMedium.length; b++) {

                            if (response.data[i].APPLICATIONID == $scope.dependencyAppMedium[b]) {

                                $scope.dependencyAppMedium2.push({

                                    ID: response.data[i].APPLICATIONID,
                                    NAME: response.data[i].NAME,
                                    author: 'app_logo_medium',
                                    relationship: "M"

                                });
                            }

                        }

                        for ( var c = 0; c < $scope.dependencyAppHigh.length; c++) {

                            if (response.data[i].APPLICATIONID == $scope.dependencyAppHigh[c]) {

                                $scope.dependencyAppHigh2.push({

                                    ID: response.data[i].APPLICATIONID,
                                    NAME: response.data[i].NAME,
                                    author: 'app_logo_high',
                                    relationship: "H"

                                });
                            }

                        }


                    }

                  //  alert(JSON.stringify($scope.dependencyAppLow2));
                  //  alert(JSON.stringify($scope.AllApplicationsID));

                    calcolaDependencyAppDefault();

                   // alert("tutti gli ID delle applicazioni (tranne quella selezionata) sono: " + JSON.stringify($scope.AllApplicationsID));


                });

        }

        $scope.dependencyAppLowMediumHigh = [];

        var stoscrollando = false;

        $scope.stoscrollando = function(event, ui) {

            stoscrollando = true;

        };


        function calcolaDependencyAppDefault() {

            $scope.dependencyAppLowMediumHigh = $scope.dependencyAppLow2.concat($scope.dependencyAppMedium2, $scope.dependencyAppHigh2);


            for ( var i = 0; i < $scope.AllApplicationsID.length; i ++) {

                var count = 0;


                for (var j = 0; j < $scope.dependencyApp2.length; j++) {


                    if ($scope.AllApplicationsID[i].ID == $scope.dependencyApp2[j].ID  ) {

                        count++;

                    }

                }

                if (count == 0) {

                    $scope.dependencyAppDefault.push({

                        ID: $scope.AllApplicationsID[i].ID,
                        NAME: $scope.AllApplicationsID[i].NAME,
                        author: 'app_logo'


                    });

                }

            }

            //calcolanodesL();
            calcolaSlidesNumber();


        }

        $scope.NewDependency = [];

        $scope.salvaDependency = function() {

            //alert(JSON.stringify($scope.dependencyApp2));

            for ( var a = 0; a < $scope.dependencyApp2.length; a++) {

                $scope.NewDependency.push({

                    application_id_from: $scope.applicationID,
                    application_id_to: $scope.dependencyApp2[a].ID,
                    project_id: $scope.projectID

                });

            }
            /*
            for ( var a = 0; a < $scope.dependencyAppLow2.length; a++) {

                $scope.NewDependency.push({

                    application_id_from: $scope.applicationID,
                    application_id_to: $scope.dependencyAppLow2[a].ID,
                    relationship: "L",
                    project_id: $scope.projectID

                });

            }

            for ( var b = 0; b < $scope.dependencyAppMedium2.length; b++) {

                $scope.NewDependency.push({

                    application_id_from: $scope.applicationID,
                    application_id_to: $scope.dependencyAppMedium2[b].ID,
                    relationship: "M",
                    project_id: $scope.projectID

                });

            }

            for ( var c = 0; c < $scope.dependencyAppHigh2.length; c++) {

                $scope.NewDependency.push({

                    application_id_from: $scope.applicationID,
                    application_id_to: $scope.dependencyAppHigh2[c].ID,
                    relationship: "H",
                    project_id: $scope.projectID

                });

            }

            */

            var parameter400 = JSON.stringify($scope.NewDependency);

            //alert(parameter400);

            $http.post('/api/v1/application_related/batch', parameter400)
                .success(function (data, status) {

                    //alert(JSON.stringify(data));
                    // alert("Post fatta: criteria salvati nell'applicazione POST, adesso faccio la PUT");
                    // faccioLaPut(parameter2);
                    // faccioLaPutB(parameter2);

                   // faccioLaPutDependency(parameter400);
                    faccioLaDeleteDependency();


                }).error(function (data, status, headers, config) {

                //alert("Error: POST Criteria not saved, lancio la PUT");
                // faccioLaPut(parameter2);
                //faccioLaPutB(parameter2);
                faccioLaDeleteDependency();


                // faccioLaPutDependency(parameter400);


            });
        }

        function faccioLaPutDependency(parameter400) {

            $http.put('/api/v1/application_related/batch', parameter400)
                .success(function (data, status) {

                    // alert("criteria salvati nell'applicazione effettuando la  PUT");

                    faccioLaDeleteDependency();


                }).error(function (data, status, headers, config) {

                faccioLaDeleteDependency();


                //alert("Error: Criteria not saved effettuando la PUT");
            });

        }

        $scope.dependencyAppLowMediumHigh2 = [];
        $scope.dependencyToDelete = [];

        function faccioLaDeleteDependency() {


            //alert("Le dependency prima di cambiarle erano: "+ JSON.stringify($scope.dependencyApp));
            //alert("Le dependency dopo averle cambiate sono: "+ JSON.stringify($scope.dependencyApp2));


            //$scope.dependencyAppLowMediumHigh2 = $scope.dependencyAppLow2.concat($scope.dependencyAppMedium2, $scope.dependencyAppHigh2);

            //alert(JSON.stringify($scope.dependencyAppLowMediumHigh));
            //alert(JSON.stringify($scope.dependencyAppLowMediumHigh2));

            for (var i = 0; i < $scope.dependencyApp.length; i++) {

                var count = 0;

                for (var y = 0; y < $scope.dependencyApp2.length; y++) {

                    if ( $scope.dependencyApp[i] == $scope.dependencyApp2[y].ID) {

                        count++;

                    }

                }

               // alert("passaggio numero: " + i +" ed il valore di count è: " + count);

                if (count == 0) {

                    $scope.dependencyToDelete.push({

                        application_id_from: $scope.applicationID,
                        application_id_to: $scope.dependencyApp[i],
                        project_id: $scope.projectID

                })

                  //  alert("applicazioni da cancellare" + (JSON.stringify($scope.dependencyToDelete)));


                }


            }

           /* for (var i = 0; i < $scope.dependencyAppLowMediumHigh.length; i++) {

                var count = 0;

                for (var y = 0; y < $scope.dependencyAppLowMediumHigh2.length; y++) {

                    if ( $scope.dependencyAppLowMediumHigh[i].ID == $scope.dependencyAppLowMediumHigh2[y].ID) {

                        count++;

                    }

                }

                if (count == 0) {

                    $scope.dependencyToDelete.push({

                        application_id_from: $scope.applicationID,
                        application_id_to: $scope.dependencyAppLowMediumHigh[i].ID,
                        project_id: $scope.projectID

                    })


                }


            } */

          //alert(JSON.stringify($scope.dependencyToDelete));

            $http({
                url: '/api/v1/application_related/batch',
                method: 'DELETE',
                data: $scope.dependencyToDelete,
                headers: {
                    "Content-Type": "application/json;" +
                    "charset=utf-8"
                }
            }).then(function(res) {

                $state.reload();

                console.log(res.data);
            }, function(error) {

                $state.reload();

                console.log(error);
            });





        }


        function calcolaSlidesNumber() {

           // alert($scope.dependencyAppDefault.length);


            if (($scope.dependencyAppDefault.length % 12) == 0) {


                $scope.slidesNumber = ($scope.dependencyAppDefault.length / 12);


                if ($scope.slidesNumber == 0) {

                    $scope.slidesNumber = 1;
                }

            }


            if (($scope.dependencyAppDefault.length % 12) != 0) {

                $scope.slidesNumber = ( Math.floor($scope.dependencyAppDefault.length / 12) + 1)
            }

           // alert($scope.slidesNumber);
            $scope.dataHasLoaded = true;


        }

        $scope.getNumberSlide = function() {

            return new Array($scope.slidesNumber);
        }


function calcolanodesL() {

    $scope.nodesL = [{

            id: $scope.applicationNAME,
            reflexive: true

        }];

        for (var i = 0; i < $scope.dependencyAppLow2.length; i++) {

            $scope.nodesL.push({

                id: $scope.dependencyAppLow2[i].NAME,
                reflexive: true

            })

    }


    $scope.linksL = [];

    for (var j = 1; j < $scope.nodesL.length; j++) {

        $scope.linksL.push({

            source: {

                id: $scope.nodesL[0].id,
                reflexive: $scope.nodesL[0].reflexive
            },

            target: {

                id: $scope.nodesL[j].id,
                reflexive: $scope.nodesL[j].reflexive
            },

            left: true,
            right: false

        })

    }


}


    }



})();