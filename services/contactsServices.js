import contactRepository from "../repositories/contact.js";


export async function listContacts(userId) {
    try {
        const contacts = await contactRepository.getAllContacts(userId);
        return contacts;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getContactById(contactId, userId) {
    const contact = contactRepository.getContactById(contactId, userId);

    return contact || null;
}

export async function removeContact(contactId, userId) {
    const contactToRemove = await contactRepository.getContactById(contactId, userId);
    await contactRepository.removeContact(contactId, userId);

    return contactToRemove;
}

export async function addContact(payload) {
    const newContact = await contactRepository.addContact(payload);
    return newContact;
}

export async function updateContact(contactId, userId, name, email, phone) {
    const contact = await contactRepository.getContactById(contactId, userId);

    if (!contact) {
        return null;
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.phone = phone || contact.phone;

    const updatedContact = await contactRepository.updateContact(contactId, userId, contact);

    return updatedContact;
}

export async function updateStatusContact(contactId, userId, payload) {
    const contact = await contactRepository.updateStatusContact(contactId, userId, payload);
    return contact;
}

