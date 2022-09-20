import { deleteUser, postUser, putUser } from './backend.js';
import { createUserRow } from './template-builder.js';
import { hideModal } from './modal-handler.js';

const createUser = (user) => {
    postUser(user).then((user) => createUserRow(user));
    hideModal();
}

const modifyUser = (user) => {
    putUser(user).then((user) => {
        const userEl = document.getElementById(user.id);
        const userElCells = userEl.querySelectorAll('.table-cell');
        userElCells[0].innerHTML = user.name;
        userElCells[1].innerHTML = user.email;
        userElCells[2].innerHTML = user.address;
    });
    hideModal();
}

const removeUser = (userId) => {
    deleteUser(userId).then(() => {
        const user = document.getElementById(userId);
        user.remove();
    });
};

export { createUser, removeUser, modifyUser };