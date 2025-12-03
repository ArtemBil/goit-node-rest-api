import HttpError from "./HttpError.js";

export function checkIfContactNotExist(contact, res) {
    if (!contact) {
        const error = HttpError(404);

        return res.status(error.status).json({ message: error.message });
    }
}