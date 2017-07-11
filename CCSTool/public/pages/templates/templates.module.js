(function () {
    'use strict';

    angular.module('BlurAdmin.pages.templates',[])
        .config(routeConfig);

    /** @ngInject */

    function routeConfig($stateProvider) {
        $stateProvider
            .state('templates', {
                url: '/templates',
                templateUrl: 'pages/templates/templates.html',
                abstract: true,
                title: 'Templates',
                sidebarMeta: {
                    icon: 'ion-ios-location-outline',
                    order: 800,
                },
            })

            .state('templates.new-template', {
                url: '/new-template',
                templateUrl: 'pages/templates/new-template/new-template.html',
                controller: 'NewTemplateCtrl',
                title: 'New Template',
                sidebarMeta: {
                    order: 0,
                },
            })

            .state('templates.edit-template', {
                url: '/edit-template',
                templateUrl: 'pages/templates/edit-template/edit-template.html',
                controller: 'EditTemplateCtrl',
                title: 'Edit Template',
                sidebarMeta: {
                    order: 100,
                },
            });

    }


})();
