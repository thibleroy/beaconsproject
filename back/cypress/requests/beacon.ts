import {IBeacon, ENV, IClient} from "lib";
const addr = `${ENV.api_url}:${ENV.api_port}`;
export const addBeacon: any = (beacon: IBeacon, client: IClient) => {
    return cy.request({
        url: `${addr}/clients/${}`,
        method: 'POST',
        body: beacon,
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    });
};
export const getBeacons: any = () => {
    return cy.request({
        url: addr + '/beacons/',
        method: 'GET'
    });
};
export const deleteBeacon: any = (id: string) => {
    return cy.request({
        url: addr + '/beacon/'+ id,
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    });
};
