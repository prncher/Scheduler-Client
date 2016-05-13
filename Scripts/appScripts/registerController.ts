"use strict";
import ng = angular;
import ngr = angular.ui;
import serviceModule = require("serviceHandler");

export class registerController {
    state: ngr.IStateService;
    user: any;
    serviceFactory: serviceModule.serviceHandler;
    parent: any;

    constructor($scope: ng.IScope, $state: ngr.IStateService, services: serviceModule.serviceHandler) {
        this.serviceFactory = services;
        this.state = $state;
        this.parent = $scope.$parent;

        this.user = {};
    }

    public register(): void {
        var self = this;
        this.serviceFactory.registerUser(this.user).then(function (response) {
            if (response.status === 201) {
                self.parent.ctrl.message = "";
                self.state.go("login");
            }
        }).catch((reason) => {
            self.parent.ctrl.message = reason.data.Message + ";" + reason.data.ExceptionMessage;
        });
        self.user = {};
    };
}