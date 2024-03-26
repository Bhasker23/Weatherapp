// // document.getElementById("container") = null
//  src="https://maps.google.com/maps?q=Udaipur&t=&z=13&ie=UTF8&iwloc=&output=embed"

function getData() {
  let city = document.getElementById("city").value;

  console.log(city);

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=430eb4c5521e2d96b6e75be4d048fba3`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      //   console.log(res.main.temp);
      appendData(res);
    })
    .catch(function (err) {
      alert("OOPS! Something went wrong.. Ary Again");
      console.log("err :", "URl is crashed");
    });
}

function getDataLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5881c4a70f1f474bc5289105d70aa1b5`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      //   console.log(res.main.temp);
      appendData(res);
    })
    .catch(function (err) {
      console.log("err :", "URl is crashed");
    });
}

function appendData(data) {
  // document.getElementById("container") = null

  let container = document.getElementById("container");

  container.innerHTML = null;

  let box = document.createElement("div");
  box.setAttribute("class", "box");

  let buttn = document.createElement("button");

  buttn.setAttribute("class", "getHourlydataButton");
  buttn.innerText = "Get hourly Data";

  buttn.onclick = getHourlyForecast;

  // function () {
  //   console.log("hello from get hourly", navigator.geolocation(city));
  // };

  let name = document.createElement("h1");
  name.innerText = "City : " + data.city.name;

  let cureent_temp = document.createElement("h3");
  cureent_temp.innerText =
    "Current Temprature : " +
    Number(data.list[0].main.temp - 288.53).toFixed(1) +
    " °C";

  let temp_min = document.createElement("h3");
  temp_min.innerText =
    "Min Temprature : " +
    Number(data.list[0].main.temp_min - 288.53).toFixed(1) +
    " °C";

  let temp_max = document.createElement("h3");
  temp_max.innerText =
    "Max Temprature : " +
    (data.list[0].main.temp_max - 288.53).toFixed(1) +
    " °C";

  let humidity = document.createElement("h3");
  humidity.innerText = `Humidity : ${data.list[0].main.humidity}`;

  let map = document.getElementById("gmap_canvas");

  map.src = `https://maps.google.com/maps?q=${data.city.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  box.append(buttn, name, cureent_temp, temp_min, temp_max, humidity);

  container.append(box);

  document.querySelector("#top2").innerHTML = null;
  let below = document.createElement("div");
  below.setAttribute("class", "below");

  let date = new Date();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  let day = date.getDay();

  let nextday = document.createElement("h2");
  nextday.innerText = "Next 7 day Weather Forecast of" + " " + data.city.name;
  nextday.setAttribute("id", "h2");

  for (let j = 0; j < 7; j++) {
    let box1 = document.createElement("div");
    box1.setAttribute("class", "box1");

    let days = document.createElement("h3");
    days.innerText = weekday[day];
    day++;
    if (day > 6) {
      day = 0;
    }

    let img = document.createElement("img");
    img.src =
      "http://openweathermap.org/img/wn/" +
      data.list[j].weather[0].icon +
      ".png";
    img.setAttribute("class", "fivebox");

    let min_temp = document.createElement("p");
    min_temp.innerText =
      "Min Temp : " + (data.list[j].main.temp_min - 288.53).toFixed(1) + " °C";

    let max_temp = document.createElement("p");
    max_temp.innerText =
      "Max Temp : " + (data.list[j].main.temp_max - 288.53).toFixed(1) + " °C";

    box1.append(days, img, min_temp, max_temp);
    below.append(box1);
  }

  document.querySelector("#top2").append(nextday, below);
}

function getweather() {
  console.log("hello form getWeather");

  navigator.geolocation.getCurrentPosition(success);

  function success(pos) {
    let crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    getDataLocation(crd.latitude, crd.longitude);
  }
}

function getHourlyForecast() {
  let cityName = document.getElementById("city").value;
  console.log("hello from hourly forecast");

  let below = document.createElement("div");
  below.setAttribute("class", "below");

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=430eb4c5521e2d96b6e75be4d048fba3`
  )
    .then((response) => response.json())
    .then((data) => {
      // Handle the hourly forecast data here
      console.log(data); // Log the data to the console for demonstration

      let hourly = document.createElement("h2");
      hourly.innerText = "Hourly Forecast of" + " " + data.city.name;
      hourly.setAttribute("id", "h2");

      for (let j = 0; j < 8; j++) {
        let box1 = document.createElement("div");
        box1.setAttribute("class", "box1");

        let img = document.createElement("img");
        img.src =
          "http://openweathermap.org/img/wn/" +
          data.list[j].weather[0].icon +
          ".png";
        img.setAttribute("class", "fivebox");

        let date = document.createElement("p");
        let formattedDate = formatDate(data.list[j].dt_txt);
        date.innerText = formattedDate;

        let min_temp = document.createElement("p");
        min_temp.innerText =
          "Min Temp : " +
          (data.list[j].main.temp_min - 288.53).toFixed(1) +
          " °C";

        let max_temp = document.createElement("p");
        max_temp.innerText =
          "Max Temp : " +
          (data.list[j].main.temp_max - 288.53).toFixed(1) +
          " °C";

        box1.append(img, min_temp, max_temp, date);
        below.append(box1);
        document.querySelector("#top2").append(hourly, below);
      }
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
    });
}

function formatDate(dateString) {
  const date = new Date(dateString); // Create a Date object from the date string
  const formattedDate = date.toLocaleDateString("en-IN"); // Format date as DD-MM-YYYY
  const formattedTime = date.toLocaleTimeString("en-IN", { hour12: false }); // Format time as HH:mm

  return `${formattedDate} ${formattedTime}`;
}
