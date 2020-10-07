var req = new XMLHttpRequest();
var api_key = "9y3Tse8OLkkMvf3FEoY9Y17IcK2u33hWMhGg5ubR";
var url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`;

req.open("GET", url);
req.send();

req.addEventListener("load", function() {
    if (req.status == 200 && req.readyState == 4) {
        var response = JSON.parse(req.responseText);
        const sol = response.sol_keys[6];
        document.getElementById("mars-date").textContent = "SOL " + response.sol_keys[6];
        date = new Date(response[sol].First_UTC).toDateString();
        document.getElementById("earth-date").textContent = date;
        document.getElementById("season").textContent = "Season: "+ response[sol].Season.toLocaleUpperCase();
        document.getElementById("temp-high").textContent = "High: " + response[sol].AT.mx;
        document.getElementById("temp-low").textContent = "Low: " + response[sol].AT.mn;
        // document.getElementById("sol-col1").textContent = "Sol " + response.sol_keys[0];
        // document.getElementById("sol-col2").textContent = "Sol " + response.sol_keys[1];
        // document.getElementById("sol-col3").textContent = "Sol " + response.sol_keys[2];
        // document.getElementById("sol-col4").textContent = "Sol " + response.sol_keys[3];
        // document.getElementById("sol-col5").textContent = "Sol " + response.sol_keys[4];
        // document.getElementById("sol-col6").textContent = "Sol " + response.sol_keys[5];
    }
})

