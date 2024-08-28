const Order = require('./model')

const store = async (req, res, next) => {
    try {
        const payload = req.body;
        const result = await Order.create(payload);
    
        return res.json(result);
    } catch (error) {
        if(error && error.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            })
        }
        next(error)
    }
}

const index = async (req, res, next) => {
    try {
        const result = await Order.find()
        res.json(result);
    } catch (error) {
        if(error && error.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            })
        }
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const payload = req.body;
        const result = await Order.findByIdAndUpdate(id, payload, {new: true, runValidator: true})

        res.json(result)
    } catch (error) {
        if(error && error.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            })
        }
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Order.findByIdAndDelete(id)

        res.json(result)
    } catch (error) {
        if(error && error.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: error.message,
                fields: error.errors
            })
        }
        next(error)
    }
}

module.exports = {
    store,
    index,
    update,
    destroy
}