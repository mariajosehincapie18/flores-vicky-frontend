# Flores y Detalles Vicky – Frontend

## Descripción

Aplicación web de la floristería Flores y Detalles Vicky. Permite explorar el catálogo de productos, registrarse, iniciar sesión, realizar solicitudes de encargos y enviar consultas.

El sitio fue migrado de HTML, CSS y JavaScript a Next.js, TypeScript y Tailwind CSS, conservando la identidad visual de la entrega inicial.

## Tecnologías

- Next.js
- React
- TypeScript
- Tailwind CSS
- Fetch API

## Despliegue

- **Sitio web:** https://flores-vicky-frontend.vercel.app
- **API:** https://flores-vicky-backend.onrender.com
- **Repositorio:** https://github.com/mariajosehincapie18/flores-vicky-frontend

## Organización del proyecto

El frontend utiliza una organización por funcionalidades:

- `src/app`: páginas y rutas de Next.js.
- `src/features/common`: configuración y cliente HTTP.
- `src/features/auth`: autenticación, formularios y manejo de sesión.
- `src/features/catalogo`: productos, servicios y componentes del catálogo.

## Funcionalidades

- Catálogo conectado al backend.
- Visualización de productos y sus detalles.
- Registro de usuarios.
- Inicio y cierre de sesión.
- Persistencia de sesión al actualizar la página.
- Solicitudes de encargos asociadas al usuario.
- Formulario de consultas generales.
- Acceso directo a WhatsApp.
- Diseño adaptable a diferentes tamaños de pantalla.

## Instalación y ejecución local

1. Clonar el repositorio:

```bash
git clone https://github.com/mariajosehincapie18/flores-vicky-frontend.git
cd flores-vicky-frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear el archivo `.env.local`:

```env
NEXT_PUBLIC_API_HOST=https://flores-vicky-backend.onrender.com
```

4. Iniciar el proyecto:

```bash
npm run dev
```

5. Abrir en el navegador:

`http://localhost:3000`

## Autenticación y sesión

La aplicación permite registrar usuarios e iniciar sesión mediante la API.

El token de autenticación se almacena en localStorage junto con los datos de sesión. Esto permite conservar la sesión cuando se actualiza la página.

El cliente HTTP centralizado permite realizar peticiones autenticadas al backend.

## Decisiones técnicas

- Se eligió Next.js para construir la aplicación utilizando el sistema de rutas App Router.
- Se utilizó TypeScript para definir los tipos de datos y facilitar la detección de errores.
- Se utilizó Tailwind CSS para construir una interfaz reutilizable y adaptable.
- Se organizó el código por funcionalidades para separar autenticación, catálogo y componentes comunes.
- Los productos se obtienen desde la API y no se mantienen como un arreglo estático en el frontend.
- Las solicitudes y consultas se envían al backend para almacenarse en PostgreSQL.
- Se mantuvo la identidad visual de la entrega inicial, adaptando su diseño a la nueva tecnología.

## Riesgos de almacenamiento del token

El token se almacena en localStorage para mantener la sesión entre actualizaciones. Esta decisión facilita la implementación, pero tiene un riesgo: si ocurre un ataque XSS, un script malicioso podría acceder al token. Por eso es importante proteger la aplicación frente a vulnerabilidades de inyección.

## Evidencia de petición protegida

Agregar en esta sección una captura de la pestaña Network del navegador donde se observe una petición protegida y su encabezado:

`Authorization: Bearer TOKEN`

Guardar la captura en el repositorio, por ejemplo, en `docs/network-protected.png`.

## Uso de inteligencia artificial

Se utilizó inteligencia artificial como apoyo para comprender conceptos, revisar errores, organizar componentes y solucionar problemas de integración. El código se probó y ajustó durante el desarrollo.

