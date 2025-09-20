const Book = require('../models/bookModel');

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create book
exports.createBook = async (req, res) => {
  try {
    console.log('POST /api/books body:', req.body);
    if (!req.body) {
      return res.status(400).json({ error: 'Request body missing' });
    }

    // Destructure only after confirming body exists
    const { title, author, genre, publishedYear, pages, available } = req.body;

    if (
      title === undefined ||
      author === undefined ||
      genre === undefined ||
      publishedYear === undefined ||
      pages === undefined ||
      available === undefined
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const book = new Book(req.body);
    const result = await book.save();
    res.status(201).json(result);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      console.error('Unexpected error in createBook:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};


// PUT update book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
