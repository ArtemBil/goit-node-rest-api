import Contact from "../entities/contacts.js";

class ContactRepository {
    getAllContacts = async () => {
        return await Contact.findAll();
    }

    getContactById = async (id) => {
        return await Contact.findByPk(id);
    }

    addContact = async (payload) => {
        return Contact.create(payload, {returning: true});
    }

    updateContact = async (id, payload) => {
        return Contact.update({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        }, {where: {id}, returning: true});
    }

    removeContact = async (id) => {
        return Contact.destroy({where: {id}});
    }

    updateStatusContact = async (id, payload) => {
        return Contact.update({
            favorite: payload.favorite,
        }, {where: {id}, returning: true});
    }
}

export default new ContactRepository();