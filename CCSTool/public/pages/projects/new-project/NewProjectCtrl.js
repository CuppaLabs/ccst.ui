(function () {
    'use strict';

    angular.module('BlurAdmin.pages.projects')
        .controller('NewProjectCtrl', WizardCtrl);


    /** @ngInject */
    function WizardCtrl($scope, $http, $filter, dataService, $state, $rootScope, toastr, $uibModal, $location, $localStorage) {

        $scope.copiaProject = false;
        $rootScope.hideit = true;
        $scope.UserID = $localStorage.currentUser.userid;


        var vm = this;
        var json;
        vm.personalInfo = {};
        vm.productInfo = {};
        vm.shipment = {};

        vm.arePersonalInfoPasswordsEqual = function () {
            return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
        };

        $scope.feed2 = [

            {author: 'project_icon'
                }

        ];

        $scope.projectsArray = [];
        $scope.projectArray2 = {};

        $scope.productSaas = [];
        $scope.productSaas2 = [];

        $scope.selectedProductSaas = [];

        $http.get('/api/v1/project?user_id=' + $scope.UserID)
            .then(function(response) {

                $scope.projectsArray = response.data;

                if (response.data.length > 0) {

                    $scope.copiaProject = true;

                }

                getSaasProduct();
            });

        function getSaasProduct() {

            $http.get('/api/v1/saas_product')
                .then(function (response) {

                    for (var i = 0; i < response.data.length; i++) {

                        $scope.productSaas.push(response.data[i].NAME)
                        $scope.productSaas2.push(response.data[i])

                    }

                    getTemplate();
                });
        }

        $scope.copiaProgetto = function(message) {


            var projectArray2 = JSON.stringify({

                project_id_from: message.PROJECTID,
                name: $scope.nameProject.name,
                description: $scope.descriptionProject.name,
                user_id: $scope.UserID
            });

            //alert(projectArray2);

            $http.post('api/v1/project/batch', projectArray2)
                .success(function (data, status) {


                    //$location.path('/dashboard');
                    // $state.reload();

                    toastr.success('Your project has been created successfully!');

                    location.replace('http://nacssissil043.oracle.com:10800/index.html');

                }).error(function (data, status, headers, config) {

                    if (name == "") {

                        open('pages/ui/modals/modalProject/dangerProjectName.html');
                        toastr.error("Your information hasn't been saved!", 'Error');                    }

            });

        }

        $scope.descriptionProject = [];
        $scope.nameProject = [];
        $scope.formData = [];

        $scope.accept = function(idx){

            $scope.showacceptation[idx] = true;
            $scope.showdenied[idx] = false;
        }

        $scope.templates = [];
        $scope.selectedItem = [];

        function getTemplate() {

            $http.get("/api/v1/template")
                .then(function (response) {

                    $scope.templates = (response.data);

                });

        }

        $scope.trasformation = function() {

            var table = $('#app2').tableToJSON({ignoreColumns: [5]});

            var tableTemplates = $('#app2').tableToJSON({

                ignoreColumns: [0,1,2,3,4,5]});

            var nameProj = JSON.stringify({

                name: $scope.nameProject.name,
                description: $scope.descriptionProject.name,
                user_id: $scope.UserID
            });


            $scope.projectID = [];

            // Primo Post del nome e descrizione Progetto in cui prendo l'id del progetto
            $http.post('/api/v1/project', nameProj)
                .success(function (data, status) {

                    $scope.projectID = data.PROJECTID;
                    dataService.setProjectID($scope.projectID);


                    postApplications();

                }).error(function (data, status, headers, config) {

                open('pages/ui/modals/modalProject/dangerProjectName.html');
                toastr.error("Your information hasn't been saved!", 'Error');

            });

            var parameter3;

            $scope.applicationsID = [];


            function postApplications() {


                parameter3 =JSON.stringify(table);

                // Seconda post delle applicazioni create associate ad un particolare project id
                $http.post('/api/v1/application/batch', parameter3)
                    .success(function (data, status) {

                        for (var i = 0; i < data.length; i++) {

                            $scope.applicationsID.push(data[i].APPLICATIONID);


                        }

                        postProjectApplication();
                      // getApplications();

                    }).error(function (data, status, headers, config) {

                    location.replace('http://nacssissil043.oracle.com:10800/index.html');


                });
            }

            var parameter11 = [];
            var count;
            $scope.newApplicationsID = [];

            function postProjectApplication() {


                var parameter10 = [];


                for (var i = 0; i < $scope.applicationsID.length; i++) {

                    parameter10.push({

                        application_id: $scope.applicationsID[i],
                        project_id: $scope.projectID.toString(),

                    })

                }


                parameter11 =JSON.stringify(parameter10);


                $http.post('/api/v1/project_application/batch', parameter11)
                    .success(function (data, status) {


                     count = data.length;

                        for (var i = 0; i < data.length; i++) {

                            $scope.newApplicationsID.push(data[i].APPLICATIONID);


                        }

                        postApplicationTemplate();

                    }).error(function (data, status, headers, config) {

                    alert("Error: Project not created");

                });

            }

            $scope.newArrayTemplateID = [];
            $scope.newArrayTemplateID2 = [];


            function postApplicationTemplate() {

                for (var j = 0; j < tableTemplates.length; j++) {

                    $scope.newArrayTemplateID.push(tableTemplates[j].TEMPLATEID);

                }

                for (var g = 0; g < $scope.newArrayTemplateID.length; g++) {

                    var count10 = 0;

                    for (var f = 0; f < $scope.templates.length; f++) {

                        if ($scope.newArrayTemplateID[g] == $scope.templates[f].NAME) {

                            $scope.newArrayTemplateID2.push($scope.templates[f].TEMPLATEID);

                            count10 = 1;

                        }

                    }

                    //caso in cui il template non è stato caricato
                    if (count10 == 0) {

                        $scope.newArrayTemplateID2.push("");

                    }

                }

                var parameter5 = [];

                for (var i = 0; i < count; i++) {

                    parameter5.push({

                        application_id: $scope.newApplicationsID[i],
                        template_id: $scope.newArrayTemplateID2[i],
                        project_id: $scope.projectID

                    });


                }

                var parameter6 = JSON.stringify(parameter5);


                $http.post('/api/v1/application_template/batch', parameter6)
                    .success(function (data, status) {
                        // this callback will be called asynchronously
                        // when the response is available
                        alert("Project created successfully");



                        location.replace('http://nacssissil043.oracle.com:10800/index.html');


                    }).error(function (data, status, headers, config) {

                         alert("Project created successfully");
                         location.replace('http://nacssissil043.oracle.com:10800/index.html');


                });
            }


        };

        function ArrayTemplateSelectedFunction() {


            $scope.ArrayTemplateSelected= [];

            angular.forEach(MySelect.template, function(selectedItem){

                   $scope.ArrayTemplateSelected.push(selectedItem.TEMPLATEID);
                   alert(JSON.stringify($scope.ArrayTemplateSelected));

            });
            $scope.tableTemplates = $scope.ArrayTemplateSelected;
        };

        $scope.data = {
            availableOptions: [
                {id: '1', name: 'Option A'},
                {id: '2', name: 'Option B'},
                {id: '3', name: 'Option C'}
            ],
            selectedOption: { NAME: 'No Template'} //This sets the default value of the select in the ui
        };


        $scope.addRow = function(formData){

           // alert(JSON.stringify($scope.formData));

            $scope.formData.push({

                'name': formData.name,
                'description': formData.description,
                'owner': formData.owner,
                'technology':formData.technology,
                'dato1':formData.dato1,
                'dato2':formData.dato2,
                'dato3':formData.dato3,
                'dato4':formData.dato4

            });

            formData.name='';
            formData.description='';
            formData.owner='';
            formData.technology='';
            formData.dato1='';
            formData.dato2='';

        };

        $scope.checkAll = function () {
            if (!$scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.formData, function (formData) {
                formData.selected = $scope.selectedAll;
            });
        };

        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.formData, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            });
            $scope.formData = newDataList;


        };

        $scope.myCSVdata = [];

        $scope.handler=function(e,files){

            var files = e.target.files;

            for (var i = 0, len = files.length; i < len; i++) {
                var file = files[i];

                var reader = new FileReader();

                reader.onload = (function(f) {
                    return function(e) {

                        console.log('e readAsText = ', e);
                        console.log('e readAsText target = ', e.target);
                        try {
                            json = JSON.stringify(e.target.result);

                           // alert('json global var has been set to parsed json of this file here it is unevaled = \n' + json);
                            addRo();


                        } catch (ex) {
                            alert('ex when trying to parse json = ' + ex);
                        }

                    };
                })(file);

                reader.readAsText(file);
            }


        };

        $scope.formData2 = [];

        function addRo() {

            json = json.replace(/\\n|\\r\\n|\\r/g, '\n');
            json = json.replace(/"/g, '');

            var lines = json.split("\n");

            for (var i = 0; i < lines.length-1;i++) {

                var campi = lines[i].split(",");

                    for (var j = 0; j < campi.length; j++) {

                        var flag = false;
                        var flag2 = false;


                        //ERROR: Field App_Name found empty, but it is mandatory
                        if (campi[j].length == 0) {

                            open('pages/ui/modals/modalProject/NameErrorCSV.html');
                            toastr.error("Your CSV hasn't been uploaded!", 'Error');

                           return $scope.formData2 = [];


                        }

                        $scope.name = campi[j];
                        j++;

                        $scope.description = campi[j];
                        j++;

                        $scope.owner = campi[j];
                        j++;

                        $scope.technology = campi[j];
                        j++;

                        $scope.dato1 = campi[j];
                        j++;



                        // Field SaaS_Product missing
                        if (campi[j] == undefined) { flag2 = true;}

                        else {
                            //ERROR: Field SaasProduct_Name mismatch

                            for (var m = 0; m < $scope.productSaas2.length; m++) {

                                if (campi[j] == $scope.productSaas2[m].NAME || campi[j] == $scope.productSaas2[m].ACRONYM || campi[j].length == 0) {


                                    flag = true;
                                }

                            }
                            if (flag == false) {

                                open('pages/ui/modals/modalProject/SaasProductErrorCSV.html');
                                toastr.error("Your CSV hasn't been uploaded!", 'Error');

                                return $scope.formData2 = [];

                            }
                        }

                        $scope.dato2 = campi[j];
                        j++;


                        // Field Template missing
                        if (campi[j] == undefined) { flag2 = true;}

                        else {

                            //ERROR: Field Template mismatch
                            for (var z = 0; z < $scope.templates.length; z++) {

                                if (campi[j] == $scope.templates[z].NAME || campi[j].length == 0) {

                                    flag2 = true;

                                }

                            }
                            if (flag2 == false) {

                                open('pages/ui/modals/modalProject/TemplateErrorCSV.html');
                                toastr.error("Your Template hasn't been saved!", 'Error');

                                return $scope.formData2 = [];

                            }
                        }

                        $scope.dato3 = campi[j];
                        j++;


                        $scope.formData2.push({
                            'name': $scope.name,
                            'description': $scope.description,
                            'owner': $scope.owner,
                            'technology': $scope.technology,
                            'dato1': $scope.dato1,
                            'dato2': $scope.dato2,
                            'dato3': $scope.dato3
                        });

                    }


            }


            if ($scope.formData.length > 0) {


                for (var h = 0; h < lines.length-1; h++) {

                    $scope.formData.push($scope.formData2[h]);

                }

                $scope.formData2 = [];
            }

            if($scope.formData.length == 0) {

                $scope.formData = $scope.formData2;
                $scope.formData2 = [];

            }

        }

        function open(page, size) {
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };

    }

})();

angular.module('BlurAdmin.pages.projects')
    .directive('fileChange', ['$parse', function($parse) {

    return{

        require:'ngModel',

        restrict:'A',

        link:function($scope,element,attrs,ngModel){

            var attrHandler=$parse(attrs['fileChange']);

            var handler=function(e){

                $scope.$apply(function(){

                    attrHandler($scope,{$event:e,files:e.target.files});

                });
            };

            element[0].addEventListener('change',handler,false);
        }
    }
}]);


