import {addContact, getContactById, listContacts, removeContact, updateContact as updateContactService} from "../services/contactsServices.js";
import {checkIfContactNotExist} from "../helpers/checkIfContactNotExist.js";

export const getAllContacts = async (req, res) => {
    const contacts = await listContacts();
    return res.json(contacts);
};

export const getOneContact = async (req, res) => {
    const contact = await getContactById(req.params.id);
    if (checkIfContactNotExist(contact, res)) {
        return;
    }

    return res.json(contact);
};

export const deleteContact = async (req, res) => {
    const contact = await removeContact(req.params.id);
    if (checkIfContactNotExist(contact, res)) {
        return;
    }

    return res.json(contact);
};

export const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    const contact = await addContact(name, email, phone);

    res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
    const contact = await getContactById(req.params.id);
    if (checkIfContactNotExist(contact, res)) {
        return;
    }

    const { name, email, phone } = req.body;
    const updatedContact = await updateContactService(req.params.id, name, email, phone);

    return res.json(updatedContact);
};
