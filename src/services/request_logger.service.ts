import { LogHandler } from "../interfaces/log_handler.interface";
import { RequestLog } from "../models/request_log.model";
import { RequestLoggerConfig } from "../../types";
import { generateRandomUUID } from "../utils/helpers";
import { LogModel } from "../models/log.model";


export class RequestLoggerService {

    private static _instance: RequestLoggerService;
    static getInstance(config: RequestLoggerConfig): RequestLoggerService {
        return this._instance || (this._instance = new RequestLoggerService(config));
    }

    private _appName: string;
    private _appVersion: string;
    private _environment: string;
    _generateRequestID: CallableFunction;
    private _logHandlers: LogHandler[];

    constructor(config: RequestLoggerConfig) {
        this._appName = config.applicationName;
        this._appVersion = config.applicationVersion;
        this._environment = config.environment;
        this._generateRequestID = config.generateRequestId || generateRandomUUID;
        this._logHandlers = config.logHandlers || [];
    }

    get environment(): string {
        return this._environment;
    }

    get appName(): string {
        return this._appName;
    }
    get appVersion(): string {
        return this._appVersion;
    }

    generateRequestID(): string {
        return this._generateRequestID();
    }

    generateRequestLog(): RequestLog {
        return new RequestLog(this);
    }

    commitLog(log: LogModel) {
        for (let _handler of this._logHandlers) {
            _handler.handle(log.log);
        }
    }
}
