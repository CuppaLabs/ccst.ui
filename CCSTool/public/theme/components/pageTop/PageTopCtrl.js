/**
 * Created by Marco on 16/12/2016.
 */

(function () {
    'use strict';

    angular.module('BlurAdmin.theme.components')
        .controller('PageTopCtrl', PageTopCtrl );

    /** @ngInject */
    function PageTopCtrl($scope, $http, dataService, $state, $localStorage, $window) {

        $scope.USERNAME = $localStorage.currentUser.username;
        /*function deleteStorages(){
            console.log($localStorage);
        }*/
        $scope.signOut = function(){
            //deleteStorages()
            $window.localStorage.clear();  
            location.replace("http://nacssissil043.oracle.com:10800/HomePage.html");
        }
    }

})();
