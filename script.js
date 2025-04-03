let savedPets = JSON.parse(localStorage.getItem('pets') || '[]');
let selectedPet = null;

function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
  document.getElementById(screenId).classList.remove('hidden');
}

document.getElementById('pet-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const petName = document.getElementById('pet-name').value;
  const petType = document.getElementById('pet-type').value;
  alert(`Pet Profile Created: ${petName} (${petType})`);
  navigateTo('symptoms');
});

function consultAI() {
  navigateTo('consultation');
}

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const chatbox = document.getElementById('chatbox');

  if (userInput.value.trim() === '') return;

  // Display user message
  const userMessage = document.createElement('div');
  userMessage.className = 'message user-message';
  userMessage.textContent = userInput.value;
  chatbox.appendChild(userMessage);

  // Simulate AI response
  setTimeout(() => {
    const aiMessage = document.createElement('div');
    aiMessage.className = 'message ai-message';
    aiMessage.textContent = getAIResponse(userInput.value);
    chatbox.appendChild(aiMessage);
    chatbox.scrollTop = chatbox.scrollHeight;
  }, 1000);

  userInput.value = '';
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function getAIResponse(input) {
  const responses = [
    "It sounds like your pet may need rest and hydration.",
    "I recommend consulting a vet for a detailed diagnosis.",
    "Ensure your pet is eating well and monitor their behavior."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Navigate to Treatment Recommendations
document.getElementById('consultation').querySelector('button').onclick = function () {
  const recommendations = ['Rest and hydration', 'Monitor behavior', 'Consult a vet'];
  const list = document.getElementById('recommendations-list');
  list.innerHTML = '';
  recommendations.forEach(rec => {
    const li = document.createElement('li');
    li.textContent = rec;
    list.appendChild(li);
  });
  navigateTo('treatment');
};

// ...existing code...

// Add this at the beginning of the file
document.addEventListener('DOMContentLoaded', function() {
  // Set up navigation link event listeners
  document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          navigateTo(targetId);
      });
  });

  // Show home screen by default
  navigateTo('home');
  displaySavedPets();

});

// Update the existing navigateTo function
function navigateTo(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
      screen.classList.add('hidden');
  });
  
  // Show the target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
      targetScreen.classList.remove('hidden');
      // Update active navigation link
      document.querySelectorAll('.nav-links a').forEach(link => {
          if (link.getAttribute('href') === '#' + screenId) {
              link.classList.add('active');
          } else {
              link.classList.remove('active');
          }
      });
  }
}

// ...existing code...
function displaySavedPets() {
  const petsList = document.getElementById('pets-list');
  const noPetsMessage = document.getElementById('no-pets-message');
  
  if (savedPets.length === 0) {
      noPetsMessage.style.display = 'block';
      return;
  }
  
  noPetsMessage.style.display = 'none';
  petsList.innerHTML = savedPets.map(pet => `
      <div class="pet-card" data-pet-name="${pet.name}" onclick="selectPet('${pet.name}')">
          <h4>${pet.name}</h4>
          <p>${pet.type}</p>
      </div>
  `).join('');
}

function selectPet(petName) {
  document.querySelectorAll('.pet-card').forEach(card => {
      card.classList.remove('selected');
  });
  
  const petCard = document.querySelector(`[data-pet-name="${petName}"]`);
  if (petCard) {
      petCard.classList.add('selected');
      selectedPet = savedPets.find(pet => pet.name === petName);
  }
}

// Update the pet form submission handler
document.getElementById('pet-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const petName = document.getElementById('pet-name').value;
  const petType = document.getElementById('pet-type').value;
  
  // Save the new pet
  const newPet = { name: petName, type: petType };
  savedPets.push(newPet);
  localStorage.setItem('pets', JSON.stringify(savedPets));
  
  // Update display
  displaySavedPets();
  selectPet(petName);
  
  // Clear the form
  this.reset();
  
  alert(`Pet Profile Created: ${petName} (${petType})`);
  navigateTo('symptoms');
});
// Add this function for blog interactivity
function toggleBlog(id) {
  const blogContent = document.getElementById(`${id}-blog`);
  const button = event.target;
  
  if (blogContent.classList.contains('hidden')) {
      blogContent.classList.remove('hidden');
      button.textContent = 'Read Less';
  } else {
      blogContent.classList.add('hidden');
      button.textContent = 'Read More';
  }
}