/**
 * Created by Marco on 27/02/2017.
 */
'use strict';

angular.module('BlurAdmin.pages.charts.amCharts')

    .controller('forceDirectedGraphCtrl', function($http, dataService, $scope){
        var color = d3.scale.category20();

        $scope.projectID = dataService.getProjectID();

        $scope.clusterMode = true;
        $scope.colorMode = false;

        $scope.isFiltered = dataService.getisFiltered();
        $scope.projectID = dataService.getProjectID();
        $scope.data = {

            nodes:[],
            links:[]
        };


        $http.get('/api/v1/graph?project_id=' + $scope.projectID)
            .then(function(response) {

                $scope.LASTCOMPUTEDAT = null;
                $scope.LASTMODIFIEDAT = null;

                if( ($scope.LASTCOMPUTEDAT == null) && ($scope.LASTMODIFIEDAT == null) ) {
                    getAppScore();
                    calculateGraph();

                }

                 if( $scope.LASTCOMPUTEDAT < $scope.LASTMODIFIEDAT) {

                    getAppScore();
                    calculateGraph();

                }

            });


            function getAppScore() {
            $http.get("/api/v1/application?" + "project_id=" + $scope.projectID)
                .then(function (response) {

                    //alert("Numero di applicazioni: " + JSON.stringify(response));
                    $scope.feed = (response.data);
                    //alert(JSON.stringify($scope.feed));

                });
        }

            function calculateGraph() {

            $http.get('/api/v1/graph_scc?project_id=' + $scope.projectID)
                .then(function (response) {

                    for (var i = 0; i < response.data.VERTICES.length; i++) {

                        for (var y = 0; y < response.data.SCC.length; y++) {


                            for (var z = 0; z < response.data.SCC[y].VERTICES.length; z++) {


                                if ( response.data.SCC[y].PUBLICSCORE == null ) {

                                    response.data.SCC[y].PUBLICSCORE = 0;

                                }

                                if ( response.data.SCC[y].PRIVATESCORE == null ) {

                                    response.data.SCC[y].PRIVATESCORE = 0;

                                }

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
                            appID: response.data.VERTICES[i].VERTEXID,
                            PUBLICSCORE: response.data.SCC[$scope.SCC].PUBLICSCORE,
                            PRIVATESCORE: response.data.SCC[$scope.SCC].PRIVATESCORE

                        });

                    }

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

                    calcolaOptions();
                    calcolaOptions2();


                });


        }

            function calcoloEdge() {

             $http.get('/api/v1/graph?project_id=' + $scope.projectID)
                 .then(function (response) {

                     //alert(JSON.stringify(response.data));

                     for (var i = 0; i < response.data.length; i++) {

                         for (var y = 0; y < $scope.data.nodes.length; y++) {

                             //alert("ciao1");
                             //alert(JSON.stringify(response.data[i].VERTEXFROMID));
                             //alert(JSON.stringify($scope.data.nodes[y].appID));

                             if (response.data[i].VERTEXFROMID == $scope.data.nodes[y].appID) {

                                 $scope.source = $scope.data.nodes[y].count;

                             }

                             if (response.data[i].VERTEXTOID == $scope.data.nodes[y].appID) {

                                 $scope.target = $scope.data.nodes[y].count;


                             }
                         }

                             $scope.data.links.push({

                                 source: $scope.source,
                                 target: $scope.target,
                                 value: 2


                             });


                     }


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
