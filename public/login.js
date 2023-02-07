// fetch user by username
async function fetchUser(username) {
    const fetcher = await fetch('/api/get-user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username })
    });
    const result = await fetcher.json();
    return result;
}
// login btn
const loginBtn = document.querySelector('.loginBtn');
const alertMsg1 = document.querySelector('.msg-1');
alertMsg1.style.display = "none";
loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const usernameInput = document.querySelector('.username').value;
    const passwordInput = document.querySelector('.password').value;
    const userDetails = await fetchUser(usernameInput);
    if (userDetails.length == 0) {
        alertMsg1.style.display = '';
        alertMsg1.innerHTML = "Mauvais <b>usernmae<b>";
        return;
    }
    const username = userDetails[0].username;
    const password = userDetails[0].password;
    if (passwordInput == password && username == "admin") location.href = "/";
    else if (passwordInput == password) location.href = '/service.html?service=' + username.replace('Service', '');
    else {
        alertMsg1.style.display = '';
        alertMsg1.innerHTML = "Mauvais <b>mot de passe<b>";
    }
});

document.querySelectorAll('input').forEach(element => {
    console.log(element)
    element.addEventListener('input', ()=> {
        alertMsg1.style.display = 'none';
    })
})