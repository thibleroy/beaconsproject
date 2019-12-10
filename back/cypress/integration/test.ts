import {addBeacon} from "../requests/beacon";
import {Beacon} from "../../src/entities/beacon";

describe('My First Test', function() {
    it('Does not do much!', function() {
        const testBeacon: Beacon = new Beacon('uuidtest', 123, 456, 'idtest', 'nametest');
        addBeacon(testBeacon).then((resp: Cypress.Response) => {
            expect(resp.body.hello).to.eq('cc');
        })
    })
});
