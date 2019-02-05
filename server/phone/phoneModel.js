const mongoose = require('mongoose');
const constant = require('constants');
const Schema = mongoose.Schema;

const phoneSchema = mongoose.Schema({
    brand: {
        type: String,
        enum: constant.brand,
        required: true
    },
    views: { type: Schema.Types.ObjectId, ref: 'Views' },
    series: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    color: {
        type: [String],
        enum: constant.colors,
        default: "Black"
    },
    memory_capacity: {
        type: [String],
        enum: constant.memory_capacity,
    },
    screen_size: {
        type: [String],
        enum: constant.screen_size,
    },
    screen_type: {
        type: [String],
        enum: constant.screen_type,
    },
    generation: {
        type: [String],
        enum: constant.generation,
    },
    ram: {
        type: [String],
        enum: constant.ram,
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Phone = module.exports = mongoose.model('Phone', phoneSchema);

module.exports.get = (callback, limit) => {
    Phone.find(callback).limit(limit);
}