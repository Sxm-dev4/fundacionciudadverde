# Checklist de producción — Fundación Ciudad Verde

## LISTO

- Nueve rutas públicas verificadas, con navegación, CTA, breadcrumbs y footer sin enlaces internos rotos.
- Slugs inválidos y rutas inexistentes responden con HTTP 404; existe una vista 404 institucional con navegación útil.
- Manejo de errores inesperados de ruta con recuperación, sin detalles técnicos públicos.
- Metadata única por ruta: title, description, canonical, Open Graph y Twitter/X.
- `robots.txt`, `sitemap.xml`, favicon oficial e imagen Open Graph global generada con el logotipo oficial local.
- Schema.org limitado a `Organization` y `WebSite`, sin dirección, teléfono, autor, fechas ni redes inventadas.
- Un `h1` por vista, regiones semánticas y estructuras `article` en los detalles correspondientes.
- Navegación móvil y panel M12 operables con teclado y Escape, con devolución de foco al control de apertura.
- Formulario con labels visibles, errores asociados, foco al primer campo inválido, prevención de doble envío, loading, success y reinicio. El transporte sigue siendo local y no persiste datos.
- Imágenes de producción implementadas con `next/image`, `sizes`, prioridad reservada a imágenes LCP y carga diferida fuera del primer viewport. Como comprobación, el hero de Inicio pasa de 6,99 MB en origen a aproximadamente 120 KB en AVIF a 1920 px mediante el optimizador de Next.
- Cabeceras verificadas: CSP, HSTS en producción, X-Content-Type-Options, Referrer-Policy, Permissions-Policy y protección contra framing. Se oculta `X-Powered-By`.
- No existen Analytics, trackers ni cookies no esenciales; actualmente no se requiere banner de cookies.
- QA responsive completado en 390, 768, 1024 y 1440 px sobre las nueve rutas: sin overflow horizontal, imágenes rotas, textos recortados ni controles táctiles menores de 48 px en mobile.
- QA de Chromium completado en el navegador integrado. Chrome y Edge headless abren la aplicación; Firefox y WebKit no están disponibles en este entorno.
- Auditoría HTTP de recursos y enlaces internos: respuestas 200 para rutas/activos válidos y 404 para slugs/rutas inexistentes.
- Los periodos de proyecto no validados se retiraron de los filtros; el detalle ya no atribuye una ubicación específica ni promete documentación propia del proyecto.
- Lighthouse en Inicio: Performance 91, Accessibility 100, Best Practices 100 y SEO 100. Métricas de laboratorio: LCP 3,1 s, CLS 0, TBT 170 ms, FCP 1,0 s y Speed Index 2,1 s. INP no está disponible en una ejecución de laboratorio sin interacción real.
- Tests, ESLint y build de producción pasan en la verificación final registrada durante esta fase.

## BLOQUEANTES DE PUBLICACIÓN

- Configurar el dominio definitivo mediante `NEXT_PUBLIC_SITE_URL`; el fallback local no debe llegar a producción.
- Sustituir el transporte local del formulario por un endpoint institucional aprobado, con validación server-side, anti-spam/rate limiting y manejo seguro de datos personales.
- Aprobar la política definitiva de tratamiento de datos y su relación con el consentimiento del formulario.
- Validar institucionalmente las cifras de Impacto (80 %, 47, 36 y 28) y cualquier cifra aún marcada como pendiente en las fuentes.
- Validar el catálogo editorial de Proyectos antes de publicar: nombres, clasificación, participación, territorio, slug y contenido del detalle no cuentan todavía con fichas institucionales consolidadas en `source-map.md`.
- Publicar y validar los documentos reales de Transparencia; actualmente todas las categorías permanecen vacías.
- Publicar la Política de privacidad y el texto definitivo de Tratamiento de datos antes de activar un formulario real; el footer oficial conserva esos accesos hacia Transparencia, pero hoy no existe un documento confirmado.
- Confirmar permisos de uso, créditos y tratamiento de imagen de las fotografías, especialmente cuando aparecen personas o menores.
- Confirmar el símbolo/logotipo definitivo del footer como activo oficial estable para desarrollo.

## NO BLOQUEANTES

- Optimizar los JPEG fuente antes de publicar: 32 imágenes suman 188,47 MB; 25 superan 4 MB y la mayor pesa 10,11 MB. Next optimiza la entrega, pero reducir dimensiones/peso de origen mejora builds, almacenamiento y procesamiento.
- Revisar cinco grupos de archivos binariamente duplicados y conservar solo las repeticiones editoriales intencionales: `actualidad-conocimiento-comunidad.jpg`/`proyectos-acompanamiento-tecnico.jpg`, `impacto-cta-formacion.jpg`/`proyectos-cta.jpg`, `impacto-hero-avistamiento.jpg`/`lineas-hero-avistamiento.jpg`, `actualidad-feria-humedales-2024-2.jpg`/`proyectos-gestion-participacion.jpg` y `actualidad-feria-humedales-2024-3.jpg`/`lineas-intervencion-territorial.jpg`.
- Ejecutar QA adicional en Firefox y WebKit cuando exista acceso a esos motores. El entorno actual solo permitió Chromium, Chrome y Edge.
- Mejorar el LCP del Inicio (3,1 s en Lighthouse local) optimizando la fotografía hero de origen; no se alteró la composición ni se sustituyó el activo aprobado.
- Añadir Analytics únicamente cuando exista proveedor y base legal confirmados. Eventos futuros documentados: `submit_contact_form`, `view_project`, `view_article` y `download_document`; este último no debe emitirse mientras no existan documentos.
- Enriquecer metadata o contenidos relacionados solo cuando existan datos institucionales validados.

## CONFIGURACIÓN DE DESPLIEGUE

- Variable obligatoria: `NEXT_PUBLIC_SITE_URL=https://dominio-definitivo.example`.
- Servir exclusivamente por HTTPS. La aplicación emite HSTS en producción; confirmar que todos los subdominios pueden usar HTTPS antes de conservar `includeSubDomains` y `preload`.
- Configurar el dominio y las redirecciones canónicas (`www` o sin `www`) en la plataforma de despliegue.
- Registrar `sitemap.xml` en Search Console después de definir el dominio.
- Verificar que `robots.txt`, canonicals, Open Graph y sitemap contienen el dominio definitivo tras el despliegue.
- Mantener la CSP actual mientras no se incorporen terceros; ampliar únicamente los orígenes estrictamente necesarios al conectar backend o analítica.
- No existen secretos requeridos en el frontend actual. Cualquier credencial futura debe permanecer en variables server-only, nunca con prefijo `NEXT_PUBLIC_`.
- Al conectar el formulario: añadir endpoint server-side, validación equivalente, rate limiting, anti-spam, logs sin PII innecesaria y respuesta de error segura.
- Si se instala Analytics, revisar consentimiento/cookies, política de privacidad, CSP y retención de datos antes de habilitarlo.
