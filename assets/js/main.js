const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('port', process.env.PORT || 8080)

app.get('/', (request, response) => {
  response.send('<h1>Knock Knock Mutha.....</h1>')
});

app.listen(app.get('port'), () => {
  console.log('Alive on port', app.get('port'));
})
