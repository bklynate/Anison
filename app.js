const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')

// line 7 allows for scripts in the public/js to work.
app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// app.engine('jsx', require('express-react-views').createEngine());
app.set('port', process.env.PORT || 8080);


app.get('/', (request, response) => {
  response.render('index')
})

app.listen(app.get('port'), () => {
  console.log('Alive on port', app.get('port'));
})
