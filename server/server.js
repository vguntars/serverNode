const path = require('path');
require(path.join(__dirname, 'modules', 'init'));

const
  express = require('express'),
  app = express(),
  fs = require('fs'),
  ut = require('util'),
  cp = require('cookie-parser'),

  dv = require(path.join(__dirname, 'modules', 'data_validation')),

  sDD = 1000 * 60 * 60 * 24;

app.use(express.json());
app.use(express.urlencoded());
app.use(cp());
app.use('/static', express.static(path.join(__dirname, '..', 'dist')));

app.get('/lor', (req, res) => {
  res.clearCookie('lang');
  res.sendFile(path.join(__dirname, '..', 'dist', 'index_lo.html'));
});

app.get('/rus', (req, res, next) => {
  res.cookie('lang', 'rus', { maxAge: (sDD * 90) });
  res.sendFile(path.join(__dirname, '..', 'dist', 'index_ru.html'));
  next();
});

app.get('/rus', (req, res) => {
  let log = {
    date: new Date(),
    fromIP: req.ip,
    fromURL: req.url,
    action: 'krievi nāk...',
  };
  fs.appendFile(path.join(__dirname, 'server_data', 'rus_log.txt'),
    ut.format('%j\n', log),
    function (err) {
      if (err) throw err;
    });
});

app.post('/form', (req, res) => {
  console.log(req.body); //-----------------------------------------------------
  let _err = dv.validate(req.body.name, { txt: 'Kļička', min: 1, max: 50 }) || dv.validate(req.body.age, { txt: 'Vecums', min_val: 18, max_val: 99 });
  if (_err) {
    res.send(`<link rel="stylesheet" href="static/css/form.css">
    <h2 class="alert">Kļūda: ${_err}</h2>
    <a href="..">ATGRIESTIES</a>`);
  } else {
    fs.appendFile(path.join(__dirname, 'server_data', 'data_db.txt'),
      ut.format('%j\n', { name: req.body.name.trim(), age: req.body.age.numS() }),
      function (err) {
        if (err) throw err; //??? Kā tas jāizmanto?
      });

    res.send(`<link rel="stylesheet" href="static/css/form.css">
    <h2 class="accept">Datu apstrāde veiksmīgi pabeigta...</h2>
    <a href="..">ATGRIESTIES</a>`);
  };
})

app.post('/lor', (req, res) => {
  console.log(req.body); //-----------------------------------------------------
  let _err = dv.validate(req.body.name, { txt: 'Kļička', min: 1, max: 50 }) || dv.validate(req.body.age, { txt: 'Vecums', min_val: 18, max_val: 99 });
  if (_err) {
    res.send(`Kļūda: ${_err}`); //??? vai pie ievades kļūdām sūtam citu kodu un atsevišķi apstrādājam 
  } else {
    fs.appendFile(path.join(__dirname, 'server_data', 'data_db.txt'),
      ut.format('%j\n', { name: req.body.name.trim(), age: req.body.age.numS() }),
      function (err) {
        if (err) throw err;
      });
    res.send(`Datu apstrāde veiksmīgi pabeigta...`);
  };
})

app.get('/lor/report', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'report.html'));
  console.log("Nosūtīts reports..."); //-----------------------------------------------------
});

app.post('/lor/report', (req, res) => {
  res.sendFile(path.join(__dirname, 'server_data', 'data_db.txt'));
  console.log("Nosūtīti reporta dati..."); //-----------------------------------------------------
});

app.get(['/kuku', '/kyky'], (req, res) => {
  res.send('<h1>KUKU</h1>');
});

app.get('/', (req, res) => {
  let _lang = req.cookies.lang;
  if (!_lang) {
    res.redirect('/lor');
  } else {
    res.clearCookie('lang');
    res.redirect('/' + _lang);
  }
});

// app.get('*', (req, res) => {
//   res.redirect('/');
// })

app.listen(8080, () => {
  //console.log('Serveris startējis: 8080');
  'Serveris startējis: 8080'.l();
});