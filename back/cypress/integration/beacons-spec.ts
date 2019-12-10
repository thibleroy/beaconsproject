import {addBeacon, deleteBeacon, getBeacons} from "../requests/beacon";
import {Beacon} from "../../src/entities/interfaces";
const testBeacon: Beacon = {uuid: 'uuidtest2',minor:  123,major: 456,id_client: 'idtest',name: 'nametest'};

describe('delete beacon', () => {
    before(() => {
        addBeacon(testBeacon);
    });
    it('deletes beacon', () => {
        getBeacons().then((resp: Cypress.Response) => {
            resp.body.beacons.forEach((beacon: any) => {
                if (beacon.name === 'nametest'){
                    deleteBeacon(beacon.id).then((resp: Cypress.Response) => {
                        expect(resp.body.status).to.eq(true);
                    });
                }
            });
        })

    })
});
/*
describe('get beacons', function() {
    before(() => {
        addBeacon(testBeacon);
    })
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
            resp.body.beacons.forEach((beacon: Beacon) => {
                if (beacon.name === 'nametest'){
                    deleteBeacon(beacon).then((resp: Cypress.Response) => {
                        expect(resp.body.status).to.eq(true);
                    });
                }
            });
        })

    })
});
describe('add beacon', function() {
    before(() => {
        deleteBeacon(testBeacon);
    });
    it('adds a beacon', () => {
        addBeacon(testBeacon).then((resp: Cypress.Response) => {
            console.log(resp.body);
            expect(resp.body.status).to.eq(true);
        });
    });
});
describe('add existing beacon', () => {
    before(() => {
        addBeacon(testBeacon);
    });
    it('add existing beacon', () => {
        addBeacon(testBeacon).then((resp: Cypress.Response) => {
            expect(resp.body.status).to.eq(false);
        })
    })
}); */
