document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('guessButton').addEventListener('click', checkGuess);

let currentLyricSnippet = '';
let currentTrack = '';

async function startGame() {
    const apiKey = 'YOUR_MUSIXMATCH_API_KEY';
    const url = `https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${apiKey}&chart_name=top&page=1&page_size=1&country=us&f_has_lyrics=1`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const track = data.message.body.track_list[0].track;
        currentTrack = track.track_name + ' - ' + track.artist_name;
        
        const lyricsUrl = `https://api.musixmatch.com/ws/1.1/track.snippet.get?apikey=${apiKey}&track_id=${track.track_id}`;
        const lyricsResponse = await fetch(lyricsUrl);
        const lyricsData = await lyricsResponse.json();
        currentLyricSnippet = lyricsData.message.body.snippet.snippet_body;

        displayLyricSnippet();
    } catch (error) {
        console.error('Erro ao buscar dados da música:', error);
    }
}

function displayLyricSnippet() {
    const gameContainer = document.getElementById('gameContainer');
    const lyricSnippetElement = document.getElementById('lyricSnippet');
    const feedbackElement = document.getElementById('feedback');
    const guessInput = document.getElementById('guessInput');

    gameContainer.style.display = 'block';
    lyricSnippetElement.textContent = `"${currentLyricSnippet}"`;
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

    if (currentTrack.toLowerCase().includes(guessInput)) {
        feedbackElement.textContent = `Correto! A música é: ${currentTrack}`;
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = 'Incorreto! Tente novamente.';
        feedbackElement.style.color = 'red';
    }
}
