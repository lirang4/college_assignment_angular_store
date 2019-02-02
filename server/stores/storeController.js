const Store = require('./storeModel');

exports.index = (req, res) => {
    Store.get((err, stores) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }

        res.json({
            status: "success",
            message: "Stores retrieved successfully",
            data: stores
        });
    });
};

exports.new = (req, res) => {
    var store = new Store();

    store.long = req.body.long;
    store.lat = req.body.lat;
    store.open_hours = req.body.open_hours;
    store.phone = req.body.phone;

    store.save((err) => {
        if (err)
            res.json(err);

        res.json({
            message: 'New Store created!',
            data: store
        });
    });
};
