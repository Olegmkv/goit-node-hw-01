import fs from "fs/promises"
import path from "path"
import { nanoid } from 'nanoid'

const contactsPath = path.resolve("db", "contacts.json");

// Повертає масив контактів.
export async function listContacts() {
    const data = await fs.readFile(contactsPath, "utf-8")
    return JSON.parse(data);
}

// Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
export async function getContactById(contactId) {
    const data = await listContacts();
    const index = data.findIndex(element => element.id === contactId);
    if (index === -1) {
        return null;
    };
    return data[index];
}

// Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export async function removeContact(contactId) {
    const data = await listContacts();
    const index = data.findIndex(element => element.id === contactId);
    if (index === -1) {
        return null;
    };
    const [obj] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return obj;
}

// Повертає об'єкт доданого контакту. 
export async function addContact(name, email, phone) {
    const data = await listContacts();
    const objAdd = {
        id: nanoid(),
        name,
        email,
        phone
    };
    data.push(objAdd);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return objAdd;
}
