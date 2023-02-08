import { renderHeader, renderFooter } from "./render.js";
// rendering header and footer
const header = document.getElementById('header');
const footer = document.getElementById('footer');
header.innerHTML = renderHeader();
// disabling search bar on this page
document.getElementById('searchBtn').disabled = true;
document.getElementById('searchInput').disabled = true;
// rendering users
const usersDom = document.getElementById('users');
document.getElementById('title').innerText = "Admin";
const users = await fetchUsers();
for (let i in users) {
    const user = users[i];
    usersDom.innerHTML += `
    <div class="user">
        <h3>${user.username} :</h3>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Username</span>
            <input type="text" class="form-control" placeholder="Username"
                aria-describedby="basic-addon1" value="${user.username}" disabled>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Mot de passe</span>
            <input type="text" class="form-control password" placeholder="Password"
                aria-describedby="basic-addon1" value="${user.password}">
        </div>
        <button class="btn btn-primary edit-password-btn" data-id="${user.id}">Modifier le mot de passe d'utilisateur</button>
        <button class="btn btn-danger" disabled>Supprimer l'utilisateur</button>
    </div>
    `;
}
// edit password button click
const editPassBtns = document.querySelectorAll('.edit-password-btn');
editPassBtns.forEach(btn => {
    btn.addEventListener('click', async (event) => {
        const userId = btn.dataset.id;
        const newPassword = btn.parentNode.querySelector('.password').value;
        await editUserPassword(userId, newPassword);
        alert ('Le mot de passe a été modifié avec succès');
        location.reload();
    });
})
// get users function
async function fetchUsers() {
    const fetcher = await fetch('/api/get-users');
    const requests = await fetcher.json();
    return requests;
}
// edit user password
async function editUserPassword(userId, newPassword) {
    const fetcher = await fetch('/api/edit-user-password', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userId, newPassword: newPassword })
    });
    const result = await fetcher.json();
    return result;
}
