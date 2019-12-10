import {addBeacon, getBeacons} from "../requests/beacon";
import {Beacon} from "../../src/entities/interfaces";

describe('Beacons route', function() {
    it('gets beacons', function() {
         getBeacons().then((resp: Cypress.Response) => {
            console.log(resp.body);
            expect(resp.body.hello).to.eq('cc');
        })
    });
    it('adds a beacon', () => {
        const testBeacon: Beacon = {uuid: 'uuidtest',minor:  123,major: 456,id_client: 'idtest',name: 'nametest'};
        addBeacon(testBeacon).then((resp: Cypress.Response) => {
            console.log(resp.body);
            expect(resp.body.beacon_id).to.eq('test');
        });
    });
});
