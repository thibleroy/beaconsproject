export interface Environnement {
    name?: string;
    version?: string;
    git?: string;
    db_url?: string;
    db_port?: number;
    api_port?: number,
    db_name?: string,
    kafka_url?: string,
    kafka_port?: string,
    kafka_topic_auth?: string,
    kafka_topic_beacon?: string,
    kafka_topic_client?: string,
    kafka_topic_documentation?: string,
    kafka_topic_logger?: string
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
    url?:string;
    img?:string;
    lat?:number;
    lng?:number;
}

export interface IUser {
    email?: string;
    username?: string
    password?: string;
    createdAt?: Date;
}
