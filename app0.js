window.onload = function() {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => updateSchedule(data))
      .catch(error => console.error('Error:', error));
  };
  
  function updateSchedule(data) {
    // Obtén la fecha del lunes y domingo de esta semana
    var now = new Date();
    var monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    var sunday = new Date(now);
    sunday.setDate(sunday.getDate() - sunday.getDay() + 7);
  
    // Formatea las fechas al formato YYMMDD
    var mondayString = formatDate(monday);
    var sundayString = formatDate(sunday);
  
    // Recorre cada biblioteca en los datos
    for (var library in data) {
      // Genera el horario semanal
      var schedule = "Semana del " + mondayString + " al " + sundayString + ":\n";
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
        }
  
        // Añade este día al horario
        schedule += "\n" + date.toLocaleString('es-ES', { weekday: 'short' }) + ": " + openTime + " - " + closeTime;
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
    return year + month + day;
  }
  
  