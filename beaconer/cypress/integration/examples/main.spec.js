  describe("Tests cliuents", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("get List of client", () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: 'http://localhost:3000/clients',
        status: 200,
        response: 'fixture:clients.json'
      }).as('List')
    cy.wait("@List");
    cy.get("[data-cy=ListClients]").should("be.visible").first().click();
    });
  })


/*it("Client", () => {
      cy.server();
      cy.route({
          method: 'GET',
          url: 'http://localhost:3000/client/1',
          status: 200,
          response: 'fixture:client.json'
        });
      });
  });*/
