/**
 * Created by marcozennaro on 13/12/2016.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.criteria')
        .directive('criteriaApp', criteriaApp);

    /** @ngInject */
    function criteriaApp() {

        return {
            restrict: 'E',
            controller: 'CriteriaAppCtrl',
            templateUrl: 'pages/criteria/criteria-app/criteria-app.html'
        };
    }

})();