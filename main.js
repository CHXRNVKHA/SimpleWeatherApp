const apiKey = "b2e445f4703c0a26a3bc7bf7d4278693";
const submitBtn = document.getElementById('btn');
const clearBtn = document.getElementById('btnClear');
const input = document.getElementById('in');
const answer =  document.getElementById('answer');
const form = document.getElementById('form');
const regions = document.getElementById('regions');
const cities = document.getElementById('cities');
const regionOptionDef = 'Select the region';
const cityOptionDef = 'Select the city';
const queryArr = [];

const getCityWeather = function (e) {
  e.preventDefault();
  const inputVal = input.value;
  for (let i = 0; i < queryArr.length; i++) {
    if (queryArr[i] === inputVal) return;
  }
  queryArr.push(inputVal);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;
      const block = document.createElement('div');
      block.innerHTML = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <p class="city-temp">Tempreture: ${Math.round(main.temp)}<sup>°C</sup></p>
      <figure>
        <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
      answer.appendChild(block);
    })
    .catch(() => {
      
  });
};

const getRegions = function (e) {
  e.preventDefault();
  const url = `https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    for(let i = 0; i < data[0]['regions'].length; i++) {
      let option = document.createElement('option');
      option.innerText = data[0]['regions'][i]['name'];
      regions.appendChild(option);
    } 
  })
  .catch(() => {

  });
};

const getCities = function () {
  if (regions.innerText == regionOptionDef) return;
  const url = `https://gist.githubusercontent.com/alex-oleshkevich/6946d85bf075a6049027306538629794/raw/3986e8e1ade2d4e1186f8fee719960de32ac6955/by-cities.json`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    for(let i = 0; i < data[0]['regions'].length; i++) {
      if (regions.value == data[0]['regions'][i]['name']) {
        data[0]['regions'][i]['cities'].forEach(item => {
          let option = document.createElement('option');
          option.innerText = item['name'];
          cities.appendChild(option);
        });
      }
    } 
  })
};

const clearAll = function () {
  const answer =  document.getElementById('answer');
  console.log(answer);
  answer.innerHTML = "";
};

document.addEventListener('DOMContentLoaded', getRegions);
regions.addEventListener('change', getCities);
form.addEventListener('submit', getCityWeather);
//clearBtn.addEventListener('onclick', clearAll);