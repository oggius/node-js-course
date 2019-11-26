const LIVR = require('livr');
const get = require('lodash/get');

const itemsController = require('./controllers/items');

const validationRules = {
    '/items/:itemId': {
        PUT: {
            params: {
                itemId: [ 'required', 'string' ]
            },
            body: {
                price: ['positive_integer'],
                name: ['string']
            }
        },
    }
};

const validationMiddleware = require('./middlewares/validator')(validationRules);

function initRoutes(router) {
    router.get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello, World!';
    });

    router.get('/items', validationMiddleware, itemsController.getItems);
    router.post('/items', validationMiddleware, itemsController.createItem);
    router.delete('/items/:itemId', validationMiddleware, itemsController.deleteItem);
    router.put('/items/:itemId', validationMiddleware, itemsController.updateItem);
}

module.exports = initRoutes;
