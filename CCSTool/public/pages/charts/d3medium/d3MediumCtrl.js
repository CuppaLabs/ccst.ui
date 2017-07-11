
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.charts')
        .controller('d3CtrlMedium', ['$scope', function($scope){
            $scope.title = "DemoCtrl";
            $scope.d3Data = [
                {name: "Greg", score:98},
                {name: "Ari", score:96},
                {name: "Loser", score: 48}
            ];
            $scope.d3OnClick = function(item){
                alert(item.name);
            };
        }]);

}());