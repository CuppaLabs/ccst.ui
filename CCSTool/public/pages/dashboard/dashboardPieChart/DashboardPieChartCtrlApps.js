/**
 * Created by marcozennaro on 13/12/2016.
 */


(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrlApps', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, baConfig, baUtil, dataService) {

        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

        var lunghezza  = dataService.getLunghezza();

        $scope.charts2 = [{
            color: pieColor,
            description: 'Applications',
            stats: lunghezza,
            icon: 'person',
        }];

    }

})();