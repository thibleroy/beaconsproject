export interface Beacon {
    id: string;
    uuid?: string;
    minor?: number;
    major?: number;
    name?: string;
    id_client?: string;
}
export interface Client {
    id?: string;
    name: string;
}

