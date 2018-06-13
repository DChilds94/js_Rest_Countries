const app = function(){
  const url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
  // var countryArray = JSON.parse(localStorage.getItem('countryArray')) || [];
};

const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

const requestComplete = function(){
    if (this.status !== 200) return;
    const countries = JSON.parse(this.response);
    populateList(countries);
};

const populateList = function(countries){
    const selector = document.querySelector('#selector');
    selector.addEventListener('change', displayDetails);
    countries.forEach(function(country){
        const option = document.createElement("option");
        option.textContent = country.name;
        option.value = JSON.stringify(country);
        selector.appendChild(option);
        // const select = document.querySelector('#countries');
    });
};

const displayDetails = function(){
    const country = JSON.parse(this.value);
    const ul = document.querySelector('#country-list');
    const li = document.createElement('li');
    li.textContent = country.name + ", " + country.capital + ", " + country.population;

    ul.appendChild(li);
    save(li);

};

var save = function (country) {
  // this function needs to:
  // - get the data back from local storage and parse to an array
  const countryArray = JSON.parse(localStorage.getItem('countryList')) || [];
  // - add the newItem to the array
  countryArray.push(country.innerHTML);
  // console.log(countryList);
  // - stringify the updated array
  const jsonStringArray = JSON.stringify(countryArray);
  // - save it back to localstorage
  localStorage.setItem('countryArray', jsonStringArray);
}

window.addEventListener('load', app);
