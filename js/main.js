import { getUsers } from './backend.js';
import { createUserRow } from './template-builder.js';

getUsers().then(users => users.forEach(user => createUserRow(user)));