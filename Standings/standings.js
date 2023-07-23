import { API_URL, initializeSelectElement, nationalityToFlag } from "../utils.js";


let season = [];
for (let year = 2023; year >= 1950; year--) {
    season.push(year);
}
const seasonSelectElement = document.querySelector("[name = search-season]");
initializeSelectElement(seasonSelectElement, season, false);

const driverStanding = await fetch(API_URL + `/standings/drivers/2023`).then(resp => resp.json());
addDriverTable(driverStanding);
const constructorStanding = await fetch(API_URL + `/standings/constructors/2023`).then(resp => resp.json());
addConstructorTable(constructorStanding);

const racesSelectElement = document.querySelector("[name=season-races]");
const seasonRaces = await fetch(API_URL + `/races/2023`).then(resp => resp.json());
const raceNames = seasonRaces.map(race => race.name);
initializeSelectElement(racesSelectElement, raceNames, true);

seasonSelectElement.addEventListener("change", async event => {
    event.preventDefault();
    const season = seasonSelectElement.value;
    const driverStanding = await fetch(API_URL + `/standings/drivers/${season}`).then(resp => resp.json());
    addDriverTable(driverStanding);
    const constructorStanding = await fetch(API_URL + `/standings/constructors/${season}`).then(resp => resp.json());
    addConstructorTable(constructorStanding);
    racesSelectElement.innerHTML = "";
    const seasonRaces = await fetch(API_URL + `/races/${season}`).then(resp => resp.json());
    const raceNames = seasonRaces.map(race => race.name);
    initializeSelectElement(racesSelectElement, raceNames, true);
});

racesSelectElement.addEventListener("change", async () => {
    const race = racesSelectElement.value;
    const season = seasonSelectElement.value;
    const driverStanding = await fetch(API_URL + `/standings/drivers/${season}/${race}`).then(resp => resp.json());
    addDriverTable(driverStanding);
    const constructorStanding = await fetch(API_URL + `/standings/constructors/${season}/${race}`).then(resp => resp.json());
    addConstructorTable(constructorStanding);
})


/**
 * Build a driver standing row and add it to tableElement
 * @param {HTMLTableElement} tableElement 
 * @param {any[]} row 
 */
function createDriverTableRow(tableElement, row) {
    const trElement = document.createElement("tr");
    trElement.className = `table-content ${row[4].replace(/ /g,'')}`;
    const tdElement1 = document.createElement("td");
    const tdElement2 = document.createElement("td");
    const positionSpanElement = document.createElement("span");
    positionSpanElement.className = "position";
    positionSpanElement.innerText = row[0];
    tdElement1.appendChild(positionSpanElement);
    const forenameSpanElement = document.createElement("span");
    forenameSpanElement.className = "driver-name";
    forenameSpanElement.innerText = `${row[2]} `;
    tdElement1.appendChild(forenameSpanElement);
    const surnameSpanElement = document.createElement("span");
    surnameSpanElement.className = "driver-surname";
    surnameSpanElement.innerText = `${row[3]} `;
    tdElement1.appendChild(surnameSpanElement);
    const nationalitySpanElement = document.createElement("span");
    nationalitySpanElement.className = `fi fi-${nationalityToFlag[row[5]]}`;
    tdElement1.appendChild(nationalitySpanElement);
    const teamSpanElement = document.createElement("span");
    teamSpanElement.className = "team";
    teamSpanElement.innerText = row[4];
    tdElement1.appendChild(teamSpanElement);
    const pointsSpanElement = document.createElement("span");
    pointsSpanElement.className = "points";
    pointsSpanElement.innerText = `${row[1]} PTS`;
    tdElement2.appendChild(pointsSpanElement);
    const iElement = document.createElement("i");
    iElement.className = "fas fa-chevron-right";
    tdElement2.appendChild(iElement);

    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);

    tableElement.appendChild(trElement);
}

/**
 * Build the driver standing table 
 * @param {any[][]} driverStanding 
 */
function addDriverTable(driverStanding) {
    const driverTableElement = document.querySelector(".driver-table-container");
    driverTableElement.innerHTML = "";
    const captionElement = document.createElement("caption");
    captionElement.innerText = "Drivers";
    driverTableElement.appendChild(captionElement);
    for (const row of driverStanding) {
        createDriverTableRow(driverTableElement, row);
    }   
}

/**
 * Build a constructor standing row and add it to tableElement
 * @param {HTMLTableElement} tableElement 
 * @param {any[]} row 
 */
function createConstructorTableRow(tableElement, row) {
    const trElement = document.createElement("tr");
    trElement.className = `table-content ${row[2].replace(/ /g,'')}`;
    const tdElement1 = document.createElement("td");
    const tdElement2 = document.createElement("td");

    const positionSpanElement = document.createElement("span");
    positionSpanElement.className = "position";
    positionSpanElement.innerText = row[0];
    tdElement1.appendChild(positionSpanElement);

    const nameSpanElement = document.createElement("span");
    nameSpanElement.className = "constructor-name";
    nameSpanElement.innerText = `${row[2]} `;
    tdElement1.appendChild(nameSpanElement);

    const nationalitySpanElement = document.createElement("span");
    nationalitySpanElement.className = `fi fi-${nationalityToFlag[row[3]]}`;
    tdElement1.appendChild(nationalitySpanElement);

    const pointsSpanElement = document.createElement("span");
    pointsSpanElement.className = "points";
    pointsSpanElement.innerText = `${row[1]} PTS`;
    tdElement2.appendChild(pointsSpanElement);

    const iElement = document.createElement("i");
    iElement.className = "fas fa-chevron-right";
    tdElement2.appendChild(iElement);

    trElement.appendChild(tdElement1);
    trElement.appendChild(tdElement2);

    tableElement.appendChild(trElement);
}

/**
 * Build the driver standing table 
 * @param {any[][]} constructorStanding 
 */
function addConstructorTable(constructorStanding) {
    const constructorTableElement = document.querySelector(".constructor-table-container");
    constructorTableElement.innerHTML = "";
    const captionConstructorElement = document.createElement("caption");
    captionConstructorElement.innerText = "Constructors";
    constructorTableElement.appendChild(captionConstructorElement);
    for (const row of constructorStanding) {
        createConstructorTableRow(constructorTableElement, row);
    }
}