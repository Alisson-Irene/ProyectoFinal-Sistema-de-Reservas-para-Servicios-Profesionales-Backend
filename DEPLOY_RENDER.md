# Despliegue del backend en Render con Docker

## Backend

1. Sube este repositorio a GitHub.
2. En Render crea un **Web Service** nuevo.
3. Conecta el repositorio del backend.
4. En **Language** selecciona:
   ```txt
   Docker
   ```
5. Agrega variables de entorno:
   ```txt
   NODE_ENV=production
   JWT_SECRET=un_secreto_largo_y_seguro
   JWT_EXPIRES_IN=2h
   FRONTEND_URL=https://URL-DE-TU-FRONTEND.onrender.com
   ```
6. Configura la base de datos con una de estas opciones.

Opcion recomendada en Render PostgreSQL:

```txt
DATABASE_URL=postgresql://usuario:password@host:5432/base_de_datos
DB_SSL=true
```

O usando variables separadas:

```txt
DB_HOST=host
DB_PORT=5432
DB_NAME=base_de_datos
DB_USER=usuario
DB_PASSWORD=password
DB_SSL=true
```

## Frontend

Cuando el backend ya este desplegado, en el servicio del frontend configura:

```txt
API_BASE_URL=https://URL-DE-TU-BACKEND.onrender.com/api
```

## Prueba local con Docker

```bash
docker build -t reservas-backend .
docker run --rm -p 3000:3000 --env-file .env reservas-backend
```

Luego prueba:

```txt
http://localhost:3000/
http://localhost:3000/api/db-test
```

## Base de datos

Antes de probar login y CRUD en Render, ejecuta los scripts de `database/schema.sql` y `database/formas_pago_migration.sql` en la base de datos desplegada.
