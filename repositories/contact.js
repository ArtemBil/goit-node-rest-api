import Contact from "../entities/contacts.js";

class ContactRepository {
    getAllContacts = async (userId) => {
        return await Contact.findAll({where: {owner: userId}});
    }

    getContactById = async (id, userId) => {
        return await Contact.findOne({
            where: {
                id,
                owner: userId
            }
        });
    }

    addContact = async (payload) => {
        return Contact.create(payload, {returning: true});
    }

    updateContact = async (id, userId, payload) => {
        return Contact.update({
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
        }, {where: {id, owner: userId}, returning: true});
    }

    removeContact = async (id, userId) => {
        return Contact.destroy({where: {id, owner: userId}});
    }

    updateStatusContact = async (id, userId, payload) => {
        return Contact.update({
            favorite: payload.favorite,
        }, {where: {id, owner: userId}, returning: true});
    }
}

export default new ContactRepository();