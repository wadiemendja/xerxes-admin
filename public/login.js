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
loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const passwordInput = document.querySelector('.password').value;
    const userDetails = await fetchUser("admin");
    if (userDetails.length == 0) {
        console.log('false username');
        return;
    }
    const username = userDetails[0].username;
    const password = userDetails[0].password;
    if (passwordInput == password && username == "admin") location.href = "/";
    else console.log(username , password, passwordInput)

});