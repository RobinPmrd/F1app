import { API_URL, nationalityToFlag } from "../utils.js";

const raceName = sessionStorage.getItem("raceName");
const season = sessionStorage.getItem("season");

const results = await getResults(raceName, season)
const race = await getRace(raceName, season);
const qualifying = await getQualifying(raceName, season);

const h1Element = document.querySelector("header h1");
h1Element.innerText = `${season} ${raceName}`;

fillRaceDetails(race);
addRaceTable(results);
addQualifyingTable(qualifying);

/**
 * 
 * @param {string} raceName 
 * @param {number} season 
 * @returns {Result[]}
 */
async function getResults(raceName, season) {
    return await fetch(API_URL + `/results/${raceName}/${season}`).then(resp => resp.json());
}

/**
 * 
 * @param {string} raceName 
 * @param {number} season 
 * @returns {Race}
 */
async function getRace(raceName, season) {
    return await fetch(API_URL + `/races/${raceName}/${season}`).then(resp => resp.json());
}

/**
 * 
 * @param {string} raceName 
 * @param {number} season 
 * @returns {Qualifying[]}
 */
async function getQualifying(raceName, season) {
    return await fetch(API_URL + `/qualifying/${raceName}/${season}`).then(resp => resp.json());
}

/**
 * Build a driver standing row and add it to tableElement
 * @param {HTMLTableElement} tableElement 
 * @param {Result} result 
 */
function createRaceTableRow(tableElement, result) {
    const trElement = document.createElement("tr");
    trElement.className = `table-content ${result.constructor.name.replace(/ /g,'')}`;
    const tdElement1 = document.createElement("td");
    const tdElement2 = document.createElement("td");
    const tdElement3 = document.createElement("td");
    const tdElement4 = document.createElement("td");
    const positionSpanElement = document.createElement("span");
    positionSpanElement.className = "position";
    positionSpanElement.innerText = result.positionOrder;
    tdElement1.appendChild(positionSpanElement);
    const forenameSpanElement = document.createElement("span");
    forenameSpanElement.className = "driver-name";
    forenameSpanElement.innerText = `${result.driver.forename} `;
    tdElement1.appendChild(forenameSpanElement);
    const surnameSpanElement = document.createElement("span");
    surnameSpanElement.className = "driver-surname";
    surnameSpanElement.innerText = `${result.driver.surname} `;
    tdElement1.appendChild(surnameSpanElement);
    const nationalitySpanElement = document.createElement("span");
    nationalitySpanElement.className = `fi fi-${nationalityToFlag[result.driver.nationality]}`;
    tdElement1.appendChild(nationalitySpanElement);
    const teamSpanElement = document.createElement("span");
    teamSpanElement.className = "team";
    teamSpanElement.innerText = result.constructor.name;
    tdElement1.appendChild(teamSpanElement);
    const timeSpanElement = document.createElement("span");
    timeSpanElement.className = "points";
    timeSpanElement.innerText = result.time != null ? `${result.time}` : result.status.status;
    tdElement2.appendChild(timeSpanElement);
    const iElement = document.createElement("i");
    iElement.className = "fas fa-chevron-right";
    tdElement2.appendChild(iElement);
    const lapSpanElement = document.createElement("span");
    lapSpanElement.className = "points";
    lapSpanElement.innerText = result.laps;
    tdElement3.appendChild(lapSpanElement);
    const pointsSpanElement = document.createElement("span");
    pointsSpanElement.className = "points";
    pointsSpanElement.innerText = result.points;
    tdElement4.appendChild(pointsSpanElement);

    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
    trElement.appendChild(tdElement4);

    tableElement.appendChild(trElement);
}

/**
 * Build the driver standing table 
 * @param {Result[]} driverStanding 
 */
function addRaceTable(driverStanding) {
    const driverTableElement = document.querySelector("#race");
    driverTableElement.innerHTML = "";
    const captionElement = document.createElement("caption");
    captionElement.innerText = "Race";
    driverTableElement.appendChild(captionElement);
    createRaceTableHeader(driverTableElement);
    for (const row of driverStanding) {
        createRaceTableRow(driverTableElement, row);
    }   
}

/**
 * Build a constructor standing row and add it to tableElement
 * @param {HTMLTableElement} tableElement 
 * @param {Qualifying} qualifying 
 */
function createQualifyingTableRow(tableElement, qualifying) {
    const trElement = document.createElement("tr");
    trElement.className = `table-content ${qualifying.constructor.name.replace(/ /g,'')}`;
    const tdElement1 = document.createElement("td");
    tdElement1.className = "left";
    const tdElement2 = document.createElement("td");
    const tdElement3 = document.createElement("td");
    const tdElement4 = document.createElement("td");
    const positionSpanElement = document.createElement("span");
    positionSpanElement.className = "position";
    positionSpanElement.innerText = qualifying.position;
    tdElement1.appendChild(positionSpanElement);

    const forenameSpanElement = document.createElement("span");
    forenameSpanElement.className = "driver-name";
    forenameSpanElement.innerText = `${qualifying.driver.forename} `;
    tdElement1.appendChild(forenameSpanElement);

    const surnameSpanElement = document.createElement("span");
    surnameSpanElement.className = "driver-surname";
    surnameSpanElement.innerText = `${qualifying.driver.surname} `;
    tdElement1.appendChild(surnameSpanElement);

    const nationalitySpanElement = document.createElement("span");
    nationalitySpanElement.className = `fi fi-${nationalityToFlag[qualifying.driver.nationality]}`;
    tdElement1.appendChild(nationalitySpanElement);

    const nameSpanElement = document.createElement("span");
    nameSpanElement.className = "team";
    nameSpanElement.innerText = `${qualifying.constructor.name} `;
    tdElement1.appendChild(nameSpanElement);

    const q1SpanElement = document.createElement("span");
    q1SpanElement.className = "points";
    q1SpanElement.innerText = qualifying.q1;
    tdElement2.appendChild(q1SpanElement);

    const iElement = document.createElement("i");
    iElement.className = "fas fa-chevron-right";
    tdElement2.appendChild(iElement);

    const q2SpanElement = document.createElement("span");
    q2SpanElement.className = "points";
    q2SpanElement.innerText = qualifying.q2;
    tdElement3.appendChild(q2SpanElement);
    tdElement3.appendChild(iElement);

    const q3SpanElement = document.createElement("span");
    q3SpanElement.className = "points";
    q3SpanElement.innerText = qualifying.q3;
    tdElement4.appendChild(q3SpanElement);
    tdElement4.appendChild(iElement);

    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
    trElement.appendChild(tdElement4);

    tableElement.appendChild(trElement);
}

/**
 * Build the driver standing table 
 * @param {Qualifying[]} QualifyingStanding 
 */
function addQualifyingTable(QualifyingStanding) {
    const constructorTableElement = document.querySelector("#qualifying");
    constructorTableElement.innerHTML = "";
    const captionConstructorElement = document.createElement("caption");
    captionConstructorElement.innerText = "Qualifying";
    constructorTableElement.appendChild(captionConstructorElement);
    for (const row of QualifyingStanding) {
        createQualifyingTableRow(constructorTableElement, row);
    }
    createQualifyingTableHeader(constructorTableElement);
}

/**
 * Build the header for each column in table
 * @param {HTMLTableElement} table 
 */
function createQualifyingTableHeader(table) {
    const trElement = document.createElement("tr");
    trElement.className = "table-content";
    const tdElement1 = document.createElement("th");
    tdElement1.innerText = "";
    const tdElement2 = document.createElement("th");
    tdElement2.innerText = "Q1";
    const tdElement3 = document.createElement("th");
    tdElement3.innerText = "Q2";
    const tdElement4 = document.createElement("th");
    tdElement4.innerText = "Q3";
    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
    trElement.appendChild(tdElement4);
    table.insertBefore(trElement, table.firstChild);
}

/**
 * Build the header for each column in table
 * @param {HTMLTableElement} table 
 */
function createRaceTableHeader(table) {
    const trElement = document.createElement("tr");
    trElement.className = "table-content";
    const tdElement1 = document.createElement("th");
    tdElement1.innerText = "";
    const tdElement2 = document.createElement("th");
    tdElement2.innerText = "Time";
    const tdElement3 = document.createElement("th");
    tdElement3.innerText = "Laps";
    const tdElement4 = document.createElement("th");
    tdElement4.innerText = "Points";
    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);
    trElement.appendChild(tdElement3);
    trElement.appendChild(tdElement4);
    table.appendChild(trElement);
}

/**
 * Add the race's details to the designated section
 * @param {Race} race 
 */
function fillRaceDetails(race) {
    const container = document.querySelector(".race-details");
    const circuitElement = container.querySelector(".circuit");
    circuitElement.innerText = race.circuit.name;
    const locationElement = container.querySelector(".location");
    locationElement.innerText = `${race.circuit.location}, ${race.circuit.country}`;
    const dateElement = container.querySelector(".date");
    dateElement.innerText = race.date
    const roundElement = container.querySelector(".round");
    roundElement.innerText = race.round;
}