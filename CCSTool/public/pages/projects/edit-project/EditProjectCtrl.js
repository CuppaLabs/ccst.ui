/**
 * Created by Marco on 05/01/2017.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.projects')
        .controller('EditProjectCtrl', EditProjectCtrl);


    /** @ngInject */
    function EditProjectCtrl($scope, $http, $filter, dataService, $state, $rootScope) {

        $rootScope.hideit = false;

        $scope.projectID = dataService.getProjectID();
        $scope.projectNAME = dataService.getProjectNAME();
        $scope.projectDESCRIPTION = dataService.getProjectDESCRIPTION();

        $scope.applicationID = {};

        if ($scope.projectNAME == "") {

            $scope.projectNAME = "No project Selected";
            $scope.projectDESCRIPTION = "No Description available for this project"

        }

        $scope.deleteProject = function() {

            $http.delete('/api/v1/project/'+ $scope.projectID)
                .then(
                    function(response){

                        alert("Project Deleted");
                        location.replace('http://nacssissil043.oracle.com:10800/index.html');


                        // success callback
                    },
                    function(response){

                        alert("error");
                        // failure call back
                    }
                );

        }


        $scope.addApplication = function(formData) {

            $scope.formData = {

                'name': formData.name,
                'description': formData.description,
                'owner': formData.owner,
                'country':formData.technology,
                'business_area':formData.business_area,
            };

            var applicationData = JSON.stringify($scope.formData);


            formData.name='';
            formData.owner='';
            formData.technology='';
            formData.business_area='';
            formData.description='';

            $http.post('/api/v1/application/', applicationData)
                .success(function (data, status) {

                    $scope.applicationID = (data.APPLICATIONID);


                    alert("ok applicazione aggiunta con id: " + $scope.applicationID);

                    postProjectApplication();

                }).error(function (data, status, headers, config) {

                    alert("errore");

            });

        }

        function postProjectApplication() {


            $scope.ProjectApplication = {

                'application_id': $scope.applicationID.toString(),
                'project_id': $scope.projectID.toString(),

            };


            var ProjectApplication =JSON.stringify($scope.ProjectApplication);


            $http.post('/api/v1/project_application', ProjectApplication)
                .success(function (data, status) {

                   alert("applicazione salvata nel progetto");
                    $state.reload();


                }).error(function (data, status, headers, config) {

                alert("Error: Project not created");

            });

        }

        $scope.feed2 = [

            {author: 'app_logo',
                type: 'video-message'}

        ];

        $scope.feed = [];

        $http.get("/api/v1/application?" + "project_id=" + $scope.projectID)
            .then(function(response) {

                //alert("Numero di applicazioni: " + JSON.stringify(response));
                $scope.feed = (response.data);


                //alert(JSON.stringify($scope.feed));

            });

        $scope.expandMessage = function(message){
            message.expanded = !message.expanded;
        }



        $scope.findID = function(message) {


            $http({
                url: '/api/v1/project_application',
                method: 'DELETE',
                data: {
                    application_id: message.APPLICATIONID,
                    project_id: $scope.projectID
                },
                headers: {
                    "Content-Type": "application/json;" +
                    "charset=utf-8"
                }
            }).then(function(res) {

                alert("application deleted")
                $state.reload();


                console.log(res.data);
            }, function(error) {
                console.log(error);
            });



        }





    }


    })();