import { IBeacon, IClient, IUser } from 'lib';
interface DefaultMessage {
    type: 'req' | 'res';
}
interface ResourceMessage extends DefaultMessage {
    action: 'create' | 'update' | 'get' | 'delete' | 'list';
}
export interface AuthMessage extends DefaultMessage {
    action: 'login' | 'logout';
    value: IUser;
}
export interface BeaconMessage extends ResourceMessage {
    value: IBeacon;
}
export interface ClientMessage extends ResourceMessage {
    value: IClient;
}
export {};
