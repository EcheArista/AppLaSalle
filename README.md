
# 🔐 Sistema de Inicio de Sesión – La Salle Oaxaca

Este proyecto es una app web de autenticación básica construida con:

- **Frontend**: HTML, CSS y JavaScript puro (hosteado en GitHub Pages)
- **Backend**: Node.js + Express
- **Base de Datos**: MySQL (local)
- **Pruebas locales**: Live Server + API en localhost

---

## 📂 Estructura del proyecto

```bash
mi-proyecto/
├── frontend/
│   ├── index.html
│   ├── bienvenido.html
│   ├── style.css
│   └── assets/ (logo, fondo)
├── backend/
│   ├── index.js
│   ├── db.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env
│   └── package.json
```

---

## 🚀 Instrucciones para correr el proyecto localmente

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Crear `.env` con las variables necesarias

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=nombre_base
```

### 3. Iniciar el servidor backend

```bash
node index.js
```

La API estará disponible en:  
[http://localhost:3000/api/login](http://localhost:3000/api/login)

### 4. Ejecutar frontend con Live Server

- Abre la carpeta `frontend` en VS Code
- Haz clic derecho sobre `index.html` > **Open with Live Server**
- Abre en el navegador:  
  [http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html)

---

## 🧪 Pruebas

- Usa el usuario `eddie` y contraseña `2404` para iniciar sesión
- Si el login es correcto, te redirige a `bienvenido.html` y muestra tu nombre
- Si falla, se muestra un mensaje de error

---

## 🔐 Seguridad básica implementada

- Comunicación por JSON
- Control de errores
- Separación frontend/backend
- Uso de `.env` para proteger credenciales

---

## 🌐 Próximos pasos

- [ ] Encriptar contraseñas (`bcrypt`)
- [ ] Autenticación con tokens JWT
- [ ] Despliegue en la nube (Render + GitHub Pages)
- [ ] Panel de usuario con datos personalizados
- [ ] CRUD de usuarios (crear, modificar, eliminar)
