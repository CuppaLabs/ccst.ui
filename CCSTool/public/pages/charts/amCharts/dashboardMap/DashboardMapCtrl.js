
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.charts.amCharts')
      .controller('DashboardMapCtrl', DashboardMapCtrl);

  /** @ngInject */
  function DashboardMapCtrl(baConfig, $element, layoutPaths, $scope, $http, dataService) {
      var layoutColors = baConfig.colors;
      var id = $element[0].getAttribute('id');

      $scope.projectID = dataService.getProjectID();

      $scope.country = [
          {title: 'Austria'},
          {title: 'Ireland'},
          {title: 'Denmark'},
          {title: 'Finland'},
          {title: 'Sweden'},
          {title: 'Great Britain'},
          {title: 'Italy'},
          {title: 'France'},
          {title: 'Spain'},
          {title: 'Greece'},
          {title: 'Germany'},
          {title: 'Belgium'},
          {title: 'Luxembourg'},
          {title: 'Netherlands'},
          {title: 'Portugal'},
          {title: 'Lithuania'},
          {title: 'Latvia'},
          {title: 'Czech Republic'},
          {title: 'Slovakia'},
          {title: 'Estonia'},
          {title: 'Hungary'},
          {title: 'Cyprus'},
          {title: 'Malta'},
          {title: 'Poland'},
          {title: 'Romania'},
          {title: 'Bulgaria'},
          {title: 'Slovenia'},
          {title: 'Croatia'}
      ];
      $scope.country2 = [];


      $http.get("/api/v1/application?" + "project_id=" + $scope.projectID)
          .then(function (response) {

              for (var i = 0; i < $scope.country.length; i++) {

                  var count = 0;

                  for (var g = 0; g < response.data.length; g++) {

                      if ($scope.country[i].title == response.data[g].TECHNOLOGY) {

                          count++;

                      }

                  }

                  if ( count == 0) {



                      $scope.country2.push({

                          text: $scope.country[i].title,
                          customData: count,
                          color: layoutColors.borderDark

                      });

                  }

                  else {

                      $scope.country2.push({

                          text: $scope.country[i].title,
                          customData: count,
                          color: layoutColors.primary

                      });

                  }


              }

              contaCountry();

          });


      function contaCountry() {


          var map = AmCharts.makeChart(id, {


              type: 'map',
              theme: 'blur',

              dataProvider: {
                  map: 'worldLow',
                  zoomLevel: 3.5,
                  zoomLongitude: 10,
                  zoomLatitude: 52,
                  areas: [
                      {title: 'Austria', id: 'AT', color: $scope.country2[0].color, customData: $scope.country2[0].customData, groupId: '0'},
                      {title: 'Ireland', id: 'IE', color: $scope.country2[1].color, customData: $scope.country2[1].customData, groupId: '1'},
                      {title: 'Denmark', id: 'DK', color: $scope.country2[2].color, customData: $scope.country2[2].customData, groupId: '2'},
                      {title: 'Finland', id: 'FI', color: $scope.country2[3].color, customData: $scope.country2[3].customData, groupId: '3'},
                      {title: 'Sweden', id: 'SE', color: $scope.country2[4].color, customData: $scope.country2[4].customData, groupId: '4'},
                      {
                          title: 'Great Britain',
                          id: 'GB',
                          color: $scope.country2[5].color,
                          customData: $scope.country2[5].customData,
                          groupId: '5'
                      },
                      {title: 'Italy', id: 'IT', color: $scope.country2[6].color, customData: $scope.country2[6].customData, groupId: '6'},
                      {title: 'France', id: 'FR', color: $scope.country2[7].color, customData: $scope.country2[7].customData, groupId: '7'},
                      {title: 'Spain', id: 'ES', color: $scope.country2[8].color, customData: $scope.country2[8].customData, groupId: '8'},
                      {title: 'Greece', id: 'GR', color: $scope.country2[9].color, customData: $scope.country2[9].customData, groupId: '9'},
                      {title: 'Germany', id: 'DE', color: $scope.country2[10].color, customData: $scope.country2[10].customData, groupId: '10'},
                      {title: 'Belgium', id: 'BE', color: $scope.country2[11].color, customData: $scope.country2[11].customData, groupId: '11'},
                      {title: 'Luxembourg', id: 'LU', color: $scope.country2[12].color, customData: $scope.country2[12].customData, groupId: '12'},
                      {title: 'Netherlands', id: 'NL', color: $scope.country2[13].color, customData: $scope.country2[13].customData, groupId: '13'},
                      {title: 'Portugal', id: 'PT', color: $scope.country2[14].color, customData: $scope.country2[14].customData, groupId: '14'},
                      {title: 'Lithuania', id: 'LT', color: $scope.country2[15].color, customData: $scope.country2[15].customData, groupId: '15'},
                      {title: 'Latvia', id: 'LV', color: $scope.country2[16].color, customData: $scope.country2[16].customData, groupId: '16'},
                      {
                          title: 'Czech Republic ',
                          id: 'CZ',
                          color: $scope.country2[17].color,
                          customData: $scope.country2[17].customData,
                          groupId: '17'
                      },
                      {title: 'Slovakia', id: 'SK', color: $scope.country2[18].color, customData: $scope.country2[18].customData, groupId: '18'},
                      {title: 'Estonia', id: 'EE', color: $scope.country2[19].color, customData: $scope.country2[19].customData, groupId: '19'},
                      {title: 'Hungary', id: 'HU', color: $scope.country2[20].color, customData: $scope.country2[20].customData, groupId: '20'},
                      {title: 'Cyprus', id: 'CY', color: $scope.country2[21].color, customData: $scope.country2[21].customData, groupId: '21'},
                      {title: 'Malta', id: 'MT', color: $scope.country2[22].color, customData: $scope.country2[22].customData, groupId: '22'},
                      {title: 'Poland', id: 'PL', color: $scope.country2[23].color, customData: $scope.country2[23].customData, groupId: '23'},
                      {title: 'Romania', id: 'RO', color: $scope.country2[24].color, customData: $scope.country2[24].customData, groupId: '24'},
                      {title: 'Bulgaria', id: 'BG', color: $scope.country2[25].color, customData: $scope.country2[25].customData, groupId: '25'},
                      {title: 'Slovenia', id: 'SI', color: $scope.country2[26].color, customData: $scope.country2[26].customData, groupId: '26'},
                      {title: 'Croatia', id: 'HR', color: $scope.country2[27].color, customData: $scope.country2[27].customData, groupId: '27'}
                  ]
              },

              areasSettings: {
                  rollOverOutlineColor: layoutColors.border,
                  rollOverColor: layoutColors.danger,
                  alpha: 0.8,
                  unlistedAreasAlpha: 0.2,
                  unlistedAreasColor: layoutColors.defaultText,
                  balloonText: '[[title]]: [[customData]] Apps'
              },

              legend: {
                  width: '100%',
                  marginRight: 27,
                  marginLeft: 27,
                  equalWidths: false,
                  backgroundAlpha: 0.3,
                  backgroundColor: layoutColors.border,
                  borderColor: layoutColors.border,
                  borderAlpha: 1,
                  top: 362,
                  left: 0,
                  horizontalGap: 10,
                  data: [
                      {
                          title: 'over 1 000 users',
                          color: layoutColors.primary
                      },
                      {
                          title: '500 - 1 000 users',
                          color: layoutColors.successLight
                      },
                      {
                          title: '100 - 500 users',
                          color: layoutColors.success
                      },
                      {
                          title: '0 - 100 users',
                          color: layoutColors.danger
                      }
                  ]
              },
              export: {
                  enabled: true
              },
              creditsPosition: 'bottom-right',
              pathToImages: layoutPaths.images.amChart
          });
      }

  }
})();