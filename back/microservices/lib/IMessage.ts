import {IBeacon, IClient, IContent, IUser} from 'lib';
import { Request, Response } from 'express';

interface DefaultMessage {
    type: 'req'|'res',
    res: Response,
    req: Request
}
interface ResourceMessage extends DefaultMessage {
    action: 'create'|'update'|'read'|'delete' | 'list',
    req: any;
    res: any;
}

export interface AuthMessage extends DefaultMessage{
    action: 'login'|'logout'|'create'|'read',
    value: IUser
}
export interface BeaconMessage extends ResourceMessage{
    value: IBeacon
}
export interface ClientMessage extends ResourceMessage{
    value: IClient
}
export interface ContentMessage extends ResourceMessage{
    value: IContent
}
