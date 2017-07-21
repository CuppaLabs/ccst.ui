/**
 * Created by Marco on 31/12/2016.
 */
var regApp = angular.module('myReg', ["ngStorage"]);

regApp.controller('RegistrationCtrl', function($scope, $http, $location,$localStorage) {

    $scope.registrationName = [];
    $scope.registrationEmail = [];
    $scope.registrationPassword = [];
    $scope.token = [];

    $scope.registration = function() {

        var datiRegistrazione = JSON.stringify( {

            name: $scope.registrationName.name,
            email: $scope.registrationEmail.name,
            password: $scope.registrationPassword.name
        });

        //alert(datiRegistrazione);

        $http.post('/api/v1/user/signup', datiRegistrazione)

            .success(function (data, status) {


                $scope.token.push(data.TOKEN);

                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: data.NAME, token: data.TOKEN, userid: data.USERID };

              


                //alert("ok tutto riuscito");
                location.replace('http://localhost:3000/index.html');
                alert("Your Registration is done! Redirecting to the dashboard!");

            }).error(function (data, status, headers, config) {

            alert("Error: Registration failed!");

        });

    }


});