import {Router,Request, Response} from "express";
import {app} from '../express.helper';
import {MainRouter} from './route';

const port = 8080

const def = Router();

def.get('/', (req: Request, res: Response) => {
    res.json({hello: 'cc !'});
});

app.use('/',MainRouter)
app.use('/hello',def)

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
