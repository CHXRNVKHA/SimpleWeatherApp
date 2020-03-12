const apiKey = "b2e445f4703c0a26a3bc7bf7d4278693";
const submitBtn = document.getElementById('btn');
const clearBtn = document.getElementById('btnClear');
const input = document.getElementById('in');
const answer =  document.getElementById('answer');
const form = document.getElementById('form');

const getCityWeather = function (e) {
  e.preventDefault();
  const inputVal = input.value;
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

const clearAll = function () {
  const answer =  document.getElementById('answer');
  console.log(answer);
  answer.innerHTML = "";
};

form.addEventListener('submit', getCityWeather);
//clearBtn.addEventListener('onclick', clearAll);
