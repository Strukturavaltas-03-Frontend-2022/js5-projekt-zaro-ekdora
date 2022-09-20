import { openModal } from './modal-handler.js';
import { removeUser } from './user-handler.js';

const tableRows = document.querySelector('.table-rows');

const createUserRow = (user) => {
    const userRow = document.createElement('div');
    userRow.classList.add('table-row', 'flex', 'justify-between', 'w-full');
    userRow.id = user.id;

    const userName = document.createElement('div');
    userName.classList.add('table-cell');
    userName.innerHTML = user.name;
    userRow.appendChild(userName);

    const userEmail = document.createElement('div');
    userEmail.classList.add('table-cell');
    userEmail.innerHTML = user.email;
    userRow.appendChild(userEmail);

    const userAddress = document.createElement('div');
    userAddress.classList.add('table-cell');
    userAddress.innerHTML = user.address;
    userRow.appendChild(userAddress);

    const cellActions = document.createElement('div');
    cellActions.classList.add('table-cell-actions', 'flex', 'justify-center');

    const iconWrapper = document.createElement('div');
    iconWrapper.classList.add('flex', 'justify-evenly', 'w-full');

    const modifyIcon = document.createElement('img');
    modifyIcon.classList.add('cell-action');
    modifyIcon.src = 'assets/images/pencil.svg';
    modifyIcon.alt = 'modify';
    modifyIcon.onclick = () => openModal(user);
    iconWrapper.appendChild(modifyIcon);

    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('cell-action');
    deleteIcon.src = 'assets/images/delete.svg';
    deleteIcon.alt = 'delete';
    deleteIcon.onclick = () => removeUser(user.id);
    iconWrapper.appendChild(deleteIcon);

    cellActions.appendChild(iconWrapper);
    userRow.appendChild(cellActions);
    tableRows.appendChild(userRow);
};

export { createUserRow };