const path = require('path');

const
  ex = require('express'),

  rt = ex.Router();


rt.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'report.html'));
  console.log("Nosūtīts reports..."); //-----------------------------------------------------
});

rt.post('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'server_data', 'data_db.txt'));
  console.log("Nosūtīti reporta dati..."); //-----------------------------------------------------
});

module.exports = rt;