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

    let HIGH_C = "N/A";
    let HIGH_F = "N/A";
    if ("AT" in response[sol]) {
        HIGH_C = response[sol].AT.mx === null ? "N/A" : response[sol].AT.mx.toFixed(3);
        HIGH_F = response[sol].AT.mx === null ? "N/A" : ((response[sol].AT.mx) * (9/5) + 32).toFixed(3);
    }

    let LOW_C = "N/A";
    let LOW_F = "N/A";
    if ("AT" in response[sol]) {
        LOW_C = response[sol].AT.mn === null ? "N/A" : response[sol].AT.mn.toFixed(3);
        LOW_F = response[sol].AT.mn === null ? "N/A" :((response[sol].AT.mn) * (9/5) + 32).toFixed(3);
    }

    let WD = "N/A";
    if ("most_common" in response[sol]) {
        WD = response[sol].WD.most_common === null ? "N/A" : response[sol].WD.most_common.compass_point;
    }

    let WS = "N/A";
    if ("HWS" in response[sol]) {
        WS = response[sol].HWS.mx.toFixed(3);
    }

    let AP = "N/A";
    if ("PRE" in response[sol]) {
        AP = response[sol].PRE.mx === null ? "N/A" : response[sol].PRE.mx.toFixed(5);
    }

    document.getElementById("earth-date").textContent = newDate;
    document.getElementById("season").textContent = "Season: " + SEASON;
    document.getElementById("temp-high-c").textContent = "High: " + HIGH_C + '°';
    document.getElementById("temp-high-f").textContent = "High: " + HIGH_F + '°';
    document.getElementById("temp-low-c").textContent = "Low: " + LOW_C + '°';
    document.getElementById("temp-low-f").textContent = "Low: " + LOW_F + '°';
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
        alert("Error occurred while calling the Mars API. Please try again...");
    }
}

function buildTable(data) {
    const solKeys = data.sol_keys;
    let table = document.getElementById("sol-table-body");

    let solRow = "<tr class='sol-table-body-row'/>";
    let earthDateRow = "<tr class='sol-table-body-row'/>";
    let highTempRow_c = "<tr id='tr-high-c' class='sol-table-body-row' style='display: inline-list-item;'/>";
    let lowTempRow_c = "<tr id='tr-low-c' class='sol-table-body-row' style='display: inline-list-item;'/>";
    let highTempRow_f = "<tr id='tr-high-f' class='sol-table-body-row' style='display: none;'/>";
    let lowTempRow_f = "<tr id='tr-low-f' class='sol-table-body-row' style='display: none;'/>";

    for (let i = 0; i < solKeys.length; i++) {
        const sol = solKeys[i];
        date = new Date(data[sol].Last_UTC);
        let month = date.toLocaleString("en-us", { month: "short" });
        let day = date.getDate();
        let year = date.getFullYear();
        let newDate = month +' ' + day +' ' + year;

        solRow += "<td>" + sol + "</td>";
        earthDateRow += "<td style='border-bottom-style: solid'>" + newDate + "</td>";

        let high_temp_c = "N/A";
        let low_temp_c = "N/A";
        let high_temp_f = "N/A";
        let low_temp_f = "N/A";
        if ("AT" in data[sol]) {
            high_temp_c = data[sol].AT.mx.toFixed(3);
            low_temp_c = data[sol].AT.mn.toFixed(3);
            high_temp_f = ((data[sol].AT.mx) * (9/5) + 32).toFixed(3);
            low_temp_f = ((data[sol].AT.mn) * (9/5) + 32).toFixed(3);
        }

        highTempRow_c += "<td id='td-high-c'>High: " + high_temp_c + "<span>&deg;&nbsp;C</span></td>";
        lowTempRow_c += "<td id='td-low-c'>Low: " + low_temp_c + "<span>&deg;&nbsp;C</span></td>";
        highTempRow_f += "<td id='td-high-f'>High: " + high_temp_f + "<span>&deg;&nbsp;F</span></td>";
        lowTempRow_f += "<td id='td-low-f'>Low: " + low_temp_f + "<span>&deg;&nbsp;F</span></td>";
    }

    table.innerHTML += solRow + earthDateRow + highTempRow_c + lowTempRow_c + highTempRow_f + lowTempRow_f;
}

function toggleTemp(c_f) {
    if (c_f == 'F') {
        document.getElementById('temp-high-f').style = 'display: inline-block;';
        document.getElementById('lbl-temp-high-f').style = 'color: #dddddd; cursor: text;';
        document.getElementById('tr-high-f').style = 'display: inline-list-item;';

        document.getElementById('temp-low-f').style = 'display: inline-block;';
        document.getElementById('lbl-temp-low-f').style = 'color: #dddddd; cursor: text;';
        document.getElementById('tr-low-f').style = 'display: inline-list-item;';

        document.getElementById('temp-high-c').style = 'display: none;';
        document.getElementById('lbl-temp-high-c').style = 'color: white; cursor: pointer;';
        document.getElementById('tr-high-c').style = 'display: none;';

        document.getElementById('temp-low-c').style = 'display: none;';
        document.getElementById('lbl-temp-low-c').style = 'color: white; cursor: pointer;';
        document.getElementById('tr-low-c').style = 'display: none;';
    } else if (c_f = 'C') {
        document.getElementById('temp-high-c').style = 'display: inline-block;';
        document.getElementById('lbl-temp-high-c').style = 'color: #dddddd; cursor: text;';
        document.getElementById('tr-high-c').style = 'display: inline-list-item;';

        document.getElementById('temp-low-c').style = 'display: inline-block;';
        document.getElementById('lbl-temp-low-c').style = 'color: #dddddd; cursor: text;';
        document.getElementById('tr-low-c').style = 'display: inline-list-item;';

        document.getElementById('temp-high-f').style = 'display: none;';
        document.getElementById('lbl-temp-high-f').style = 'color: white; cursor: pointer;';
        document.getElementById('tr-high-f').style = 'display: none;';

        document.getElementById('temp-low-f').style = 'display: none;';
        document.getElementById('lbl-temp-low-f').style = 'color: white; cursor: pointer;';
        document.getElementById('tr-low-f').style = 'display: none;';
    } else {
        alert("Invalid degree type?");
    }
}