# Sistema Web de Autenticación — Universidad La Salle Oaxaca

Aplicación web de autenticación de usuarios desarrollada como base para la integración de futuros procesos académicos. El proyecto utiliza una arquitectura cliente-servidor con un frontend publicado en GitHub Pages, un backend desarrollado con Node.js y Express desplegado en Render, y una base de datos MariaDB alojada en una Raspberry Pi.

## Arquitectura del sistema

```text
┌─────────────────────────┐
│         USUARIO         │
│   Navegador web         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      GITHUB PAGES       │
│                         │
│ HTML, CSS y JavaScript  │
│ Interfaz de inicio      │
│ de sesión               │
└────────────┬────────────┘
             │ HTTPS
             ▼
┌─────────────────────────┐
│         RENDER          │
│                         │
│ Node.js + Express       │
│ API REST                │
│ Validación de acceso    │
└────────────┬────────────┘
             │
             │ TCP / Puerto 3306
             ▼
┌─────────────────────────┐
│      RASPBERRY PI       │
│                         │
│         MariaDB         │
│ Base de datos:          │
│ usuariosdb              │
│ Tabla: users             │
└─────────────────────────┘
```

### Componentes principales

| Componente | Tecnología | Función |
|---|---|---|
| Frontend | HTML, CSS y JavaScript | Interfaz de usuario y navegación. |
| Hosting del frontend | GitHub Pages | Publicación de los archivos estáticos. |
| Backend | Node.js y Express | Procesamiento de solicitudes y lógica de autenticación. |
| Hosting del backend | Render | Ejecución del servidor y exposición de la API. |
| Base de datos | MariaDB | Almacenamiento de usuarios y credenciales. |
| Servidor de base de datos | Raspberry Pi | Alojamiento de MariaDB. |
| DNS dinámico | Dynu / hostname configurado | Facilita el acceso al servidor cuando cambia la IP pública. |

## Tecnologías utilizadas

- **HTML5:** estructura de las páginas.
- **CSS3:** diseño y estilos de la interfaz.
- **JavaScript:** interacción del frontend y solicitudes HTTP.
- **Node.js:** entorno de ejecución del backend.
- **Express:** framework para la API REST.
- **mysql2:** conexión entre Node.js y MariaDB.
- **CORS:** configuración de solicitudes entre distintos orígenes.
- **dotenv:** administración de variables de entorno.
- **GitHub Pages:** alojamiento del frontend.
- **Render:** despliegue del backend.
- **MariaDB:** sistema gestor de bases de datos.
- **Raspberry Pi:** servidor físico de la base de datos.

## Estructura del proyecto

```text
proyecto/
├── index.html       # Página de inicio de sesión
├── login.js         # Lógica de autenticación
├── bienvenido.html  # Página posterior al inicio de sesión
├── style.css        # Estilos de la interfaz
├── Logo.jpg         # Imagen institucional
├── server.js        # Servidor Node.js y API REST
├── package.json     # Dependencias y configuración
├── package-lock.json
├── .env             # Variables de entorno (no publicar)
└── README.md        # Documentación del proyecto
```

Los archivos del frontend se publican en GitHub Pages. Los archivos del backend se despliegan por separado en Render.

## Funcionamiento del sistema

El proceso de autenticación sigue estos pasos:

1. El usuario accede a la página de inicio de sesión.
2. Introduce su usuario y contraseña.
3. El frontend envía una solicitud HTTP POST al endpoint `/login` del backend.
4. El backend recibe las credenciales y consulta la tabla `users` en MariaDB.
5. La base de datos devuelve el resultado de la consulta.
6. Si las credenciales coinciden, el backend responde con un resultado satisfactorio.
7. El frontend guarda el identificador del usuario en `localStorage` y redirige a `bienvenido.html`.
8. Si las credenciales no coinciden, se muestra un mensaje de error.

## API REST

### Endpoint de autenticación

**Ruta:** `/login`

**Método:** `POST`

Ejemplo de solicitud:

```json
{
  "usuario": "usuario_de_prueba",
  "password": "contraseña_de_prueba"
}
```

Respuesta cuando la autenticación es satisfactoria:

```json
{
  "success": true
}
```

Respuesta cuando las credenciales no coinciden:

```json
{
  "success": false
}
```

El backend utiliza consultas SQL parametrizadas para evitar que los valores recibidos se interpreten directamente como parte de la consulta.

### Endpoint de consulta

**Ruta:** `/datos`

**Método:** `GET`

Este endpoint consulta los registros de la tabla `users`. Debe protegerse o limitarse antes de utilizarlo con información académica real.

### Endpoint raíz

**Ruta:** `/`

**Método:** `GET`

Permite comprobar que la API está respondiendo.

## Base de datos

La base de datos utilizada es `usuariosdb`, alojada en MariaDB sobre una Raspberry Pi.

Tabla principal: `users`.

| Campo | Tipo lógico | Descripción |
|---|---|---|
| `id` | Identificador numérico | Identificador del registro. |
| `usuario` | Texto | Identificador del usuario. |
| `contrasenia` | Texto | Campo utilizado actualmente para validar la contraseña. |

Los tipos de datos definitivos deben consultarse en la definición real de la tabla.

## Configuración del backend

El backend utiliza variables de entorno para configurar la conexión a la base de datos.

Ejemplo de archivo `.env` para desarrollo local:

```dotenv
DB_HOST=localhost
DB_USER=usuario_aplicacion
DB_PASSWORD=tu_contraseña_segura
DB_NAME=usuariosdb
DB_PORT=3306
```

Los valores son ejemplos y deben sustituirse por los correspondientes al entorno de ejecución.

En Render, estas variables deben configurarse en la sección **Environment** del servicio.

**Importante:** el archivo `.env` no debe subirse al repositorio. Añádelo a `.gitignore`:

```gitignore
node_modules/
.env
```

## Instalación y ejecución local

### Requisitos

- Node.js y npm.
- Acceso a una instancia de MariaDB.
- Git para administrar el repositorio.

### 1. Instalar dependencias

Desde la carpeta del backend:

```bash
npm install express mysql2 cors dotenv
```

### 2. Configurar las variables de entorno

Crear el archivo `.env` con los parámetros de conexión correspondientes.

### 3. Iniciar el servidor

```bash
node server.js
```

El servidor utiliza la variable de entorno `PORT` cuando está disponible y, de lo contrario, el puerto `3000`.

### 4. Comprobar el funcionamiento

Abrir en el navegador la dirección local correspondiente, por ejemplo:

```text
http://localhost:3000/
```

La API debe responder con un mensaje que indique que está funcionando.

## Despliegue

### Frontend — GitHub Pages

1. Subir los archivos estáticos al repositorio.
2. Activar GitHub Pages desde la configuración del repositorio.
3. Verificar que `login.js` apunte a la URL pública correcta del backend.
4. Comprobar el inicio de sesión desde el sitio publicado.

### Backend — Render

1. Conectar el repositorio del backend a Render.
2. Configurar el comando de inicio y las variables de entorno.
3. Desplegar el servicio.
4. Revisar los registros para verificar que el servidor inicia y establece la conexión con MariaDB.

### Base de datos — Raspberry Pi

MariaDB se ejecuta en la Raspberry Pi y recibe las conexiones del backend a través de la red configurada. El acceso remoto requiere una configuración adecuada de permisos, firewall y conectividad.

## Seguridad y consideraciones

Este proyecto se encuentra en una etapa inicial y funciona como base para el desarrollo de procesos académicos.

Antes de utilizarlo con información institucional real, es importante implementar las siguientes medidas:

- Almacenar contraseñas mediante hashes seguros, por ejemplo, Argon2id o bcrypt.
- Implementar sesiones seguras o tokens de autenticación y validar el acceso en el backend.
- No considerar `localStorage` como mecanismo suficiente para autenticar o autorizar usuarios.
- Restringir CORS a los orígenes autorizados.
- Limitar los permisos del usuario de MariaDB utilizado por la aplicación.
- Evitar exponer directamente MariaDB a Internet; preferir una conexión privada o un túnel seguro.
- Proteger los endpoints y limitar las solicitudes de autenticación.
- No devolver información sensible ni errores internos de la base de datos al cliente.
- Implementar respaldos y procedimientos de recuperación.
- Proteger los datos personales y académicos conforme a las políticas institucionales aplicables.

La redirección a `bienvenido.html` y la comprobación de `localStorage` son controles del lado del cliente; por sí solos no impiden que una persona acceda directamente a la página.

## Posibles ampliaciones

La arquitectura permite desarrollar nuevos módulos reutilizando el backend y la conexión a MariaDB, por ejemplo:

- Consulta de información de alumnos.
- Gestión de horarios.
- Registro de asistencias.
- Consulta y captura de evaluaciones.
- Gestión de usuarios y roles.
- Generación de reportes académicos.
- Paneles de administración.

Cada módulo deberá incorporar sus propias rutas de API, validaciones, permisos y consultas a la base de datos.

## Estado actual

- [x] Frontend publicado en GitHub Pages.
- [x] Backend desplegado en Render.
- [x] Conexión entre Node.js y MariaDB.
- [x] Validación básica de credenciales.
- [x] Redirección a la página de bienvenida.
- [x] Visualización del identificador del usuario.
- [ ] Autenticación mediante sesiones seguras.
- [ ] Gestión de roles y permisos.
- [ ] Implementación de módulos académicos.
- [ ] Endurecimiento de seguridad y respaldos automatizados.

## Licencia

La licencia del proyecto está pendiente de definir. No se concede una licencia de reutilización hasta que se agregue explícitamente al repositorio.

---

**Proyecto:** Sistema Web de Procesos Académicos  
**Institución:** Universidad La Salle Oaxaca  
**Propósito:** Base tecnológica para integrar servicios y procesos académicos mediante una aplicación web.
