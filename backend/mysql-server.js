const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
host = "localhost"
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: host,
  user: 'root',
  password: '',
  database: 'library'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/api/book', (req, res) => {
  const { bookno, title, author, price } = req.body;

  const sql = 'INSERT INTO books (bookno, title, author, price) VALUES (?, ?, ?, ?)';
  db.query(sql, [bookno, title, author, price], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(501).json({ error: 'Book number already exists.' });
      }
      res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'New Book saved.' });
  });

});

app.get('/api/books', (req, res) => {
  const sql = 'SELECT * FROM books';

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json(results);
  });
});

app.get('/api/book/:bookno', (req, res) => {
  const { bookno } = req.params;

  const sql = 'SELECT * FROM books WHERE bookno = ?';

  db.query(sql, [bookno], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0)
      return res.status(404).json({ error: 'Book not found.' });

    res.status(200).json(results[0]);
  });
});

app.put('/api/book/:bookno', (req, res) => {
  const { bookno } = req.params;
  const { title, author, price } = req.body;

  const sql = 'UPDATE books SET title = ?, author = ?, price = ? WHERE bookno = ?';

  db.query(sql, [title, author, price, bookno], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Book not found.' });

    res.status(200).json({ message: 'Book updated successfully.' });
  });
});

app.delete('/api/book/:bookno', (req, res) => {
  const { bookno } = req.params;

  const sql = 'DELETE FROM books WHERE bookno = ?';

  db.query(sql, [bookno], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Book not found.' });

    res.status(200).json({ message: 'Book deleted successfully.' });
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
