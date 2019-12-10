"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const beacon_1 = require("../requests/beacon");
const beacon_2 = require("../../src/entities/beacon");
describe('My First Test', function () {
    it('Does not do much!', function () {
        const testBeacon = new beacon_2.Beacon('uuidtest', 123, 456, 'idtest', 'nametest');
        beacon_1.addBeacon(testBeacon).then((resp) => {
            expect(JSON.parse(resp.body).hello).to.eq('cc');
        });
    });
});
