const View = require('./viewModel');
const Phone = require('../phone/phoneModel');

exports.index = (req, res) => {
    View.get((err, views) => {
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
            data: views
        });
    });
};

exports.mostViewed = (req, res) => {
    var number = parseInt(req.query.top);
    View.find({}).sort({
            viewsNumber: -1
        }).limit(number).populate('viewed_phone')
        .exec((err, view) => {
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
                data: view
            });
        });
};

exports.brandViews = (req, res) => {
    const aggregatorOpts = [{
        $group: {
            _id: '$viewed_phone',
            count: {
                $sum: 1
            }
        }
    }]

    View.aggregate(aggregatorOpts).exec((err, data) => {
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
};

exports.phoneBrandQuantity = (req, res) => {
    var data_mapped = {};
    data_mapped.map = function () {
        emit(this.brand, 1)
    };

    data_mapped.reduce = function (k, vals) {
        return Array.sum(vals);
    };

    Phone.mapReduce(data_mapped, function (err, results) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });

            return;
        }
        res.json({
            status: "success",
            message: "phone's brand quntity retrieved successfully",
            data: results
        });
    });
}