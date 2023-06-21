let libraryData;
let holidaysData;

// fetch both json files
Promise.all([
    fetch('libraryAC.json').then(response => response.json()),
    fetch('festivos.json').then(response => response.json())
]).then(([libraryDataJson, holidaysDataJson]) => {
    libraryData = libraryDataJson;
    holidaysData = holidaysDataJson;

    // Process library data with holiday data
    for (let library in libraryData) {
        for (let holiday in holidaysData) {
            if (libraryData[library][holiday]) {
                //libraryData[library][holiday] = holidaysData[holiday];
            }
        }
    }

    // After data processed, draw the initial library schedule
    drawLibrarySchedule();
});

function drawLibrarySchedule() {
    // Get current date
    let currentDate = new Date();
    
    // Draw for each library
    for(let library in libraryData){
        let weekDays = getWeekDays(getWeekNumber(currentDate));
        let libraryDiv = document.getElementById("W" + library);
        libraryDiv.innerHTML = drawWeek(weekDays, library);
    }
}

function drawWeek(weekDays, library){
    let weekStr = "Semana " + getWeekNumber(weekDays[0])[1] + ", del " + formatDate(weekDays[0]) + " al " + formatDate(weekDays[weekDays.length-1]) + "<br>";

    let daysStr = weekDays.map(formatDayOfWeek).join(" ");
    weekStr += daysStr + "<br>";

    let openStr = weekDays.map(day => getOpenTime(day, library)).join(" ");
    weekStr += openStr + "<br>";

    let closeStr = weekDays.map(day => getCloseTime(day, library)).join(" ");
    weekStr += closeStr + "<br>";

    return weekStr;
}

function getOpenTime(date, library){
    let day = formatYYMMDD(date);
    let openTime = libraryData[library][day] ? libraryData[library][day]['a'] : "8:00";
    return openTime == "0:00" ? "Cerrado" : openTime;
}

function getCloseTime(date, library){
    let day = formatYYMMDD(date);
    let closeTime = libraryData[library][day] ? libraryData[library][day]['c'] : "21:00";
    return closeTime == "0:00" ? "" : closeTime;
}

// ...rest of the helper functions...
