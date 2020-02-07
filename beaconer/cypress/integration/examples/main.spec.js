  describe("Tests cliuents", () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: 'http://localhost:3000/clients',
        status: 200,
        response: 'fixture:clients.json'
      }).as('List')
    });
    it("get List of client", () => {
    cy.visit("/");
    cy.wait("@List");
    cy.get("[data-cy=ListClients]").should("be.visible").first().click();
    });
  })