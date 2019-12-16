import swaggerui from 'swagger-ui-express';
import * as swaggerdoc from './swagger.json'
module.exports = function (app: any) {
    app.use('/swagger', swaggerui.serve, swaggerui.setup(swaggerdoc));
};

