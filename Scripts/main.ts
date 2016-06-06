/*
 * main
 * 

 * Author : Prince Cheruvathur
 * License: MIT
 */
requirejs.config({
    baseUrl: "Scripts/appScripts",
    paths: {
        "jQuery": "../../bower_components/jquery/dist/jquery.min",
        "bootstrap": "../../bower_components/bootstrap/dist/js/bootstrap",
        "app": "./schedulerApp",
        "angular": "../../bower_components/angular/angular",
        "ui.router": "../../bower_components/angular-ui-router/release/angular-ui-router",
        "socketio": "./socket.io",
        "ui.bootstrap": "../../bower_components/angular-bootstrap/ui-bootstrap-tpls"
    },
    shim: {
        "bootstrap": ['jQuery'],
        "ui.bootstrap": ['angular'],
        "ui.router": ['angular']
    }
});

requirejs(["app", "socketio", "jQuery", "bootstrap", "angular", "ui.router", "ui.bootstrap"], (app,io) => {
    var app = new app.SchedulerApp(io);

    angular.element(document).ready(() => {
        angular.bootstrap(document, ['SchedulerApp']);
    });
});