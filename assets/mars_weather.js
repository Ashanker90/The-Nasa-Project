let api_key = "9y3Tse8OLkkMvf3FEoY9Y17IcK2u33hWMhGg5ubR";
let url = `https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`;

getMarsData().then(response => {
    const length = response.sol_keys.length - 1;
    const sol = response.sol_keys[length];

    document.getElementById("mars-date").textContent = "SOL " + response.sol_keys[length];
    date = new Date(response[sol].Last_UTC);
    let month = date.toLocaleString("en-us", { month: "short" });
    let day = date.getDate();
    let year = date.getFullYear();
    let newDate = month +' ' + day +' ' + year;

    let SEASON = "N/A";
    if ("Season" in response[sol]) {
        SEASON = response[sol].Season === null ? "N/A" : response[sol].Season;
    }

    let HIGH = "N/A";
    if ("AT" in response[sol]) {
        HIGH = response[sol].AT.mx === null ? "N/A" : response[sol].AT.mx;
    }

    let LOW = "N/A";
    if ("AT" in response[sol]) {
        LOW = response[sol].AT.mN === null ? "N/A" : response[sol].AT.mn;
    }

    let WD = "N/A";
    if ("most_common" in response[sol]) {
        WD = response[sol].WD.most_common === null ? "N/A" : response[sol].WD.most_common.compass_point;
    }

    let WS = "N/A";
    if ("HWS" in response[sol]) {
        WS = response[sol].HWS.mx;
    }

    let AP = "N/A";
    if ("PRE" in response[sol]) {
        AP = response[sol].PRE.mx === null ? "N/A" : response[sol].PRE.mx;
    }

    document.getElementById("earth-date").textContent = newDate;
    document.getElementById("season").textContent = "Season: " + SEASON;
    document.getElementById("temp-high").textContent = "High: " + HIGH;
    document.getElementById("temp-low").textContent = "Low: " + LOW;
    document.getElementById("wind-direction").textContent = "Wind Direction: " + WD;
    document.getElementById("wind-speed").textContent = "Wind Speed: " + WS + " (m/s)";
    document.getElementById("atmospheric-pressure").textContent = "Atmospheric Pressure: " + AP;

    buildTable(response);
})

async function getMarsData() {
    try {
        const req = await fetch(url);
        const res = await req.json();

        return res;
    } catch (error) {
        alert("Error occurred while calling Mars API. Please retry...");
    }
}

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
