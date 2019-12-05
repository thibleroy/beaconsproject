import express, {Router} from 'express';
import * as bodyparser from 'body-parser';
export const app = express();
app.use(bodyparser.json());
export const router: Router = express.Router();
app.use(router);
