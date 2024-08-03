    // Función para formatear la fecha
    function formatearFecha(fecha) {
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        let diaSemana = diasSemana[fecha.getDay()];
        let dia = fecha.getDate();
        let mes = meses[fecha.getMonth()];
        let anio = fecha.getFullYear();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes().toString().padStart(2, '0');

        return `${diaSemana},  ${dia} de ${mes} de ${anio}, a las ${hora}:${minutos}`;
    }

    // dia del año en formato Diade la semana, dia-mes-año
    let fecha = new Date();
    let dia = fecha.getDay();
    let mes = fecha.getMonth();
    let anio = fecha.getFullYear();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    // escribimos la fecha en el html
    var fechaFormateada = '';
    document.getElementById('dia-hora').innerHTML = formatearFecha(fecha);


    