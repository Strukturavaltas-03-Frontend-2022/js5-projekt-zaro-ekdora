import { createUser, modifyUser } from './user-handler.js';
import { formError, setFormHints, setSubmitBtn } from './error-handler.js';

const addUser = document.querySelector('.header-action-icon');
const modal = document.querySelector('.table__modal');
const modalTitle = document.querySelector('.modal__title');
const closeModalX = document.querySelector('.modal__close-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const submitBtn = document.querySelector('.submit-btn');
const idInput = document.querySelector('.form__input_id');
const nameInput = document.querySelector('.form__input_name');
const emailInput = document.querySelector('.form__input_email');
const addressInput = document.querySelector('.form__input_address');

addUser.addEventListener('click', () => openModal());
cancelBtn.addEventListener('click', () => hideModal());
submitBtn.addEventListener('click', () => {
    const formEntries = getFormEntries();
    formEntries.id ? modifyUser(formEntries) : createUser(formEntries);
});

const openModal = (user = null) => {
    fillForm(user);
    if(!user) {
        modalTitle.innerHTML = 'CREATE USER';
        Object.keys(formError).forEach(formErrorKey => formError[formErrorKey] = true);
        setSubmitBtn();
    } else {
        modalTitle.innerHTML = 'MODIFY USER';
    }
    showModal();
};

const fillForm = (user) => {
    idInput.value = user?.id || '';
    nameInput.value = user?.name || '';
    emailInput.value = user?.email || '';
    addressInput.value = user?.address || '';
}

const getFormEntries = () => {
    const formData = new FormData(document.userForm);
    const formEntries = {};
    for (const entry of formData.entries()) {
        const key = entry[0];
        const value = entry[1].trim();
        if (key !== 'id' || (key === 'id' && value)) {
            formEntries[key] = value;
        }
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
    Object.keys(formError).forEach(formErrorKey => formError[formErrorKey] = false);
    setFormHints();
};

closeModalX.onclick = hideModal;

window.onresize = hideModal;

export { openModal, hideModal };