import {IBeacon, IClient, IContent, IUser} from 'lib';
import { Request, Response } from 'express';

export interface DefaultMessage {
    type: string | 'req'|'res',
    res: Response,
    req: Request
}
export interface ResourceMessage extends DefaultMessage {
    action: string | 'create'|'update'|'read'|'delete' | 'list',
    value : any
}

export interface AuthMessage extends DefaultMessage{
    action:string | 'login'|'logout'|'create'|'read',
    value: IUser|any
}
export interface BeaconMessage extends ResourceMessage{
    value: IBeacon|any
}
export interface ClientMessage extends ResourceMessage{
    value: IClient|any
}
export interface ContentMessage extends ResourceMessage{
    value: IContent|any
}
