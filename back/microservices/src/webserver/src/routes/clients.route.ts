import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {IClient} from "@entities/interfaces";
import {messages} from '@constants/wording';
import {Collection, MongoError, UpdateWriteOpResult} from "mongodb";
import {UserModel} from "@src/db/User";
const router: Router = express.Router();
 router.get('/', async (req: Request, res: Response) => {
     try {
         const id = req.url.split('/')[1];
         const beacon = await UserModel.find({id: id});
         res.json(beacon);

     } catch (err) {
         res.status(500);
         res.end();
         console.error('Caught error', err);
     }

});

router.post('/',async (req: Request, res: Response) => {

    //console.log('tesst', req.body);
    const currentClient: IClient = {name: req.body.name};
    try {
        const id = req.url.split('/')[1];
        const beacon = await UserModel.find({id: id});
        res.json(beacon);

    } catch (err) {
        res.status(500);
        res.end();
        console.error('Caught error', err);
    }
});

exports.clientsRouter = router;

