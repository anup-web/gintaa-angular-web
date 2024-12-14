import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@gintaa/env';
// import { DeviceDetectorService } from 'ngx-device-detector';

enum logTypes {
    log,
    error,
    info,
    warn,
    debug
}
type LogLevelStrings = keyof typeof logTypes;

export interface LoggerObject {
    currentRoute?: string;
    moduleName?: string;
    logType?: string;
    date?: any;
    message?: string;
    messageObj?: object;
}

export interface InterceptorLoggerObject {
    logType: string;
    url: string;
    method: string;
    params?: any;
    headers?: any;
    requestObject?: any;
    responseObject?: any;
    currentUser?: any;
    isTokenRequired?: boolean;
    startTimeStamp?: number;
    endTimeStamp?: number;
}

export interface ServiceLoggerObject {
    origin: string;
    operationName: string;
    operationType?: string;
    ip?: string;
    deviceInfo?: any;
    timestamp?: number;
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    defaultLogType = 'log';
    defaultModuleName = 'Gintaa';
    defaultCurrentRoute = '/';
    activeLogObject: LoggerObject;
    activeServiceObject: ServiceLoggerObject;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        /* private deviceService: DeviceDetectorService */
    ) { }

    log(logObject: LoggerObject) {
        this.activeLogObject = {
            message: (logObject.message) ? JSON.stringify(logObject.message) : '',
            messageObj: (logObject.messageObj) ? logObject.messageObj : {},
            date: new Date(),
            logType: (logObject.logType) ? logObject.logType.toLowerCase() : this.defaultLogType,
            moduleName: (logObject.moduleName) ? logObject.moduleName : this.defaultModuleName,
            currentRoute: (logObject.currentRoute) ? logObject.currentRoute : this.router.url,
        };

        if (environment.allowConsole) {
            switch (this.activeLogObject.logType) {
                case 'log':
                    // console.log(this.activeLogObject);
                    break;
                case 'error':
                    // console.error(JSON.stringify(this.activeLogObject));
                    break;
                case 'info':
                    // tslint:disable-next-line: no-console
                    // console.info(this.activeLogObject);
                    // tslint:disable-next-line: no-console
                    if (environment.addConsoleDebugs) { console.debug(JSON.stringify(this.activeLogObject)); }
                    break;
                case 'warn':
                    // console.warn(JSON.stringify(this.activeLogObject));
                    break;
                default:
                    // console.log(JSON.stringify(this.activeLogObject));
                    break;
            }
        }
    }

    decoratedLog(logObject: LoggerObject) {
        this.activeLogObject = {
            message: (logObject.message) ? JSON.stringify(logObject.message) : '',
            messageObj: (logObject.messageObj) ? logObject.messageObj : null,
            date: new Date(),
            logType: (logObject.logType) ? logObject.logType.toLowerCase() : this.defaultLogType,
            moduleName: (logObject.moduleName) ? logObject.moduleName : this.defaultModuleName,
            currentRoute: (logObject.currentRoute) ? logObject.currentRoute : this.router.url,
        };

        // console.log(`%c[${this.activeLogObject.message}]`, 'background: #D32F2F; color: #FFCDD2');
        // console.log(this.activeLogObject.messageObj);
    }

    interceptLogger(logObject: InterceptorLoggerObject) {
        // TODO add log service provider here
        // ex: firebase providers
        if (environment.allowConsole) {
            if (logObject.logType === 'error') {
                // console.error(logObject);
            } else {
                // console.log(logObject);
            }
        }
    }

    serviceLogger(logObject: ServiceLoggerObject) {
        this.activeServiceObject = {
            ...logObject,
            operationType: logObject.operationType ? logObject.operationType.toUpperCase() : 'GET',
            timestamp: new Date().getTime(),
            ip: null,
            deviceInfo: null,
        };
        if (environment.allowConsole) {
            if (environment.addClientIP) {
                /*
                this.getClientIP().subscribe((res: any) => {
                    this.activeServiceObject.ip = res.ip;
                    this.logServiceObject();
                }); */
            } else {
                this.activeServiceObject.ip = null;
                this.logServiceObject();
            }
        }
    }

    logServiceObject() {
        if (environment.addClientDeviceInfo) {
            this.getDeviceInfo();
        }
        // console.log(this.activeServiceObject);
    }

    getClientIP() {
        return this.httpClient.get('http://api.ipify.org/?format=json');
    }

    getDeviceInfo() {
        /*
        this.activeServiceObject.deviceInfo = {
            deviceInfo: this.deviceService.getDeviceInfo(),
            isMobile: this.deviceService.isMobile(),
            isTablet: this.deviceService.isTablet(),
            isDesktopDevice: this.deviceService.isDesktop(),
        }; */
    }

}
