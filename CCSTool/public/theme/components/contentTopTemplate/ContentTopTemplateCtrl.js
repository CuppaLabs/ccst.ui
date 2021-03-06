/**
 * Created by Marco on 05/01/2017.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('ContentTopTemplateCtrl', ContentTopTemplateCtrl );

    /** @ngInject */
    function ContentTopTemplateCtrl($scope, $http, dataService, $state, $rootScope) {

        $scope.templatesArray = [];

        $scope.currentTemplate = "Seleziona un template";


        $http.get("/api/v1/user_template?" + "user_id=" + 63)
            .then(function(response) {

                for (var i = 0; i < response.data.length; i++) {

                    $scope.templatesArray.push(response.data[i].NAME);
                }

            });


        $scope.change2 = function() {

            $http.get("/api/v1/user_template?" + "user_id=" + 63)
                .then(function(response) {

                    for (var i = 0; i < response.data.length; i++) {

                        if ($scope.currentTemplate == response.data[i].NAME ){

                            dataService.setTemplateID(response.data[i].TEMPLATEID);
                            dataService.setTemplateNAME(response.data[i].NAME);
                            dataService.setTemplateDESCRIPTION(response.data[i].DESCRIPTION);

                        }

                    }

                    $state.reload();
                });

        }

    }

})();