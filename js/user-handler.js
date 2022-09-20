import { createUserRow } from './template-builder.js';
import { deleteUser } from './backend.js';

const handleUserChange = (user, isNewUser) => {
    if (isNewUser) {
        createUserRow(user);
    } else {
        const userEl = document.getElementById(user.id);
        const userElCells = userEl.querySelectorAll('.table-cell');
        userElCells[0].innerHTML = user.name;
        userElCells[1].innerHTML = user.email;
        userElCells[2].innerHTML = user.address;
    }
};

const removeUser = (userId) => {
    const user = document.getElementById(userId);
    user.remove();
    deleteUser(userId);
};

export { handleUserChange, removeUser };