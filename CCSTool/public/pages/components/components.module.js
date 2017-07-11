/**
 * Created by Marco on 01/03/2017.
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.components',[])
        .config(routeConfig);

    /** @ngInject */

    function routeConfig($stateProvider) {
        $stateProvider
            .state('components', {
                url: '/components',
                templateUrl: 'pages/components/components.html',
                title: 'Migration Islands',
                controller: 'ComponentsCtrl',
                sidebarMeta: {
                    icon: 'ion-ios-location-outline',
                    order: 600,
                },
            })

    }


})();
