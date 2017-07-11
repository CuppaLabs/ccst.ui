/**
 * Created by Marco on 05/01/2017.
 */
/**
 * Created by marcozennaro on 13/12/2016.
 */


(function () {
    'use strict';

    angular.module('BlurAdmin.pages.projects')
        .directive('editProjectView', editProjectView);

    /** @ngInject */
    function editProjectView() {
        return {
            restrict: 'E',
            controller: 'EditProjectCtrl',
            templateUrl: 'pages/projects/edit-project/edit-project.html'
        };
    }
})();