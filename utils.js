export const API_URL = "http://192.168.0.15:8080"

export const nationalityToFlag = {
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

export const countryToFlag = {
    Spain : "es",
    UK : "gb",
    France : "fr",
    Italy : "it",
    Germany : "de",
    Netherlands : "nl",
    Finland : "fi",
    Brazil : "br",
    Austria : "at",
    Argentina: "ar",
    Australia : "au",
    "South Africa" : "za",
    "New Zealand" : "nz",
    Venezuela : "ve",
    USA : "us",
    "United States" : "us",
    Switzerland : "ch",
    Sweden : "se",
    Thailand : "th",
    Japan : "jp",
    Polish : "pl",
    Belgium : "be",
    Mexico: "mx",
    Canada : "ca",
    Monaco : "mc",
    Colombia : "co",
    Chili : "cl",
    Hungary : "hu",
    Ireland : "ie",
    Denmark : "dk",
    Czech : "cz",
    Malaysia : "my",
    Portugal : "pt",
    Uruguay : "uy",
    India : "in",
    Indonesia : "id",
    Russia : "ru",
    China : "cn",
    "Saudi Arabia" : "sa",
    Turkey : "tr",
    Bahrain : "bh",
    Azerbaijan : "az",
    Singapore : "sg",
    Qatar : "qa",
    UAE : "ae",
    Korea : "kr",
    Morocco : "ma"
}

/** 
 * Do a comparison between a and b, in function of op
 * @param {*} a 
 * @param {*} b 
 * @param {string} op 
 * @returns {boolean}
 */
export function compare(a, b, op) {
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
export function sort(a, b, type, order) {
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
export function getRadioInputValue(radioInputs) {
    for (const option of radioInputs) {
        if (option.checked) {
            return option.value;
        }
    }
}

/**
 * Insert data elements as option element in selectElement
 * @param {Element} selectElement 
 * @param {*} data
 * @param {boolean} addAll 
 */
export function initializeSelectElement(selectElement, data, addAll) {
    if (addAll) {
        const optionElement = document.createElement("option");
        optionElement.value = "All";
        optionElement.innerText = "All";
        selectElement.appendChild(optionElement);
    }
    for (const element of data) {
        const optionElement = document.createElement("option");
        optionElement.value = element;
        optionElement.innerText = element;
        selectElement.appendChild(optionElement);
    }
}

/**
 * Put the selected suggestion as the value of 
 * @param {Event} event
 * @param {HTMLUListElement} suggestionList
 * @param {HTMLInputElement} inputElement  
 */
export function selectSuggestion(event, suggestionList, inputElement) {
    const target = event.target;
    if (target.tagName === 'LI') {
      inputElement.value = target.textContent; // Set the clicked suggestion value in the input field
      suggestionList.innerHTML = ''; // Clear the suggestion list after selection
    }
  }

/**
 * Add each suggestion to suggestionList
 * @param {string} inputValue
 * @param {string[]} driverNames
 * @param {HTMLUListElement} suggestionList
 * @param {HTMLInputElement} inputElement 
 */
export function showSuggestions(inputValue, driverNames, suggestionList, inputElement) {
    const filteredDrivers = driverNames.filter(driver => driver.toLowerCase().includes(inputValue.toLowerCase()));

    // Clear the suggestion list
    suggestionList.innerHTML = '';

    // Display suggestions
    filteredDrivers.forEach(driver => {
        const li = document.createElement('li');
        li.textContent = driver;
        suggestionList.appendChild(li);
    });

        // Get the width of the input element
    const inputWidth = inputElement.getBoundingClientRect().width;
    suggestionList.style.width = inputWidth + 'px'; // Set the width of the suggestion list
  }