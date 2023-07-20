const circuits = await fetch("http://localhost:8080/circuits").then(resp => resp.json());


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
    const nb_races = form_search.querySelector("[name=search-races]").value;
    const nb_races_op = form_search.querySelector("[name=search-races-op]").value
    const country = form_search.querySelector("[name=search-country]").value;
    const sort_value= form_search.querySelector("[name=sort]").value;
    const sort_order= getRadioInputValue(form_search.querySelectorAll("[name=order]"));
    let expected_circuits= name == "" ? circuits.filter(c => compare(c.hostedRaces,nb_races,nb_races_op) && (country === "All" || c.country === country)) : circuits.filter(d => d.name === name && compare(c.hostedRaces,nb_races,nb_races_op) && (country === "All" || c.country === country));
    expected_circuits = expected_circuits.sort((c1,c2) => sort(c1[sort_value], c2[sort_value], sort_value, sort_order));
    const circuitReviewsContainer = document.querySelector(".driver-reviews");
    circuitReviewsContainer.innerHTML = "";
    for (const circuit of expected_circuits) {
        await addCircuitReview(circuit, circuitReviewsContainer);
    }
});

async function addCircuitReview(circuit, circuitReviewsContainer) {
    const circuitReviewContainer = document.createElement("div");
    circuitReviewContainer.className = "circuit-review";

    const circuitImageElement = document.createElement("img");
    circuitImageElement.className = "circuit-image";
    circuitImageElement.onerror(() => circuitImageElement.src = "/images/unknown.jpg")
    circuitImageElement.src = await getDriverImage(circuit.driverRef); // async mode
    // getDriverImage(driver.driverRef).then(imageUrl => driverAvatarElement.src = imageUrl); // sequential mode
    circuitImageElement.alt = circuit.name;

    const circuitNameElement = document.createElement("p");
    circuitNameElement.className = "circuit-name";
    circuitNameElement.innerText = circuit.name;

    const circuitCountryElement = document.createElement("p");
    circuitCountryElement.className = "circuit-country";
    if ((circuit.nationality).includes("-")) circuitCountryElement.innerHTML = `<span class="fi fi-${nationalityToFlag[(circuit.nationality).split('-')[0]]}"></span>  <span class="fi fi-${nationalityToFlag[(circuit.nationality).split('-')[1]]}"></span>`
    else circuitCountryElement.innerHTML = `<span class="fi fi-${nationalityToFlag[circuit.nationality]}"></span>`;

    const CircuitLocationElement = document.createElement("p");
    CircuitLocationElement.className = "circuit-location";
    CircuitLocationElement.innerText = circuit.location;

    const circuitHostedRacesElement = document.createElement("p");
    circuitHostedRacesElement.className = "circuit-hostedRaces";
    circuitHostedRacesElement.innerText = circuit.hostedRaces;

    circuitReviewContainer.appendChild(circuitImageElement);
    circuitReviewContainer.appendChild(circuitNameElement);
    circuitReviewContainer.appendChild(circuitCountryElement);
    circuitReviewContainer.appendChild(CircuitLocationElement);
    circuitReviewContainer.appendChild(circuitHostedRacesElement);
    circuitReviewsContainer.appendChild(circuitReviewContainer);
}


async function getDriverImage(driverRef) {
  const blob = await fetch(`http://localhost:8080/drivers/${driverRef}`).then(resp => resp.blob());
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
}

function compare(a, b, op) {
  if (op === ">=") return a >= b;
  else if (op === "=") return a == b;
  return a <= b;
}

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

function getRadioInputValue(radioInputs) {
    for (const option of radioInputs) {
        if (option.checked) {
            return option.value;
        }
    }
}