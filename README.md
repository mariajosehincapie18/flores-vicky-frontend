# Flores y Detalles Vicky – Frontend

## 1. Descripción del proyecto

Flores y Detalles Vicky es una aplicación web para una floristería que permite a los clientes explorar el catálogo de productos, consultar sus detalles, registrarse, iniciar sesión y realizar solicitudes de encargos.

El frontend fue migrado de HTML, CSS y JavaScript a Next.js, React, TypeScript y Tailwind CSS, conservando la identidad visual de la entrega inicial e integrándose con el backend mediante una API REST.

La aplicación cuenta con funcionalidades diferenciadas según el rol del usuario, incluyendo un panel de administración para gestionar los productos del catálogo.

## 2. Tecnologías utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- Fetch API
- Node.js y npm para el entorno de desarrollo

## 3. Enlaces del proyecto

- **Aplicación web:** https://flores-vicky-frontend.vercel.app 
- **API desplegada:** https://flores-vicky-backend.onrender.com
- **Repositorio del frontend:** https://github.com/mariajosehincapie18/flores-vicky-frontend
- **Repositorio del backend:** https://github.com/mariajosehincapie18/flores-vicky-backend

## 4. Organización del proyecto

El frontend utiliza una organización por funcionalidades y el sistema de rutas App Router de Next.js.

La estructura principal es:

- `src/app`: contiene las páginas y rutas de la aplicación.
- `src/app/login`: página de inicio de sesión.
- `src/app/registro`: página de registro.
- `src/app/productos/[id]`: página de detalle de cada producto.
- `src/app/admin`: panel de administración de productos.
- `src/features/common`: configuración y cliente HTTP compartido.
- `src/features/auth`: autenticación, formularios, almacenamiento de sesión y contexto de usuario.
- `src/features/catalogo`: modelos, servicios, hooks y componentes relacionados con los productos.

Esta organización permite separar las funcionalidades y facilitar el mantenimiento del código.

## 5. Funcionalidades principales

### Catálogo de productos

- Consulta de productos desde el backend.
- Visualización de productos organizados en el catálogo.
- Consulta individual de los detalles de cada producto.
- Presentación de imágenes, descripciones y características.

### Autenticación y usuarios

- Registro de nuevos usuarios.
- Inicio de sesión mediante la API.
- Cierre de sesión.
- Persistencia de sesión al actualizar la página.
- Identificación del rol del usuario.

### Solicitudes y consultas

- Formulario para realizar solicitudes relacionadas con los productos.
- Registro de interacciones asociadas al usuario autenticado.
- Formulario de consultas generales.
- Acceso directo a WhatsApp.

### Panel de administración

La aplicación cuenta con una ruta de administración disponible en `/admin`, destinada exclusivamente a los usuarios con rol de administrador.

Desde este panel es posible:

- Consultar los productos existentes.
- Crear nuevos productos.
- Editar productos.
- Eliminar productos.

El acceso se controla mediante la autenticación y el rol del usuario. Los usuarios normales no pueden acceder a las funcionalidades administrativas.

### Diseño adaptable

La interfaz conserva la identidad visual de la entrega inicial y se adapta a diferentes tamaños de pantalla para facilitar su utilización desde computadores y dispositivos móviles.

## 6. Instalación y ejecución local

### Requisitos previos

- Node.js
- npm
- Acceso a la API del backend.

### Pasos de instalación

**1. Clonar el repositorio**

```bash
git clone https://github.com/mariajosehincapie18/flores-vicky-frontend.git
cd flores-vicky-frontend
```

**2. Instalar las dependencias**

```bash
npm install
```

**3. Configurar las variables de entorno**

Crear un archivo `.env.local` en la raíz del proyecto con la siguiente configuración:

```env
NEXT_PUBLIC_API_HOST=https://flores-vicky-backend.onrender.com
```

Esta variable indica la dirección del backend al que se conecta el frontend.

**4. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

**5. Abrir la aplicación**

Ingresar desde el navegador a:

`http://localhost:3000`

### Compilación para producción

Para comprobar la compilación del proyecto se puede ejecutar:

```bash
npm run build
```

## 7. Variables de entorno

| Variable | Descripción |
|---|---|
| NEXT_PUBLIC_API_HOST | Dirección de la API del backend. |

El archivo `.env.local` contiene la configuración del entorno local y no debe subirse al repositorio.

## 8. Autenticación y manejo de sesión

La aplicación permite registrar usuarios e iniciar sesión mediante los servicios de autenticación del backend.

Cuando el inicio de sesión es exitoso, el frontend recibe el token JWT y los datos del usuario.

El token y la información del usuario se almacenan en `localStorage` mediante el servicio de almacenamiento de sesión. El contexto de autenticación permite recuperar la sesión cuando se actualiza la página.

Las solicitudes que necesitan autenticación envían el token al backend mediante el encabezado:

```http
Authorization: Bearer TOKEN
```

La aplicación utiliza el rol del usuario para controlar la visualización y el acceso a las funcionalidades administrativas.

## 9. Credenciales de prueba

Las siguientes cuentas están disponibles en el entorno desplegado para comprobar el funcionamiento de la aplicación.

### Administrador

- **Correo:** `mjhincapie18@gmail.com`
- **Contraseña:** `AdminVicky2026!`
- **Rol:** `admin`

Permite acceder al panel de administración y gestionar los productos.

### Usuario normal

- **Correo:** `maria.hincapi@gmail.com`
- **Contraseña:** `UsuarioVicky2026!`
- **Rol:** `user`

Permite explorar el catálogo, iniciar sesión y utilizar las funcionalidades disponibles para usuarios normales.

Estas cuentas son exclusivamente para la evaluación del proyecto.

## 10. Decisiones técnicas

### 10.1. Migración a Next.js

Se eligió Next.js para migrar la aplicación inicial y utilizar su sistema de rutas App Router. Esto permite organizar las páginas y funcionalidades de manera estructurada.

### 10.2. Uso de TypeScript

Se utilizó TypeScript para definir los tipos de datos y facilitar la detección de errores durante el desarrollo.

### 10.3. Organización por funcionalidades

El código se organizó por funcionalidades para separar autenticación, catálogo y componentes comunes. Esta estructura facilita la reutilización y el mantenimiento de los componentes.

### 10.4. Consumo de la API

Los productos y demás datos del sistema se obtienen mediante solicitudes al backend. Se utilizan servicios para centralizar las operaciones de comunicación con la API.

El catálogo no depende de un arreglo estático de productos, sino de la información almacenada en PostgreSQL y entregada por el backend.

### 10.5. Manejo de sesión y seguridad

El token se almacena en `localStorage` para conservar la sesión entre actualizaciones de la página.

Esta decisión facilita el manejo de la sesión, aunque presenta un riesgo si ocurre una vulnerabilidad XSS, ya que un script malicioso podría acceder al token almacenado.

Por esta razón, es importante proteger la aplicación frente a vulnerabilidades de inyección y validar las solicitudes en el backend.

### 10.6. Control de acceso por roles

Se utiliza el rol recibido durante la autenticación para diferenciar los permisos de los usuarios.

El administrador puede ingresar al panel de administración y realizar operaciones sobre los productos. El usuario normal puede utilizar las funcionalidades de la tienda, pero no tiene permisos para administrar el catálogo.

## 11. Evidencia de petición protegida

Para comprobar el consumo de una ruta protegida se debe utilizar la herramienta de desarrollo del navegador, en la pestaña **Network**.

Se debe agregar una captura donde se observe una solicitud protegida y su encabezado de autorización:

```http
Authorization: Bearer TOKEN
```

La evidencia se puede guardar en el repositorio dentro de una carpeta `docs`, utilizando el nombre:

`docs/network-protected.png`

## 12. Uso de inteligencia artificial

Se utilizó inteligencia artificial como herramienta de apoyo durante el desarrollo para comprender conceptos, revisar errores, organizar componentes y resolver dificultades de integración entre el frontend y el backend.

Las sugerencias fueron revisadas, adaptadas y probadas durante el desarrollo del proyecto. Las decisiones finales y la integración de las funcionalidades se realizaron sobre el código de la aplicación.
