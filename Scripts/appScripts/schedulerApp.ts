/*
 * schedulerApp
 * 

 * Author : Prince Cheruvathur
 * License: MIT
 */
"use strict";
import ctrlManagerModule = require("controlManager");

export class SchedulerApp {
    constructor(io : any) {
        var ngApp = angular.module('SchedulerApp', ["ui.router", "controlManager"]);
        var mainCtrls = new ctrlManagerModule.ControlManager(io);
    }
}