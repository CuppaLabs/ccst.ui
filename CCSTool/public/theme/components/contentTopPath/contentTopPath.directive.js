/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('contentTopPath', contentTopPath);

  /** @ngInject */
  function contentTopPath($location, $state) {
    return {
      restrict: 'E',
        templateUrl: 'theme/components/contentTopPath/contentTopPath.html',
        controller: 'ContentTopPathCtrl',
      link: function($scope, $http) {
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
          $scope.projectName = [];

          $http.get('/api/v1/project')
              .then(function(response) {

              for (var i = 0; i < 3; i++) {

                $scope.projectName.push(response.data[i].NAME);
              }

            });

        });
      }
    };
  }

})();