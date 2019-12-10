import {Beacon} from "../../src/entities/interfaces";
export const addBeacon: any = (beacon: Beacon) => {
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
