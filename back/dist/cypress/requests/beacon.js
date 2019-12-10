"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBeacon = (beacon) => {
    return cy.request({
        url: 'localhost:3000/beacons',
        method: 'POST',
        body: beacon.toString()
    });
};
