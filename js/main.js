const BE_URL = 'http://localhost:3000/users/';
const tableRows = document.querySelector('.table-rows');

const addUser = document.querySelector('.header-action-icon');

const modal = document.querySelector('.table__modal');
const closeModalX = document.querySelector('.modal__close-btn');
const modalFormPlaceholder = document.querySelector('.modal__form-placeholder');
const modalFooterPlaceholder = document.querySelector('.modal__footer-placeholder');

addUser.addEventListener('click', () => openForm());

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
    modifyIcon.onclick = () => openForm(user);
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

/*
<form class="flex flex-col items-center gap-4">
    <input type="hidden" name="id">
    <input type="text" name="name" placeholder="Name" class="form__input_name form__input">
    <input type="text" name="email" placeholder="E-mail" class="form__input_email form__input">
    <input type="text" name="address" placeholder="Address" class="form__input_address form__input">
</form>
*/

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
}

/*
<div class="modal__footer flex justify-end">
    <button class="cancel-btn modal-btn">Cancel</button>
    <button type="submit" class="submit-btn modal-btn">Submit</button>
</div>
*/

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
            handleUserRowChange({ ...formEntries, id }, !formEntries.id);
            hideModal();
        });
    };

    modalFooter.appendChild(cancelFormBtn);
    modalFooter.appendChild(submitFormBtn);
    modalFooterPlaceholder.appendChild(modalFooter);
}

const getFormEntries = () => {
    const formData = new FormData(document.userForm);
    const formEntries = {};
    for (const entry of formData.entries()) {
        formEntries[entry[0]] = entry[1];
    };

    return formEntries;
};

const openForm = (user = null) => {
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

async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};

const getUsers = () => request(`${BE_URL}`);
const postUser = (formEntries) => request(`${BE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formEntries),
});
const putUser = (formEntries) => request(`${BE_URL}${formEntries.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formEntries),
});
const deleteUser = (userId) => request(`${BE_URL}${userId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
});

getUsers().then(users => users.forEach(user => createUserRow(user)));

const handleUserRowChange = (user, isNewUser) => {
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

// Modal starts here
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