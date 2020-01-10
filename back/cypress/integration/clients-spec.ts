import {addClient, deleteClient, getClients} from "../requests/client";
import {IClient} from "../../src/entities/interfaces";
const testClient: IClient = {name: 'testname'};

describe('add client', function() {
    before(() => {
        getClients().then((resp: Cypress.Response) => {
            resp.body.clients.forEach((client: any) => {
                if (client.name === 'testname'){
                    deleteClient(client.id);
                }
            });
        });
    });
    it('adds a client', () => {
        addClient(testClient).then((resp: Cypress.Response) => {
            console.log(resp.body);
            expect(resp.body.status).to.eq(true);
        });
    });
});

describe('delete client', () => {
    before(() => {
        addClient(testClient);
    });
    it('deletes client', () => {
        getClients().then((resp: Cypress.Response) => {
            resp.body.forEach((client: any) => {
                if (client.name === 'testname'){
                    deleteClient(client.id).then((resp: Cypress.Response) => {
                        expect(resp.body.status).to.eq(true);
                    });
                }
            });
        })

    })
});
describe('get clients', function() {
    before(() => {
        addClient(testClient);
    });
    it('gets clients', function() {
        getClients().then((resp: Cypress.Response) => {
            expect(resp.body.status).to.eq(true);
        })
    });
});

describe('add existing client', () => {
    before(() => {
        addClient(testClient);
    });
    it('add existing client', () => {
        addClient(testClient).then((resp: Cypress.Response) => {
            expect(resp.body.status).to.eq(false);
        })
    })
});

