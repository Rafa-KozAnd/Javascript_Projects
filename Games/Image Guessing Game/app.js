document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('guessButton').addEventListener('click', checkGuess);

let currentImageDescription = '';
let currentImageUrl = '';

async function startGame() {
    const apiKey = 'YOUR_UNSPLASH_API_KEY';
    const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=nature`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        currentImageDescription = data.alt_description || 'Descrição não disponível';
        currentImageUrl = data.urls.regular;

        displayImage();
    } catch (error) {
        console.error('Erro ao buscar imagem:', error);
    }
}

function displayImage() {
    const gameContainer = document.getElementById('gameContainer');
    const descriptionElement = document.getElementById('description');
    const imageElement = document.getElementById('image');
    const feedbackElement = document.getElementById('feedback');
    const guessInput = document.getElementById('guessInput');

    gameContainer.style.display = 'block';
    descriptionElement.textContent = currentImageDescription;
    imageElement.src = currentImageUrl;
    feedbackElement.textContent = '';
    guessInput.value = '';
}

function checkGuess() {
    const guessInput = document.getElementById('guessInput').value.trim().toLowerCase();
    const feedbackElement = document.getElementById('feedback');

    if (guessInput === '') {
        feedbackElement.textContent = 'Por favor, digite sua adivinhação.';
        return;
    }

    if (guessInput.includes(currentImageDescription.toLowerCase())) {
        feedbackElement.textContent = 'Correto! Você adivinhou!';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = 'Incorreto! Tente novamente.';
        feedbackElement.style.color = 'red';
    }
}
