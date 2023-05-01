const express = require("express");
const { randomUUID } = require('crypto');
const app = express();
app.use(express.json())

// Dummy data
let contacts = [
  {
    id: randomUUID(),
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
  },
  {
    id: randomUUID(),
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+1 234-567-8901",
  },
  {
    id: randomUUID(),
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 345-678-9012",
  },
];
console.log("Test data:\n", contacts, "\n")

// Endpoint to get all contacts
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

// Endpoint to create a new contact
app.post("/api/contacts", (req, res) => {
  const { name, email, phone } = req.body;
  const id = randomUUID();
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  res.json(newContact);
});

// Endpoint to get a single contact by ID
app.get("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(contact);
});

// Endpoint to update an existing contact by ID
app.put("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.phone = phone || contact.phone;
  res.json(contact);
});

// Endpoint to delete an existing contact by ID
app.delete("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }
  const deletedContact = contacts.splice(index, 1)[0];
  res.json(deletedContact);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
  console.log("\nhttp://127.0.0.1:3000");
});
