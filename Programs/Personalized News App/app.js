document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('search').value;
    if (query) {
        fetchNews(query);
    }
});

async function fetchNews(query) {
    const apiKey = 'YOUR_NEWSAPI_KEY';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
        return;
    }

    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');

        const title = document.createElement('h2');
        title.textContent = article.title;
        newsItem.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        newsItem.appendChild(description);

        if (article.url) {
            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = 'Leia mais';
            link.target = '_blank';
            newsItem.appendChild(link);
        }

        newsContainer.appendChild(newsItem);
    });
}
