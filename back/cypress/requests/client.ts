import {IClient} from "../../lib/index";
export const addClient: any = (client: IClient) => {
    return cy.request({
        url: 'localhost:3000/clients/',
        method: 'POST',
        body: client,
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    });
};
export const getClients: any = () => {
    return cy.request({
        url: 'localhost:3000/clients/',
        method: 'GET'
    });
};
export const deleteClient: any = (id: string) => {
    return cy.request({
        url: 'localhost:3000/client/'+ id,
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    });
};
