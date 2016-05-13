"use strict";

interface IServiceHandler {
    assign(service: exportService): void;
    validateUser<T>(user: T): ng.IHttpPromise<T>;
    registerUser<T>(user: T): ng.IHttpPromise<T>;
}

export class exportService {
    $http: any;
    cacheFactory: ng.ICacheFactoryService;
    constructor($http: ng.IHttpService, $cacheFactory: ng.ICacheFactoryService) {
        this.cacheFactory = $cacheFactory;
        this.$http = $http;
        return this;
    }
}

export class serviceHandler implements IServiceHandler {
    service: exportService;
    cache: ng.ICacheObject;
    constructor() {
    }

    public assign(service: exportService): void {
        this.service = service;
    }

    public setToken(token: string): void {
        this.cache = this.service.cacheFactory('Scheduler');
        if (ng.isUndefined(this.cache.get('token'))) {
            this.cache.put('token', ng.isUndefined(token) ? null : token);
            this.service.$http.defaults.headers.common.Authorization = 'Bearer ' + token;
        }
    }

    public validateUser<T>(user: T): ng.IHttpPromise<T> {
        return this.service.$http({
            method: 'GET',
            url: '/api/Students?user=' + JSON.stringify(user)
        });
    };

    public registerUser<T>(user: T): ng.IHttpPromise<T> {
        return this.service.$http({
            method: 'POST',
            url: '/api/Students',
            data: user
        });
    };
}