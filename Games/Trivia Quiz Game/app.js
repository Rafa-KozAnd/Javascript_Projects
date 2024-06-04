document.getElementById('nextButton').addEventListener('click', getNextQuestion);

let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestions() {
    const url = 'https://opentdb.com/api.php?amount=10&type=multiple';
    try {
        const response = await fetch(url);
        const data = await response.json();
        questions = data.results;
        displayQuestion();
    } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
    }
}

function displayQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('nextButton');

    if (currentQuestionIndex >= questions.length) {
        questionContainer.innerHTML = '<p>Fim do quiz! Obrigado por jogar.</p>';
        nextButton.style.display = 'none';
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;
    answersElement.innerHTML = '';

    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    allAnswers.sort(() => Math.random() - 0.5);

    allAnswers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.addEventListener('click', () => checkAnswer(answer, currentQuestion.correct_answer));
        answersElement.appendChild(li);
    });

    nextButton.disabled = true;
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const answersElement = document.getElementById('answers');
    const nextButton = document.getElementById('nextButton');

    if (selectedAnswer === correctAnswer) {
        alert('Resposta correta!');
    } else {
        alert(`Resposta incorreta! A resposta correta é: ${correctAnswer}`);
    }

    answersElement.querySelectorAll('li').forEach(li => {
        li.style.pointerEvents = 'none';
    });

    nextButton.disabled = false;
}

function getNextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

fetchQuestions();
