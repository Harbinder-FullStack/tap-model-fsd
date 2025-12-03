  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const app = express();
  const port = 3000;

  // Middleware to parse form data
  app.use(bodyParser.urlencoded({ extended: true }));

  // Serve static files (e.g., addbook.html)
  app.use(express.static(__dirname));

  // Connect to MongoDB
  //192.168.175.126
  //172.24.240.1
  mongoose.connect('mongodb://172.24.243.0:27017/library')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

  // Define Book Schema
  const bookSchema = new mongoose.Schema({
    bookno: {
      type: Number,
      required: true,
      min: 1,
      max: 1000,
      unique: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0.01
    }
  });

  // Create Book Model
  const Book = mongoose.model('Book', bookSchema);

  // POST: Create new Book
  app.post('/api/book', async (req, res) => {
    const { bookno, title, author, price } = req.body;

    // Create book document
    const newBook = new Book({
      bookno: Number(bookno),
      title,
      author,
      price: Number(price)
    });

    try {
      await newBook.save();
      res.status(201).json({ message: 'New Book saved.' });
    } catch (err) {
      if (err.code === 11000) {
        res.status(501).json({ error: 'Book number already exists.' });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  });

  // GET: Fetch all Books
  app.get('/api/books', async (req, res) => {
    try {
      const books = await Book.find();  // fetch all documents
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET: Fetch single book by bookno
  app.get('/api/book/:bookno', async (req, res) => {
    const bookno = (req.params.bookno);

    try {
      const book = await Book.findOne({ bookno });

      if (!book) {
        return res.status(404).send(`Book with number ${bookno} not found.`);
      }

      res.status(200).json(book);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
