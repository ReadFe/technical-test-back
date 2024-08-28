const {Schema, model} = require('mongoose');

const orderSchema = Schema({
    or_id: {
        type: String,
        unique: true
    },
    or_pd_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    or_amount: {
        type: Number,
        required: true
    },
    or_created_at: {
        type: Date,
        default: Date.now
    },
    or_updated_at: {
        type: Date,
        default: Date.now
    }
});

orderSchema.pre('save', function(next) {
    if(this.isNew) {
        this.or_id = this._id.toHexString();
    }
    next()
})

module.exports = model('Order', orderSchema);
