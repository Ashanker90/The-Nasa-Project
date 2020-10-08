var req = new XMLHttpRequest();
var api_key = "9y3Tse8OLkkMvf3FEoY9Y17IcK2u33hWMhGg5ubR";
var url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`;

req.open("GET", url);
req.send();

req.addEventListener("load", function() {
    if (req.status == 200 && req.readyState == 4) {
        const response = JSON.parse(req.responseText);
        const sol = response.sol_keys[6];
        document.getElementById("header").textContent = "Weather on Mars";
        document.getElementById("mars-date").textContent = "SOL " + response.sol_keys[6];
        date = new Date(response[sol].First_UTC);
        var month = date.toLocaleString("en-us", { month: "short" });
        var day = date.getDate();
        var year = date.getFullYear();
        var newDate = month +' ' + day +' ' + year
        document.getElementById("earth-date").textContent = newDate;
        document.getElementById("season").textContent = "Season: " + response[sol].Season;
        document.getElementById("temp-high").textContent = "High: " + response[sol].AT.mx;
        document.getElementById("temp-low").textContent = "Low: " + response[sol].AT.mn;

        buildTable(response);
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
        date = new Date(data[sol].First_UTC);
        var month = date.toLocaleString("en-us", { month: "short" });
        var day = date.getDate();
        var year = date.getFullYear();
        var newDate = month +' ' + day +' ' + year

        solRow += "<td>" + sol + "</td>";
        earthDateRow += "<td>" + newDate + "</td>";
        highTempRow += "<td>High: " + data[sol].AT.mx + "<span>&deg;&nbsp;C</span></td>";
        lowTempRow += "<td>Low: " + data[sol].AT.mn + "<span>&deg;&nbsp;C</span></td>";
    }

    table.innerHTML += solRow + earthDateRow + highTempRow + lowTempRow;
}

