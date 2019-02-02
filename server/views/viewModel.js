const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewSchema = mongoose.Schema({
    viewed_phone: {type: Schema.Types.ObjectId, ref: 'phone'},
    open_hours: [String],
    phone: String,
});

const View = module.exports = mongoose.model('views', viewSchema);

module.exports.get = (callback, limit) => {
    View.find(callback).limit(limit);
}