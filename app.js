const express = require("express");
const { randomUUID } = require("crypto");
const cors = require("cors");
require('dotenv').config()

const app = express();

app.use(
  cors({
    origin: [`http://${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`, `http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}`],
  })
);
app.use(express.json());

// Endpoint to get all contacts
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

// Endpoint to create a new contact
app.post("/api/contacts", (req, res) => {
  const { first, last, favorite, phone, avatar, twitter, notes } = req.body;
  const id = randomUUID();
  const newContact = {
    id,
    first,
    last,
    favorite,
    phone,
    avatar,
    twitter,
    notes,
  };
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
  const update = req.body;

  const contactIndex = contacts.findIndex((c) => c.id === id);
  if (contactIndex === -1) {
    return res.status(404).json({ message: "Contact not found" });
  }

  const updatedContact = { ...contacts[contactIndex], ...update };
  contacts[contactIndex] = updatedContact;

  res.json(updatedContact);
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
  console.log(`Server started on port ${process.env.PORT}`);
  console.log(`\nhttp://${process.env.SERVER_URL}:${process.env.SERVER_PORT}`);
});
