export class Beacon {
    uuid: string;
    minor: number;
    major: number;
    name: string;
    id_client: string;
    constructor(uuid: string, minor: number, major: number, id_client: string, name: string){
        this.uuid = uuid;
        this.minor = minor;
        this.major = major;
        this.id_client = id_client;
        this.name = name;
    }
}