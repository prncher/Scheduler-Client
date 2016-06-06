/*
 * loginController
 * 

 * Author : Prince Cheruvathur
 * License: MIT
 */
"use strict";
import ng = angular;
import ngr = angular.ui;
import serviceModule = require("serviceHandler");

export class loginController {
    state: ngr.IStateService;
    user: any;
    serviceFactory: serviceModule.serviceHandler;
    parent: any;

    constructor($scope: ng.IScope,$state: ngr.IStateService, services: any, serviceClass: serviceModule.serviceHandler) {
        this.serviceFactory = serviceClass;
        this.serviceFactory.assign(services);
        this.state = $state;
        this.user = {};
        this.parent = $scope.$parent;
    }

    public login(): void {
        var self = this;
        this.serviceFactory.validateUser(this.user).then(function (response) {
            if (response.status === 200) {
                self.parent.ctrl.loggedInUser = response.data.student;
                self.parent.ctrl.loggedIn = true;
                self.parent.ctrl.message = "";
                self.serviceFactory.setToken(response.data.token);
self.state.go("scheduler");
            }
        }).catch((reason) => {
            self.parent.ctrl.loggedIn = false;
            self.parent.ctrl.message = reason.data.Message + ";" + reason.data.ExceptionMessage;
        });
        self.user = {};
    };

}