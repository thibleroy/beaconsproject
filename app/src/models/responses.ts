import {Beacon} from '../../../back/src/entities/interfaces';
export interface BeaconsResponse {
    status: boolean;
    beacons: Beacon[]
}
export interface BeaconResponse {
    status: boolean;
    beacon: Beacon;
}
