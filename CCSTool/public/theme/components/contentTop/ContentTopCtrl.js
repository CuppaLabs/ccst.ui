/**
 * Created by Marco on 05/01/2017.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('ContentTopCtrl', ContentTopCtrl );

    /** @ngInject */
    function ContentTopCtrl($scope, $http, dataService, $state, $rootScope, $localStorage) {


        // Shows Panel
        $rootScope.hideit = true;

        // It will carry all the projects
        $scope.projectsArray = [];

        // It could be avoid
        $scope.currentProject ="Seleziona Progetto";

        // Get the projectID for that user in order to see his projects
        $scope.UserID = $localStorage.currentUser.userid;


        // It gets the projects of that userID
        $http.get('/api/v1/project?user_id=' + $scope.UserID)
            .then(function(response) {

            for (var i = 0; i < response.data.length; i++) {

                $scope.projectsArray.push(response.data[i].NAME);
            }

            });


        // When I change the project It Updates
        $scope.change = function() {

            dataService.setisFiltered(false);

            // It gets projects again to check which one is the one I selected
            $http.get('/api/v1/project?user_id=' + $scope.UserID)
                .then(function(response) {

                    for (var i = 0; i < response.data.length; i++) {

                        // If it finds the projects switched updates variables
                        if ($scope.currentProject == response.data[i].NAME ){

                            dataService.setProjectID(response.data[i].PROJECTID);
                            dataService.setProjectNAME(response.data[i].NAME);
                            dataService.setProjectDESCRIPTION(response.data[i].DESCRIPTION);

                        }

                    }

                    calcolaLunghezza();


                });

        }

         function calcolaLunghezza() {

             $scope.projectID = dataService.getProjectID();
             $scope.lunghezza = "";

             var count2 = 0;
             var count3 = 0;
             var count4 = 0;


             //Default values
             var lunghezza =  "# 0 ";
             var lunghezza2 = "# 0 ";
             var lunghezza3 = "# 0 ";
             var lunghezza4 = "# 0 ";

             $http.get("/api/v1/application?" + "project_id=" + $scope.projectID)
                 .then(function(response) {

                     dataService.setFeed(response.data);

                     $scope.lunghezza = (response.data.length);

                     lunghezza = "# " + $scope.lunghezza;

                     for (var i = 0; i < $scope.lunghezza; i++) {

                         if (response.data[i].HASTEMPLATE == 1 ) {

                             count2++;

                         }

                         if (response.data[i].HASTEMPLATE == 1 || response.data[i].HASALLCRITERIA == 1) {

                             count3++;

                         }

                         if (response.data[i].HASALLCRITERIA == 0 && response.data[i].HASTEMPLATE == 0) {

                             count4++;

                         }


                     }

                     lunghezza2 = "# " + count2;
                     lunghezza3 = "# " + count3;
                     lunghezza4 = "# " + count4;

                     dataService.setLunghezza(lunghezza);
                     dataService.setLunghezza2(lunghezza2);
                     dataService.setLunghezza3(lunghezza3);
                     dataService.setLunghezza4(lunghezza4);

                     dataService.setPieChartLunghezza2(count2);
                     dataService.setPieChartLunghezza3(count3);
                     dataService.setPieChartLunghezza4(count4);

                     //It reloads the page with the proper content
                     $state.reload();

                 });


         }

    }

})();