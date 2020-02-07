import {IBeacon, IClient, IContent, IUser} from 'lib';
import { Request, Response } from 'express';

interface DefaultMessage {
    type: string | 'req'|'res',
    res: Response,
    req: Request
}
interface ResourceMessage extends DefaultMessage {
    action: string | 'create'|'update'|'read'|'delete' | 'list',
    req: any;
    res: any;
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
