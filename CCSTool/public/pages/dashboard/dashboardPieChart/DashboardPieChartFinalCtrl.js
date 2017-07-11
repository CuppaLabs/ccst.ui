/**
 * Created by marcozennaro on 13/12/2016.
 */


(function () {
    'use strict';

    angular.module('BlurAdmin.pages.dashboard')
        .controller('DashboardPieChartFinalCtrl', DashboardPieChartFinalCtrl);

    /** @ngInject */
    function DashboardPieChartFinalCtrl($scope, baConfig, baUtil, dataService) {

        var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);

        var lunghezza  = dataService.getLunghezza();
        var lunghezza2 = dataService.getLunghezza2();
        var lunghezza3 = dataService.getLunghezza3();
        var lunghezza4 = dataService.getLunghezza4();


            $scope.charts2 = [{
                color: pieColor,
                description: 'Applications',
                stats: lunghezza,
                icon: 'person',
            }];


            $scope.chartsTemplated = [{
                color: pieColor,
                description: 'Templated Apps',
                stats: lunghezza2,
                icon: 'money',
            }];

            $scope.chartsCompleted = [{
                color: pieColor,
                description: 'Completed Apps',
                stats: lunghezza3,
                icon: 'face',
            }];

            $scope.chartsIncomplete = [{
                color: pieColor,
                description: 'Incomplete Apps',
                stats: lunghezza4,
                icon: 'refresh',
            }];


    }
})();
