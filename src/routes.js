const itemsController = require('./controllers/items');

function initRoutes(router) {
    router.get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello, World';
    });

    router.get('/items', itemsController.getItems);
    router.get('/items/:itemId', itemsController.getItem);
    router.post('/items', itemsController.createItem);
    router.delete('/items/:itemId', itemsController.deleteItem);
    router.put('/items/:itemId', itemsController.updateItem);
}

module.exports = initRoutes;