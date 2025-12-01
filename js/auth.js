const getUserData = () => {
    const usersJSON = localStorage.getItem('users');
    return usersJSON ? JSON.parse(usersJSON) : [];
}

const saveUserData = (users) => {
    const usersJSON = JSON.stringify(users);
    localStorage.setItem('users', usersJSON);
    return;
}

const registerUser = (event) => {
    event.preventDefault();

    const messageElement = document.querySelector('#message');
    messageElement.textContent = '';

    const username = document.querySelector('#register-username').value.trim();
    const password = document.querySelector('#register-password').value.trim();

    const users = getUserData();

    const userExists = users.some(user => user.username === username);

    if (userExists) {
        messageElement.textContent = 'Username already exists. Please choose another one.';
        return;
    }

    const newUser = {
        username: username,
        password: password
    };

    users.push(newUser);
    saveUserData(users);

    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
}

const loginUser = (event) => {
    event.preventDefault();

    const messageElement = document.querySelector('#message');
    messageElement.textContent = '';

    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    const users = getUserData();

    const userFound = users.find(user => user.username === username && user.password === password);

    if (userFound) {
        alert('Login successful! Welcome back, ' + username + '!');
        // Redirect to homepage or dashboard
    } else {
        messageElement.textContent = 'Invalid username or password. Please try again.';
    }
}

const registerForm = document.querySelector('#register-form');
const loginForm = document.querySelector('#login-form');

if (registerForm) {
    registerForm.addEventListener('submit', registerUser);
}

if (loginForm) {
    loginForm.addEventListener('submit', loginUser);
}