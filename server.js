const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'ContactBook'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// API Endpoints
app.get('/contacts', (req, res) => {
    db.query('SELECT * FROM Contacts', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/contacts', (req, res) => {
    const { FirstName, LastName, PhoneNumber, Email, Address } = req.body;
    db.query(
        'INSERT INTO Contacts (FirstName, LastName, PhoneNumber, Email, Address) VALUES (?, ?, ?, ?, ?)',
        [FirstName, LastName, PhoneNumber, Email, Address],
        (err, result) => {
            if (err) throw err;
            res.json({ id: result.insertId, message: 'Contact added successfully' });
        }
    );
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
