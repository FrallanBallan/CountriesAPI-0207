// -_-
//Grid
let countryGrid = document.querySelector(".countryGrid");
// Light and dark mode
let lightDark = document.querySelector(".lightDark");
let continentSelect = document.querySelector(".continentSelect");

lightDark.addEventListener("click", () => {
  let body = document.body;
  let header = document.querySelector("header");
  let searchBox = document.querySelector(".searchBox");
  let counrtyCard = document.querySelectorAll(".counrtyCard");
  let continentSelect = document.querySelector(".continentSelect");
  let iconLightDark = document.querySelector(".iconLightDark");
  body.classList.toggle("lightMode");
  header.classList.toggle("elementLightMode");
  searchBox.classList.toggle("elementLightMode");
  counrtyCard.forEach((counrtyCard) => {
    counrtyCard.classList.toggle("elementLightMode");
  });
  continentSelect.classList.toggle("elementLightMode");
  lightDark.classList.toggle("elementLightMode");
  iconLightDark.classList.toggle("fa-moon");
});

const API_URL_ALL = "https://restcountries.com/v3.1/all/?";

let getData = async (url) => {
  let response = await fetch(url);
  let data = response.json();
  return data;
};

let renderCardsStart = async () => {
  let countryList = await getData(API_URL_ALL);
  console.log(countryList);
  countryList.forEach((country) => {
    // console.log(country.name.common);
    renderCards(country);
  });
};

function renderCards(country) {
  let card = document.createElement("div");
  card.classList.add("counrtyCard");
  // set the img
  let countryImg = document.createElement("img");
  countryImg.classList.add("countryImg");
  countryImg.src = country.flags.png;
  countryImg.setAttribute("alt:", country.flags.alt);
  // set the info
  let countryInfo = document.createElement("div");
  countryInfo.classList.add("countryInfo");

  let countryName = document.createElement("h3");
  countryName.innerText = "Country: " + country.name.common;

  let countryPopulation = document.createElement("h3");
  countryPopulation.innerText = "Population: " + country.population;

  let countryRegion = document.createElement("h3");
  countryRegion.innerText = "Region: " + country.region;

  let countryCapital = document.createElement("h3");
  countryCapital.innerText = "Capital: " + country.capital;
  countryInfo.append(
    countryName,
    countryPopulation,
    countryRegion,
    countryCapital
  );
  card.append(countryImg, countryInfo);
  countryGrid.appendChild(card);
}

//Filtrering
let renderCountries = async () => {
  let continentSelect = document.querySelector(".continentSelect").value;
  console.log(continentSelect);

  countryGrid.innerHTML = "";

  let params = new URLSearchParams();

  if (continentSelect.value) {
    params.append("region", continentSelect.value);
  }

  let countryList = await getData(API_URL_ALL + params);

  // countryList.forEach((element) => {
  //   console.log(element.region);
  // });

  countryList.forEach((continents) => {
    renderCards(continents);
  });
};

//On change eventlistener
continentSelect.addEventListener("change", renderCountries);

// renderCardsStart();
