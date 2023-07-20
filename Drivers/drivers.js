const drivers = await fetch("http://localhost:8080/drivers").then(resp => resp.json());


const nationalityToFlag = {
    Spanish : "es",
    British : "gb",
    French : "fr",
    Italian : "it",
    German : "de",
    Dutch : "nl",
    Finnish : "fi",
    Brazilian : "br",
    Austrian : "at",
    Argentine : "ar",
    Australian : "au",
    "South African" : "za",
    "New Zealander" : "nz",
    Venezuelan : "ve",
    American : "us",
    Swiss : "ch",
    Swedish : "se",
    Thai : "th",
    Japanese : "jp",
    Polish : "pl",
    Belgian : "be",
    Mexican : "mx",
    Canadian : "ca",
    Monegasque : "mc",
    Colombian : "co",
    Chilean : "cl",
    Hungarian : "hu",
    Irish : "ie",
    Danish : "dk",
    Czech : "cz",
    Malaysian : "my",
    Portuguese : "pt",
    Liechtensteiner : "li",
    Rhodesian : "zw",
    Uruguayan : "uy",
    Indian : "in",
    "East German" : "de",
    Indonesian : "id",
    Russian : "ru",
    Chinese : "cn"
}

const form_search = document.querySelector(".search");
const selectElement = form_search.querySelector("[name=search-nationality]")
const optionElement = document.createElement("option");
optionElement.value = "All";
optionElement.innerText = "All";
selectElement.appendChild(optionElement);
for (const nationality of Object.keys(nationalityToFlag)) {
    const optionElement = document.createElement("option");
    optionElement.value = nationality;
    optionElement.innerText = nationality;
    selectElement.appendChild(optionElement);
}
form_search.addEventListener("submit", async event => {
    event.preventDefault();
    const name = form_search.querySelector("[name=search-name]").value;
    const nb_titles = form_search.querySelector("[name=search-titles]").value;
    const nb_titles_op = form_search.querySelector("[name=search-titles-op]").value
    const nb_wins = form_search.querySelector("[name=search-wins]").value;
    const nb_wins_op = form_search.querySelector("[name=search-wins-op]").value
    const nb_races = form_search.querySelector("[name=search-races]").value;
    const nb_races_op = form_search.querySelector("[name=search-races-op]").value
    const nationality = form_search.querySelector("[name=search-nationality]").value;
    const sort_value= form_search.querySelector("[name=sort]").value;
    const sort_order= getRadioInputValue(form_search.querySelectorAll("[name=order]"));
    let expected_drivers= name == "" ? drivers.filter(d => compare(d.titles,nb_titles,nb_titles_op) && compare(d.wins,nb_wins,nb_wins_op) && compare(d.grandprix,nb_races, nb_races_op) && (nationality === "All" || d.nationality === nationality)) : drivers.filter(d => d.surname === name && compare(d.titles,nb_titles,nb_titles_op) && compare(d.wins,nb_wins,nb_wins_op) && compare(d.grandprix,nb_races, nb_races_op)&& (nationality === "All" || d.nationality === nationality));
    expected_drivers = expected_drivers.sort((d1,d2) => sort(d1[sort_value], d2[sort_value], sort_value, sort_order));
    addDriverReviews(expected_drivers);
});

/**
 * Build and add a driver review to the DOM, within the driverReviewsContainer
 * @param {any} driver 
 * @param {HTMLElement} driverReviewsContainer 
 */
async function addDriverReview(driver, driverReviewsContainer) {
    const driverReviewContainer = document.createElement("div");
    driverReviewContainer.className = "driver-review";

    const driverAvatarElement = document.createElement("img");
    driverAvatarElement.className = "driver-avatar";
    driverAvatarElement.src = await getDriverImage(driver.driverRef);
    driverAvatarElement.alt = driver.surname;

    const driverNameElement = document.createElement("p");
    driverNameElement.className = "driver-name";
    driverNameElement.innerText = `${driver.forename} ${driver.surname}`;

    const driverNationalityElement = document.createElement("p");
    driverNationalityElement.className = "driver-nationality";
    if ((driver.nationality).includes("-")) driverNationalityElement.innerHTML = `<span class="fi fi-${nationalityToFlag[(driver.nationality).split('-')[0]]}"></span>  <span class="fi fi-${nationalityToFlag[(driver.nationality).split('-')[1]]}"></span>`
    else driverNationalityElement.innerHTML = `<span class="fi fi-${nationalityToFlag[driver.nationality]}"></span>`;

    const driverAgeElement = document.createElement("p");
    driverAgeElement.className = "driver-age";
    driverAgeElement.innerText = getDriverAge(driver.dob);

    const driverTitlesElement = document.createElement("p");
    driverTitlesElement.className = "driver-titles";
    driverTitlesElement.innerText = driver.titles;

    const driverRacesElement = document.createElement("p");
    driverRacesElement.className = "driver-races";
    driverRacesElement.innerText = driver.grandprix;

    driverReviewContainer.appendChild(driverAvatarElement);
    driverReviewContainer.appendChild(driverNameElement);
    driverReviewContainer.appendChild(driverNationalityElement);
    driverReviewContainer.appendChild(driverAgeElement);
    driverReviewContainer.appendChild(driverTitlesElement);
    driverReviewContainer.appendChild(driverRacesElement);
    driverReviewsContainer.appendChild(driverReviewContainer);
}

/**
 * Add driver reviews to the DOM, within the content div
 * @param {any[]} drivers 
 */
async function addDriverReviews(drivers) {
    // Remove old driver reviews from the DOM
    const driverReviewsContainer = document.querySelector(".driver-reviews");
    const driverReviewsContainerParent = driverReviewsContainer.parentElement;
    // Add driver reviews in the DOM
    driverReviewsContainerParent.removeChild(driverReviewsContainer);
    const newDriverReviewsContainer = document.createElement("section");
    newDriverReviewsContainer.className = "driver-reviews";
    driverReviewsContainerParent.appendChild(newDriverReviewsContainer);
    for (const driver of drivers) {
        await addDriverReview(driver, newDriverReviewsContainer);
    }
}

/**
 * Compute the driver age from his date of birth
 * @param {string} dateOfBirth
 * @returns {number} The driver age
 */
function getDriverAge(dateOfBirth) {
    let dob = new Date(dateOfBirth);
    let currentDate = new Date();
    let age = currentDate.getFullYear() - dob.getFullYear();
    age = dob.getMonth() >= currentDate.getMonth() && dob.getDay() > currentDate.getDay() ? age - 1 : age;
    return age;
}

/**
 * Get the driver image from the API
 * @param {string} driverRef 
 * @returns 
 */
async function getDriverImage(driverRef) {
  const blob = await fetch(`http://localhost:8080/drivers/${driverRef}`).then(resp => resp.blob());
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
}

/** 
 * Do a comparison between a and b, in function of op
 * @param {*} a 
 * @param {*} b 
 * @param {string} op 
 * @returns {boolean}
 */
function compare(a, b, op) {
  if (op === ">=") return a >= b;
  else if (op === "=") return a == b;
  return a <= b;
}

/**
 * Sort a and b in function of their type and the order
 * @param {*} a 
 * @param {*} b 
 * @param {string} type 
 * @param {string} order 
 * @returns {number}
 */
function sort(a, b, type, order) {
    if (order === "asc") {
        if (type === "surname") {
            return a > b ? 1 : a < b ? -1 : 0;
        }
        else if (type === "dob") {
            return a > b ? -1 : a < b ? 1 : 0;
        }
        return a - b;
    }
    if (type === "surname") {
        return a > b ? -1 : a < b ? 1 : 0;
    }
    else if (type === "dob") {
        return a > b ? 1 : a < b ? -1 : 0;
    }
    return b - a;
}

/**
 * Get the value of the selected radio button
 * @param {NodeListOf<Element>} radioInputs 
 * @returns 
 */
function getRadioInputValue(radioInputs) {
    for (const option of radioInputs) {
        if (option.checked) {
            return option.value;
        }
    }
}