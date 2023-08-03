import { countryToFlag, API_URL, getRadioInputValue, sort, initializeSelectElement, selectSuggestion, showSuggestions } from "../utils.js";

/**
 * @type {Race[]}
 */
const races = await fetch(API_URL + "/races").then(resp => resp.json());
const circuits = await fetch(API_URL + "/circuits").then(resp => resp.json());
const driverNames = await fetch(API_URL + "/drivers").then(resp => resp.json().then(driver => driver.map(d => d.forename + " " + d.surname)));

const form_search = document.querySelector(".search");
const countrySelectElement = form_search.querySelector("[name=search-country]")
initializeSelectElement(countrySelectElement, Object.keys(countryToFlag), true);

const circuitSelectElement = form_search.querySelector("[name=search-circuit]");
initializeSelectElement(circuitSelectElement, circuits.map(c => c.name), true);

form_search.addEventListener("submit", async event => {
    event.preventDefault();
    const expected_races = filterAndSortRaces(races);
    addRaceReviews(expected_races);
});

if (sessionStorage.getItem("toRacePage") == "true") {
  getFormParametersFromSessionStorage();
  const expected_races = filterAndSortRaces(races);
  addRaceReviews(expected_races);
}

const driverSearchInput = document.querySelector("[name = search-winner]");
const suggestionList = document.getElementById('suggestionsList');
// Event listener for input changes
driverSearchInput.addEventListener('input', () => showSuggestions(driverSearchInput.value, driverNames, suggestionList, driverSearchInput));
// Event delegation for li elements
suggestionList.addEventListener('click', (event) => selectSuggestion(event, suggestionList, driverSearchInput));
// Event listener to close suggestion list when clicking outside
document.addEventListener('click', () => suggestionList.innerHTML = '');

/**
 * 
 * @param {Race} race 
 * @param {*} raceReviewsContainer 
 */
function addRaceReview(race, raceReviewsContainer) {
    const raceReviewContainer = document.createElement("div");
    raceReviewContainer.className = "race-review";
    raceReviewContainer.addEventListener("click", (event) => {
        addFormParametersToSessionStorage();
        sessionStorage.setItem('raceName', raceReviewContainer.querySelector(".race-name").textContent);
        sessionStorage.setItem('season', raceReviewContainer.querySelector(".race-year").textContent);
        window.location.href = '/Race/race.html';
    })

    const circuitCountryElement = document.createElement("p");
    circuitCountryElement.className = "circuit-country";
    if (race.name === "San Marino Grand Prix") circuitCountryElement.innerHTML = `<span class="fi fi-sm"></span>`;
    else if (race.name === "European Grand Prix") circuitCountryElement.innerHTML = `<span class="fi fi-eu"></span>`;
    else if (countryToFlag[race.circuit.country] != null) circuitCountryElement.innerHTML = `<span class="fi fi-${countryToFlag[race.circuit.country]}"></span>`;
    else circuitCountryElement.innerText = race.circuit.country;

    const raceNameElement = document.createElement("p");
    raceNameElement.className = "race-name";
    raceNameElement.innerText = race.name;

    const circuitNameElement = document.createElement("p");
    circuitNameElement.className = "circuit-name";
    circuitNameElement.innerText = race.circuit.name;

    const raceYearElement = document.createElement("p");
    raceYearElement.className = "race-year";
    raceYearElement.innerText = race.year;

    const raceRoundElement = document.createElement("p");
    raceRoundElement.className = "race-round";
    raceRoundElement.innerText = race.round;

    raceReviewContainer.appendChild(circuitCountryElement);
    raceReviewContainer.appendChild(raceNameElement);
    raceReviewContainer.appendChild(circuitNameElement);
    raceReviewContainer.appendChild(raceYearElement);
    raceReviewContainer.appendChild(raceRoundElement);
    raceReviewsContainer.appendChild(raceReviewContainer);
}

function addRaceReviews(races) {
  const raceReviewsContainer = document.querySelector(".race-reviews");
  raceReviewsContainer.innerHTML = "";
  for (const race of races) {
      addRaceReview(race, raceReviewsContainer);
  }
}

function filterAndSortRaces(races) {
  const season = form_search.querySelector("[name=search-season]").value;
  const circuit = form_search.querySelector("[name=search-circuit]").value;
  const country = form_search.querySelector("[name=search-country]").value;
  const winner = form_search.querySelector("[name=search-winner]").value;
  const sort_value= form_search.querySelector("[name=sort]").value;
  const sort_order= getRadioInputValue(form_search.querySelectorAll("[name=order]"));
  let expected_races = races.filter(r => (r.year == season || season == "") && (circuit === "All" || r.circuit.name === circuit) && (country === "All" || r.circuit.country === country) && (winner == "" || (r.winner != null && r.winner.toLowerCase().includes(winner.toLowerCase()))));
  expected_races = expected_races.sort((r1,r2) => sort(r1[sort_value], r2[sort_value], sort_value, sort_order));
  return expected_races
}

function addFormParametersToSessionStorage() {
    const season = form_search.querySelector("[name=search-season]").value;
    const circuit = form_search.querySelector("[name=search-circuit]").value;
    const country = form_search.querySelector("[name=search-country]").value;
    const winner = form_search.querySelector("[name=search-winner]").value;
    const sort_value= form_search.querySelector("[name=sort]").value;
    const sort_order= getRadioInputValue(form_search.querySelectorAll("[name=order]"));
    sessionStorage.setItem("toRacePage", true);
    sessionStorage.setItem("seasonSearch", season);
    sessionStorage.setItem("circuit", circuit);
    sessionStorage.setItem("country", country);
    sessionStorage.setItem("winner", winner);
    sessionStorage.setItem("sort_value", sort_value);
    sessionStorage.setItem("sort_order", sort_order);
}

/**
 * Get form parameters from the session storage and set the corresponding value of each form element. Then clear the session storage
 */
function getFormParametersFromSessionStorage() {
  form_search.querySelector("[name=search-season]").value = sessionStorage.getItem("seasonSearch");
  form_search.querySelector("[name=search-circuit]").value = sessionStorage.getItem("circuit");
  form_search.querySelector("[name=search-country]").value = sessionStorage.getItem("country");
  form_search.querySelector("[name=search-winner]").value = sessionStorage.getItem("winner");
  form_search.querySelector("[name=sort]").value = sessionStorage.getItem("sort_value");
  sessionStorage.clear();
}