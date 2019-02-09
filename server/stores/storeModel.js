const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    open_hours: [String],
    available_phones: [{
        type: Schema.Types.ObjectId,
        ref: 'Phone'
    }],

    phone: String,
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Store = module.exports = mongoose.model('stores', storeSchema);

module.exports.get = (callback, limit) => {
    Store.find(callback).limit(limit);
}