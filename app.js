const express = require("express");
const { randomUUID } = require('crypto');
const cors = require('cors');

const app = express();

// or specify a whitelist of allowed origins
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000']
  }));
app.use(express.json())

// Dummy data
let contacts = [
  {
    id: randomUUID(),
    first: "John",
    last: " Doe",
    favorite: true,
    phone: "+1 123-456-7890",
    avatar: "https://loremflickr.com/640/360",
    twitter: "johndoe",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: randomUUID(),
    first: "Jane",
    last: "Smith",
    favorite: false,
    phone: "+44 7911 123456",
    avatar: "https://loremflickr.com/640/360",
    twitter: "janesmith",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet nibh ultrices, finibus elit vitae, viverra nisl. Fusce vel sapien eget dolor egestas facilisis eu ut ante."
  },
  {
    id: randomUUID(),
    first: "David",
    last: "Kim",
    favorite: true,
    phone: "+81 3-1234-5678",
    avatar: "https://loremflickr.com/640/360",
    twitter: "davidkim",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut ante sapien. Fusce mollis dolor eget sem faucibus, a fermentum tellus aliquam. Praesent varius, mi in congue consequat, ipsum nisi malesuada nisi, eu convallis turpis arcu ut urna."
  },
  {
    id: randomUUID(),
    first: "Anna",
    last: "Garcia",
    favorite: false,
    phone: "+55 11 98765-4321",
    avatar: "https://loremflickr.com/640/360",
    twitter: "annagarcia",
    notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nam aliquam tristique elit, sit amet auctor lectus consectetur vel. Vivamus vel arcu sit amet nulla vestibulum rhoncus. Sed ultricies, purus quis tempor lacinia, quam nibh vehicula nulla, vitae hendrerit turpis augue at nisl."
  }
];
console.log("Test data:\n", contacts, "\n")

// Endpoint to get all contacts
app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

// Endpoint to create a new contact
app.post("/api/contacts", (req, res) => {
  const { first, last, favorite, phone, avatar, twitter, notes } = req.body;
  const id = randomUUID();
  const newContact = { id, first, last, favorite, phone, avatar, twitter, notes };
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
  const { first, last, favorite, phone, avatar, twitter, notes } = req.body;
  const contact = contacts.find((c) => c.id === id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  contact.first = first || contact.first;
  contact.last = last || contact.last;
  if(favorite === undefined) {
    contact.favorite = contact.favorite;
  } else {
      contact.favorite = favorite;
  }
  contact.phone = phone || contact.phone;
  contact.avatar = avatar || contact.avatar;
  contact.twitter = twitter || contact.twitter;
  contact.notes = notes || contact.notes;
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
