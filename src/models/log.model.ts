import { Log } from '../../types';
import { LogLevel } from '../utils/enums';


export class LogModel {

    static generate(env: string, appName: string, appVersion: string, requestId: string, logLevel: LogLevel, message: string = '', data: any = {}) {
        return new LogModel(env, appName, appVersion, requestId, logLevel);
    }

    private _log: Log;

    constructor(env: string, appName: string, appVersion: string, requestId: string, logLevel: LogLevel, message: string = '', data: any = {}) {
        this._log = {
            env: env,
            time: new Date(),
            appName: appName,
            appVersion: appVersion,
            requestId: requestId,
            logLevel: logLevel,
            message: message,
            data: data,
        }
    }

    get log(): Log { return this._log; }

    requestBody(val: any): LogModel {
        this._log.requestBody = val;
        return this;
    }

    requestQueryParams(val: any): LogModel {
        this._log.requestQueryParams = val;
        return this;
    }

    message(val: string): LogModel {
        this._log.message = val;
        return this;
    }

    data(val: any): LogModel {
        this._log.data = val;
        return this;
    }

    requestPath(val: any): LogModel {
        this._log.requestPath = val;
        return this;
    }

    responseBody(val: any): LogModel {
        this._log.responseBody = val;
        return this;
    }

    responseStatus(val: number): LogModel {
        this._log.responseStatus = val;
        return this;
    }

    calculateDuration(startTime: Date | undefined): LogModel {
        if (!startTime) {
            return this;
        }
        this._log.duration = (this._log.time.getTime() - startTime.getTime());
        return this;
    }

    operation(val: string): LogModel {
        this._log.operation = val;
        return this;
    }

    method(val: string): LogModel {
        this._log.method = val;
        return this;
    }

    requestHeaders(val: any): LogModel {
        this._log.requestHeaders = val;
        return this;
    }
}
