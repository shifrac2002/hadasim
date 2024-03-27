const express = require('express');
const customer = require('./routes/customer')
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 6200;
app.use(cors());
app.use(express.json());
app.use('/api/Customer', customer);

app.use(cors())
app.use(express.static('images'));
app.listen(port, () => {
  console.log('server is up and running');
})