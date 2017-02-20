const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')

app.use(express.static('public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.set('port', process.env.PORT || 8080);


app.get('/', require('./routes').index);

app.listen(app.get('port'), () => {
  console.log('Alive on port', app.get('port'));
})
