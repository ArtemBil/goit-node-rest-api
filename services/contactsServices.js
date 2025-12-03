import contactRepository from "../repositories/contact.js";


export async function listContacts() {
    try {
        const contacts = await contactRepository.getAllContacts();
        return contacts;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getContactById(contactId) {
    const contact = contactRepository.getContactById(contactId);

    return contact || null;
}

export async function removeContact(contactId) {
    const contactToRemove = await contactRepository.getContactById(contactId);
    await contactRepository.removeContact(contactId);

    return contactToRemove;
}

export async function addContact(payload) {
    const newContact = await contactRepository.addContact(payload);
    return newContact;
}

export async function updateContact(contactId, name, email, phone) {
    const contact = await contactRepository.getContactById(contactId);

    if (!contact) {
        return null;
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;

    const updatedContact = await contactRepository.updateContact(contactId, contact);

    return updatedContact;
}

export async function updateStatusContact(contactId, payload) {
    const contact = await contactRepository.updateStatusContact(contactId, payload);
    return contact;
}

