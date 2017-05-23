var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/', function (ctx) {
  ctx.body = 'Hello from Koajs using router';
});

router.get('/date', function (ctx) {
  ctx.body = new Date().toLocaleString();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);