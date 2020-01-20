import {Environnement} from "./interfaces";

declare namespace NodeJS {
    export interface ProcessEnv {
        env: Environnement
    }
}
