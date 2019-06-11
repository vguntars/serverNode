const path = require('path');

const
  ex = require('express'),
  fs = require('fs'),
  ut = require('util'),
  cp = require('cookie-parser'),

  rt = ex.Router(),

  sDD = 1000 * 60 * 60 * 24;


rt.use(cp());

rt.get('/', (req, res, next) => {
  res.cookie('lang', 'rus', { maxAge: (sDD * 90) });
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index_ru.html'));
  next();
});

rt.get('/', (req, res) => {
  let log = {
    date: new Date(),
    fromIP: req.ip,
    //fromURL: req.url,
    action: 'krievi nāk...',
  };
  fs.appendFile(path.join(__dirname, '..', 'server_data', 'rus_log.txt'),
    ut.format('%j\n', log),
    function (err) {
      if (err) throw err;
    });
});

module.exports = rt;