requirejs.config({
    baseUrl: "Scripts/appScripts",
    paths: {
        "jQuery": "../../bower_components/jquery/dist/jquery.min",
        "bootstrap": "../../bower_components/bootstrap/dist/js/bootstrap",
        "app": "./schedulerApp",
        "angular": "../../bower_components/angular/angular",
        "ui.router": "../../bower_components/angular-ui-router/release/angular-ui-router",
        "socketio": "./socket.io"
    },
    shim: {
        "bootstrap": ['jQuery'],
        "ui.router": ['angular']
    }
});

requirejs(["app", "socketio", "jQuery", "bootstrap", "angular", "ui.router"], (app,io) => {
    var app = new app.SchedulerApp(io);

    angular.element(document).ready(() => {
        angular.bootstrap(document, ['SchedulerApp']);
    });
});