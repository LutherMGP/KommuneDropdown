// Log til konsol
console.log("jeg er i kommunedropdown");

// Initialisering (inklusiv den nødvendige'nye'konstant og Map datastruktur).
const pbFetchKommuner = document.getElementById("pbFetchKommuner");
const urlKommune = "https://api.dataforsyningen.dk/kommuner"; // Hardkodet URL
const ddKommuner = document.getElementById("ddKommuner");
const divTag = document.getElementById("atags");

// Opgave 1: Datastruktur for at holde kommuneobjekterne.
const kommuneMap = new Map();

// Opgave 2: Til brug for Klone elementet for den anden dropdown.
const secondDdKommuner = document.getElementById("secondDdKommuner");

// Kernefunktionalitet relateret til opgave 1 & 2.

// Kaldes når brugeren klikker på "Fyld dropdown".
function actionFetch() {
    fetchKommuner(urlKommune);
}

// Asynkron funktion til at fylde dropdowns.
async function fetchKommuner(urlKommune) {
    const kommuneArr = await fetchAnyUrl(urlKommune); // kommuneArr er en dynamisk variabel med et Array af kommune-objekter
    kommuneArr.forEach(fillDropdownObj);
}

// Asynkron funktion til at hente data fra en given URL.
async function fetchAnyUrl(url) {
    const response = await fetch(url);
    return response.json();
}

// Logik for at fylde dropdown's og gemme data i datastruktur (Opgave 1 & 2).
function fillDropdownObj(item) {
    const el = document.createElement("option"); // Navnet "el" er en almindeligt anvendt kort form af "element" i JavaScript-koden
    el.textContent = item.navn; // 'navn' anvendes til at mappe alle kommunens data
    el.value = item.kode; // 'kode' anvendes ikke senere men gemmes konventionelt gerne
    ddKommuner.appendChild(el); // Tilføjer det nye option-element til dropdown-menuen

    // Opgave 1: Gemmer Kommuneobjekter i datastruktur hvor navnene er nøgler.
    kommuneMap.set(item.navn, item);

    // Opgave 2: Klone elementet for den anden dropdown
    const secondEl = el.cloneNode(true);
    secondDdKommuner.appendChild(secondEl);
}

// Kernefunktionalitet relateret til opgave 4 & 5 (læse og opdatere i datastrukturen).

// Opgave 4: input-håndtering og DOM-manipulation
function inputChanged(event, dropdown) {
    const selindex = dropdown.selectedIndex;
    const selectedOption = dropdown.options[selindex];
    const kommune = kommuneMap.get(selectedOption.textContent);

    // Opgave 5: Fjerner den valgte kommune så den ikke optræder igen
    if (kommune) {
        createATag(kommune);
        kommuneMap.delete(selectedOption.textContent);
    }
}

// Opgave 4 (fortsat): Skaber et 'A' tag og tilføjer det til HTML.
function createATag(komObj) {
    const aTag = document.createElement("a");
    aTag.setAttribute('href', komObj.href);
    aTag.innerText = komObj.navn;
    divTag.appendChild(aTag);
    const brTag = document.createElement('br');
    divTag.appendChild(brTag);
}

// Event listeners benyttet i koden.
pbFetchKommuner.addEventListener('click', actionFetch);
ddKommuner.addEventListener('change', (e) => inputChanged(e, ddKommuner));

// Opgave 3: Event listener til det nye inputfelt
secondDdKommuner.addEventListener('change', (e) => inputChanged(e, secondDdKommuner));
