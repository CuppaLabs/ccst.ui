/**
 * Created by Marco on 07/01/2017.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.criteria',[])
        .config(routeConfig);

    /** @ngInject */

    function routeConfig($stateProvider) {
        $stateProvider
            .state('criteria', {
                url: '/criteria',
                templateUrl: 'pages/criteria/criteria.html',
            })

            .state('criteria.criteria-app', {
                url: '/criteria-app',
                templateUrl: 'pages/criteria/criteria-app/criteria-app.html',
                controller: 'CriteriaAppCtrl',

            })

    }


})();
