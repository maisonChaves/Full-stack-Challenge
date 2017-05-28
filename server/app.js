'use strict';

var Koa = require('koa');
var Router = require('koa-router');
var Body = require('koa-body');

var request = require('request');
var fs = require('fs');

const config = require('config');

const db = require('./db');

var app = new Koa();
var router = new Router();
var body = new Body();
var token = fs.readFileSync('.bot', 'utf8');
var urlBase = 'https://api.telegram.org/bot' + token + '/';

//app.use(mongo());

var getUpdates = () => {
  request.get(urlBase + 'getUpdates', (error, response, body) => {

    var updates = JSON.parse(body).result;

    for (var update of updates) {
      //sendMessage(update.message)
    }

  });
};

var sendMessage = message => {

  request.post(urlBase + 'sendMessage').form({
    "chat_id": message.chat.id,
    "text": message.from.first_name + " you sad? " + message.text
  });

}

//setInterval(getUpdates, 1500);

getUpdates();

router.get('/', (ctx) => {
  ctx.body = 'Hello from Koajs using router';
});

router.post('/getUpdates', body, async(ctx, next) => {

  var results = ctx.request.body.result;

  for (var result of results) {
      var chat = result.message.chat;
      chat._id = chat.id;
      await db.Chat.save(chat);
  }

  ctx.status = 200;
});

router.get('/date', (ctx) => {
  ctx.body = new Date().toLocaleString();
});

router.get('/chats', async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.body = await db.Chat.find();
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