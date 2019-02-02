const Phone = require('./phoneModel');

exports.index = (req, res) => {
    Phone.get((err, phones) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
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
        if (err)
            res.json(err);

        res.json({
            message: 'New phone added to the site!',
            data: phone
        });
    });
};

exports.view = (req, res) => {
    Phone.findById(req.params.phone_id, (err, phone) => {
        if (err)
            res.send(err);

        res.json({
            message: 'phone details loading..',
            data: phone
        });
    });
};

exports.update = (req, res) => {
    Phone.findById(req.params.phone_id, (err, phone) => {
        if (err)
            res.send(err);

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
            if (err)
                res.json(err);

            res.json({
                message: 'Phone Info updated',
                data: phone
            });
        });
    });
};

exports.delete = (req, res) => {
    Phone.remove({
        _id: req.params.phone_id
    }, (err, phone) => {
        if (err)
            res.send(err);

        res.json({
            status: "success",
            message: 'Phone deleted'
        });
    });
};

function addQuery(query, key, value) {
    //{brand:{$regex: req.body.brand, $options: 'i'}}
    var reg = {$or:[]};
    var option = {};
    for(var a in value){
        reg.$or.push({[key]:{$regex:value[a]}});
    }
    return reg; 
    //query[key] = {$or:[bla]}
}

function createQuery(req) {
    var query = {$and:[]};
    for(var key in req.body){
        query.$and.push(addQuery(query, key, req.body[key]));
    }
    return query;
}

exports.filters = (req, res) => {
    var query = {}
    //res.send(JSON.stringify(createQuery(req)));
         //query = {$and:[{brand:{$regex: req.body.brand, $options: 'i'}}]}
    query = createQuery(req);

    Phone.find(query , (err, phone) => {
        if (err)
            res.send(err);

        res.json({
            message: 'Phone details loading..',
            data: phone
        });
    });
};