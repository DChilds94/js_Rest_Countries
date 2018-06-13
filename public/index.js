const app = function(){
  const url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);


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
  const select = document.querySelector('#selector');

  countries.forEach(function(country){
    const option = document.createElement("option");
    option.textContent = country.name;
    select.appendChild(option);
  });


  select.addEventListener('change', function(){
      const select = document.querySelector('#selector');
      displayDetails(select.value);
  })
};

const displayDetails = function(country){
    const ul = document.querySelector('#country-list');
    const li = document.createElement('li');
    li.textContent = country;
    // li.textContent = country;
    console.log(event);
    ul.appendChild(li);

};

// const selectCountries = function()

window.addEventListener('load', app);
