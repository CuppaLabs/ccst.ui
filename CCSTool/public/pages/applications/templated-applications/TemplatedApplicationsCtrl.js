(function () {
    'use strict';

    angular.module('BlurAdmin.pages.applications')
        .controller('TemplatedApplicationsCtrl', BlurFeedCtrl);

    /** @ngInject */
    function BlurFeedCtrl($scope, $http, dataService, $state, $rootScope) {

        $rootScope.hideit = false;

        $scope.checkTemplate = function(message){

            if ( message.HASTEMPLATE == 1) {

                $scope.visibility = true;
            }

            return  message.HASTEMPLATE == 1

        };

        $scope.feed2 = [

            {author: 'app_logo_templated',
                type: 'video-message'}

        ];

        dataService.setApplicationAUTHOR('app_logo_templated');

        $scope.feed = [];

        $scope.projectID = dataService.getProjectID();
        $scope.applicationArray = [];

        function calcoloValore() {

            $rootScope.hideit = false;
            $scope.visibility = false;

            $http.get('/api/v1/decision/batch?project_id=' + $scope.projectID)
                .then(function (response) {

                    //alert("Numero di applicazioni: " + JSON.stringify(response));

                    for (var i = 0; i < response.data.length; i++) {


                        for (var n = 0; n < $scope.feed.length; n++) {


                            if (response.data[i].APPLICATIONID == $scope.feed[n].APPLICATIONID) {

                                if (response.data[i].PUBLICSCORE == null && response.data[i].PRIVATESCORE == null) {

                                    $scope.feed[n].PUBLICSCORE = 0.00;
                                    $scope.feed[n].PRIVATESCORE = 0.00;

                                }

                                else {

                                    $scope.feed[n].PUBLICSCORE = response.data[i].PUBLICSCORE.toFixed(2);
                                    $scope.feed[n].PRIVATESCORE = response.data[i].PRIVATESCORE.toFixed(2);

                                }


                            }


                        }

                    }

                });
        }

        $http.get("/api/v1/application?" + "project_id=" + $scope.projectID)
            .then(function(response) {

                //alert("Numero di applicazioni: " + JSON.stringify(response));
                $scope.feed = (response.data);

                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].HASALLCRITERIA == 0 && response.data[i].HASTEMPLATE == 0) {

                        $scope.feed[i].READINESSSTATUS = "readinessNotReady";

                    }

                    else if ( (response.data[i].HASALLCRITERIA == 1 || response.data[i].HASTEMPLATE == 1) &&  response.data[i].LASTDECISIONCOMPUTEDAT == null ) {

                        $scope.feed[i].READINESSSTATUS = "readinessReady";

                    }

                    //caso in cui ho calcolato la readiness ed ho aggiornaot dopo l'applicazione
                    else if ( (response.data[i].LASTDECISIONCOMPUTEDAT < response.data[i].LASTCRITERIACREATEDAT) && (response.data[i].LASTDECISIONCOMPUTEDAT |= null) ) {


                        $scope.feed[i].READINESSSTATUS = "readinessNotUpdated";

                    }

                    // Caso in cui ho calcolato la readiness ma non ho mai aggiornato l'applicazione
                    else if ( response.data[i].LASTDECISIONCOMPUTEDAT != null && response.data[i].LASTCRITERIACREATEDAT == null ) {

                        $scope.feed[i].READINESSSTATUS = "readinessOk";

                    }

                    //caso in cui ho calcolato la readiness ed ho aggiornato prima l'applicazione
                    else if ( response.data[i].LASTDECISIONCOMPUTEDAT >= response.data[i].LASTCRITERIACREATEDAT ) {

                        $scope.feed[i].READINESSSTATUS = "readinessOk";

                    }


                }

                calcoloValore();

                //alert(JSON.stringify($scope.feed));

            });

        $scope.expandMessage = function(message){
            message.expanded = !message.expanded;
        }


        $scope.findID = function(message) {

            //$scope.projectsArray.push(message.NAME);

            $scope.applicationArray.push({

                'id': message.TEMPLATEID,
                'name': message.NAME,
                'description': message.DESCRIPTION,
                'owner': message.OWNER,
                'technology':message.TECHNOLOGY,
                'business_area': message.dato1
            });

            dataService.setApplicationID(message.APPLICATIONID);
            dataService.setApplicationNAME(message.NAME);
            dataService.setApplicationDESCRIPTION(message.DESCRIPTION);
            dataService.setApplicationOWNER(message.OWNER);
            dataService.setApplicationTECHNOLOGY(message.TECHNOLOGY);
            dataService.setApplicationBUSINESS_AREA(message.BUSINESSAREA);
            dataService.setApplicationHASTEMPLATE(message.HASTEMPLATE);
            dataService.setApplicationHASALLCRITERIA(message.HASALLCRITERIA);
            dataService.setApplicationREADINESSSTATUS(message.READINESSSTATUS);
            dataService.setApplicationLASTDECISIONCOMPUTEDAT(message.LASTDECISIONCOMPUTEDAT);
            dataService.setApplicationLASTCRITERIACREATEDAT(message.LASTCRITERIACREATEDAT);
            prendoValoriReadiness();

        }

        function prendoValoriReadiness() {

            $scope.applicationID = dataService.getApplicationID();

            $http.get('/api/v1/decision?application_id=' + $scope.applicationID + '&project_id=' + $scope.projectID)
                .then(function(response) {

                    if (response.data[0].PUBLICSCORE == null && response.data[0].PRIVATESCORE == null) {

                        dataService.setApplicationPUBLICSCORE(0);
                        dataService.setApplicationPRIVATESCORE(0);

                    }

                    else {

                        dataService.setApplicationPUBLICSCORE(response.data[0].PUBLICSCORE);
                        dataService.setApplicationPRIVATESCORE(response.data[0].PRIVATESCORE);

                    }

                    location.replace('http://nacssissil043.oracle.com:10800/index.html#/criteria/criteria-app');

                });
        }

        $scope.readinessBatch = [];

        $scope.calculateReadinessBatch = function() {

            //alert($scope.feed.length);

            for (var i = 0; i < $scope.feed.length; i++) {

                $scope.readinessBatch.push({

                    application_id: $scope.feed[i].APPLICATIONID,
                    project_id: $scope.projectID

                });

            }

            //alert(parameter2000);


            $http({
                url: '/api/v1/decision/batch',
                method: 'PUT',
                data: $scope.readinessBatch,
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

    }




})();