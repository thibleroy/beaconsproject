import {IBeacon,IClient} from '../../../back/src/entities/interfaces';
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
export interface ClientsResponse {
    status: boolean;
    clients: IClient[];
    reason?: string;
}
export interface ClientResponse {
    status: boolean;
    client: IClient;
    reason?: string;
}

