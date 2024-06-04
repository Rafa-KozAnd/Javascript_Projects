document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) return;

    displayMessage(userInput, 'user');
    document.getElementById('userInput').value = '';

    fetch('https://dialogflow.googleapis.com/v2/projects/YOUR_PROJECT_ID/agent/sessions/YOUR_SESSION_ID:detectIntent', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            queryInput: {
                text: {
                    text: userInput,
                    languageCode: 'pt-BR',
                }
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.queryResult.fulfillmentText;
        displayMessage(botResponse, 'bot');
    })
    .catch(error => {
        console.error('Erro ao conectar com Dialogflow:', error);
        displayMessage('Desculpe, houve um erro ao processar sua mensagem.', 'bot');
    });
}

function displayMessage(message, sender) {
    const chatLog = document.getElementById('chatLog');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}
