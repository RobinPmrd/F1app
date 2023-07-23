export const API_URL = "http://localhost:8080"

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