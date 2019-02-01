const express = require('express');
const bodyParser = require('body-parser');
let mongoose = require('mongoose');

const apiRoutes = require("./api-routes");

const port = 8080;
const app = express();

mongoose.connect('mongodb://localhost/phone-store', {
    useNewUrlParser: true
}).connection;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log("Running RestHub on port " + port);
});