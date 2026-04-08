document.getElementById('analyzeButton').addEventListener('click', analyzeSentiment);

async function analyzeSentiment() {
    const inputText = document.getElementById('inputText').value;
    if (!inputText.trim()) {
        alert('Por favor, insira um texto para análise.');
        return;
    }

    const apiKey = 'YOUR_TEXTRAZOR_API_KEY';
    const url = 'https://api.textrazor.com/';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-textrazor-key': apiKey
            },
            body: `text=${encodeURIComponent(inputText)}&extractors=entities,topics,words`
        });

        if (!response.ok) {
            throw new Error('Erro ao analisar o texto');
        }

        const data = await response.json();
        displaySentimentResult(data);
    } catch (error) {
        alert('Erro ao conectar com a API de Análise de Sentimentos: ' + error.message);
    }
}

function displaySentimentResult(data) {
    const sentimentResult = document.getElementById('sentimentResult');
    if (data.response.sentences[0].sentiment) {
        const sentimentScore = data.response.sentences[0].sentiment.score;
        let sentimentText = '';

        if (sentimentScore > 0) {
            sentimentText = 'Positivo';
            sentimentResult.style.color = 'green';
        } else if (sentimentScore < 0) {
            sentimentText = 'Negativo';
            sentimentResult.style.color = 'red';
        } else {
            sentimentText = 'Neutro';
            sentimentResult.style.color = 'gray';
        }

        sentimentResult.textContent = `Sentimento: ${sentimentText} (Score: ${sentimentScore})`;
    } else {
        sentimentResult.textContent = 'Não foi possível determinar o sentimento do texto.';
        sentimentResult.style.color = 'black';
    }
}
