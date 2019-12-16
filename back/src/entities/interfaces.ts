export interface Environnement {
    name: string;
    version: string;
    git: string;
    db_url: string;
    db_port: number;
    api_port: number,
    db_name: string
}

export interface Beacon {
    id?: string;
    uuid?: string;
    minor?: number;
    major?: number;
    name?: string;
    id_client?: string;
    id_content?: string;
}
export interface Client {
    id?: string;
    name: string;
}

