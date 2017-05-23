'use strict';

var Koa = require('koa');
var Router = require('koa-router');
const MongoClient = require('mongodb').MongoClient;

var app = new Koa();
var router = new Router();
var db;

router.get('/', function (ctx) {
  ctx.body = 'Hello from Koajs using router';
});

router.get('/date', function (ctx) {
  ctx.body = new Date().toLocaleString();
});

router.get('/chats', function (ctx, next) {
  console.log(ctx.body);
  db.collection('chats').find().toArray(function (err, results) {
    if (err) return console.log(err)

    console.log(results);
    ctx.body = "Results";
    console.log(ctx.body);
    next();
  });
  console.log(ctx.body);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

//app.listen(3000);

MongoClient.connect('mongodb://maison:maison@ds151451.mlab.com:51451/robos-im', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000);
});