
# 🔐 Sistema de Inicio de Sesión – La Salle Oaxaca

Este proyecto es una app web de autenticación básica construida con:

- **Frontend**: HTML, CSS y JavaScript puro (hosteado en GitHub Pages)
- **Backend**: Node.js + Express (desplegado en Render)
- **Base de Datos**: MySQL (Railway)
- **Pruebas locales**: Live Server + Postman

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
│   ├── .env.example
│   └── package.json
```

---

## 🚀 Instrucciones para correr el proyecto localmente

### 1. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 2. Crear `.env` con variables:

```env
PORT=3000
DB_HOST=hopper.proxy.rlwy.net
DB_PORT=54258
DB_USER=root
DB_PASSWORD=********
DB_NAME=railway
```

### 3. Iniciar el servidor backend

```bash
node index.js
```

### 4. Ejecutar frontend con Live Server

- Abrir `index.html` con Live Server en VS Code
- Navegar a: `http://127.0.0.1:5500/index.html`

---

## ☁️ Despliegue en la nube

### 🔹 Frontend

- Subido a GitHub Pages

### 🔹 Backend

- Subido a Render:  
  [https://applasalle.onrender.com](https://applasalle.onrender.com)

### 🔹 Base de datos

- MySQL hospedado en Railway
- Conexión vía host público y puerto dinámico
- Acepta queries desde Render

---

## 🧪 Endpoints de prueba

### `POST /api/login`

```json
{
  "usuario": "eddie",
  "contraseña": "2404"
}
```

**Respuesta esperada:**

```json
{
  "mensaje": "Acceso concedido",
  "usuario": "eddie"
}
```

---

## 🔐 Seguridad básica implementada

- Comunicación por JSON
- Separación de frontend y backend
- Variables de entorno
- Validación básica en servidor

---

## 🌱 Próximos pasos

- [ ] Encriptar contraseñas con bcrypt
- [ ] Autenticación JWT
- [ ] Crear dashboard personalizado
- [ ] Manejar sesiones y logout
- [ ] CRUD de usuarios
