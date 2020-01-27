import * as express from "express";
import {Router} from "express";
import {Request, Response} from "express";
import {Collection, MongoError, UpdateWriteOpResult} from "mongodb";
import {messages} from "@constants/wording";
import {IBeacon} from "@entities/interfaces";
import {UserModel} from "@src/db/User";

const router: Router = express.Router();

router.get('/:id', async (req: Request, res: Response) => {
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

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = req.url.split('/')[1];
        await UserModel.findByIdAndDelete({id: id});

    } catch (err) {
        res.status(500);
        res.end();
        console.error('Caught error', err);
    }

});

router.put('/:id', async (req: Request, res: Response) => {
    kafka.producer.sendmsg('auth', {type: ''})

});

exports.userRouter = router;
