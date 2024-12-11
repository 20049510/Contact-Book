const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS

let db = new sqlite3.Database('./contacts.db');

db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, address TEXT)');

app.use(express.json());

// Create
app.post('/contacts', (req, res) => {
  const { name, email, phone, address } = req.body;
  db.run('INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address], function(err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID });
  });
});

// Read
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
});

// Update
app.put('/contacts/:id', (req, res) => {
  const { name, email, phone, address } = req.body;
  db.run('UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?', [name, email, phone, address, req.params.id], function(err) {
    if (err) return res.status(500).send(err.message);
    res.send({ changes: this.changes });
  });
});

// Delete
app.delete('/contacts/:id', (req, res) => {
  db.run('DELETE FROM contacts WHERE id = ?', req.params.id, function(err) {
    if (err) return res.status(500).send(err.message);
    res.send({ changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
