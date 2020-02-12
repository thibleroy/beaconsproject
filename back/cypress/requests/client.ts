import {ENV, IClient} from "lib";
const addr = `${ENV.api_url}:${ENV.api_port}`;
export const addClient: any = (client: IClient) => {
    return cy.request({
        url: `${ENV.api_url}:${ENV.api_port}/clients`,
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
        url: `${ENV.api_url}:${ENV.api_port}/clients`,
        method: 'GET'
    });
};
export const deleteClient: any = (client: IClient) => {
    return cy.request({
        url: `${ENV.api_url}:${ENV.api_port}/clients/${client.id_client}`,
        method: 'DELETE',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    });
};
