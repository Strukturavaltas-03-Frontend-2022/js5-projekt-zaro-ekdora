const tableRows = document.querySelector('.table-rows');
let users = [];

/* 
<div class="table-row flex justify-between w-full">
    <div class="table-cell">
        Germain Brunelleschi
    </div>
    <div class="table-cell">
        gbrunelleschi2h@craigslist.org
    </div>
    <div class="table-cell">
        37 Atwood Drive
    </div>
    <div class="table-cell-actions flex justify-center">
        <div class="flex justify-evenly w-full">
            <img class="cell-action" src="assets/images/pencil.svg" alt="modify">
            <img class="cell-action" src="assets/images/delete.svg" alt="delete">
        </div>
    </div>
</div>
*/

const createUserRows = (user) => {
    const userRow = document.createElement('div');
    userRow.classList.add('table-row', 'flex', 'justify-between', 'w-full');

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
    modifyIcon.onclick = () => '';
    iconWrapper.appendChild(modifyIcon);

    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('cell-action');
    deleteIcon.src = 'assets/images/delete.svg';
    deleteIcon.alt = 'delete';
    deleteIcon.onclick = () => '';
    iconWrapper.appendChild(deleteIcon);

    cellActions.appendChild(iconWrapper);
    userRow.appendChild(cellActions);
    tableRows.appendChild(userRow);
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

request('./json/users.json').then((data) => {
    users = data.users;
    users.forEach(user => {
        createUserRows(user);
    });
});