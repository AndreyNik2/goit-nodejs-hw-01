const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.join(__dirname, "contacts.json");

// Get all contacts
const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

// Get contact by ID
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => Number(contact.id) === contactId) || null;
};

// Delete contact
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => Number(contact.id) === contactId
  );
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return result;
};

// Add contact
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
