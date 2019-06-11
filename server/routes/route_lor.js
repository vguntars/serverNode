const path = require('path');
require(path.join(__dirname, '..', 'modules', 'init'));

const
  ex = require('express'),
  fs = require('fs'),
  ut = require('util'),
  cp = require('cookie-parser'),
  dv = require(path.join(__dirname, '..', 'modules', 'data_validation')),

  rt = ex.Router();

rt.use(ex.json());
rt.use(ex.urlencoded({ extended: false }));
rt.use(cp());

rt.use('/form', require(path.join(__dirname, '..', 'routes', 'route_form')));

rt.get('/', (req, res) => {
  res.clearCookie('lang');
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index_lo.html'));
});

rt.post('/', (req, res) => {
  console.log(req.body); //-----------------------------------------------------
  let _err = dv.validate(req.body.name, { txt: 'Kļička', min: 1, max: 50 }) || dv.validate(req.body.age, { txt: 'Vecums', min_val: 18, max_val: 99 });
  if (_err) {
    res.status(400).send(`Kļūda: ${_err}`); //??? vai pie ievades kļūdām sūtam citu kodu un atsevišķi apstrādājam 
  } else {
    fs.appendFile(path.join(__dirname, '..', 'server_data', 'data_db.txt'),
      ut.format('%j\n', { name: req.body.name.trim(), age: req.body.age.numS() }),
      function (err) {
        if (err) throw err;
      });
    res.send(`Datu apstrāde veiksmīgi pabeigta...`);
  };
})

rt.use('/report', require(path.join(__dirname, '..', 'routes', 'route_report')));

module.exports = rt;