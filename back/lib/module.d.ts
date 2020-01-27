import {Environnement} from "./";

declare namespace NodeJS {
    export interface ProcessEnv {
        env: Environnement
    }
}
