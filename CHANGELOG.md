# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/) y el proyecto
usa [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

## [1.5.0] - 2026-11-12

### Added
- Página de promociones (`/promotions`): abrir una promoción, ver las activas de la
  sucursal con su pérdida estimada y cerrarlas registrando la pérdida por caducidad.
- Detalle de promoción con stepper (promoción, artículos, fotografías): alta de artículos
  manual o por xlsx con plantilla descargable, registro de ventas que reduce la cantidad
  del artículo y carga de fotografías a S3 mediante URL prefirmada.
- Servicios para `promotions`, `promotion-items`, `files` y `expiration-losses`.
- Variable `NEXT_PUBLIC_S3_HOSTNAME` para permitir las fotografías en `next/image`.

### Changed
- El header muestra la versión de `package.json` en lugar de un texto fijo.

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

[Unreleased]: https://github.com/JI-Villalobos/jiltsa-client/compare/v1.5.0...HEAD
[1.5.0]: https://github.com/JI-Villalobos/jiltsa-client/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/JI-Villalobos/jiltsa-client/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/JI-Villalobos/jiltsa-client/releases/tag/v1.3.0
