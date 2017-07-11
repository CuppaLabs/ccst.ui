/**
 * Created by marcozennaro on 13/12/2016.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrlIncomplete', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, $timeout, baConfig, baUtil, $http, dataService) {

        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

        var lunghezza4 = dataService.getLunghezza4();


        $scope.charts2 = [{
            color: pieColor,
            description: 'Incomplete Apps',
            stats: lunghezza4,
            icon: 'refresh',
        }];

    }

})();
