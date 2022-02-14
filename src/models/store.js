const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    store_name: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

storeSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'store'
})

const Store = mongoose.model('Store', storeSchema)

module.exports = Store