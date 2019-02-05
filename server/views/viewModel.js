const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewSchema = mongoose.Schema({
    viewed_phone: { type: Schema.Types.ObjectId, ref: 'Phone' },
    viewsNumber: Number,
});

const Views = module.exports = mongoose.model('Views', viewSchema);

module.exports.get = (callback, limit) => {
    Views.find(callback).limit(limit);
}