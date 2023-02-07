// bookController.js
// Import book model
Book = require('./bookModel');
// Handle index actions
exports.index = function (req, res) {
    Book.get(function (err, books) {
        if (err) {
            res.send({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Books retrieved successfully",
            data: books
        });
    });
};
// Handle create book actions
exports.new = function (req, res) {
    const book = new Book();
    if (req.body.title == null) {
        res.send({message: "Book title is required!"});
    } else if (req.body.borrower == null) {
        res.send({message: "Borrower's name is required!"});
    } else if (req.body.borrower_email == null) {
        res.send({message: "Borrower's email is required!"});
    } else {
        book.title = req.body.title;
        book.borrower = req.body.borrower;
        book.borrower_email = req.body.borrower_email;
        book.borrower_phone = req.body.borrower_phone ? req.body.borrower_phone : "";
        // save the book and check for errors
        book.save(function (err) {
            if (err)
                res.send(err);
            // res.json(err);
            res.json({
                message: 'New book created!',
                data: book
            });
        });
    }
};
// Handle view book info
exports.view = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            // Check if book can be found
            if (book != null) {
                res.send(err)
            } else {
                res.send({
                    message: "Book cannot be found. Book id may not exist."
                })
            }
        } else {
            res.json({
                message: 'Book details loading..',
                data: book
            });
        }
    });
};
// Handle update book info
exports.update = function (req, res) {
    Book.findById(req.params.book_id, function (err, book) {
        if (err) {
            // Check if book can be found
            if (book != null) {
                res.send(err)
            } else {
                res.send({
                    message: "Book cannot be found. Book id may not exist."
                })
            }
        } else {
            if (req.body.title == null) {
                res.send({
                    message: "Book title is required!"
                });
            } else if (req.body.borrower == null) {
                res.send({
                    message: "Borrower's name is required!"
                });
            } else if (req.body.borrower_email == null) {
                res.send({
                    message: "Borrower's email is required!"
                });
            } else {
                book.title = req.body.title;
                book.borrower = req.body.borrower;
                book.borrower_email = req.body.borrower_email;
                book.borrower_phone = req.body.borrower_phone ? req.body.borrower_phone : book.borrower_phone;
                // save the contact and check for errors
                book.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({
                            message: 'Book Info updated',
                            data: book
                        });
                    }
                });
            }
        }
    });
};
// Handle delete book
exports.delete = function (req, res) {
    Book.remove({
        _id: req.params.book_id
    }, function (err, book) {
        if (err) {
            // Check if book can be found
            if (book != null) {
                res.send(err)
            } else {
                res.send({
                    message: "Book cannot be found. Book id may not exist."
                })
            }
        } else {
            res.json({
                status: "success",
                message: 'Book deleted'
            });
        }
    });
};