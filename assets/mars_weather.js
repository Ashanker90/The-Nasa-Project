var req = new XMLHttpRequest();
var api_key = "9y3Tse8OLkkMvf3FEoY9Y17IcK2u33hWMhGg5ubR";
var url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`;

req.open("GET", url);
req.send();

req.addEventListener("load", function() {
    if (req.status == 200 && req.readyState == 4) {
        var response = JSON.parse(req.responseText);
        const sol = response.sol_keys[6];
        document.getElementById("mars_weather_title").textContent =  response.sol_keys[6];
        document.getElementById("temperature").textContent = response[sol].AT.av;
        document.getElementById("atmospheric_pressure").textContent = response[sol].PRE.av;
        document.getElementById("wind_speed").textContent = response[sol].HWS.av;
    }
})

