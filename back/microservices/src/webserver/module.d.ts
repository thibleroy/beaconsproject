import {Environnement} from "@entities/interfaces";

declare namespace NodeJS {
    export interface ProcessEnv {
        env: Environnement
    }
}
