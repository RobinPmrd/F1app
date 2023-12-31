import { API_URL, initializeSelectElement, nationalityToFlag } from "../utils.js";

let seasons = [];
for (let year = 2023; year >= 1950; year--) {
    seasons.push(year);
}

let raceName = sessionStorage.getItem("raceName") != null ? sessionStorage.getItem("raceName") : "All";
let season = sessionStorage.getItem("season") != null ? sessionStorage.getItem("season") : 2023;
sessionStorage.clear();

const seasonSelectElement = document.querySelector("[name = search-season]");
initializeSelectElement(seasonSelectElement, seasons, false);
seasonSelectElement.value = season;

const racesSelectElement = document.querySelector("[name=season-races]");
const seasonRaces = await fetch(API_URL + `/races/${season}`).then(resp => resp.json());
const raceNames = seasonRaces.map(race => race.name);
initializeSelectElement(racesSelectElement, raceNames, true);
racesSelectElement.value = raceName;

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
    viewRaceButton.style.display = "none";
});

racesSelectElement.addEventListener("change", async () => {
    const race = racesSelectElement.value;
    const season = seasonSelectElement.value;
    if (race === "All") {
        var driverStanding = await fetch(API_URL + `/standings/drivers/${season}`).then(resp => resp.json());
        var constructorStanding = await fetch(API_URL + `/standings/constructors/${season}`).then(resp => resp.json());
        viewRaceButton.style.display = "none";
    }
    else  {
        var driverStanding = await fetch(API_URL + `/standings/drivers/${season}/${race}`).then(resp => resp.json());
        var constructorStanding = await fetch(API_URL + `/standings/constructors/${season}/${race}`).then(resp => resp.json());
        viewRaceButton.style.display = "block";
    }
    addDriverTable(driverStanding);
    addConstructorTable(constructorStanding);
})
// Trigger the raceSelectElement even for the first page loading
racesSelectElement.dispatchEvent(new Event("change"));

const viewRaceButton = document.querySelector(".button-container button");
viewRaceButton.addEventListener("click", () => {
    sessionStorage.setItem('raceName', racesSelectElement.value);
    sessionStorage.setItem('season', seasonSelectElement.value);
    window.location.href = '/Race/race.html';
})


/**
 * Build a driver standing row and add it to tableElement
 * @param {HTMLTableElement} tableElement 
 * @param {DriverStandingRow} row 
 */
function createDriverTableRow(tableElement, row) {
    const trElement = document.createElement("tr");
    trElement.className = `table-content ${row.team.replace(/ /g,'')}`;
    const tdElement1 = document.createElement("td");
    const tdElement2 = document.createElement("td");
    const positionSpanElement = document.createElement("span");
    positionSpanElement.className = "position";
    positionSpanElement.innerText = row.position;
    tdElement1.appendChild(positionSpanElement);
    const forenameSpanElement = document.createElement("span");
    forenameSpanElement.className = "driver-name";
    forenameSpanElement.innerText = `${row.forename} `;
    tdElement1.appendChild(forenameSpanElement);
    const surnameSpanElement = document.createElement("span");
    surnameSpanElement.className = "driver-surname";
    surnameSpanElement.innerText = `${row.surname} `;
    tdElement1.appendChild(surnameSpanElement);
    const nationalitySpanElement = document.createElement("span");
    nationalitySpanElement.className = `fi fi-${nationalityToFlag[row.nationality]}`;
    tdElement1.appendChild(nationalitySpanElement);
    const teamSpanElement = document.createElement("span");
    teamSpanElement.className = "team";
    teamSpanElement.innerText = row.team;
    tdElement1.appendChild(teamSpanElement);
    const pointsSpanElement = document.createElement("span");
    pointsSpanElement.className = "points";
    pointsSpanElement.innerText = `${row.points} PTS`;
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
 * @param {ConstructorStandingRow} row 
 */
function createConstructorTableRow(tableElement, row) {
    const trElement = document.createElement("tr");
    trElement.className = `table-content ${row.name.replace(/ /g,'')}`;
    const tdElement1 = document.createElement("td");
    const tdElement2 = document.createElement("td");

    const positionSpanElement = document.createElement("span");
    positionSpanElement.className = "position";
    positionSpanElement.innerText = row.position;
    tdElement1.appendChild(positionSpanElement);

    const nameSpanElement = document.createElement("span");
    nameSpanElement.className = "constructor-name";
    nameSpanElement.innerText = `${row.name} `;
    tdElement1.appendChild(nameSpanElement);

    const nationalitySpanElement = document.createElement("span");
    nationalitySpanElement.className = `fi fi-${nationalityToFlag[row.nationality]}`;
    tdElement1.appendChild(nationalitySpanElement);

    const pointsSpanElement = document.createElement("span");
    pointsSpanElement.className = "points";
    pointsSpanElement.innerText = `${row.points} PTS`;
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