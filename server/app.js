'use strict';

var Koa = require('koa');
var Router = require('koa-router');
var Body = require('koa-body');

var request = require('request-promise');

var fs = require('fs');

const config = require('config');

const db = require('./db');

var SSE = require('sse');
var http = require('http');

var app = new Koa();
var router = new Router();
var body = new Body();
var token = fs.readFileSync('.bot', 'utf8');
var urlBase = 'https://api.telegram.org/bot' + token + '/';

var server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.writeHead(200);
  res.end('okay');
  //console.log('Server');
});

var clients = [];

var broadcast = (message) => {
  clients.forEach((stream) => {
    stream.send(JSON.stringify(message));
  });
}

var getUpdates = () => {
  request.get(urlBase + 'getUpdates', (error, response, body) => {

    var updates = JSON.parse(body).result;

    for (var update of updates) {
      //sendMessage(update.message)
    }

  });
};

var sendMessage = async message => {
  return await request.post(urlBase + 'sendMessage', {
    form: message
  });
}

var setHeader = async(ctx, next) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'content-type');
}

var koaSSE = async(ctx, next) => {
  
  ctx.sseSetup = () => {
    ctx.set('Content-Type', 'text/event-stream');
    ctx.type = 'text/event-stream';
    ctx.set('Cache-Control', 'no-cache');
    ctx.set('Connection', 'keep-alive');
    ctx.status = 200;
  }

  ctx.sseSend = (data) => {
    ctx.body = "data: " + JSON.stringify(data) + "\n\n";
  }

  await next();
}

app.use(koaSSE);
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
    //broadcast(message);

    clients.forEach((client) => {
      client.sseSend(message);
    });

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

router.get('/chats', async(ctx, next) => {
  ctx.body = await db.Chat.find();
});

router.get('/chat/:id', async(ctx, next) => {

  var query = {
    "chat.id": parseInt(ctx.params.id)
  }

  ctx.body = await db.Message.find(query);
});

/**
 * URL de testes, remover
 */
router.get('/send', ctx => {
  broadcast('Maison');
  ctx.status = 200;
});

router.get('/stream', async (ctx, next) => {
  await next();
  ctx.set('Content-Type', 'text/event-stream');
  ctx.type = 'text/event-stream';
  ctx.set('Cache-Control', 'no-cache');
  ctx.set('Connection', 'keep-alive');
  clients.push(ctx);
  ctx.sseSend('Ok');
  
})

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

server.listen(3001, '127.0.0.1', () => {

  var sse = new SSE(server);

  sse.on('connection', (stream) => {
    clients.push(stream);

    stream.on('close', () => {
      clients.splice(clients.indexOf(stream), 1);
    });
  });
});