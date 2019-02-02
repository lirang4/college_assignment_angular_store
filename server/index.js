const express = require('express');
const bodyParser = require('body-parser');
let mongoose = require('mongoose');

const apiRoutes = require("./api-routes");

const rp = require('request-promise');
const cheerio = require('cheerio');
const Phone = require('./phone/phoneModel');

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

for (let i = 1; i < 2; i++) {
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

                phones.push(model);
            });

            $('.pricesTxt').each(function (i, elem) {
                phones[i].price = $(this).text().trim();
            });

            for (const model of phones) {
                model.save();
            }
        })
        .catch((err) => {
            console.log(err);
        });
}