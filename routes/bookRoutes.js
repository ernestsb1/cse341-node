const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { isAuthenticated } = require('../middleware/authenticate'); 



router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', isAuthenticated, bookController.createBook);
router.put('/:id', isAuthenticated, bookController.updateBook);
router.delete('/:id', isAuthenticated, bookController.deleteBook);

module.exports = router;
