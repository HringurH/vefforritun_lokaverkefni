let petStats = {
    happiness: 100,
    hunger: 100,
    energy: 100
};

const initDashboard = () => {
    const currentUserJSON = localStorage.getItem('currentUser');
    
    if (!currentUserJSON) {
        window.location.href = 'login.html';
        return;
    }
    
    const currentUser = JSON.parse(currentUserJSON);
    
    if (!currentUser.petName || !currentUser.petBreed) {
        window.location.href = 'create-pet.html';
        return;
    }
    
    const petNameElement = document.querySelector('#pet-name');
    if (petNameElement) {
        petNameElement.textContent = currentUser.petName;
    }

    const imageId = currentUser.petBreed;
    if (imageId) {
        const imageElement = document.querySelector(`#${imageId}`);
        if (imageElement) {
            imageElement.classList.remove('hidden');
        }
    }
    
    if (currentUser.petStats) {
        petStats = currentUser.petStats;
    } else {
        currentUser.petStats = petStats;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    updateStatsDisplay();

    startStatDecay();
};

const updateStatsDisplay = () => {
    updateStatBar('happiness', petStats.happiness);
    updateStatBar('hunger', petStats.hunger);
    updateStatBar('energy', petStats.energy);
};

const updateStatBar = (statName, value) => {
    value = Math.max(0, Math.min(100, value));
    
    const fillElement = document.querySelector(`#${statName}-fill`);
    const valueElement = document.querySelector(`#${statName}-value`);
    
    if (fillElement) {
        fillElement.style.width = `${value}%`;
        if (value < 30) {
            fillElement.classList.add('low');
        } else {
            fillElement.classList.remove('low');
        }
    }
    
    if (valueElement) {
        valueElement.textContent = Math.round(value);
    }
};

const saveStats = () => {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (currentUserJSON) {
        const currentUser = JSON.parse(currentUserJSON);
        currentUser.petStats = petStats;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        const usersJSON = localStorage.getItem('users');
        const users = usersJSON ? JSON.parse(usersJSON) : [];
        const userIndex = users.findIndex(user => user.username === currentUser.username);
        
        if (userIndex !== -1) {
            users[userIndex].petStats = petStats;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
};

const startStatDecay = () => {
    setInterval(() => {
        petStats.happiness = Math.max(0, petStats.happiness - 0.5);
        petStats.hunger = Math.max(0, petStats.hunger - 0.8);
        petStats.energy = Math.max(0, petStats.energy - 0.6);
        
        updateStatsDisplay();
        saveStats();
    }, 500);
};

const playWithPet = () => {
    petStats.happiness = Math.min(100, petStats.happiness + 15);
    petStats.energy = Math.max(0, petStats.energy - 10);
    
    updateStatsDisplay();
    saveStats();

    showFeedback('You played with your pet! Happiness +15, Energy -10');
};

const feedPet = () => {
    petStats.hunger = Math.min(100, petStats.hunger + 20);
    petStats.energy = Math.min(100, petStats.energy + 5);
    
    updateStatsDisplay();
    saveStats();
    
    showFeedback('You fed your pet! Hunger +20, Energy +5');
};

const letPetSleep = () => {
    petStats.energy = Math.min(100, petStats.energy + 25);
    petStats.hunger = Math.max(0, petStats.hunger - 5);
    
    updateStatsDisplay();
    saveStats();
    
    showFeedback('Your pet is sleeping! Energy +25, Hunger -5');
};

const showFeedback = (message) => {
    let feedbackElement = document.querySelector('#action-feedback');
    
    if (!feedbackElement) {
        feedbackElement = document.createElement('div');
        feedbackElement.id = 'action-feedback';
        feedbackElement.style.cssText = `
            margin-top: 1rem;
            padding: 0.75rem 1.25rem;
            background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(251, 146, 60, 0.1));
            border: 2px solid #fb923c;
            border-radius: 0.75rem;
            color: #ea580c;
            font-weight: 600;
            font-size: 0.9rem;
            text-align: center;
            opacity: 0;
            transition: opacity 300ms ease-out;
        `;
        
        const actionButtons = document.querySelector('#action-buttons');
        if (actionButtons) {
            actionButtons.parentNode.insertBefore(feedbackElement, actionButtons.nextSibling);
        }
    }
    
    feedbackElement.textContent = message;
    feedbackElement.style.opacity = '1';
    
    setTimeout(() => {
        feedbackElement.style.opacity = '0';
    }, 2500);
};

const attachEventListeners = () => {
    const playBtn = document.querySelector('#play-btn');
    const feedBtn = document.querySelector('#feed-btn');
    const sleepBtn = document.querySelector('#sleep-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', playWithPet);
    }
    
    if (feedBtn) {
        feedBtn.addEventListener('click', feedPet);
    }
    
    if (sleepBtn) {
        sleepBtn.addEventListener('click', letPetSleep);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    attachEventListeners();
});
