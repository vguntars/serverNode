const path = require('path');

const
  ex = require('express'),
  fs = require('fs'),
  ut = require('util'),
  dv = require(path.join(__dirname, '..', 'modules', 'data_validation')),

  rt = ex.Router();

rt.post('/', (req, res) => {
  let _err = dv.validate(req.body.name, { txt: 'Kļička', min: 1, max: 50 }) || dv.validate(req.body.age, { txt: 'Vecums', min_val: 18, max_val: 99 });
  if (_err) {
    res.status(400).send(`<link rel="stylesheet" href="/static/css/form.css">
      <h2 class="alert">Kļūda: ${_err}</h2>
      <a href="..">ATGRIESTIES</a>`);
  } else {
    fs.appendFile(path.join(__dirname, '..', 'server_data', 'data_db.txt'),
      ut.format('%j\n', { name: req.body.name.trim(), age: req.body.age.numS() }),
      function (err) {
        if (err) throw err; //??? Kā tas jāizmanto?
      });

    res.send(`<link rel="stylesheet" href="/static/css/form.css">
      <h2 class="accept">Datu apstrāde veiksmīgi pabeigta...</h2>
      <a href="..">ATGRIESTIES</a>`);
  };
})

module.exports = rt;