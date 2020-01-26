  describe("Get array clients", () => {
    it("List of client", () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: 'http://localhost:3000/clients',
        status: 200,
        response: 'fixture:clients.json'
      })
    cy.visit("/");
    });
  });

describe("Get a client with id", () => {
    it("Client", () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: 'http://localhost:3000/client/1',
        status: 200,
        response: 'fixture:client.json'
      })
    cy.visit("/home?id_client=1");
    });
  });

/*describe("Get a beacon with id", () => {
    it("Beacon", () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: 'http://localhost:3000/beacon/1',
        status: 200,
        response: 'fixtures:beacon.json'
      })
    cy.visit("/");
    });
});

describe("Get array beacons", () => {
    it("List of beacon", () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: 'http://localhost:3000/beacons',
        status: 200,
        response: 'fixtures:beacons.json'
      })
    cy.visit("/");
    });
  });*/

