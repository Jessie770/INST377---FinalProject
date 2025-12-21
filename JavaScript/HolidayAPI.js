let map;
let capitalMarker;

function holidayAPI() {
    fetch("https://date.nager.at/api/v3/AvailableCountries")
    .then((res) => res.json())
    .then(data => {
        console.log(data)
        const select = document.getElementById("country");

        data.forEach(country => {
            const option = document.createElement("option");
            option.value = country.countryCode;
            option.textContent = country.name;
            select.appendChild(option);
        })
    })
}

function loadHolidays() {
    const country = document.getElementById("country").value;
    const year = parseInt(document.getElementById("year").value);
    const tablebody = document.getElementById("holidayResults");

    tablebody.innerHTML = "";

    if (!country || !year) return;

    if (year < 1980 || year > 2075) {
        alert("Please enter a year between 1980 and 2075");
        return;
    }

    loadCountryInfo(country);

    results.classList.remove("hidden");
    results.classList.add("show"); 

    fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${country}`)
    .then(res => res.json())
    .then(data => {
        data.forEach(holiday => {
            const row = document.createElement("tr");
           
            const [year, month, day] = holiday.date.split("-");
            const monthName = new Date(0, month - 1).toLocaleString("en", { month: "long" });
            const date = `${monthName} ${day}`;
            
            row.innerHTML = `
                <td>${date}</td>
                <td>${holiday.localName}</td>
                <td>${holiday.name}</td>
                <td>${holiday.types.join(", ")}</td>
            `;

            tablebody.appendChild(row);
        })
    })
}

function loadCountryInfo(countryCode) {
    const language = document.getElementById("language");
    const currency = document.getElementById("currency");
    const capital = document.getElementById("capital");

    if (!language || !currency || !capital) return;

    language.textContent = "Loading country info...";
    currency.textContent = "";
    capital.textContent = "";

    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(res => {
            if (!res.ok) throw new Error("Country not found");
            return res.json();
        })
        .then(data => {
            const country = data[0];

            const languages = country.languages
                ? Object.values(country.languages).join(", ")
                : "Not available";

                const currencies = country.currencies
                ? Object.values(country.currencies)
                      .map(c => `${c.name} (${c.symbol || ""})`)
                      .join(", ")
                : "Not available";

            const capitals = country.capital
                ? country.capital.join(", ")
                : "Not available";

            language.textContent = `Language(s): ${languages}`;
            currency.textContent = `Currency: ${currencies}`;
            capital.textContent = `Capital City: ${capitals}`;

            if (country.capitalInfo && country.capitalInfo.latlng) {
                const [lat, lng] = country.capitalInfo.latlng;
                updateMap(lat, lng, capitals);
            }

            zoomToCountry(country);
        })
}

function createMap() {
    map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}

function updateMap(lat, lng, capitalName) {
    if (!map) return;

    map.setView([lat, lng], 6);

    if (capitalMarker) {
        map.removeLayer(capitalMarker);
    }

    capitalMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(capitalName)
        .openPopup();

    console.log(lat, lng)
}

function zoomToCountry(country) {
    if (!map || !country.latlng) return;

    const [lat, lng] = country.latlng;

    let zoomLevel = 6;

    if (country.area > 2000000) zoomLevel = 4;  
    else if (country.area > 500000) zoomLevel = 5;
    else if (country.area > 100000) zoomLevel = 6;
    else zoomLevel = 7;

    map.flyTo([lat, lng], zoomLevel);
}

window.onload = () => {holidayAPI(); createMap();};