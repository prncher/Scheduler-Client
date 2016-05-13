"use strict";
import ng = angular;
import ngr = angular.ui;
import serviceModule = require("serviceHandler");

export class shedulerController {
    state: ngr.IStateService;
    serviceFactory: serviceModule.serviceHandler;
    parent: any;
    socket: any;

    constructor($scope: ng.IScope, $state: ngr.IStateService, services: serviceModule.serviceHandler, socket : any) {
        this.parent = $scope.$parent;
        this.serviceFactory = services;
        this.state = $state;
        this.parent.ctrl.validate();
        this.socket = socket;
        if (this.parent.ctrl.loggedIn) {
        };
    }
}