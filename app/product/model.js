const { Schema, model } = require('mongoose')

const productSchema = Schema({
    pd_id: {
        type: String,
        unique: true
    },
    pd_code: {
        type: String,
        required: true
    },
    pd_name: {
        type: String,
        required: true
    },
    pd_price: {
        type: Number,
        required: true
    },
    pd_ct_id: { 
        type: Schema.Types.ObjectId,
        ref: 'Category' 
    },
    pd_created_at: { 
        type: Date, 
        default: Date.now 
    },
    pd_updated_at: { 
        type: Date, 
        default: Date.now 
    }
})

productSchema.pre('save', function(next) {
    if(this.isNew) {
        this.pd_id = this._id.toHexString();
    }
    next();
})

module.exports = model('Product', productSchema)