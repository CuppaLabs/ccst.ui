/**
 * @author v.lugovsky
 * created on 07.06.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .controller('SwitchPanelCtrl', SwitchPanelCtrl);

  /** @ngInject */
  function SwitchPanelCtrl() {
    var vm = this;

    vm.switcherValues = {

      success: true
    };
  }

})();
