import { createForm, createModalFooter } from './template-builder.js';

const modal = document.querySelector('.table__modal');
const closeModalX = document.querySelector('.modal__close-btn');
const addUser = document.querySelector('.header-action-icon');

addUser.addEventListener('click', () => openModal());

const openModal = (user = null) => {
    const modalForm = document.querySelector('.modal__form');
    const modalFooter = document.querySelector('.modal__footer');
    if (modalForm) {
        modalForm.remove();
        modalFooter.remove();
    }
    createForm(user);
    createModalFooter();
    showModal();
};

const getFormEntries = () => {
    const formData = new FormData(document.userForm);
    const formEntries = {};
    for (const entry of formData.entries()) {
        formEntries[entry[0]] = entry[1];
    };

    return formEntries;
};

const showModal = function () {
    modal.classList.remove("hidden-transition");
    modal.classList.add("visible-transition");
};

const hideModal = function () {
    modal.classList.remove("visible-transition");
    modal.classList.add("hidden-transition");
};

closeModalX.onclick = hideModal;

window.onclick = function (event) {
    if (event.target == modal) {
        hideModal();
    }
};

window.onresize = hideModal;

export { getFormEntries, openModal, hideModal };