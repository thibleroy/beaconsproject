import {Beacon} from '../../../back/src/entities/interfaces';
export interface BeaconsResponse {
    status: boolean;
    beacons: Beacon[]
    reason?: string
}
export interface BeaconResponse {
    status: boolean;
    beacon: Beacon;
    reason?: string
}
export interface addBeaconResponse {
    status: boolean;
    id: string;
    reason?: string
}
export interface updateBeaconResponse {
    status: boolean;
    id: string;
    reason?: string;
}
