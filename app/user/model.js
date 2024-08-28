const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = Schema({
    us_id: {
        type: String,
        unique: true
    },
    us_name: {
        type: String,
        required: true
    },
    us_password: {
        type: String,
        required: true
    },
    us_email: {
        type: String,
        required: true
    },
    us_phone_number: {
        type: Number,
        required: true
    },
    us_address: {
        type: String,
        required: true
    },
    token: [String],
    us_created_at: {
        type: Date,
        default: Date.now
    },
    us_updated_at: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', function(next) {
    if(this.isNew) {
        this.us_id = this._id.toHexString();
    }
    next();
});

userSchema.path('us_email').validate(function(value) {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value);
}, attr => `${attr.value} bukan email yang valid`);

userSchema.path('us_email').validate(async function(value) {
    try {
        const count = await this.model('User').countDocuments({us_email: value})
        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`);

userSchema.pre('save', function(next) {
    this.us_password = bcrypt.hashSync(this.us_password, 10);
    next();
});

module.exports = model('User', userSchema)