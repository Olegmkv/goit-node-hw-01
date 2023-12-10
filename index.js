import { Command } from 'commander'
import * as ContactService from "./contacts.js"
import { log } from 'console';

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const list = await ContactService.listContacts();
          console.table(list);
      break;

    case 'get':
          const get = await ContactService.getContactById(id);
          console.log(get);
      break;

    case 'add':
          const add = await ContactService.addContact(name, email, phone);
          console.log(add);
      break;

    case 'remove':
          const remove = await ContactService.removeContact(id);
          console.log(remove);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);


