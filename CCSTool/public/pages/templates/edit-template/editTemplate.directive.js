/**
 * Created by Marco on 15/01/2017.
 */


(function () {
    'use strict';

    angular.module('BlurAdmin.pages.templates')
        .directive('editTemplateView', editTemplateView);

    /** @ngInject */
    function editTemplateView() {
        return {
            restrict: 'E',
            controller: 'EditTemplateCtrl',
            templateUrl: 'pages/templates/edit-template.html'
        };
    }
})();