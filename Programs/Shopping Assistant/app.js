document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('search').value;
    if (query) {
        searchAmazon(query);
        searchEbay(query);
    }
});

async function searchAmazon(query) {
    // Exemplo simplificado sem autenticação completa
    const amazonResults = [
        // Produtos fictícios
        {
            title: "Produto Amazon 1",
            price: "R$ 100,00",
            link: "https://www.amazon.com/dp/example1",
            image: "https://via.placeholder.com/100"
        },
        {
            title: "Produto Amazon 2",
            price: "R$ 150,00",
            link: "https://www.amazon.com/dp/example2",
            image: "https://via.placeholder.com/100"
        }
    ];
    displayResults(amazonResults, "Amazon");
}

async function searchEbay(query) {
    // Exemplo simplificado sem autenticação completa
    const ebayResults = [
        // Produtos fictícios
        {
            title: "Produto eBay 1",
            price: "R$ 90,00",
            link: "https://www.ebay.com/itm/example1",
            image: "https://via.placeholder.com/100"
        },
        {
            title: "Produto eBay 2",
            price: "R$ 140,00",
            link: "https://www.ebay.com/itm/example2",
            image: "https://via.placeholder.com/100"
        }
    ];
    displayResults(ebayResults, "eBay");
}

function displayResults(products, source) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML += `<h2>Resultados da ${source}</h2>`;

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        const title = document.createElement('h2');
        title.textContent = product.title;
        productDiv.appendChild(title);

        const price = document.createElement('p');
        price.textContent = product.price;
        productDiv.appendChild(price);

        const link = document.createElement('a');
        link.href = product.link;
        link.textContent = "Ver no site";
        link.target = "_blank";
        productDiv.appendChild(link);

        const image = document.createElement('img');
        image.src = product.image;
        productDiv.appendChild(image);

        resultsContainer.appendChild(productDiv);
    });
}
