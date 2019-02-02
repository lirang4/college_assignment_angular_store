const constant = require('../shared_objects/constants');

exports.get = (req, res) => {
    response = {
        brand: constant.brand.enum,
        colors: constant.colors.enum,
        memory_capacity: constant.memory_capacity.enum,
        screen_size: constant.screen_size.enum,
        screen_type: constant.screen_type.enum,
        generation:constant.generation.enum,
        ram: constant.ram.enum
    };
    res.json(response);    
};
