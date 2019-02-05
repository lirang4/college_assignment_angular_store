const View = require('./viewModel');

exports.index = (req, res) => {
    View.get((err, views) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
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
    View.find({}).sort({viewsNumber : -1}).limit(number).populate('viewed_phone')
    .exec ((err, view) => {

      if (err) {
        res.json({
            status: "error",
            message: err,
        });
    }

    res.json({
        status: "success",
        message: "Views retrieved successfully",
        data: view
    });
  }); 
};
