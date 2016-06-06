/*
 * controlManager
 * 

 * Author : Prince Cheruvathur
 * License: MIT
 */
"use strict";
import mainCtrlModule = require("mainController");
import loginCtrlModule = require("loginController");
import serviceModule = require("serviceHandler");
import routerModule = require("configRouter");
import regCtrlModule = require("registerController");
import schedlrCtrlModule = require("schedulerController");

export class ControlManager {
    $parse: any;
    socket: any;
    constructor(io : any) {
        var app = angular.module("controlManager", ["ui.router", "ui.bootstrap"]);
        this.socket = io.connect(location.protocol + '//' + location.host + '/');

        var router = new routerModule.configRouter();
        app.config(router.configure);

        var serviceHandler = new serviceModule.serviceHandler();
        var serviceMod = app.factory("services", ["$http", "$cacheFactory", serviceModule.exportService]);
        app.controller('MainController', ($location, $state) => new mainCtrlModule.mainController($location, $state));
        app.controller('LoginController', ($scope, $state, services) => new loginCtrlModule.loginController($scope, $state, services, serviceHandler));
        app.controller('RegisterController', ($scope, $state, services) => new regCtrlModule.registerController($scope, $state, serviceHandler));
        app.controller('SchedulerController', ($scope, $state, services,$uibModal, $log) => new schedlrCtrlModule.shedulerController($scope, $state, serviceHandler, this.socket, $uibModal, $log));

        var self = this;

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, schedule) {
  $scope.selected = {
    schedule: schedule
  };
  $scope.schedule = schedule;

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.schedule);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

    };

}