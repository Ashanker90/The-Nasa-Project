let req = new XMLHttpRequest();
let api_key = "9y3Tse8OLkkMvf3FEoY9Y17IcK2u33hWMhGg5ubR";
let url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`;

req.open("GET", url);
req.send();

req.addEventListener("load", function() {
    if (req.status == 200 && req.readyState == 4) {
        const response = JSON.parse(req.responseText);
        const length = response.sol_keys.length - 1;
        const sol = response.sol_keys[length];

        document.getElementById("mars-date").textContent = "SOL " + response.sol_keys[length];
        date = new Date(response[sol].Last_UTC);
        let month = date.toLocaleString("en-us", { month: "short" });
        let day = date.getDate();
        let year = date.getFullYear();
        let newDate = month +' ' + day +' ' + year;
        document.getElementById("earth-date").textContent = newDate;
        document.getElementById("season").textContent = "Season: " + response[sol].Season;
        document.getElementById("temp-high").textContent = "High: " + response[sol].AT.mx;
        document.getElementById("temp-low").textContent = "Low: " + response[sol].AT.mn;
        document.getElementById("wind-direction").textContent = "Wind Direction: " + response[sol].WD.most_common.compass_point;
        document.getElementById("wind-speed").textContent = "Wind Speed: " + response[sol].HWS.mx + " (m/s)";
        document.getElementById("atmospheric-pressure").textContent = "Atmospheric Pressure: " + response[sol].PRE.mx;

        buildTable(response);
    }
})

function buildTable(data) {
    const solKeys = data.sol_keys;
    let table = document.getElementById("sol-table-body");

    let solRow = "<tr class='sol-table-body-row'/>";
    let earthDateRow = "<tr class='sol-table-body-row'/>";
    let highTempRow = "<tr class='sol-table-body-row'/>";
    let lowTempRow = "<tr class='sol-table-body-row'/>";

    for (let i = 0; i < solKeys.length; i++) {
        const sol = solKeys[i];
        date = new Date(data[sol].Last_UTC);
        let month = date.toLocaleString("en-us", { month: "short" });
        let day = date.getDate();
        let year = date.getFullYear();
        let newDate = month +' ' + day +' ' + year;

        solRow += "<td>" + sol + "</td>";
        earthDateRow += "<td>" + newDate + "</td>";

        let high_temp = "N/A";
        let low_temp = "N/A";
        if ("AT" in data[sol]) {
            high_temp = data[sol].AT.mx;
            low_temp = data[sol].AT.mn;
        }

        highTempRow += "<td>High: " + high_temp + "<span>&deg;&nbsp;C</span></td>";
        lowTempRow += "<td>Low: " + low_temp + "<span>&deg;&nbsp;C</span></td>";
    }

    table.innerHTML += solRow + earthDateRow + highTempRow + lowTempRow;
}
