const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => cities.push(...data))
    .catch((error) => console.error('Error fetching city data:', error));

function findMatches(wordToMatch, cities) {
    const searchTerm = wordToMatch.trim().toLowerCase();

    if (!searchTerm) return [];

    return cities.filter((place) => {
        const city = place.city?.toLowerCase() || "";
        const state = place.state?.toLowerCase() || "";

        return city.includes(searchTerm) || state.includes(searchTerm);
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
    if (cities.length === 0) return;

    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map((place) => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city.replace(
            regex,
            `<span class = "hl">${this.value}</span>`
        );
        const stateName = place.state.replace(
            regex,
            `<span class = "hl">${this.value}</span>`
        );

        return `
        <li>
            <span class = "name">${cityName}, ${stateName}</span>
            <span class="population">${numberWithCommas(
                place.population
            )}</span>
        </li>
        `;
    }).join("");
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
