import {IBeacon, ENV, IClient} from "lib";
const addr = `${ENV.api_url}:${ENV.api_port}`;
export const addBeacon: any = (beacon: IBeacon, client: IClient) => {
    return cy.request({
        url: `${addr}/clients/${client.id_client}/beacons`,
        method: 'POST',
        body: beacon,
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    });
};
export const getBeacons: any = (client: IClient) => {
    return cy.request({
        url: `${addr}/clients/${client.id_client}/beacons`,
        method: 'GET'
    });
};
export const deleteBeacon: any = (beacon: IBeacon, client: IClient) => {
    return cy.request({
        url: `${addr}/clients/${client.id_client}/beacons/${beacon.id_beacon}`,
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    });
};
