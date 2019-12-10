import {addBeacon, getBeacons} from "../requests/beacon";
import {Beacon} from "../../src/entities/beacon";

describe('Beacons route', function() {
    it('gets beacons', function() {
         getBeacons().then((resp: Cypress.Response) => {
            console.log(resp.body);
            expect(resp.body.hello).to.eq('cc');
        })
    });
    it('adds a beacon', () => {
        const testBeacon: Beacon = new Beacon('uuidtest', 123, 456, 'idtest', 'nametest');
        addBeacon(testBeacon).then((resp: Cypress.Response) => {
            console.log(resp.body);
            expect(resp.body.beacon_id).to.eq('test');
        });
    });
});
