const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

let greetings = require('./module');

const app = new Koa();
const router = new Router();

router
    .get('/', (ctx, next) => {
        console.log(ctx);
        ctx.body = 'Hello World from Koa + Koa router';
    })
    .post('/users', async (ctx, next) => {
        ctx.body = greetings(ctx.request.body.username);
    });

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);

process.once('SIGINT', function () {
    console.log('SIGINT received... Bye-Bye!');
    process.exit();
});