"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBeacon = (beacon) => {
    cy.request({
        method: 'POST',
        body: beacon.toString()
    });
};
