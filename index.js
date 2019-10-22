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

app.use((ctx, next) => {
    const start = Date.now();
    return next().then(() => {
        const ms = Date.now() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })
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