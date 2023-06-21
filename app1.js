window.onload = function() {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        // inicialmente, muestra la semana actual
        showWeek(data, 0);
        
        // establece los botones para navegar entre las semanas
        document.getElementById('prevWeek').addEventListener('click', function() {
          showWeek(data, -1);
        });
        document.getElementById('nextWeek').addEventListener('click', function() {
          showWeek(data, 1);
        });
      })
      .catch(error => console.error('Error:', error));
  };
  
  var currentWeekOffset = 0;
  
  function showWeek(data, weekOffset) {
    currentWeekOffset += weekOffset;
  
    // Obtiene la fecha del lunes y domingo de la semana correspondiente
    var now = new Date();
    now.setDate(now.getDate() + 7 * currentWeekOffset);
    var monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    var sunday = new Date(now);
    sunday.setDate(sunday.getDate() - sunday.getDay() + 7);
    var weekNumber = getWeekNumber(monday);
  
    // Recorre cada biblioteca en los datos
    for (var library in data) {
      // Genera el horario semanal
      var schedule = "Semana " + weekNumber + ", del " + formatDate(monday) + " al " + formatDate(sunday) + ":\n";
      for (var i = 0; i < 7; i++) {
        var date = new Date(monday);
        date.setDate(date.getDate() + i);
        var dateString = formatDate(date);
  
        // Busca el horario para esta fecha, si existe
        var openTime = "8:00";
        var closeTime = "21:00";
        if (data[library][dateString]) {
          openTime = data[library][dateString]["a"];
          closeTime = data[library][dateString]["c"];
          if (openTime == "0:00" && closeTime == "0:00") {
            openTime = "Cerrado";
            closeTime = "";
          }
        }
  
        // Añade este día al horario
        schedule += "\n" + date.toLocaleString('es-ES', { weekday: 'short' }) + ": " + openTime;
        if (closeTime) schedule += " - " + closeTime;
      }
  
      // Actualiza el div con este horario
      var div = document.getElementById('W' + library);
      if (div) {
        div.innerText = schedule;
      }
    }
  }
  
  // Función de utilidad para formatear fechas al formato YYMMDD
  function formatDate(date) {
    var year = date.getFullYear().toString().substr(-2);
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return day + "/" + month;
  }
  
  // Función para obtener el número de semana del año
  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
  }
  