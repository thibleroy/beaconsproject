import {Request, Response} from "express";
import * as log4js from 'log4js';
log4js.configure({
    appenders: {
        logstash: {
            type: '@log4js-node/logstashudp',
            host: '127.0.0.1',
            port: 5000
        }
    },
    categories: {
        default: { appenders: ['logstash'], level: 'info' }
    }
});
const logger = log4js.getLogger();
export function timeLog(req: Request, res: Response, next: any) {
    console.log(`${res.statusCode} ${req.method} ${req.originalUrl} | ${req.headers["user-agent"]}`);
    logger.info('Information !', {time: Date.now()});
    next();
}
