import { postUser, putUser } from './backend.js';
import { handleUserChange } from './user-handler.js';

const modal = document.querySelector('.table__modal');
const closeModalX = document.querySelector('.modal__close-btn');
const addUser = document.querySelector('.header-action-icon');
const cancelBtn = document.querySelector('.cancel-btn');
const submitBtn = document.querySelector('.submit-btn');
const idInput = document.querySelector('.form__input_id');
const nameInput = document.querySelector('.form__input_name');
const emailInput = document.querySelector('.form__input_email');
const addressInput = document.querySelector('.form__input_address');

addUser.addEventListener('click', () => showModal());
cancelBtn.addEventListener('click', () => hideModal());
submitBtn.addEventListener('click', () => {
    const formEntries = getFormEntries();
    const userPromise = formEntries.id ? putUser(formEntries) : postUser(formEntries);
    userPromise.then(user => {
        handleUserChange(user, !formEntries.id);
        hideModal();
    });
});

const openModal = (user) => {
    fillForm(user);
    showModal();
};

const fillForm = (user) => {
    idInput.value = user.id;
    nameInput.value = user.name;
    emailInput.value = user.email;
    addressInput.value = user.address;
}

const getFormEntries = () => {
    const formData = new FormData(document.userForm);
    const formEntries = {};
    for (const entry of formData.entries()) {
        const key = entry[0];
        const value = entry[1];
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
};

closeModalX.onclick = hideModal;

window.onclick = function (event) {
    if (event.target == modal) {
        hideModal();
    }
};

window.onresize = hideModal;

export { openModal };