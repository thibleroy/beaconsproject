import express, {Router} from "express";
import {Request, Response} from "express";
import {getCollection} from "../functions/mongo.functions";
import {Collection} from "mongodb";
import {messages} from "../constants/wording";
const router: Router = express.Router();

router.get('/:id', (req: Request, res: Response) => {
    const collection: Collection = getCollection('clients');
    collection.find({_id: req.body.id}).toArray((err: any, items: any) => {
        if (err) {
            res.status(500);
            res.end();
            console.error('Caught error', err);
        } else {
            items = items.map((item: any) => { return { id: item._id, name: item.name}});
            res.json(items[0]);
        }
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    const collection: Collection = getCollection('clients');
    console.log(req.url);
    const id = req.url.split('/')[1];
    console.log('id', id);
    collection.deleteOne({id: id}, ((error, result) => {
        console.log('error', error);
        console.log('result', result);
        if (result.deletedCount === 1) {
            res.json({status: true, id: id});
        } else {
            res.json({status: false, reason: messages.client_not_existing});
        }
    }))

});

exports.clientRouter = router;
