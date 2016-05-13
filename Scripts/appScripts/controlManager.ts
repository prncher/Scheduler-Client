"use strict";
import loginCtrlModule = require("loginController");
import serviceModule = require("serviceHandler");
import routerModule = require("configRouter");
import regCtrlModule = require("registerController");
import schedlrCtrlModule = require("schedulerController");

export class ControlManager {
    $parse: any;
    socket: any;
    constructor(io : any) {
        var app = angular.module("controlManager", ["ui.router"]);
        this.socket = io.connect(location.protocol + '//' + location.host + '/');

        var router = new routerModule.configRouter();
        app.config(router.configure);

        var serviceHandler = new serviceModule.serviceHandler();
        var serviceMod = app.factory("services", ["$http", "$cacheFactory", serviceModule.exportService]);
        app.controller('LoginController', ($location, $state, services) => new loginCtrlModule.loginController($location, $state, services, serviceHandler));
        app.controller('RegisterController', ($scope, $state, services) => new regCtrlModule.registerController($scope, $state, serviceHandler));
        app.controller('SchedulerController', ($scope, $state, services) => new schedlrCtrlModule.shedulerController($scope, $state, serviceHandler, this.socket));

        var self = this;

    };

}