/*
 * mainController
 * 

 * Author : Prince Cheruvathur
 * License: MIT
 */
"use strict";
import ng = angular;
import ngr = angular.ui;

export class mainController {
    location: ng.ILocationService;
    state: ngr.IStateService;
    loggedIn: boolean;
    message: string;
    loggedInUser: any;

    constructor($location: ng.ILocationService, $state: ngr.IStateService) {
        this.location = $location;
        this.state = $state;
        this.loggedIn = false;
        this.message = "";
        this.loggedInUser = null;
    }


    public validate(): void {
        if (!this.loggedIn) {
            this.message = "Login before accessing scheduler."
            this.state.go("login");
        }
    };
}