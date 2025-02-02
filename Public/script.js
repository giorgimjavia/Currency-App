const input = document.getElementById('input');
const select = document.querySelector('.gelCurrency');
const button = document.querySelector('.button');
const resultDisplay = document.querySelector('.resultDisplay');



const conversionRates = {
    usd: 0.35,
    euro: 0.34,
    gbp: 0.29
};


function calc() {
    const inputValue = Number(input.value);
    const selectedCurrency = select.value;

  
    if (isNaN(inputValue) || inputValue <= 0) {
        resultDisplay.textContent = 'Please enter a valid GEL amount';
        return;
    }

    let convertedValue;

 
    if (conversionRates[selectedCurrency]) {
        convertedValue = inputValue * conversionRates[selectedCurrency];
    } else {
        resultDisplay.textContent = 'Please select a currency to convert to.';
        return;
    }

   
    resultDisplay.textContent = `${convertedValue.toFixed(2)} ${selectedCurrency.toUpperCase()}`;


    fetch('http://localhost:5000/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            GELAmount: inputValue,
            USD: selectedCurrency === 'usd' ? convertedValue : 0,
            EURO: selectedCurrency === 'euro' ? convertedValue : 0,
            GBP: selectedCurrency === 'gbp' ? convertedValue : 0,
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data saved:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    input.value = '';
}

fetchData();

async function fetchData() {
    try {
    
         const response = await fetch(`https://v6.exchangerate-api.com/v6/859c7ac0e6775050abd56fac/latest/GEL`)
        if(!response.ok) {
            throw new Error('could not fetch data')
        }

        const data = await response.json();

        const fetchUSD = data.conversion_rates.USD;
        const fetchGBP = data.conversion_rates.GBP;
        const fetchEUR = data.conversion_rates.EUR;

        const resultUSD = document.querySelector('.fetch-usd');
        const resultGBP = document.querySelector('.fetch-gbp');
        const resultEUR = document.querySelector('.fetch-euro');

        resultUSD.textContent = fetchUSD;
        resultGBP.textContent = fetchGBP;
        resultEUR.textContent = fetchEUR;

    }

    catch (err) {
        console.log(err);
    }
    
}

document.querySelectorAll('.faq-card h3').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling; 
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});




button.addEventListener('click', calc);
