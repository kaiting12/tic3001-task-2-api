// bookModel.js
const mongoose = require('mongoose');

// Setup schema
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    borrower: {
        type: String,
        required: true
    },
    borrower_email: {
        type: String,
        required: true
    },
    borrower_phone: String,
    borrow_date: {
        type: Date,
        default: Date.now
    }
});

// Export Contact model
const Book = module.exports = mongoose.model('book', bookSchema);
module.exports.get = function (callback, limit) {
    Book.find(callback).limit(limit);
}