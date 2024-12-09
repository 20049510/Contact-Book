async function fetchContacts() {
    const response = await fetch('http://localhost:3000/contacts');
    const contacts = await response.json();
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = contacts.map(contact => `
