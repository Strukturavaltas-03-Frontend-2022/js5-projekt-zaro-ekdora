const BE_URL = 'http://localhost:3000/users/';

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

export {
    getUsers,
    postUser,
    putUser,
    deleteUser
}