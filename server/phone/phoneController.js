const Phone = require('./phoneModel');
const View = require('../views/viewModel');
const Store = require('../stores/storeModel');
const mongoose = require('mongoose');
var createCountMinSketch = require("count-min-sketch")
const ObjectId = mongoose.Types.ObjectId;

var sketch = createCountMinSketch()

exports.index = (req, res) => {
    Phone.get((err, phones) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
            return;
        }

        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: phones
        });
    });
};

exports.new = (req, res) => {
    var phone = new Phone();
    phone._id = new mongoose.Types.ObjectId(),
        phone.brand = req.body.brand;
    phone.series = req.body.series;
    phone.price = req.body.price;
    phone.colors = req.body.colors;
    phone.memory_capacity = req.body.memory_capacity;
    phone.screen_size = req.body.screen_size;
    phone.screen_type = req.body.screen_type;
    phone.generation = req.body.generation;
    phone.ram = req.body.ram;

    const viewData = new View({
        viewed_phone: phone._id,
        viewsNumber: 0
    });
    phone.views = viewData._id;

    phone.save((err) => {
        viewData.save(function (err) {
            if (err) return handleError(err);
        });

        if (err) {
            res.json(err);
            return;
        }

        res.json({
            message: 'New phone added to the site!',
            data: phone
        });
    });
};

function updateViewCount(view) {
    view.viewsNumber += 1;
    view.save(function (err) {
        if (err) console.log('The err is  %s', err);
    });
}

exports.view = (req, res) => {
    Phone.findById(req.params.phone_id).populate('views').exec((err, phone) => {
        if (err || !phone) {
            res.send(err);
            return;
        }

        updateViewCount(phone.views);
        sketch.update(phone.brand, 1)
        if (err) {
            res.send(err);
            return;
        }

        res.json({
            message: 'phone details loading..',
            data: phone
        });
    });
};

exports.update = (req, res) => {
    Phone.findById(req.params.phone_id, (err, phone) => {

        if (err || !phone) {
            res.send(err);
            return;
        }

        phone.brand = req.body.brand;
        phone.series = req.body.series;
        phone.price = req.body.price;
        phone.colors = req.body.colors;
        phone.memory_capacity = req.body.memory_capacity;
        phone.screen_size = req.body.screen_size;
        phone.screen_type = req.body.screen_type;
        phone.generation = req.body.generation;
        phone.ram = req.body.ram;

        phone.save((err) => {
            if (err) {
                res.json(err);
                return;
            }

            res.json({
                message: 'Phone Info updated',
                data: phone
            });
        });
    });
};

exports.delete = (req, res) => {
    Phone.findById(req.params.phone_id, (err, phone) => {
        if (err)
            res.send(err);

        const viewId = phone.views;

        View.deleteOne({
            _id: viewId
        }, (err, phone) => {
            if (err)
                res.send(err);
        });
    });

    Phone.deleteOne({
        _id: req.params.phone_id
    }, (err, phone) => {
        if (err) {
            res.send(err);
            return;
        }

        res.json({
            status: "success",
            message: 'Phone deleted'
        });
    });
};

function addQuery(query, key, value) {
    //{brand:{$regex: req.body.brand, $options: 'i'}}
    var reg = {
        $or: []
    };
    var option = {};
    for (var a in value) {
        reg.$or.push({
            [key]: {
                $regex: value[a]
            }
        });
    }
    return reg;
}

function createQuery(req) {
    var query = {
        $and: []
    };

    for (var key in req.body) {
        if (req.body != undefined) {
            query.$and.push(addQuery(query, key, req.body[key]));
        }
    }

    return query;
}

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.filters = (req, res) => {
    var query = {}

    if (!isEmptyObject(req.body)) {
        query = createQuery(req);
    }

    Phone.find(query, (err, phone) => {
        if (err) {
            res.send(err);
            return;
        }

        res.json({
            message: 'Phone details loading..',
            data: phone
        });
    });
};

exports.availableStores = (req, res) => {
    const aggregatorOpts = [{
            $unwind: "$available_phones"
        },
        {
            $group: {
                _id: "$available_phones",
                stores: {
                    $push: "$_id"
                }
            }
        },
        {
            $match: {
                _id: ObjectId(req.params.phone_id)
            }
        }
    ];

    Store.aggregate(aggregatorOpts).exec((err, data) => {
        Store.populate(data, {
            path: "stores"
        }, function (err, data) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
                return;
            }

            res.json({
                status: "success",
                message: "Views retrieved successfully",
                data: data
            });
        });
    });
};

exports.mostViewedBrand = (req, res) => {
    const aggregatorOpts = [{
        $group: {
            _id: "$brand"
        }
    }, ];

    Phone.aggregate(aggregatorOpts).exec((err, data) => {
        let mostView = 0;
        let mostViewedBrand = undefined;

        data.forEach(val => {
            const current_result = sketch.query(val._id)
            if (mostView < current_result) {
                mostView = current_result;
                mostViewedBrand = val._id;
            }
        });

        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }

        res.json({
            status: "success",
            message: "Views retrieved successfully",
            data: mostViewedBrand
        });
    });
}