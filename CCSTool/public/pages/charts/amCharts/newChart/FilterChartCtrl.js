/**
 * Created by Marco on 13/03/2017.
 */
'use strict';

angular.module('BlurAdmin.pages.charts.amCharts')

    .controller('FilterChartCtrl', function($http, dataService, $scope, $state){
        var color = d3.scale.category20();

        $scope.clusterMode = true;
        $scope.colorMode = false;

        $scope.isFiltered = dataService.getisFiltered();



        $scope.selectedComponents = {

            ids:[]

        };

        $scope.READINESSSTATUS =[

            {
                id: "yesReady",
                text: "Ready",
                isUserAnswer: false
            },

            {

                id: "noReady",
                text: "Not Ready",
                isUserAnswer: false

            }
        ];

        $scope.ONECOMPONENTAPPLICATION= [{

            id: "onecomponentapplication",
            text: "Show Migration Islands with only 1 Application",
            isUserAnswer: true
        }];

        $scope.updatedSelection = function($index, READINESSSTATUS) {

            if ($index == 0) {

                READINESSSTATUS[1].isUserAnswer = false;

            }

            else {

                READINESSSTATUS[0].isUserAnswer = false;

            }

        };

        if ($scope.isFiltered == true) {

            $scope.selectedComponents = dataService.getselectedComponents();
            $scope.READINESSSTATUS = dataService.getREADINESSSTATUS();
            $scope.ONECOMPONENTAPPLICATION = dataService.getONECOMPONENTAPPLICATION();
        }

        $scope.roles = [];
        $scope.projectID = dataService.getProjectID();


        //Mi creo $scope.roles da utilizzare per costruire l'interfaccia dei filtri
            $http.get('/api/v1/graph_scc?project_id=' + $scope.projectID)
                .then(function (response) {

                    var indice = "";

                    for (var y = 0; y < response.data.SCC.length; y++) {

                            indice = y+1;

                        $scope.roles.push({

                                id: y,
                                text: 'Migration Island ' + indice

                        });

                    }

                });


        $scope.checkAll = function() {

            $scope.selectedComponents.ids = $scope.roles.map(function(item) { return item.id; });

        };

        $scope.uncheckAll = function() {

            $scope.selectedComponents.ids = [];

        };


        $scope.checkFirst = function() {
            $scope.user.roles.splice(0, $scope.user.roles.length);
            $scope.user.roles.push(1);
        };


        if ($scope.selectedComponents.ids.length > 0) {

            calculateGraph($scope.selectedComponents);
        }

        $scope.Salvafilter = function(selectedComponents) {

            $scope.isFiltered = true;
            dataService.setisFiltered($scope.isFiltered);
            dataService.setselectedComponents(selectedComponents);
            dataService.setREADINESSSTATUS($scope.READINESSSTATUS);
            dataService.setONECOMPONENTAPPLICATION($scope.ONECOMPONENTAPPLICATION);

            calculateGraph(selectedComponents);
            $state.reload();

        };

        function calculateGraph(selectedComponents) {

            $http.get('/api/v1/graph_scc?project_id=' + $scope.projectID)
                .then(function (response) {

                    var newCount = 0;

                    $scope.data = {

                        nodes:[],
                        links:[]
                    };

                    for (var i = 0; i < response.data.VERTICES.length; i++) {

                        for (var y = 0; y < response.data.SCC.length; y++) {

                            for (var z = 0; z < response.data.SCC[y].VERTICES.length; z++) {

                                if (response.data.VERTICES[i].VERTEXID == response.data.SCC[y].VERTICES[z]) {

                                    $scope.SCC = y;
                                    break;
                                }

                            }

                        }

                        for (var w = 0; w < selectedComponents.ids.length; w++) {

                            //PRIMO FILTRO
                            if ($scope.SCC == selectedComponents.ids[w]) {

                                //SECONDO FILTRO
                                if ($scope.READINESSSTATUS[0].isUserAnswer == true) {

                                    if ((response.data.SCC[$scope.SCC].PUBLICSCORE > 6.00) && (response.data.SCC[$scope.SCC].PRIVATESCORE > 6.00)) {

                                        if ($scope.ONECOMPONENTAPPLICATION[0].isUserAnswer == true) {

                                            $scope.data.nodes.push({

                                                name: response.data.VERTICES[i].NAME,
                                                group: $scope.SCC,
                                                count: newCount,
                                                appID: response.data.VERTICES[i].VERTEXID,
                                                PUBLICSCORE: response.data.SCC[i].PUBLICSCORE,
                                                PRIVATESCORE: response.data.SCC[i].PRIVATESCORE

                                            });

                                            newCount++;

                                        }

                                        else {

                                            if (response.data.CSS[$scope.SCC].VERTICES.length > 1) {

                                                $scope.data.nodes.push({

                                                    name: response.data.VERTICES[i].NAME,
                                                    group: $scope.SCC,
                                                    count: newCount,
                                                    appID: response.data.VERTICES[i].VERTEXID,
                                                    PUBLICSCORE: response.data.SCC[i].PUBLICSCORE,
                                                    PRIVATESCORE: response.data.SCC[i].PRIVATESCORE

                                                });

                                                newCount++;

                                            }

                                        }
                                    }
                                }

                                //SECONDO FILTRO
                                else if ($scope.READINESSSTATUS[1].isUserAnswer == true) {

                                    if ((response.data.SCC[$scope.SCC].PUBLICSCORE < 6.00) && (response.data.SCC[$scope.SCC].PRIVATESCORE < 6.00)) {

                                        if ($scope.ONECOMPONENTAPPLICATION[0].isUserAnswer == true) {

                                            $scope.data.nodes.push({

                                                name: response.data.VERTICES[i].NAME,
                                                group: $scope.SCC,
                                                count: newCount,
                                                appID: response.data.VERTICES[i].VERTEXID,
                                                PUBLICSCORE: response.data.SCC[i].PUBLICSCORE,
                                                PRIVATESCORE: response.data.SCC[i].PRIVATESCORE

                                            });

                                            newCount++;

                                        }

                                        else {

                                            if (response.data.CSS[$scope.SCC].VERTICES.length > 1) {

                                                $scope.data.nodes.push({

                                                    name: response.data.VERTICES[i].NAME,
                                                    group: $scope.SCC,
                                                    count: newCount,
                                                    appID: response.data.VERTICES[i].VERTEXID,
                                                    PUBLICSCORE: response.data.SCC[i].PUBLICSCORE,
                                                    PRIVATESCORE: response.data.SCC[i].PRIVATESCORE

                                                });

                                                newCount++;

                                            }

                                        }

                                    }

                                }

                                //SECONDO FILTRO
                                else if (($scope.READINESSSTATUS[0].isUserAnswer == false) && ($scope.READINESSSTATUS[1].isUserAnswer == false )){

                                    if ($scope.ONECOMPONENTAPPLICATION[0].isUserAnswer == true) {

                                        $scope.data.nodes.push({

                                            name: response.data.VERTICES[i].NAME,
                                            group: $scope.SCC,
                                            count: newCount,
                                            appID: response.data.VERTICES[i].VERTEXID,
                                            PUBLICSCORE: response.data.SCC[i].PUBLICSCORE,
                                            PRIVATESCORE: response.data.SCC[i].PRIVATESCORE

                                        });

                                        newCount++;

                                    }

                                    else {

                                        if (response.data.SCC[$scope.SCC].VERTICES.length > 1) {

                                            $scope.data.nodes.push({

                                                name: response.data.VERTICES[i].NAME,
                                                group: $scope.SCC,
                                                count: newCount,
                                                appID: response.data.VERTICES[i].VERTEXID,
                                                PUBLICSCORE: response.data.SCC[i].PUBLICSCORE,
                                                PRIVATESCORE: response.data.SCC[i].PRIVATESCORE

                                            });

                                            newCount++;

                                        }


                                    }

                                }

                            }

                        }
                    }

                    for (var a = 0; a < response.data.EDGES.length; a++) {

                        $scope.target = null;
                        $scope.source = null;

                        if ( (response.data.EDGES[a].VERTEXFROMID != null) && (response.data.EDGES[a].VERTEXTOID != null)) {

                            for (var b = 0; b < $scope.data.nodes.length; b++) {

                                if (response.data.EDGES[a].VERTEXFROMID == $scope.data.nodes[b].appID) {

                                    $scope.source = $scope.data.nodes[b].count;

                                }

                                if (response.data.EDGES[a].VERTEXTOID == $scope.data.nodes[b].appID) {

                                    $scope.target = $scope.data.nodes[b].count;


                                }
                            }

                            if ($scope.target != null && $scope.source != null) {

                                $scope.data.links.push({

                                    source: $scope.source,
                                    target: $scope.target,
                                    value: 10

                                });
                            }
                        }
                    }

                    calcolaOptions();
                    calcolaOptions2();
                });


        }

        function calcolaOptions() {

            $scope.options = {
                chart: {
                    type: 'forceDirectedGraph',
                    radius: 22,
                    height: 800,
                    linkDist: 80,
                    charge: -600,
                    width: (function () {
                        return nv.utils.windowSize().width - 450
                    })(),
                    margin: {top: 10, right: 10, bottom: 10, left: 10},
                    color: function (d) {

                            return colorPalette(d.PUBLICSCORE);


                    },

                    nodeExtras: function (node) {
                        node && node
                            .append("text")
                            .attr("dx", 35)
                            .attr("dy", 0)
                            .text(function (d) {
                                return d.name
                            })
                            .style('font-size', '18px')
                            .style("fill", "white")

                    },

                    tooltip: {

                        enabled: true
                    }


                }
            };
        }

        function calcolaOptions2() {

            $scope.options2 = {
                chart: {
                    type: 'forceDirectedGraph',
                    radius: 22,
                    height: 800,
                    linkDist: 80,
                    charge: -600,
                    width: (function () {
                        return nv.utils.windowSize().width - 450
                    })(),
                    margin: {top: 10, right: 10, bottom: 10, left: 10},
                    color: function (d) {
                        return color(d.group)
                    },

                    nodeExtras: function (node) {
                        node && node
                            .append("text")
                            .attr("dx", 35)
                            .attr("dy", 0)
                            .text(function (d) {
                                return d.name
                            })
                            .style('font-size', '18px')
                            .style("fill", "white")

                    },

                    tooltip: {

                        enabled: true
                    }


                }
            };
        }


        function colorPalette(numero) {

            var red = 0;
            var green = 0;
            var result = 0;

            //caso in cui il valore non sia 10
            if (numero != 10) {

                numero = (numero * 10).toFixed(0);

                var number1 = ((255 / 100) * numero).toFixed(0);

                red = (255 - number1);

                green = number1;

                result = "rgb(" +red+"," + green+ "," + 0 + ")";

                return result;

            }

            //caso in cui il valore è 10
            else return "00FF00";
        }

    })
