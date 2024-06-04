document.addEventListener('DOMContentLoaded', () => {
    const crosswordContainer = document.getElementById('crosswordContainer');
    const cluesList = document.getElementById('cluesList');
    const checkButton = document.getElementById('checkButton');
    const feedback = document.getElementById('feedback');

    const crossword = [
        { word: 'JAVASCRIPT', clue: 'Linguagem de programação usada no desenvolvimento web', direction: 'across', row: 0, col: 0 },
        { word: 'HTML', clue: 'Linguagem de marcação para criar páginas web', direction: 'down', row: 0, col: 0 },
        { word: 'CSS', clue: 'Linguagem de estilo para páginas web', direction: 'down', row: 0, col: 4 },
        { word: 'REACT', clue: 'Biblioteca JavaScript para construir interfaces de usuário', direction: 'across', row: 2, col: 2 },
        { word: 'NODE', clue: 'Ambiente de execução JavaScript server-side', direction: 'down', row: 1, col: 8 },
    ];

    const gridSize = 10;
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

    crossword.forEach(entry => {
        const { word, direction, row, col } = entry;
        if (direction === 'across') {
            for (let i = 0; i < word.length; i++) {
                grid[row][col + i] = word[i];
            }
        } else if (direction === 'down') {
            for (let i = 0; i < word.length; i++) {
                grid[row + i][col] = word[i];
            }
        }
    });

    function createGrid() {
        crosswordContainer.innerHTML = '';
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement('input');
                cell.type = 'text';
                cell.maxLength = '1';
                cell.className = 'crosswordCell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                if (grid[row][col] === '') {
                    cell.disabled = true;
                }
                crosswordContainer.appendChild(cell);
            }
        }
    }

    function displayClues() {
        cluesList.innerHTML = '';
        crossword.forEach((entry, index) => {
            const clueItem = document.createElement('li');
            clueItem.textContent = `${index + 1}. ${entry.clue} (${entry.direction})`;
            cluesList.appendChild(clueItem);
        });
    }

    function checkAnswers() {
        const cells = document.querySelectorAll('.crosswordCell');
        let correct = true;
        cells.forEach(cell => {
            const row = cell.dataset.row;
            const col = cell.dataset.col;
            if (grid[row][col] !== '' && grid[row][col] !== cell.value.toUpperCase()) {
                correct = false;
                cell.style.backgroundColor = 'red';
            } else {
                cell.style.backgroundColor = 'lightgreen';
            }
        });

        feedback.textContent = correct ? 'Parabéns! Você acertou todas as palavras!' : 'Algumas palavras estão incorretas. Tente novamente!';
    }

    checkButton.addEventListener('click', checkAnswers);

    createGrid();
    displayClues();
});
