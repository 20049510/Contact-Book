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
    