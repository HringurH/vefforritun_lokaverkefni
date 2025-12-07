const createPet = (event) => {
    event.preventDefault();

    const messageElement = document.querySelector('#message');
    messageElement.textContent = '';

    // Get the pet name from the input
    const petName = document.querySelector('#pet-name').value.trim();
    
    // Get the selected breed from the radio buttons
    const selectedBreed = document.querySelector('input[name="breed"]:checked');
    
    if (!selectedBreed) {
        messageElement.textContent = 'Please select a breed for your pet.';
        return;
    }
    
    const petBreed = selectedBreed.value;

    // Get the current logged-in user
    const currentUserJSON = localStorage.getItem('currentUser');
    if (!currentUserJSON) {
        messageElement.textContent = 'No user logged in.';
        return;
    }
    
    const currentUser = JSON.parse(currentUserJSON);
    
    // Update the current user's pet information
    currentUser.petName = petName;
    currentUser.petBreed = petBreed;
    
    // Save the updated current user
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Also update the user in the users array
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

// Attach the event listener to the form
const creationForm = document.querySelector('#creation-form');
if (creationForm) {
    creationForm.addEventListener('submit', createPet);
}