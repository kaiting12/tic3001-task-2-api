// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'Welcome to Library!',
    });
});

// Import book controller
const bookController = require('./bookController');
// Contact routes
router.route('/books')
    .get(bookController.index)
    .post(bookController.new);
router.route('/books/:book_id')
    .get(bookController.view)
    .patch(bookController.update)
    .put(bookController.update)
    .delete(bookController.delete);
// Export API routes
module.exports = router;