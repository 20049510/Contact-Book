// Select elements
const contactListEl = document.getElementById("contactList");
let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Function to display contacts
function displayContacts() {
  contactListEl.innerHTML = ""; // Clear the current list
  contacts.forEach((contact, index) => {
    const contactEl = document.createElement("div");
    contactEl.className = "contact"
    contactEl.innerHTML = `
      <span>${contact.name} - ${contact.phone}</span>
      <div>
        <button onclick="editContact(${index})">Edit</button>
        <button onclick="deleteContact(${index})">Delete</button>
      </div>
    `;
    contactListEl.appendChild(contactEl);
  });
}

// Function to add a new contact
function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  if (name && phone) {
    contacts.push({ name, phone });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
  } else {
    alert("Please enter both name and phone number.");
  }
}

// Function to delete a contact
function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}

// Function to edit a contact
function editContact(index) {
  const contact = contacts[index];
  const newName = prompt("Enter new name:", contact.name);
  const newPhone = prompt("Enter new phone number:", contact.phone);
  if (newName && newPhone) {
    contacts[index] = { name: newName, phone: newPhone };
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
  }
}

// Initial display
displayContacts();
