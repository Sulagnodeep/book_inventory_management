const mongoose = require('mongoose')

const Book = mongoose.model('Book', {
    book_name: {
        type: String,
        required: true,
        trim: true
    },
    google_id: {
        type: String,
        required: true,
        trim: true 
    },
    count: {
        type: Number,
        required: true,
        trim: true
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Store'
    }
})

module.exports = Book