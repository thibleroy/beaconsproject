import {Beacon} from '../../src/entities/beacon';
export const addBeacon: any = (beacon: Beacon) => {
    cy.request({
        method: 'POST',
        body: beacon.toString()
    });
};
