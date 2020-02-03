import {addBeacon, deleteBeacon, getBeacons} from "../requests/beacon";
import {IBeacon} from "../../lib/index";
const testBeacon: IBeacon = {uuid: 'uuidtest2',minor:  123,major: 456,id_client: 'idtest',name: 'nametest'};

describe('add beacon', function() {
    before(() => {
        getBeacons().then((resp: Cypress.Response) => {
            resp.body.beacons.forEach((beacon: IBeacon) => {
                if (beacon.name === 'nametest'){
                    deleteBeacon(beacon.id_beacon);
                }
            });
        });
    });
    it('adds a beacon', () => {
        addBeacon(testBeacon).then((resp: Cypress.Response) => {
            expect(resp.body.status).to.eq(true);
        });
    });
});
describe('get beacons', function() {
    before(() => {
        addBeacon(testBeacon);
    });
    it('gets beacons', function() {
        getBeacons().then((resp: Cypress.Response) => {
            expect(resp.body.status).to.eq(true);
        })
    });
});
describe('delete beacon', () => {
    before(() => {
        addBeacon(testBeacon);
    });
    it('deletes beacon', () => {
        getBeacons().then((resp: Cypress.Response) => {
            resp.body.beacons.forEach((beacon: IBeacon) => {
                if (beacon.name === 'nametest'){
                    deleteBeacon(beacon.id_beacon).then((resp: Cypress.Response) => {
                        expect(resp.body.status).to.eq(true);
                    });
                }
            });
        })

    })
});

/*describe('add existing beacon', () => {
    before(() => {
        addBeacon(testBeacon);
    });
    it('add existing beacon', () => {
        addBeacon(testBeacon).then((resp: Cypress.Response) => {
            expect(resp.body.status).to.eq(false);
        })
    })
});
*/
