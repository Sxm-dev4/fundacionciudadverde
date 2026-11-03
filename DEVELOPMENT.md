# Desarrollo — Fundación Ciudad Verde

## Stack

- Next.js con App Router.
- React y TypeScript en modo `strict`.
- ESLint con las reglas de Next.js, Core Web Vitals y TypeScript.
- CSS Modules para componentes y CSS global para tokens y normalización.
- Manrope mediante `next/font/google`.
- Sin Tailwind, librerías UI, CMS ni backend.

## Estructura

```text
web/
├── app/                    # Layout raíz y rutas de App Router
├── components/
│   ├── global/             # HeaderDesktop, HeaderMobile y Footer
│   ├── ui/                 # Componentes de interfaz reutilizables
│   └── sections/           # Secciones de página por implementar
├── content/                # Navegación y contenido tipado
├── lib/                    # Utilidades sin dependencias de UI
├── styles/                 # Tokens FCV y estilos compartidos
└── public/assets/
    ├── logos/              # Versiones oficiales necesarias
    └── images/             # Fotografías aprobadas por incorporar por fase
```

## Comandos

Ejecutar desde `web/`:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Configuración de producción

- Configurar `NEXT_PUBLIC_SITE_URL` con el origen HTTPS definitivo, sin rutas ni barra final. Esta variable alimenta canonicals, Open Graph, `robots.txt` y `sitemap.xml`.
- `next.config.ts` aplica CSP, protección contra framing, `nosniff`, política de referentes, Permissions Policy y HSTS únicamente en producción.
- La CSP actual está verificada con la aplicación existente. Debe reevaluarse si se añaden scripts, analítica, APIs, iframes o recursos de terceros.
- La imagen Open Graph global se genera con `app/opengraph-image.tsx` usando el logotipo oficial local y los colores de FCV.
- `app/not-found.tsx` mantiene un 404 real y `app/error.tsx` ofrece recuperación para errores inesperados de ruta sin exponer detalles técnicos.
- La aplicación no instala analítica, trackers ni cookies no esenciales. Si se añade un proveedor, se deberá reevaluar consentimiento, privacidad y CSP.
- Las imágenes se sirven mediante `next/image` en AVIF/WebP. Los JPEG fuente conservan su calidad original y deben optimizarse antes del despliegue según `PRODUCTION-CHECKLIST.md`.

## SEO y rutas públicas

- La fuente central de URLs y metadata compartida está en `lib/site.ts`.
- Las nueve URLs públicas concretas alimentan `app/sitemap.ts` y la auditoría automática de enlaces.
- Los slugs no confirmados responden con `notFound()` y no se crean páginas ficticias.
- Solo se publica Schema.org verificable para `Organization` y `WebSite`; no se inventan dirección, contacto, autor, fecha ni perfiles sociales.

## Convenciones

- Usar Server Components por defecto; añadir `"use client"` solo cuando exista interacción o dependencia del navegador.
- Mantener TypeScript estricto y evitar tipos `any`.
- Crear un CSS Module junto a cada componente visual.
- Consumir colores, tipografía, espacios, radios y bordes desde `styles/tokens.css`.
- Usar `next/link` para navegación interna y `next/image` para imágenes.
- Mantener controles táctiles con una altura mínima de 48 px.
- No inventar contenido institucional, cifras, datos de contacto, documentos ni enlaces.
- No usar capturas de Figma, archivos `tmp`, `.codex-*` o recursos de QA como assets de producción.
- No añadir “La Fundación” a las rutas ni a la navegación.

## Fuentes de verdad

Las fuentes principales para implementación son:

1. `../development-handoff.md`: rutas, correspondencias desktop/mobile, componentes, estados y restricciones de desarrollo.
2. `../figma-final-scope.md`: alcance oficial, Node IDs vigentes y decisiones finales de Figma.

`../source-map.md` y `../asset-manifest.md` respaldan el contenido y la selección de activos, sin reemplazar las dos fuentes principales.

## Formulario de contacto

- `lib/contact-transport.ts` contiene una simulación local reemplazable: no envía ni persiste datos personales.
- Antes de conectar un backend se requiere un destino institucional confirmado, validación server-side, protección anti-spam y manejo seguro de datos personales.
- La validación cliente mejora la experiencia, pero no sustituye la validación y autorización legal definitivas del servicio futuro.
- No se almacenan datos en `localStorage`, cookies ni servicios externos.
- Antes de publicar se debe reemplazar el transporte local y añadir validación server-side, protección anti-spam/rate limiting y textos legales definitivos.

## Verificación de producción

El registro de QA, métricas, bloqueantes y configuración de despliegue se mantiene en `PRODUCTION-CHECKLIST.md`.
