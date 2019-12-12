import {Request, Response} from "express";

export function timeLog(req: Request, res: Response, next: any) {
    console.log(`${req.method} : ${req.body} to ${req.originalUrl}`);
    next();
}
