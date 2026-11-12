This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | URL base de la API (`.../jiltsa/api/v1`). |
| `NEXT_PUBLIC_S3_HOSTNAME` | Host del bucket que sirve las fotografías de los artículos en promoción (solo el hostname, sin `https://`). `next/image` rechaza hosts remotos que no estén registrados en `next.config.js`. |

## Versionado y releases

Este proyecto usa [Semantic Versioning](https://semver.org/lang/es/) (`MAJOR.MINOR.PATCH`).
La versión vive en `package.json` y cada release se marca con un tag `vX.Y.Z`.

| Cambio | Bump | Tipo de commit |
| --- | --- | --- |
| Rompe compatibilidad (flujos, contratos con la API, variables de entorno) | `major` | `feat!:` / `fix!:` o `BREAKING CHANGE:` en el cuerpo |
| Nueva funcionalidad compatible | `minor` | `feat:` |
| Corrección de errores, sin cambio de comportamiento | `patch` | `fix:`, `perf:` |
| Sin impacto en la app (docs, CI, refactors internos) | ninguno | `docs:`, `chore:`, `ci:`, `refactor:`, `test:` |

### Commits

Los mensajes siguen [Conventional Commits](https://www.conventionalcommits.org/es/).
El hook `.githooks/commit-msg` los valida y se activa solo al correr `pnpm install`
(script `prepare`). Para activarlo a mano: `git config core.hooksPath .githooks`.

### Publicar una versión

1. Mover lo pendiente de `## [Unreleased]` a una sección nueva en `CHANGELOG.md`
   con la versión y la fecha, y hacer commit (`docs: changelog vX.Y.Z`).
2. Ejecutar según el tipo de cambio:

   ```bash
   pnpm release:patch   # 1.3.0 -> 1.3.1
   pnpm release:minor   # 1.3.0 -> 1.4.0
   pnpm release:major   # 1.3.0 -> 2.0.0
   pnpm release:pre     # 1.3.0 -> 1.3.1-rc.0 (pre-release)
   ```

   Esto corre el lint, actualiza `package.json`, crea el commit `chore(release): vX.Y.Z`
   y el tag `vX.Y.Z`.
3. Publicar: `git push --follow-tags`.

Al subir el tag, el workflow `.github/workflows/release.yml` verifica que coincida con
`package.json` y crea el GitHub Release con las notas de esa versión del `CHANGELOG.md`.

La versión queda disponible en la app como `process.env.NEXT_PUBLIC_APP_VERSION`.
