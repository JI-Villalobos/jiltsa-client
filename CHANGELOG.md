# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto
usa [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [1.4.0] - 2026-11-12

### Added
- Los mensajes de error de la UI muestran el `detail` o `title` del ProblemDetail
  que devuelve la API, con el texto anterior del componente como respaldo.
- Helpers `getProblemDetail`, `getErrorMessage` y `failedRequestFrom` en la capa de
  servicios, y campo `message` en `RequestStatus`.
- Semantic versioning: CHANGELOG, hook de Conventional Commits, scripts `release:*`,
  workflow de GitHub Release por tag y `NEXT_PUBLIC_APP_VERSION` expuesta en la app.

### Fixed
- `furnitureCleanConditions` del check-list se envía como código numérico (1, 2 o 3),
  acorde al tipo `byte` que declara la API, en lugar de texto.

## [1.3.0] - 2026-10-15

### Added
- Modal de cierre de orden con registro de gasto operativo.

### Changed
- Servicios de API alineados con la última versión de `api-docs.json`.
- Tipos de los servicios corregidos para coincidir con los esquemas de la API.

[Unreleased]: https://github.com/JI-Villalobos/jiltsa-client/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/JI-Villalobos/jiltsa-client/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/JI-Villalobos/jiltsa-client/releases/tag/v1.3.0
