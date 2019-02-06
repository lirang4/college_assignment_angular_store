const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const socket = require('socket.io');
const http = require('http')

const apiRoutes = require("./api-routes");

const rp = require('request-promise');
const cheerio = require('cheerio');
const Phone = require('./phone/phoneModel');
const Store = require('./stores/storeModel');
const View = require('./views/viewModel');

const port = 8080;
const app = express();

// Initiate Mongo (Mongoose)
mongoose.connect('mongodb://localhost/phone-store', {
    useNewUrlParser: true
}).connection;


// Initiate HTTP Server (Express)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log("Running RestHub on port " + port);
});

// Initiate Websocket Server (Socket.IO)
const server = http.createServer(app)
const io = require('socket.io').listen(server);
server.listen(3001);
usersCounter = [];

io.sockets.on('connection', (client) => {
    console.log('Client connected, sending message');

    if (usersCounter.indexOf(client.id) === -1) {
        usersCounter.push(client.id);
    }

    setInterval((client) => {
        client.emit('USERS', {
            users: usersCounter.length
        });
    }, 5000, client);

    client.on('disconnect', function () {
        const index = usersCounter.indexOf(client.id);
        usersCounter.splice(index, 1);
    });
});

// create_stores();
//scrap_phones_data();

function create_stores() {
    var store = new Store();
    store.long = 32.789184;
    store.lat = 35.000811;
    store.open_hours = ["1: 12:00-18:00", "2: 12:00-18:00"];
    store.phone = "055-556858";
    store.save();

    var store2 = new Store();
    store2.long = 32.820326;
    store2.lat = 34.973913;
    store2.open_hours = ["1: 12:00-18:00", "2: 12:00-18:00"];
    store2.phone = "055-556857";
    store2.save();

    var store3 = new Store();
    store3.long = 32.783697;
    store3.lat = 34.961097;
    store3.open_hours = ["1: 12:00-18:00", "2: 12:00-18:00"];
    store3.phone = "055-556856";
    store3.save();

    var store4 = new Store();
    store4.long = 32.775581;
    store4.lat = 35.042839;
    store4.open_hours = ["1: 12:00-18:00", "2: 12:00-18:00"];
    store4.phone = "055-556855";
    store4.save();
}

function scrap_phones_data() {
    for (let i = 1; i < 10; i++) {
        let options = {
            uri: `https://www.zap.co.il/models.aspx?sog=e-cellphone&pageinfo=${i}`,
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        const phones = []

        rp(options)
            .then(($) => {
                $('.ProdGeneralInfo').each(function (i, elem) {
                    const phone = {};

                    $('.pair', elem).each(function (i, elem) {
                        const result = $(this).text().trim().split(':');
                        let key;
                        switch (result[0]) {
                            case 'יצרן':
                                key = 'brand';
                                break;
                            case 'גודל מסך':
                                key = 'screen_size';
                                break;
                            case 'נפח אחסון פנימי':
                                key = 'memory_capacity';
                                break;
                            case 'שנת הכרזה':
                                key = 'year';
                                break;
                            case 'ערכת שבבים':
                                key = 'processor';
                                break;
                            case 'זיכרון RAM':
                                key = 'ram';
                                break;
                            case 'רזולוציה':
                                key = 'resulution';
                                break;
                            case 'מצלמה':
                                key = 'camera';
                                break;
                            default:
                                key = result[0];
                                break;
                        }
                        phone[key] = result[1];
                    });

                    const model = new Phone();
                    model.brand = phone.brand;
                    model.memory_capacity = phone.memory_capacity;
                    model.screen_size = phone.screen_size;
                    model.ram = phone.ram;

                    const viewData = new View({
                        viewed_phone: model._id,
                        viewsNumber: 0
                    });
                    model.views = viewData._id;

                    viewData.save(function (err) {
                        if (err) return handleError(err);
                   });

                    phones.push(model);
                });

                $('.pricesTxt').each(function (i, elem) {
                    phones[i].price = $(this).text().trim();
                });

                $('.ProdInfoTitle').each(function (i, elem) {
                    phones[i].series = $(this).text().trim();
                });

                for (const model of phones) {
                    model.save();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}