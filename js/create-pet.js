const createPet = (event) => {
    event.preventDefault();

    const messageElement = document.querySelector('#message');
    messageElement.textContent = '';

    const petName = document.querySelector('#pet-name').value.trim();
    
    const selectedBreed = document.querySelector('input[name="breed"]:checked');
    
    if (!selectedBreed) {
        messageElement.textContent = 'Please select a breed for your pet.';
        return;
    }
    
    const petBreed = selectedBreed.value;

    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
        messageElement.textContent = 'No user logged in.';
        return;
    }
    
    const currentUser = JSON.parse(currentUserJSON);
    
    currentUser.petName = petName;
    currentUser.petBreed = petBreed;
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    const usersJSON = localStorage.getItem('users');
    const users = usersJSON ? JSON.parse(usersJSON) : [];
    
    const userIndex = users.findIndex(user => user.username === currentUser.username);
    
    if (userIndex !== -1) {
        users[userIndex].petName = petName;
        users[userIndex].petBreed = petBreed;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    alert('Pet created successfully!');
    window.location.href = 'dashboard.html';
}

const creationForm = document.querySelector('#creation-form');
if (creationForm) {
    creationForm.addEventListener('submit', createPet);
}