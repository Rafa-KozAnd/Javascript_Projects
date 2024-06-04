document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_EXCHANGERATE_API_KEY';
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            populateSelects(currencies);
        })
        .catch(error => console.error('Erro ao buscar taxas de câmbio:', error));

    document.getElementById('convertButton').addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = document.getElementById('fromCurrency').value;
        const toCurrency = document.getElementById('toCurrency').value;

        if (isNaN(amount) || amount <= 0) {
            alert('Por favor, insira um valor válido.');
            return;
        }

        convertCurrency(amount, fromCurrency, toCurrency);
    });
});

function populateSelects(currencies) {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');

    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toSelect.appendChild(option2);
    });

    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
}

function convertCurrency(amount, fromCurrency, toCurrency) {
    const apiKey = 'YOUR_EXCHANGERATE_API_KEY';
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`;

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('result');
            result.textContent = `${amount} ${fromCurrency} = ${data.conversion_result} ${toCurrency}`;
        })
        .catch(error => console.error('Erro ao converter moeda:', error));
}
