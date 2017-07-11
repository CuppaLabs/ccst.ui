/**
 * Created by Marco on 15/01/2017.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.templates')
        .directive('newTemplate', templateWizard);

    /** @ngInject */
    function templateWizard() {
        return {
            restrict: 'E',
            controller: 'NewTemplateCtrl',
            templateUrl: 'pages/templates/new-template/new-template.html'
        };
    }
})();