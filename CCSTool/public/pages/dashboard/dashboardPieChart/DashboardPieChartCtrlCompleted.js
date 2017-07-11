/**
 * Created by marcozennaro on 13/12/2016.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrlCompleted', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, $http, dataService, $rootScope) {
        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

        $rootScope.hideit = false;


        var lunghezza3 = dataService.getLunghezza3();


        $scope.charts2 = [{
            color: pieColor,
            description: 'Completed Apps',
            stats: lunghezza3,
            icon: 'face',
        }];


    }
})();