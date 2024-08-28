const { Schema, model } = require('mongoose')

const categorySchema = new Schema({
    ct_id: {
        type: String,
        unique: true
    },
    ct_code: {
        type: String,
        required: true,
        unique: true
    },
    ct_name: {
        type: String,
        required: true
    },
    ct_created_at: {
        type: Date,
        default: Date.now
    },
    ct_updated_at: {
        type: Date,
        default: Date.now
    }
});

categorySchema.pre('save', function(next) {
    if(this.isNew) {
        this.ct_id = this._id.toHexString();
    }
    next();
})

module.exports = model('Category', categorySchema)