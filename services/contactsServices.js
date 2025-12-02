import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import {nanoid} from "nanoid";

const contactsPath = path.resolve('db', 'contacts.json');

const updateMovieList = async (contacts) => {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(contacts);
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);

    return contact || null;
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index === -1) {
        return null;
    }

    const [ result ] = contacts.splice(index, 1);
    await updateMovieList(contacts);

    return result;
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }

    contacts.push(newContact);
    await updateMovieList(contacts);

    return newContact;
}

export async function updateContact(contactId, name, email, phone) {
    const contacts = await listContacts();

    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact) {
        return null;
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;

    await updateMovieList(contacts);

    return contact;
}

