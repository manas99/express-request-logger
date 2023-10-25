import { Request, Response } from 'express';

import { RequestLoggerService } from "../services/request_logger.service";
import { RequestLoggerConfig } from "../../types";


export function requestLogger(config: RequestLoggerConfig) {
    const _logService = RequestLoggerService.getInstance(config);

    return function(req: Request, res: Response, next: any) {
        const _log = _logService.generateRequestLog();
        // start request
        (req as any).log = _log;

        _log.start(req.path, req.method, req.headers, req.body, req.query);

        const [oldWrite, oldEnd] = [res.write, res.end];
        const chunks: Buffer[] = [];

        (res.write as unknown) = function(chunk: Buffer) {
            chunks.push(Buffer.from(chunk));
            (oldWrite as Function).apply(res, arguments);
        };

        (res.end as any) = function(chunk: Buffer) {
            if (chunk) {
                chunks.push(Buffer.from(chunk));
            }
            const body = Buffer.concat(chunks).toString('utf8');
            _log.end(res.statusCode, body);
            (oldEnd as Function).apply(res, arguments);
        };

        if (next) {
            next();
        }

    };
}
