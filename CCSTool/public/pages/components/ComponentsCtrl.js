/**
 * Created by Marco on 01/03/2017.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.components')
        .controller('ComponentsCtrl', ComponentsCtrl );

    /** @ngInject */
    function ComponentsCtrl($scope, $http, dataService, $state, $rootScope) {

        $rootScope.hideit = false;
        $scope.projectID = dataService.getProjectID();


        // Oggetto per l'icona
        $scope.feed2 = [

            {author: 'components_logo'}

        ];

        //setta l'icona da mostrare dopo
        dataService.setApplicationAUTHOR('components_logo');

        // Oggetto in cui verranno inserite tutte le informazioni della componente da mostrare
        $scope.feed = [];

        $scope.applicationArray = [];

        function calcoloValore() {

            $rootScope.hideit = false;
            $scope.visibility = false;

            if ($scope.feed.length > 0) {

                $scope.visibility = true;
            }

            $http.get('/api/v1/graph_scc?project_id=' + $scope.projectID)
                .then(function (response) {

                    for (var i = 0; i < response.data.SCC.length; i++) {

                        if (response.data.SCC[i].PUBLICSCORE == null && response.data.SCC[i].PRIVATESCORE == null) {

                            $scope.feed[i].PUBLICSCORE = 0.00;
                            $scope.feed[i].PRIVATESCORE = 0.00;

                        }

                        else {


                            $scope.feed[i].PUBLICSCORE = response.data.SCC[i].PUBLICSCORE.toFixed(2);
                            $scope.feed[i].PRIVATESCORE = response.data.SCC[i].PRIVATESCORE.toFixed(2);

                        }

                    }


                });
        }


        function calculateGraph() {

            $http.get('/api/v1/graph_scc?project_id=' + $scope.projectID)
                .then(function (response) {

                    for (var i = 0; i < response.data.VERTICES.length; i++) {

                        for (var y = 0; y < response.data.SCC.length; y++) {


                            for (var z = 0; z < response.data.SCC[y].VERTICES.length; z++) {

                                if (response.data.VERTICES[i].VERTEXID == response.data.SCC[y].VERTICES[z]) {

                                    $scope.SCC = y;
                                    break;
                                }

                            }

                        }

                        $scope.data.nodes.push({

                            name: response.data.VERTICES[i].NAME,
                            group: $scope.SCC,
                            count: i,
                            appID: response.data.VERTICES[i].VERTEXID

                        });

                    }

                    /* for (var t = 0; t < $scope.data.nodes.length; t++) {

                     var group = $scope.data.nodes[t].group;

                     for (var h = t+1; h < $scope.data.nodes.length; h++) {

                     // alert(group);
                     //alert(JSON.stringify($scope.data.nodes[h].group));
                     if (group == $scope.data.nodes[h].group) {

                     // alert("dentro if");
                     $scope.data.links.push({

                     source: $scope.data.nodes[t].count,
                     target: $scope.data.nodes[h].count,
                     value: 10

                     });

                     }

                     }


                     } */


                    for (var a = 0; a < response.data.EDGES.length; a++) {


                        if ( (response.data.EDGES[a].VERTEXFROMID != null) && (response.data.EDGES[a].VERTEXTOID != null)) {

                            for (var b = 0; b < $scope.data.nodes.length; b++) {


                                if (response.data.EDGES[a].VERTEXFROMID == $scope.data.nodes[b].appID) {

                                    $scope.source = $scope.data.nodes[b].count;

                                }

                                if (response.data.EDGES[a].VERTEXTOID == $scope.data.nodes[b].appID) {

                                    $scope.target = $scope.data.nodes[b].count;


                                }
                            }

                            $scope.data.links.push({

                                source: $scope.source,
                                target: $scope.target,
                                value: 10

                            });

                        }
                    }

                });


        }


        $http.get('/api/v1/graph_scc?project_id=' + $scope.projectID)
            .then(function (response) {


                //alert("Numero di applicazioni: " + JSON.stringify(response));
                 $scope.feed = (response.data.SCC);
                 $scope.numeroAppComponente = [];
                 for (var f = 0; f < $scope.feed.length; f++) {

                     $scope.numeroAppComponente.push({

                            count: $scope.feed[f].VERTICES.length
                     })

                 }

                for (var i = 0; i < response.data.SCC.length; i++) {

                    if (response.data.SCC[i].PUBLICSCORE == null && response.data.SCC[i].PRIVATESCORE == null) {

                        $scope.feed[i].READINESSSTATUS = "readinessNotReady";

                    }

                    else {

                        $scope.feed[i].READINESSSTATUS = "readinessOk";


                    }

                }

                calcoloValore();

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

                    location.replace('http://http://nacssissil043.oracle.com:10800/index.html#/criteria/criteria-app');

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