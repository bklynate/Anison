const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')

app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8080);


app.get('/', (request, response) => {
  response.render('index');
});

app.listen(app.get('port'), () => {
  console.log('Alive on port', app.get('port'));
})
