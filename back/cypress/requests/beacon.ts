import {IBeacon} from "../../lib/index";
export const addBeacon: any = (beacon: IBeacon) => {
    return cy.request({
        url: 'localhost:3000/beacons/',
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
        url: 'localhost:3000/beacons/',
        method: 'GET'
    });
};
export const deleteBeacon: any = (id: string) => {
    return cy.request({
        url: 'localhost:3000/beacon/'+ id,
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    });
};
