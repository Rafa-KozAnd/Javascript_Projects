document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('guessButton').addEventListener('click', checkGuess);

let currentMovieDescription = '';
let currentMovieTitle = '';

async function startGame() {
    const apiKey = 'YOUR_TMDB_API_KEY';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const movie = data.results[Math.floor(Math.random() * data.results.length)];
        currentMovieTitle = movie.title;
        currentMovieDescription = movie.overview;

        displayMovieDescription();
    } catch (error) {
        console.error('Erro ao buscar dados do filme:', error);
    }
}

function displayMovieDescription() {
    const gameContainer = document.getElementById('gameContainer');
    const movieDescriptionElement = document.getElementById('movieDescription');
    const feedbackElement = document.getElementById('feedback');
    const guessInput = document.getElementById('guessInput');

    gameContainer.style.display = 'block';
    movieDescriptionElement.textContent = currentMovieDescription;
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

    if (currentMovieTitle.toLowerCase() === guessInput) {
        feedbackElement.textContent = `Correto! O filme é: ${currentMovieTitle}`;
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = 'Incorreto! Tente novamente.';
        feedbackElement.style.color = 'red';
    }
}
