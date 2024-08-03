# horariosBUS

Aplicación de gestión de horarios basada en html, css y js.
La aplicación está publicada en https://bib.us.es/horarios



## pheditor

Es una subaplicación para editar el fichero de excepciones.

### Optimizaciones del fichero de excepciones

 - python3 eliminaDiasPasados.py --> con este script el fichero excepcionesHorarios.json ha pasado de 83kb a 60kb, ha eliminado todas las entradas de dias anteriores al lunes de la presente semana.

 - python3 minificarJson.py --> con este script el fichero excepcionesHorarios.json ha pasado de 60kb a 25kb, ha eliminado todos los espacios que no eran útiles.


## ocupacion
Es una subaplicación para controlar los tags indicadores de ocupación.