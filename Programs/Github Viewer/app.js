document.getElementById('searchButton').addEventListener('click', fetchRepos);

async function fetchRepos() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert('Por favor, insira um nome de usuário válido.');
        return;
    }

    const url = `https://api.github.com/users/${username}/repos`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Usuário não encontrado');
        }
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        alert('Erro ao buscar repositórios: ' + error.message);
    }
}

function displayRepos(repos) {
    const repoList = document.getElementById('repoList');
    repoList.innerHTML = '';

    if (repos.length === 0) {
        repoList.innerHTML = '<li>O usuário não possui repositórios públicos.</li>';
        return;
    }

    repos.forEach(repo => {
        const repoItem = document.createElement('li');
        repoItem.classList.add('repo');

        const repoLink = document.createElement('a');
        repoLink.href = repo.html_url;
        repoLink.textContent = repo.name;
        repoLink.target = '_blank';

        repoItem.appendChild(repoLink);
        repoList.appendChild(repoItem);
    });
}
