export const contactsParser = (contacts?: string | { [k: string]: string | string[] }) => {
    if (!contacts) {
        return 'Not Found';
    }

    if (typeof contacts === 'string') {
        return contacts;
    }

    return Object.entries(contacts);
};
