/**
 * Created by marcozennaro on 13/12/2016.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartCtrlTemplated', DashboardPieChartCtrl);

    /** @ngInject */
    function DashboardPieChartCtrl($scope, baConfig, baUtil, dataService) {

        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

        var lunghezza2 = dataService.getLunghezza2();

        $scope.charts2 = [{
            color: pieColor,
            description: 'Templated Apps',
            stats: lunghezza2,
            icon: 'money',
        }];


    }

})();