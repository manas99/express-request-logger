import { RequestLoggerService } from "../services/request_logger.service";
import { LogLevel } from "../utils/enums";
import { LogModel } from "./log.model";

export class RequestLog {
    private _reqId: string;
    private _logService: RequestLoggerService;
    private _startTime: Date | undefined;

    constructor(logService: RequestLoggerService) {
        this._logService = logService;
        this._reqId = this._logService.generateRequestID();
    }

    start(path: string, method: string, headers: any, params: any, body: any) {
        const _log = LogModel.generate(this._reqId, LogLevel.INFO)
            .method(method)
            .requestPath(path)
            .requestHeaders(headers)
            .requestBody(body)
            .requestQueryParams(params)
            .message("Request received");
        this._startTime = _log.log.time;
        this._logService.commitLog(_log);
    }

    trace(msg: string, data: any = {}, operation: string = "") {
        let _log = LogModel.generate(this._reqId, LogLevel.TRACE)
            .message(msg)
            .data(data)
            .operation(operation);
        this._logService.commitLog(_log);
    }

    debug(msg: string, data: any = {}, operation: string = "") {
        let _log = LogModel.generate(this._reqId, LogLevel.DEBUG)
            .message(msg)
            .data(data)
            .operation(operation);
        this._logService.commitLog(_log);
    }

    info(msg: string, data: any = {}, operation: string = "") {
        let _log = LogModel.generate(this._reqId, LogLevel.INFO)
            .message(msg)
            .data(data)
            .operation(operation);
        this._logService.commitLog(_log);
    }

    warn(msg: string, data: any = {}, operation: string = "") {
        let _log = LogModel.generate(this._reqId, LogLevel.WARN)
            .message(msg)
            .data(data)
            .operation(operation);
        this._logService.commitLog(_log);
    }

    error(msg: string, data: any = {}, operation: string = "") {
        let _log = LogModel.generate(this._reqId, LogLevel.ERROR)
            .message(msg)
            .data(data)
            .operation(operation);
        this._logService.commitLog(_log);
    }

    fatal(msg: string, data: any = {}, operation: string = "") {
        let _log = LogModel.generate(this._reqId, LogLevel.FATAL)
            .message(msg)
            .data(data)
            .operation(operation);
        this._logService.commitLog(_log);
    }

    end(responseStatus: number, responseBody: any) {
        const _log = LogModel.generate(this._reqId, LogLevel.INFO)
            .responseStatus(responseStatus)
            .responseBody(responseBody)
            .calculateDuration(this._startTime)
            .message("Request completed");
        this._logService.commitLog(_log);
    }
}
