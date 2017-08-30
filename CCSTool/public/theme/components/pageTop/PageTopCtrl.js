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

        $scope.signOut = function(){
            $window.localStorage.clear();  
            location.replace("http://localhost:3000/HomePage.html");
        }
    }

})();
