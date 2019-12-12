import {Request, Response} from "express";

export function timeLog(req: Request, res: Response, next: any) {
    console.log(`Time : ${Date.now()} and request to ${req.originalUrl}`);
    next();
}
