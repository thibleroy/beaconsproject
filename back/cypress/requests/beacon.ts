import {Beacon} from '../../src/entities/beacon';
export const addBeacon: any = (beacon: Beacon) => {
    return cy.request({
        url: 'localhost:3000/beacons',
        method: 'POST',
        body: beacon.toString()
    });
};
export const getBeacons: any = () => {
    return cy.request({
        url: 'localhost:3000/beacons/',
        method: 'GET'
    });
};
