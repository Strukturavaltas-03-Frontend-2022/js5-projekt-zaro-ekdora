import { getFormEntries, openModal, hideModal } from './modal-handler.js';
import { postUser, putUser } from './backend.js';
import { handleUserChange, removeUser } from './user-handler.js';

const tableRows = document.querySelector('.table-rows');
const modalFormPlaceholder = document.querySelector('.modal__form-placeholder');
const modalFooterPlaceholder = document.querySelector('.modal__footer-placeholder');

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

const createForm = (user = null) => {
    const form = document.createElement('form');
    form.classList.add('modal__form', 'flex', 'flex-col', 'items-center', 'gap-4');
    form.name = 'userForm'

    if (user) {
        const userId = document.createElement('input');
        userId.type = 'hidden';
        userId.name = 'id';
        userId.value = user.id;
        form.appendChild(userId);
    }

    const name = document.createElement('input');
    name.classList.add('form__input_name', 'form__input');
    name.type = 'text';
    name.placeholder = 'Name';
    name.name = 'name';
    name.value = user ? user.name : null;

    const email = document.createElement('input');
    email.classList.add('form__input_email', 'form__input');
    email.type = 'text';
    email.placeholder = 'E-Mail';
    email.name = 'email';
    email.value = user ? user.email : null;

    const address = document.createElement('input');
    address.classList.add('form__input_address', 'form__input');
    address.type = 'text';
    address.placeholder = 'Address';
    address.name = 'address';
    address.value = user ? user.address : null;

    form.appendChild(name);
    form.appendChild(email);
    form.appendChild(address);

    modalFormPlaceholder.appendChild(form);
};

const createModalFooter = () => {
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal__footer', 'flex', 'justify-end');

    const cancelFormBtn = document.createElement('button');
    cancelFormBtn.classList.add('cancel-btn', 'modal-btn');
    cancelFormBtn.innerHTML = 'Cancel';
    cancelFormBtn.onclick = () => hideModal();

    const submitFormBtn = document.createElement('button');
    submitFormBtn.classList.add('submit-btn', 'modal-btn');
    submitFormBtn.innerHTML = 'Submit';
    submitFormBtn.type = 'submit';
    submitFormBtn.onclick = () => {
        const formEntries = getFormEntries();
        const userPromise = formEntries.id ? putUser(formEntries) : postUser(formEntries);
        userPromise.then(user => {
            const { id } = user;
            handleUserChange({ ...formEntries, id }, !formEntries.id);
            hideModal();
        });
    };

    modalFooter.appendChild(cancelFormBtn);
    modalFooter.appendChild(submitFormBtn);
    modalFooterPlaceholder.appendChild(modalFooter);
};

export { createUserRow, createForm, createModalFooter };