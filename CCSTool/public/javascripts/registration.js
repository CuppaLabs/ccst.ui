/**
 * Created by Marco on 31/12/2016.
 */
var regApp = angular.module('myReg', []);

regApp.controller('RegistrationCtrl', function($scope, $http, $location) {

    $scope.registrationName = [];
    $scope.registrationEmail = [];
    $scope.registrationPassword = [];

    $scope.registration = function() {

        var datiRegistrazione = JSON.stringify( {

            name: $scope.registrationName.name,
            email: $scope.registrationEmail.name,
            password: $scope.registrationPassword.name
        });

        //alert(datiRegistrazione);

        $http.post('/api/v1/user/signup', datiRegistrazione)

            .success(function (data, status) {

                //alert("ok tutto riuscito");
                location.replace('http://localhost:3000/index.html');
                alert("Your Registration is done! Redirecting to the dashboard!");

            }).error(function (data, status, headers, config) {

            alert("Error: Registration failed!");

        });

    }


});