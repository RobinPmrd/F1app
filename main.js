import { API_URL } from "./utils.js";

const drivers = await fetch(API_URL + "/drivers").then(resp => resp.json());

async function getDriver(name) {
    const driver = drivers.find(d => d.driverRef == name);
    const blob = await fetch(API_URL + "/drivers/alonso").then(resp => resp.blob());
    const imageUrl = URL.createObjectURL(blob);
    const avatarElement = document.createElement("img");
    avatarElement.className = "driver-avatar";
    avatarElement.src = imageUrl;

    const nameElement = document.createElement("p");
    nameElement.className = "driver-name";
    nameElement.innerText = `${driver.forename} ${driver.surname}`;
    const nationalityElement = document.createElement("p");
    nationalityElement.className = "driver-nationality";
    nationalityElement.innerText = driver.nationality;
    const birthdayElement = document.createElement("p");
    birthdayElement.className = "driver-dob"
    birthdayElement.innerText = driver.dob;
    const worldTitlesElement = document.createElement("p");
    worldTitlesElement.className = "driver-titles"
    worldTitlesElement.innerText = driver.titles;

    const father = document.querySelector(".driver-review");
    father.appendChild(avatarElement);
    father.appendChild(nameElement);
    father.appendChild(nationalityElement);
    father.appendChild(birthdayElement);
    father.appendChild(worldTitlesElement);

}

const btn_goat = document.getElementById("btn-goat");
btn_goat.addEventListener("click", () => getDriver("alonso"));