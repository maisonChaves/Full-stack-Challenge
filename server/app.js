'use strict';

var Koa = require('koa');
var Router = require('koa-router');
var Body = require('koa-body');

//var request = require('request');
var request = require('request-promise');

var fs = require('fs');

const config = require('config');

const db = require('./db');

var app = new Koa();
var router = new Router();
var body = new Body();
var token = fs.readFileSync('.bot', 'utf8');
var urlBase = 'https://api.telegram.org/bot' + token + '/';

var getUpdates = () => {
  request.get(urlBase + 'getUpdates', (error, response, body) => {

    var updates = JSON.parse(body).result;

    for (var update of updates) {
      //sendMessage(update.message)
    }

  });
};

var sendMessage = async message => {
  return await request.post(urlBase + 'sendMessage', {form: message});
}

var setHeader = async (ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'content-type');
}

app.use(setHeader);

router.get('/', (ctx) => {
  ctx.body = 'Hello from Koajs using router';
});

router.post('/getUpdates', body, async(ctx, next) => {

  var results = ctx.request.body.result;

  for (var result of results) {
      var chat = result.message.chat;
      chat._id = chat.id;
      await db.Chat.save(chat);

      var message = result.message;
      message._id = message.message_id;
      await db.Message.save(message);
  }

  ctx.status = 200;
});

router.post('/sendMessage', body, async(ctx, next) => {
  var update = await sendMessage(ctx.request.body);

  var message = JSON.parse(update).result;
  message._id = message.message_id;

  await db.Message.save(message);

  ctx.body = message;
});

router.get('/chats', async (ctx, next) => {
  ctx.body = await db.Chat.find();
});

router.get('/chat/:id', async (ctx, next) => {

  var query = {
    "chat.id" : parseInt(ctx.params.id)
  }

  ctx.body = await db.Message.find(query);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

db
  .connect()
  .then(() => {
    app.listen(config.port);
  }).catch((err) => {
    console.error('ERR:', err);
  });