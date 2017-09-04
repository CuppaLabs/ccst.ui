/**
 * Created by Marco on 15/01/2017.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.templates')
        .controller('NewTemplateCtrl', WizardCtrl);


    /** @ngInject */
    function WizardCtrl($scope,$http, $filter, dataService, $state, $rootScope, toastr, $uibModal, $localStorage) {

        $rootScope.hideit = true;
        
        $scope.UserID = $localStorage.currentUser.userid;

        $scope.Criteria = [];
        $scope.CriteriaValues = [];
        $scope.CriteriaValueSelected = [];
        $scope.CriteriaValueSelectedAtStart = [];
        $scope.CriteriaNameID = [];
        $scope.CriteriaValueID = [];

        $scope.descriptionTemplate = "";

        $scope.nameTemplate = "";

        $scope.templateID = [];

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

                    }

                    else {

                        $scope.CriteriaValueSelected.push("0");
                        $scope.CriteriaValueSelectedAtStart.push("0")

                    }
                    ;
                }


            });


        $scope.postTemplate = [];


        $scope.createTemplate = function (CriteriaValueSelected) {

            var datiTemplate = JSON.stringify({

                name: $scope.nameTemplate,
                description: $scope.descriptionTemplate

            });


            $http.post('api/v1/template', datiTemplate)
                .success(function (data, status) {

                    $scope.templateID = data.TEMPLATEID;
                    $scope.templateName = data.NAME;
                    dataService.setTemplateNAME($scope.templateName);
                    dataService.setTemplateID($scope.templateID );

                    postUserTemplate2(CriteriaValueSelected);

                }).error(function (data, status, headers, config) {

                open('pages/ui/modals/modalTemplates/dangerModal.html');

                toastr.error("Your information hasn't been saved!", 'Error');

            });


        }

        function postUserTemplate2(CriteriaValueSelected) {

            var parameter10 = {
                user_id: $scope.UserID,
                template_id: $scope.templateID
            };

            var parameter11 = JSON.stringify(parameter10);


            $http.post('/api/v1/user_template', parameter11)
                .success(function (data, status) {
                    console.log(data);
                    postUserTemplate(CriteriaValueSelected);

                }).error(function (data, status, headers, config) {
                open('pages/ui/modals/modalTemplates/dangerModal.html');
                toastr.error("Your template hasn't been created!", 'Error');
            });

        }


        function postUserTemplate(CriteriaValueSelected) {

            var parameter = [];

            $scope.NewCriteriaValueSelected = CriteriaValueSelected;

            for (var i = 0; i < $scope.Criteria.length; i++) {

                parameter.push({

                    template_id: $scope.templateID,
                    criteria_name_id: $scope.Criteria[i].CRITERIANAME.CRITERIANAMEID,
                    criteria_value_id: $scope.NewCriteriaValueSelected[i]

                });

            }

            var parameter2 =JSON.stringify(parameter);

            $http.post('/api/v1/template_criteria/batch', parameter2)
                .success(function (data, status) {
                    open('pages/ui/modals/modalTemplates/successModal.html');
                    $state.reload();
                    toastr.success("Your Template has been created!");

                }).error(function (data, status, headers, config) {
                open('pages/ui/modals/modalTemplates/dangerModal.html');
                toastr.error("Your Template hasn't been created!", 'Error');
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

    }

})();




