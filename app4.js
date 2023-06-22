window.onload = function() {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        // obtén los datos de "FESTIVOS"
        const holidaysData = data["FESTIVOS"];

        // borra los datos de "FESTIVOS" para que no se procesen como una biblioteca
        delete data["FESTIVOS"];

        // procesa los datos de cada biblioteca con los datos de "FESTIVOS"
        for (let library in data) {
            for (let holiday in holidaysData) {
                if (!data[library][holiday]) {
                    data[library][holiday] = holidaysData[holiday];
                }
            }
        }

        // inicialmente, muestra la semana actual
        showWeek(data, 0);
        
        
        // establece los botones para navegar entre las semanas
        document.getElementById('prevWeek').addEventListener('click', function() {
          showWeek(data, -1);
        });
        document.getElementById('nextWeek').addEventListener('click', function() {
          showWeek(data, 1);
        });
        

        // Obtiene todos los elementos cuyo id contiene 'miPatron'
        var elementsPW = document.querySelectorAll('[id*=-prevWeek]');
        // Añade el event listener a cada uno
        for (let i = 0; i < elementsPW.length; i++) {
            elementsPW[i].addEventListener('click', function() {
              //console.log('Elemento clickeado: ', elementsPW[i].id);
              showWeek(data, -1);
            });
        }

        // Obtiene todos los elementos cuyo id contiene 'miPatron'
        var elementsNW = document.querySelectorAll('[id*=-nextWeek]');
        // Añade el event listener a cada uno
        for (let i = 0; i < elementsNW.length; i++) {
            elementsNW[i].addEventListener('click', function() {
              //console.log('Elemento clickeado: ', elementsNW[i].id);
              showWeek(data, 1);
            });
        }


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
    var schedule = "Semana " + weekNumber + ", del " + formatDate(monday) + " al " + formatDate(sunday) + "";
    for (var i = 1; i <= 7; i++) {
      var date = new Date(monday);
      date.setDate(date.getDate() + i);
      var dateString = dateToYYMMDD(date);

      // Busca el horario para esta fecha, si existe
      var dayScheduleOpen = "8:00"; // horario Apertura predeterminado
      var dayScheduleClose = "21:00"; // horario Cierre predeterminado
      var dayScheduleSeparador = "-"; // Separador predeterminado
      if (data[library] && data[library][dateString]) {
        if (data[library][dateString]["a"] == "0:00" && data[library][dateString]["c"] == "0:00") {
          dayScheduleOpen = "-";
          dayScheduleSeparador = "Cerrado";
          dayScheduleClose = "-";
        } else {
          dayScheduleOpen = data[library][dateString]["a"]; 
          dayScheduleClose = data[library][dateString]["c"];
          dayScheduleSeparador = "-";
        }
      }

          // QUITAR TODAY EN AZUL
    var escribeNombre = document.getElementById(library+'-dia'+(i+1)+'-nombre');
    var escribeAbrimos = document.getElementById(library+'-dia'+(i+1)+'-apertura');
    var escribeSeparador = document.getElementById(library+'-dia'+(i+1)+'-separador');
    var escribeCerramos = document.getElementById(library+'-dia'+(i+1)+'-cierre');

    // Primero, elimina las clases "current-day" y "closed-day" si ya existen
    if (escribeNombre) {
      escribeNombre.classList.remove('current-day', 'closed-day');
    }
    if (escribeAbrimos) {
      escribeAbrimos.classList.remove('current-day', 'closed-day');
    }
    if (escribeSeparador) {
      escribeSeparador.classList.remove('current-day', 'closed-day');
    }
    if (escribeCerramos) {
      escribeCerramos.classList.remove('current-day', 'closed-day');
    }

      // JEI - no sé porque he puesto i+1, sospecho que porque el primer dia de la semana es domingo

      
      if (escribeAbrimos) {
        escribeAbrimos.innerText = dayScheduleOpen;
      }

      
      if (escribeSeparador) {
        escribeSeparador.innerText = dayScheduleSeparador;
      }

      
      if (escribeCerramos) {
        escribeCerramos.innerText = dayScheduleClose;
      }

      
    // Comprueba si el día que se está procesando es el día actual
    var today = new Date();
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      // Si es así, añade la clase "current-day" a los elementos correspondientes
      if (escribeNombre) {
        escribeNombre.classList.add('current-day');
      }
      if (escribeAbrimos) {
        escribeAbrimos.classList.add('current-day');
      }
      if (escribeSeparador) {
        escribeSeparador.classList.add('current-day');
      }
      if (escribeCerramos) {
        escribeCerramos.classList.add('current-day');
      }
    }

    // Comprueba si la biblioteca está cerrada en este día
    if (dayScheduleSeparador === "Cerrado") {
      // Si es así, añade la clase "closed-day" a los elementos correspondientes
      if (escribeNombre) {
        escribeNombre.classList.add('closed-day');
      }
      if (escribeAbrimos) {
        escribeAbrimos.classList.add('closed-day');
      }
      if (escribeSeparador) {
        escribeSeparador.classList.add('closed-day');
      }
      if (escribeCerramos) {
        escribeCerramos.classList.add('closed-day');
      }
    }

    } // FIN DEL FOR

    var muestraSemana = document.getElementById(library+'-muestraSemana');
    if (muestraSemana) {
      muestraSemana.innerText = schedule;
    }


  }
}

// Función de utilidad para formatear fechas al formato YYMMDD
function dateToYYMMDD(date) {
  var year = date.getFullYear().toString().substr(-2);
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var day = date.getDate().toString().padStart(2, '0');
  return year + month + day;
}

function formatDate(date) {
  var day = date.getDate().toString().padStart(2, '0');
  var month = (date.getMonth() + 1).toString().padStart(2, '0');
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
