/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('contentTopTemplate', contentTopTemplate);

  /** @ngInject */
  function contentTopTemplate($location, $state) {
    return {
      restrict: 'E',
        templateUrl: 'theme/components/contentTopTemplate/contentTopTemplate.html',
        controller: 'ContentTopTemplateCtrl',
      link: function($scope, $http) {
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
 
        });
      }
    };
  }

})();