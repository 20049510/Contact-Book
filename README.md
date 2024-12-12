# Contact-Book
# Contact Book

A simple Contact Book application that allows users to manage their contacts. This project includes functionalities to create, read, update, and delete contacts (CRUD operations).

## Features

- Add new contacts
- View all contacts
- Update existing contacts
- Delete contacts

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/contact-book.git
   cd contact-book

<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Contact Book</title> <link rel="stylesheet" href="styles.css"> </head> <body> <h1>Contact Book</h1> <!-- Contact Form --> <div> <input type="text" id="name" placeholder="Name"> <input type="email" id="email" placeholder="Email"> <input type="text" id="phone" placeholder="Phone"> <input type="text" id="address" placeholder="Address"> <button onclick="createContact()">Add Contact</button> <button onclick="viewContacts()">View Contacts</button> </div> <h2>Contacts</h2> <table> <thead> <tr> <th>Name</th> <th>Email</th> <th>Phone</th> <th>Address</th> <th>Actions</th> </tr> </thead> <tbody id="contacts-table"> <!-- Contacts will be displayed here --> </tbody> </table> <script> async function createContact() { const name = document.getElementById('name').value; const email = document.getElementById('email').value; const phone = document.getElementById('phone').value; const address = document.getElementById('address').value; const response = await fetch('http://localhost:3000/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, address }) }); if (response.ok) { alert('Contact added successfully!'); } else { const error = await response.text(); alert(`Error: ${error}`); } } async function viewContacts() { const response = await fetch('http://localhost:3000/contacts'); const contacts = await response.json(); const contactsTable = document.getElementById('contacts-table'); contactsTable.innerHTML = ''; contacts.forEach(contact => { contactsTable.innerHTML += `<tr> <td>${contact.name}</td> <td>${contact.email}</td> <td>${contact.phone}</td> <td>${contact.address}</td> <td> <button onclick="deleteContact(${contact.id})">Delete</button> <button onclick="updateContact(${contact.id})">Update</button> </td> </tr>`; }); } async function deleteContact(id) { const response = await fetch(`http://localhost:3000/contacts/${id}`, { method: 'DELETE' }); if (response.ok) { viewContacts(); } } async function updateContact(id) { const name = prompt('Enter new name:'); const email = prompt('Enter new email:'); const phone = prompt('Enter new phone:'); const address = prompt('Enter new address:'); const response = await fetch(`http://localhost:3000/contacts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, address }) }); if (response.ok) { viewContacts(); } } </script> </body> </html> this inddex .html this is server.js file const express = require('express'); const sqlite3 = require('sqlite3').verbose(); const cors = require('cors'); const app = express(); const port = 3000; app.use(cors()); // Enable CORS let db = new sqlite3.Database('./contacts.db'); db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, address TEXT)'); app.use(express.json()); // Create app.post('/contacts', (req, res) => { const { name, email, phone, address } = req.body; db.run('INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address], function(err) { if (err) return res.status(500).send(err.message); res.status(201).send({ id: this.lastID }); }); }); // Read app.get('/contacts', (req, res) => { db.all('SELECT * FROM contacts', [], (err, rows) => { if (err) return res.status(500).send(err.message); res.send(rows); }); }); // Update app.put('/contacts/:id', (req, res) => { const { name, email, phone, address } = req.body; db.run('UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?', [name, email, phone, address, req.params.id], function(err) { if (err) return res.status(500).send(err.message); res.send({ changes: this.changes }); }); }); // Delete app.delete('/contacts/:id', (req, res) => { db.run('DELETE FROM contacts WHERE id = ?', req.params.id, function(err) { if (err) return res.status(500).send(err.message); res.send({ changes: this.changes }); }); }); app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`); }); this is css <!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Contact Book</title> <link rel="stylesheet" href="styles.css"> </head> <body> <h1>Contact Book</h1> <!-- Contact Form --> <div> <input type="text" id="name" placeholder="Name"> <input type="email" id="email" placeholder="Email"> <input type="text" id="phone" placeholder="Phone"> <input type="text" id="address" placeholder="Address"> <button onclick="createContact()">Add Contact</button> <button onclick="viewContacts()">View Contacts</button> </div> <h2>Contacts</h2> <table> <thead> <tr> <th>Name</th> <th>Email</th> <th>Phone</th> <th>Address</th> <th>Actions</th> </tr> </thead> <tbody id="contacts-table"> <!-- Contacts will be displayed here --> </tbody> </table> <script> async function createContact() { const name = document.getElementById('name').value; const email = document.getElementById('email').value; const phone = document.getElementById('phone').value; const address = document.getElementById('address').value; const response = await fetch('http://localhost:3000/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, address }) }); if (response.ok) { alert('Contact added successfully!'); } else { const error = await response.text(); alert(`Error: ${error}`); } } async function viewContacts() { const response = await fetch('http://localhost:3000/contacts'); const contacts = await response.json(); const contactsTable = document.getElementById('contacts-table'); contactsTable.innerHTML = ''; contacts.forEach(contact => { contactsTable.innerHTML += `<tr> <td>${contact.name}</td> <td>${contact.email}</td> <td>${contact.phone}</td> <td>${contact.address}</td> <td> <button onclick="deleteContact(${contact.id})">Delete</button> <button onclick="updateContact(${contact.id})">Update</button> </td> </tr>`; }); } async function deleteContact(id) { const response = await fetch(`http://localhost:3000/contacts/${id}`, { method: 'DELETE' }); if (response.ok) { viewContacts(); } } async function updateContact(id) { const name = prompt('Enter new name:'); const email = prompt('Enter new email:'); const phone = prompt('Enter new phone:'); const address = prompt('Enter new address:'); const response = await fetch(`http://localhost:3000/contacts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, phone, address }) }); if (response.ok) { viewContacts(); } } </script> </body> </html> give me readme file and content humanized
Here’s a humanized README.md file for your Contact Book project. This will help other developers understand the purpose of the project, how to set it up, and how to use it.

README.md
markdown
# Contact Book

A simple Contact Book application that allows users to manage their contacts. This project includes functionalities to create, read, update, and delete contacts (CRUD operations).

## Features

- Add new contacts
- View all contacts
- Update existing contacts
- Delete contacts

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/contact-book.git
   cd contact-book
   
2.**Install dependencies**
  sh
  npm install

3. **Run the server**
   sh
   node server.js

4.**Open the project in a browser**

  Open the index.html file in your preferred web browser.

5.**Usage**
Add a Contact

Fill in the contact form (Name, Email, Phone, Address) and click the "Add Contact" button.

View Contacts

Click the "View Contacts" button to load and display all contacts.

Update a Contact

Click the "Update" button next to the contact you want to update, enter the new details, and save the changes.

Delete a Contact

Click the "Delete" button next to the contact you want to delete.

5.**Project Structure**
index.html: The frontend HTML file.

styles.css: The CSS file for styling the frontend.

server.js: The backend server file that handles API requests.

contacts.db: The SQLite database file that stores contact information (created automatically).

6.**Technologies Used**
Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js, SQLite

7.**Acknowledgments**
Inspired by simple CRUD applications.

Thanks to the open-source community for the tools and libraries used in this project.
