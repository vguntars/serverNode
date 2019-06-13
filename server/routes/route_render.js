const path = require('path');

const
  ex = require('express'),

  hd = require(path.join(__dirname, '..', 'html_data', 'html_render')),

  rt = ex.Router();

rt.get('/render', (req, res) => {
  res.render('index_tmp.html', hd);
});

module.exports = rt;