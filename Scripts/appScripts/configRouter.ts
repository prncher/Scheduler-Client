/*
 * configRouter
 * 

 * Author : Prince Cheruvathur
 * License: MIT
 */
"use strict";
import ng = angular;
import ngr = angular.ui;
export class configRouter {
    constructor() {
    };

    public configure($stateProvider: ngr.IStateProvider, $urlRouterProvider: ngr.IUrlRouterProvider): void {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('login', {
            url: '/',
            templateUrl: 'Views/Login.html',
            controller: 'LoginController'
        }).state('register', {
            url: '/Register',
            templateUrl: 'Views/Register.html',
            controller: 'RegisterController'
        }).state('scheduler', {
            url: '/scheduler',
            templateUrl: 'Views/Scheduler.html',
            controller: 'SchedulerController'
        });
    }
}