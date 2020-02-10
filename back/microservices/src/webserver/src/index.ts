import {app} from "./express.helper";
import {ENV} from "lib";
import {Router,Request, Response} from "express";
import {MainRouter} from './routes/route';

const def = Router();

def.get('/', (req: Request, res: Response) => {
    res.json({hello: 'cc !'});
});

app.use('/clients',MainRouter)
app.use('/hello',def)

app.listen(ENV.api_port, function () {
    console.log('App listening on port '+ENV.api_port);
});