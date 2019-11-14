const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const initRoutes = require('./src/routes');

const DB = require('./src/initializers/db');

const app = new Koa();
const router = new Router();
const db = new DB();

let itemId;
db.getItems()
    .then(data => {
        console.log(data);
        return db.createItem({price: 100, name: 'Test'})
    })
    .then(id => {
        console.log(id);
        itemId = id;
        return db.getItems();
    })
    .then(async items =>  {
        console.log(items);
        await db.deleteItem(itemId);
    });

initRoutes(router);

app
    .use(bodyparser())
    .use(router.routes())
    .use(router.allowedMethods());

module.exports = app.listen(3000, () => {
    console.log('Server started');
});
