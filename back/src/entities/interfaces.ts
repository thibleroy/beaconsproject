export interface Environnement {
    name?: string;
    version?: string;
    git?: string;
    db_url?: string;
    db_port?: number;
    api_port?: number,
    db_name?: string
}

export interface IBeacon {
    id_beacon?: string;
    uuid?: string;
    minor?: number;
    major?: number;
    name?: string;
    id_client?: string;
    id_content?: string;
}
export interface IClient {
    id_client?: string;
    name?: string;
}

export interface IUser {
    email?: string;
    username?: string
    password?: string;
    createdAt?: Date;
}
