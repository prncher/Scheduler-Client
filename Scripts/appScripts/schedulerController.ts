/*
 * schedulerController
 * 

 * Author : Prince Cheruvathur
 * License: MIT
 */
"use strict";
import ng = angular;
import ngr = angular.ui;
import serviceModule = require("serviceHandler");

export class shedulerController {
    state: ngr.IStateService;
    serviceFactory: serviceModule.serviceHandler;
    parent: any;
    socket: any;
    items : Array<string>;
animationsEnabled: boolean;
$uibModal : any;
$log : any;
$scope : any;
schedule: any;
days:Array<any> = [];
times:Array<any> = [];
today:any;
allSchedules : any;

    constructor($scope: ng.IScope, $state: ngr.IStateService, services: serviceModule.serviceHandler, socket : any,$uibModal : any, $log : any) {
this.$scope = $scope;
        this.parent = $scope.$parent;
        this.serviceFactory = services;
        this.state = $state;
        this.parent.ctrl.validate();
        this.socket = socket;
        if (this.parent.ctrl.loggedIn) {
this.getSchedules(this.parent.ctrl.loggedInUser.id);
        };
        this.today = new Date();
        this.schedule = {"time" : this.today, "duration" : 15};
        this.$uibModal = $uibModal;
        this.$log = $log;
this.generateDays(this.today);

}

previous = () => {
this.today.setDate(this.today.getDate() -7);
this.modifyWeek();
}

next = () => {
this.today.setDate(this.today.getDate() +7);
this.modifyWeek();
}

edit = (schedule) => {
    var self = this;
	self.schedule = schedule;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'ScheduleItem',
      controller: 'ModalInstanceCtrl',
      size: 'md',
      resolve: {
        schedule: function () {
          return self.schedule;
        }
      }
    });

    modalInstance.result.then(function (schedule) {
      self.schedule = schedule;
self.editSchedule();
    }, function () {
self.resetSchedule();
      self.$log.info('Modal dismissed at: ' + new Date());
    });
}

open = (day) => {
    var self = this;
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'ScheduleItem',
      controller: 'ModalInstanceCtrl',
      size: 'md',
      resolve: {
        schedule: function () {
		self.schedule.time = day.date;
          return self.schedule;
        }
      }
    });

    modalInstance.result.then(function (schedule) {
      self.schedule = schedule;
	self.schedule.studentId = self.parent.ctrl.loggedInUser.id;
      self.addSchedule();
    }, function () {
self.resetSchedule();
      self.$log.info('Modal dismissed at: ' + new Date());
    });
};



addSchedule = () => {
 var self = this;      this.serviceFactory.addSchedule(this.schedule).then(function (response) {
            if (response.status === 201) {
self.setSchedule(new Date(self.schedule.time),self.schedule); 
                self.parent.ctrl.message = "";
self.resetSchedule();
            }
        }).catch((reason) => {
self.resetSchedule();
            self.parent.ctrl.message = reason.data.Message + ";" + reason.data.ExceptionMessage;
        });
};

editSchedule = () => {
 var self = this;      this.serviceFactory.editSchedule(this.schedule).then(function (response) {
            if (response.status === 201) {
self.resetSchedule();
            }
        }).catch((reason) => {
self.resetSchedule();
            self.parent.ctrl.message = reason.data.Message + ";" + reason.data.ExceptionMessage;
        });
};

getSchedules = (studentId) => {

        var self = this;
        this.serviceFactory.getSchedules(studentId).then((response) => {
            if (response.status === 200) {
                self.allSchedules = response.data;
			self.assignSchedules(self.allSchedules);
            }
        }).catch(this.showErrorMessage());


};

private resetSchedule() : void{
        var d = new Date();
        this.schedule = {"time" : d, "duration" : 15};
}

    private showErrorMessage(): any {
        var self = this;
        return (reason: any) => {
            if (reason.status !== 404) {
                self.parent.ctrl.message = reason.data.Message + ";" + reason.data.ExceptionMessage;
            }
        }
    };

private modifyWeek() : void{
this.days = [];
this.generateDays(this.today);
this.assignSchedules(this.allSchedules);
}

private assignSchedules(schedules) : void{
schedules.forEach(x => {
this.setSchedule(new Date(x.time),x);
});
}

private setSchedule(date, schedule) : void{
this.days.forEach(y => {
if (y.date.toDateString() === date.toDateString()){
y.schedules.push(schedule);
return;
}
});
}


private generateDays(today) : void {

this.days.push({ date : today, schedules : []});

for(var i = 0; i < 3; i++)
{

var newDay = new Date(today);
  newDay.setDate(today.getDate() + i + 1);
this.days.push({ date : newDay, schedules : []});
var oldDay = new Date(today);
  oldDay.setDate(today.getDate() - i - 1);
this.days.unshift({ date : oldDay, schedules : []});

}

};



}