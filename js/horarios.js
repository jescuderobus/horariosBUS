window.onload = function() {
    fetch(jsonFile)
      .then(response => response.json())
      .then(data => {
        // obtÃ©n los datos de "FESTIVOS"
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
        // AÃ±ade el event listener a cada uno
        for (let i = 0; i < elementsPW.length; i++) {
            elementsPW[i].addEventListener('click', function() {
              //console.log('Elemento clickeado: ', elementsPW[i].id);
              showWeek(data, -1);
            });
        }

        // Obtiene todos los elementos cuyo id contiene 'miPatron'
        var elementsNW = document.querySelectorAll('[id*=-nextWeek]');
        // AÃ±ade el event listener a cada uno
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

var fechaLunes = formatDateDay(monday);
//alert(fechaMartes);

  // Recorre cada biblioteca en los datos
  for (var library in data) {
    // Genera el horario semanal
    var schedule = "del " + formatDate(monday) + " al " + formatDate(sunday) + "";
    for (var i = 0; i < 7; i++) {
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
    var escribeFecha = document.getElementById(library+'-dia'+i+'-fecha');
    var escribeNombre = document.getElementById(library+'-dia'+i+'-nombre');
    var escribeAbrimos = document.getElementById(library+'-dia'+i+'-apertura');
    var escribeSeparador = document.getElementById(library+'-dia'+i+'-separador');
    var escribeCerramos = document.getElementById(library+'-dia'+i+'-cierre');

      // No se ve la semana pasada ni mas de 8 semanas en el futuro
      if (currentWeekOffset <=8 || currentWeekOffset >=0) {
        document.getElementById(library+'-prevWeek').style.display = 'block';
        document.getElementById(library+'-nextWeek').style.display = 'block';
      }
      if (currentWeekOffset >=8) {
        currentWeekOffset=8;
        document.getElementById(library+'-nextWeek').style.display = 'none';
      }
      if (currentWeekOffset <=0) {
        
        currentWeekOffset=0;
        document.getElementById(library+'-prevWeek').style.display = 'none';
      }

    // Primero, elimina las clases "current-day" y "closed-day" si ya existen
    if (escribeFecha) {
      escribeFecha.classList.remove('current-day', 'closed-day');
    }
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

      // JEI - no sÃ© porque he puesto i+1, sospecho que porque el primer dia de la semana es domingo

      var dayMonth = formatDateDay(monday,i,currentWeekOffset);

      if (escribeFecha) {
      escribeFecha.innerText = dayMonth;
      }
      
      if (escribeAbrimos) {
        escribeAbrimos.innerText = dayScheduleOpen;
      }

      
      if (escribeSeparador) {
        escribeSeparador.innerText = dayScheduleSeparador;
      }

      
      if (escribeCerramos) {
        escribeCerramos.innerText = dayScheduleClose;
      }

      
    // Comprueba si el dÃ­a que se estÃ¡ procesando es el dÃ­a actual
    var today = new Date();
    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
      // Si es asÃ­, aÃ±ade la clase "current-day" a los elementos correspondientes
      if (escribeFecha) {
        escribeFecha.classList.add('current-day');
      }
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

    // Comprueba si la biblioteca estÃ¡ cerrada en este dÃ­a
    if (dayScheduleSeparador === "Cerrado") {
      // Si es asÃ­, aÃ±ade la clase "closed-day" a los elementos correspondientes
      if (escribeFecha) {
        escribeFecha.classList.add('closed-day');
      }
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


//---------------------------------------------
    if (currentWeekOffset > 0) {
      // ponemos ocupacion a un valor fijo
      var escribeOcupacion = document.getElementsByClassName('ocupacion');
      for (var j = 0; j < escribeOcupacion.length; j++) {
        escribeOcupacion[j].innerText = "ocupacion ---";
      }
    } else{
      // recarga la pagina una vez
    }

//---------------------------------------------
    
    if (currentWeekOffset == 0) {
      // Añadir el marco amarillo al día actual
      var currentDays = document.querySelectorAll('.current-day');
      currentDays.forEach(function(day) {
          if (!day.classList.contains('ignore-class')) {
              day.parentElement.classList.add('parent-of-current-day');
          }
      });
  } else {
      // Eliminar el marco amarillo de las semanas pasadas y futuras
      var currentDays = document.querySelectorAll('.current-day');
      currentDays.forEach(function(day) {
          if (!day.classList.contains('ignore-class')) {
              day.parentElement.classList.remove('parent-of-current-day');
          }
      });
  }

    } // FIN DEL FOR


  

    var muestraSemana = document.getElementById(library+'-muestraSemana');
    if (muestraSemana) {
      muestraSemana.innerText = schedule;
    }




  }
}

// FunciÃ³n de utilidad para formatear fechas al formato YYMMDD
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

function formatDateDay(date, i) {
  var newDate = new Date(date);
  newDate.setDate(newDate.getDate() + i);
  
  var day = newDate.getDate().toString().padStart(2, '0');
  var month = newDate.toLocaleString('default', { month: 'short' });
  
  return day + " " + month;
}

// FunciÃ³n para obtener el nÃºmero de semana del aÃ±o
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo;
}
