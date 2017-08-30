/**
 * Created by Marco on 29/12/2016.
 */

var App3 = angular.module('myApp', ["ngStorage"]);

App3.controller('LoginCtrl', function($scope, $http, $location, $localStorage, dataServiceLogin) {

    $scope.registrationName = [];
    $scope.registrationEmail = [];
    $scope.registrationPassword = [];

    $scope.loginEmail = [];
    $scope.loginPassword = [];
    $scope.token = [];

    $scope.email = {

        name: ""
    };

    $scope.password = {

        name: ""
    };

    $scope.save = function() {
        $scope.$broadcast('show-errors-check-validity');

        if ($scope.userForm.$invalid) { return; }
        // code to add the user
    }

    $scope.login = function() {

        var datiLogin = JSON.stringify({

            email: $scope.email.name,
            password: $scope.password.name

        });

        $scope.errorLogin = "";
        $scope.emailNotValid = false;
        $scope.passwordNotValid = false;

        //alert(datiLogin);

        $http.post('/api/v1/user/login', datiLogin)

            .success(function (data, status) {


               // alert(JSON.stringify(data));
               //alert("ok tutto riuscito");
                //alert(data.TOKEN);
                dataServiceLogin.setToken(data.TOKEN);
                dataServiceLogin.setUserName(data.NAME);

                $scope.token.push(data.TOKEN);

                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username: data.CCSTUSER.NAME, token: data.TOKEN, userid: data.CCSTUSER.USERID };

                    // add jwt token to auth header for all requests made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + data.TOKEN;

                //alert(JSON.stringify($scope.token));

                location.replace("http://http://nacssissil043.oracle.com:10800/index.html");


                //$location.path('/index.html').replace();
                //$window.location.href = 'http://http://nacssissil043.oracle.com:10800/index.html';

            }).error(function (data, status, headers, config) {

                if ( data.detailedMessage == "User not found for the given email") {

                    $scope.emailNotValid = true;
                    $scope.errorLogin = "Wrong email!"

                }

                if ( data.detailedMessage == "Invalid password") {

                    $scope.passwordNotValid = true;
                    $scope.errorLogin = "Wrong Password!"

                }



        });

    }

});


App3.directive('showErrors', function() {
    return {
        restrict: 'A',
        require:  '^form',
        link: function (scope, el, attrs, formCtrl) {
            // find the text box element, which has the 'name' attribute
            var inputEl   = el[0].querySelector("[name]");
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box so we know the property to check
            // on the form controller
            var inputName = inputNgEl.attr('name');

            scope.$on('show-errors-check-validity', function() {
                el.toggleClass('has-danger', formCtrl[inputName].$invalid);
            });

            // inside the directive's link function from the previous example
            scope.$on('show-errors-reset', function() {
                $timeout(function() {
                    el.removeClass('has-danger');
                }, 0, false);
            });

            // only apply the has-error class after the user leaves the text box
            inputNgEl.bind('blur', function() {
                el.toggleClass('has-danger', formCtrl[inputName].$invalid);
                el.toggleClass('has-success', formCtrl[inputName].$valid);

            })
        }
    }
});


App3.factory('dataServiceLogin', ['$http', dataServiceLogin]);

function dataServiceLogin($http) {
    var Token = "";
    var UserID = "";
    var UserName = "";

    function setToken(value) {
        Token = value;
    }

    function setUserID(value) {
        UserID = value;
    }

    function setUserName(value) {
        UserName = value;
    }

    function getToken() {
        return Token;
    }

    function getUserID() {
        return UserID;
    }

    function getUserName() {
        return UserName;
    }

    return {
        setToken: setToken,
        getToken: getToken,
        setUserID: setUserID,
        getUserID: getUserID,
        setUserName: setUserName,
        getUserName: getUserName


    };
}

