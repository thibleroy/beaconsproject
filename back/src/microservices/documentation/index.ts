import swaggerui from 'swagger-ui-express';
import swaggerdoc from './swagger.json'
module.exports = function (app: any) {
    app.use('/documentation', swaggerui.serve, swaggerui.setup(swaggerdoc));
};


