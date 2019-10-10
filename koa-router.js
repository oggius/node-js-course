var Koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');

var app = new Koa();
app.use(bodyParser());
var router = new Router();

router
    .get('/', (ctx, next) => {
        console.log(ctx)
        ctx.body = 'Hello World from Koa + Koa router';
    })
    .post('/users', async (ctx, next) => {
        ctx.body = ctx.request.body;
    })

app
    .use(router.routes())
//    .use(router.allowedMethods())

app.listen(3000);

process.once('SIGINT', function (code) {
    console.log('SIGINT received... Bye-Bye!');
    process.exit();
});