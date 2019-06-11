const path = require('path');

const
  ex = require('express'),
  app = ex(),
  cp = require('cookie-parser');

app.use(ex.json());
app.use(ex.urlencoded({ extended: false }));
app.use(cp());
app.use('/static', ex.static(path.join(__dirname, '..', 'dist')));


app.use('/rus', require(path.join(__dirname, 'routes', 'route_rus')));
app.use('/lor', require(path.join(__dirname, 'routes', 'route_lor')));


let i = 0;
app.use(['/kuku', '/kyky'], (req, res, next) => {
  i += 1;
  next();
});

// app.use(['/kuku', '/kyky'], (req, res, next) => {
//   res.status(100).send('<h1>NE KUKUJ</h1>');
//   next();
//  });

app.get(['/kuku', '/kyky'], (req, res) => {
  setTimeout(() => {
    res.send(`<h1>KUKU (${i})</h1>`);
  }, 1000);
});


// app.get('/ac', (req, res) => {
//   res.writeHead(301,
//     { Location: 'acconto.lv' }
//   );
//   res.end();
// });



app.get('/', (req, res) => {
  let _lang = req.cookies.lang;
  if (!_lang) {
    res.redirect('/lor');
  } else {
    res.clearCookie('lang');
    res.redirect('/' + _lang);
  }
});

app.get('*', (req, res) => {
  res.status(404).send('<h1>KABZDA errors numur 404</h1><a href="/">Atgriesties uz Home</a>')
})

app.listen(8080, () => {
  console.log('Serveris startējis: 8080');
});