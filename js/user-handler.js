import { deleteUser, getUser, postUser, putUser } from './backend.js';
import { createUserRow } from './template-builder.js';
import { openModal, hideModal } from './modal-handler.js';

let msgIntervalId = null;

const getUserById = (userId) => {
    getUser(userId).then((user) => {
        openModal(user);
    });
};

const createUser = (user) => {
    postUser(user).then((user) => {
        createUserRow(user);
        showMsg('User has been created successfully!');
    });
    hideModal();
}

const modifyUser = (user) => {
    putUser(user).then((user) => {
        const userEl = document.getElementById(user.id);
        const userElCells = userEl.querySelectorAll('.table-cell');
        userElCells[0].innerHTML = user.name.trim();
        userElCells[1].innerHTML = user.email.trim();
        userElCells[2].innerHTML = user.address.trim();
        showMsg('User has been modified successfully!');
    });
    hideModal();
}

const removeUser = (userId) => {
    deleteUser(userId).then(() => {
        const user = document.getElementById(userId);
        user.remove();
        showMsg('User has been deleted successfully!');
    });
};

const showMsg = (msg) => {
    const headerMsg = document.querySelector('.header-msg');
    headerMsg.innerHTML = msg;
    if (msgIntervalId) {
        clearInterval(msgIntervalId);
    }
    msgIntervalId = setTimeout(() => headerMsg.innerHTML = '', 5000);
};

export { createUser, getUserById, removeUser, modifyUser };