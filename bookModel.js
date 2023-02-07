// bookModel.js
var mongoose = require('mongoose');
// const connectionString = 'mongodb://localhost:27017/DB';
// mongoose.connect(connectionString);
// mongoose.set('strictQuery', false);
// Setup schema
var bookSchema = mongoose.Schema({
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
var Book = module.exports = mongoose.model('book', bookSchema);
module.exports.get = function (callback, limit) {
    Book.find(callback).limit(limit);
}