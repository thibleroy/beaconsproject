import {IBeacon,IContent} from '../../../back/lib';
export interface BeaconsResponse {
    status: boolean;
    beacons: IBeacon[];
    reason?: string;
}
export interface BeaconResponse {
    status: boolean;
    beacon: IBeacon;
    reason?: string;
}
export interface AddBeaconResponse {
    status: boolean;
    beacon: IBeacon;
    reason?: string;
}
export interface UpdateBeaconResponse {
    status: boolean;
    id_beacon: string;
    reason?: string;
}

export interface ContentResponse {
    value: IContent;
}
