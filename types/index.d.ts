import { LogHandler } from "../src/interfaces/log_handler.interface";
import { LogLevel } from "../src/utils/enums";

export type RequestLoggerConfig = {
    environment: string,
    applicationName: string,
    applicationVersion: string,
    generateRequestId?: CallableFunction,
    logHandlers: LogHandler[]
}

export type Log = {
    env: string,
    time: Date,
    appName: string,
    appVersion: string,
    logLevel: LogLevel,
    requestId: string,
    requestPath?: string,
    requestHeaders?: any,
    requestBody?: any,
    requestQueryParams?: any,
    method?: string,
    message?: string,
    data?: string,
    responseBody?: any,
    responseStatus?: number,
    duration?: number,
    operation?: string
};
