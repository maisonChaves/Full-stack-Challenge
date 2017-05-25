'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Koa = require('koa');
var Router = require('koa-router');
var MongoClient = require('mongodb').MongoClient;

var app = new Koa();
var router = new Router();
var db;

router.get('/', function (ctx) {
  ctx.body = 'Hello from Koajs using router';
});

router.get('/date', function (ctx) {
  ctx.body = new Date().toLocaleString();
});

router.get('/chats', function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(ctx.body);
            db.collection('chats').find().toArray(function (err, results) {
              if (err) return console.log(err);

              console.log(results);
              ctx.body = "Results";
              console.log(ctx.body);
              next();
            });
            console.log(ctx.body);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

app.use(router.routes()).use(router.allowedMethods());

//app.listen(3000);

MongoClient.connect('mongodb://maison:maison@ds151451.mlab.com:51451/robos-im', function (err, database) {
  if (err) return console.log(err);
  db = database;
  app.listen(3000);
});