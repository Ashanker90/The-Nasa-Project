var req = new XMLHttpRequest();
var api_key = "9y3Tse8OLkkMvf3FEoY9Y17IcK2u33hWMhGg5ubR";
var url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`;

req.open("GET", url);
req.send();

req.addEventListener("load", function() {
    if (req.status == 200 && req.readyState == 4) {
        const response = JSON.parse(req.responseText);
        const sol = response.sol_keys[6];
        document.getElementById("mars-date").textContent = "SOL " + response.sol_keys[6];
        date = new Date(response[sol].First_UTC).toDateString();
        document.getElementById("earth-date").textContent = date;
        document.getElementById("season").textContent = "Season: "+ response[sol].Season.toUpperCase();
        document.getElementById("temp-high").textContent = "High: " + response[sol].AT.mx;
        document.getElementById("temp-low").textContent = "Low: " + response[sol].AT.mn;

        buildTable(response);

        // document.getElementById("sol-col1").textContent = "Sol " + response.sol_keys[0];
        // document.getElementById("sol-col2").textContent = "Sol " + response.sol_keys[1];
        // document.getElementById("sol-col3").textContent = "Sol " + response.sol_keys[2];
        // document.getElementById("sol-col4").textContent = "Sol " + response.sol_keys[3];
        // document.getElementById("sol-col5").textContent = "Sol " + response.sol_keys[4];
        // document.getElementById("sol-col6").textContent = "Sol " + response.sol_keys[5];
    }
})

function buildTable(data) {
    const solKeys =  data.sol_keys;
    var table = document.getElementById("sol-table-body");

    var solRow = "<tr class='sol-table-body-row'/>";
    var earthDateRow = "<tr class='sol-table-body-row'/>";
    var highTempRow = "<tr class='sol-table-body-row'/>";
    var lowTempRow = "<tr class='sol-table-body-row'/>";

    for (var i = 0; i < solKeys.length; i++) {
        const sol = solKeys[i];
        const earthDate = new Date(data[sol].First_UTC).toDateString();
        // Mon Oct 05 2020

        solRow += "<td>" + sol + "</td>";
        earthDateRow += "<td>" + earthDate + "</td>";
        highTempRow += "<td>High: " + data[sol].AT.mx + "</td>";
        lowTempRow += "<td>Low: " + data[sol].AT.mn + "</td>";
    }

    table.innerHTML += solRow + earthDateRow + highTempRow + lowTempRow;
}

