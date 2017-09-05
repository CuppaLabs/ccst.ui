/**
 * Created by Marco on 15/01/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.templates')
            .controller('EditTemplateCtrl', EditTemplateCtrl);


    /** @ngInject */
    function EditTemplateCtrl($scope, $http, $filter, dataService, $state, $rootScope, toastr, $localStorage) {

        $rootScope.hideit = true;

        $scope.showPanel = false;
        
        $scope.UserID = $localStorage.currentUser.userid;

        $scope.templateID = dataService.getTemplateID();
        $scope.templateNAME = dataService.getTemplateNAME();
        $scope.templateDESCRIPTION = dataService.getTemplateDESCRIPTION();

        // $scope.applicationID = {};

        if ($scope.templateNAME == "") {

            $scope.templateNAME = "No template Selected";
            $scope.templateDESCRIPTION = "No Description available for this template"

        }

        if ($scope.templateNAME != "No template Selected") {

            $scope.showPanel = true;

        }


        $scope.deleteTemplate = function () {

            $http({
                url: '/api/v1/template',
                method: 'DELETE',
                data: {
                    template_id: $scope.templateID,
                    user_id: $scope.UserID
                },
                headers: {
                    "Content-Type": "application/json;" +
                            "charset=utf-8"
                }
            }).then(function (res) {

                dataService.setTemplateNAME("");

                $state.reload();

                console.log(res.data);
            }, function (error) {
                console.log(error);
            });


        }

        $scope.Criteria = [];
        $scope.CriteriaValues = [];
        $scope.CriteriaValueSelected = [];
        $scope.CriteriaValueSelectedAtStart = [];
        $scope.CriteriaNameID = [];
        $scope.CriteriaValueID = [];


            $http.get('api/v1/template_criteria?template_id=' + $scope.templateID)
                    .then(function (response) {

                        for (var x = 0; x < response.data.length; x++) {
                            $scope.CriteriaValueSelected.push(response.data[x].CRITERIAVALUEID.toString());
                            $scope.CriteriaValueSelectedAtStart.push(response.data[x].CRITERIAVALUEID.toString());

                        }

                        calcolaPagina();

                    });


        function calcolaPagina() {


            $http.get('api/v1/criteria_name_value')
                    .then(function (response) {

                        var count = 0;

                        for (var i = 0; i < response.data.length; i++) {

                            $scope.Criteria.push(response.data[i]);

                            $scope.CriteriaValues.push.apply($scope.CriteriaValues, response.data[i].CRITERIANAMEVALUES);

                            if ($scope.CriteriaNameID[count] == response.data[i].CRITERIANAME.CRITERIANAMEID) {

                                $scope.CriteriaValueSelected.push($scope.CriteriaValueID[count].toString());
                                $scope.CriteriaValueSelectedAtStart.push($scope.CriteriaValueID[count].toString());

                                count++;

                            } else {
                                $scope.CriteriaValueSelected.push("0");
                                $scope.CriteriaValueSelectedAtStart.push("0")

                            }
                            ;
                        }
                    });
        }

        $scope.postTemplate = [];

        $scope.editaTemplate = function (CriteriaValueSelected) {

            $scope.NewCriteriaValueSelected = CriteriaValueSelected;

            var parameter = [];

            for (var i = 0; i < $scope.Criteria.length; i++) {

                parameter.push({

                    template_id: $scope.templateID,
                    criteria_name_id: $scope.Criteria[i].CRITERIANAME.CRITERIANAMEID,
                    criteria_value_id: $scope.NewCriteriaValueSelected[i]

                });
            }

            var parameter2 = JSON.stringify(parameter);

            $http.put('/api/v1/template_criteria/batch', parameter2)
                    .success(function (data, status) {

                        toastr.success('Template edited successfully!');

                        $state.reload();

                    }).error(function (data, status, headers, config) {

                $state.reload();
            });


        }


    }


})();