# Changelog

Todas las notas importantes sobre los cambios en este proyecto se documentarán en este archivo.

## [Unreleased]
### Added
- Nueva funcionalidad para gestionar los usuarios y sus reportes de ocupación.
- Scripts de personalización en Post-Instalación
- archivos .htaccess para gestionar flujo y seguridad de la aplicación.
- generador de bibliotecas a partir de Machado

## Changed
- Cambiado a font-awesome 6.6.0
- Añadido icono SVG de máquina de vending y de salas de trabajo en grupo




## [1.1.0] - 2024-08-03
### Added
- Nueva funcionalidad para gestionar los reportes de ocupación.
- Api REST que indica la ocupación de cada bibioteca.
- Páginas de demostración de como gestionar los reportes de ocupación.

### Fixed
- Eliminadas páginas de demostración

## [1.0.1] - 2024-07-30
### Added
- Se han añadido apartados para indicar aforo y ocupación de cada biblioteca.
- Se indica el dia de hoy añadiendole un marco amarillo.
- Se escribe una entradilla que explica el porqué de los horarios y sus excepciones.

### Changed
- Se han cambiado los colores destacados de azul a rojo.


### Fixed
- No se muestran flechas para ver las semanas pasadas ni las futuras de más de dos meses.
- Se han creado Scripts en python que optimizan el json de excepciones, elimina dias pasados y minifica el json.
- El fichero "code/ejemplo_excepcionesHorarios.json" se deja como fichero de ejemplo del formato para indicar horarios.

## [1.0.0] - 2023-07-03
### Added
- Publicación inicial de la aplicación de gestión de horarios.