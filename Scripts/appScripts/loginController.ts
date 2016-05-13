"use strict";
import ng = angular;
import ngr = angular.ui;
import serviceModule = require("serviceHandler");

export class loginController {
    location: ng.ILocationService;
    state: ngr.IStateService;
    loggedIn: boolean;
    message: string;
    user: any;
    serviceFactory: serviceModule.serviceHandler;
    loggedInUser: any;

    constructor($location: ng.ILocationService, $state: ngr.IStateService, services: any, serviceClass: serviceModule.serviceHandler) {
        this.serviceFactory = serviceClass;
        this.serviceFactory.assign(services);
        this.location = $location;
        this.state = $state;
        this.loggedIn = false;
        this.message = "";
        this.user = {};
    }

    public login(): void {
        var self = this;
        this.serviceFactory.validateUser(this.user).then(function (response) {
            if (response.status === 200) {
                self.loggedIn = true;
                self.message = "";
                self.loggedInUser = response.data.student;
                self.serviceFactory.setToken(response.data.token);
            }
        }).catch((reason) => {
            self.loggedIn = false;
            self.message = reason.data.Message + ";" + reason.data.ExceptionMessage;
        });
        self.user = {};
    };

    public validate(): void {
        if (!this.loggedIn) {
            this.message = "Login before adding buddies or share."
            this.state.go("login");
        }
    };
}