async function fetchContacts() {
    const response = await fetch('http://localhost:3000/contacts');
    const contacts = await response.json();
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = contacts.map(contact => `
  <div class="contact">
            <div>
                <strong>${contact.FirstName} ${contact.LastName}</strong><br>
                ${contact.PhoneNumber}<br>${contact.Email}
            </div>
            <button onclick="deleteContact(${contact.id})">Delete</button>
        </div>
    `).join('');
}
    
async function addContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const [firstName, lastName] = name.split(' ');
    await fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ FirstName: firstName, LastName: lastName || '', PhoneNumber: phone, Email: '', Address: '' })
    });
    fetchContacts();
}

async function deleteContact(id) {
    await fetch(`http://localhost:3000/contacts/${id}`, { method: 'DELETE' });
    fetchContacts();
}

// Initial fetch