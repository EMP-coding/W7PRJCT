

/*IF SCRIPT IS DEFERED DOMContentLoaded NOT NEEDED!! */

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.querySelector('.loadingFlag').style.display = 'block'; 
    document.querySelector('.loadingCoatOfArms').style.display = 'block'; 
    document.getElementById('countryFlag').style.display = 'none'; 
    document.getElementById('countryCoatOfArms').style.display = 'none'; 
    const countryNameInput = document.getElementById('main-search').value.trim();
    if (!countryNameInput) {
        alert('Please enter a country name.');
        return;
    }
    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryNameInput)}?fullText=true`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('No data found');
        }
            const countryData = data[0];
            document.getElementById('displayWindow').classList.remove('d-none');
            document.getElementById('countryName').textContent = countryData.name.common;
            const flagImage = document.getElementById('countryFlag');

        flagImage.onload = () => {
            document.querySelector('.loadingFlag').style.display = 'none';
            flagImage.style.display = 'block'; 
        };
        flagImage.src = countryData.flags.png;
        flagImage.alt = `Flag of ${countryNameInput}`;

        const coatOfArmsImage = document.getElementById('countryCoatOfArms');
        if (countryData.coatOfArms && countryData.coatOfArms.png) {
            coatOfArmsImage.onload = () => {
                document.querySelector('.loadingCoatOfArms').style.display = 'none';
                coatOfArmsImage.style.display = 'block'; 
            };
            coatOfArmsImage.src = countryData.coatOfArms.png;
            coatOfArmsImage.alt = `Coat of arms of ${countryNameInput}`;
        } else {
            // if none display none 
            document.querySelector('.loadingCoatOfArms').style.display = 'none';
            coatOfArmsImage.style.display = 'none';
        }
            const currency = Object.values(countryData.currencies)[0];
            document.getElementById('currency').textContent = `💵💲Currency: ${currency.name} (${currency.symbol})`;
            document.getElementById('capital').textContent = `🏛Capital: ${countryData.capital.join(', ')}`;
            const languages = Object.values(countryData.languages).join(", ");
            document.getElementById('languages').textContent = `🗣Languages: ${languages}`;

            document.getElementById('displayWindow').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Could not find country '${countryNameInput}' check spelling and try again.`);
        });
});

    let countryNames = [];

    // Fetch all country names
fetch('https://restcountries.com/v3.1/all')
.then(response => response.json())
.then(data => {
    const countryNames = data.map(country => country.name.common.toLowerCase()); 
    document.getElementById('main-search').addEventListener('input', function() {
        const userInput = this.value.trim().toLowerCase(); 
        const isExactMatch = countryNames.includes(userInput); 
        document.getElementById('foundMatch').style.display = isExactMatch ? 'inline-block' : 'none';
        });
    })
    .catch(error => console.error('Could not retrieve country names', error));




