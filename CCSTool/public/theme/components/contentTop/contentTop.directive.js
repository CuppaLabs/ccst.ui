/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('contentTop', contentTop);

  /** @ngInject */
  function contentTop($location, $state) {
    return {
      restrict: 'E',
        templateUrl: 'theme/components/contentTop/contentTop.html',
        controller: 'ContentTopCtrl',
      link: function($scope, $http) {
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;

        });
      }
    };
  }

})();