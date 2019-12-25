import {Request, Response} from "express";
import * as log4js from 'log4js';
const logger = log4js.getLogger();
logger.level = 'debug';

export function timeLog(req: Request, res: Response, next: any) {
    logger.debug(`${res.statusCode} ${req.method} ${req.originalUrl} | ${req.headers["user-agent"]}`);
    next();
}
