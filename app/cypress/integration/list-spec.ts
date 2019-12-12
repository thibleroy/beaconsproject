import {identifiers} from "../identifiers";

describe('get beacons list', () => {
    it('get beacons in list', () => {
        cy.get(identifiers.btn).should('be.visible').click();
        cy.get(identifiers.list).first().should('contain.text', 'test');
    });
});
