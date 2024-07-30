# horariosBUS

Aplicación de gestión de horarios basada en html, css y js.
La aplicación está publicada en https://bib.us.es/horarios



## TO-DO
- El día 30 de Julio de 2024 hice una actulización con el codigo funcionando en el servidor.
- El fichero "ejemplo_excepcionesHorarios.json" se deja como fichero de ejemplo del formato para indicar horarios.
- Se han cambiado los colores de azul a rojo.
- Se han añadido los apartados para indicar los puestos y la ocupación de la biblioteca.
- No se muestran flechas para ver las semanas pasadas ni las futuras de más de dos meses.
- Se indica el dia de hoy añadiendole un marco amarillos.
- Se escribe una entradilla que explica el porqué de los horarios y sus excepciones.


## Optimizaciones del fichero de excepciones

 - python3 eliminaDiasPasados.py --> con este script el fichero excepcionesHorarios.json ha pasado de 83kb a 60kb, ha eliminado todas las entradas de dias anteriores al lunes de la presente semana.

 - python3 minificarJson.py --> con este script el fichero excepcionesHorarios.json ha pasado de 60kb a 25kb, ha eliminado todos los espacios que no eran útiles.


