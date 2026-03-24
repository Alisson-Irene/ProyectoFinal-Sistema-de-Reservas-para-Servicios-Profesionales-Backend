# Sistema de Reservas para Servicios Profesionales

## 1. Descripción General

El Sistema de Reservas para Servicios Profesionales es una aplicación web orientada a la gestión de servicios ofrecidos por profesionales, permitiendo a los usuarios registrarse, iniciar sesión y agendar citas de manera eficiente.

El sistema contempla dos roles principales:

- **Usuario**
- **Administrador**

Cada uno cuenta con funcionalidades específicas dentro del sistema.

## 2. Análisis de Requerimientos

### 2.1 Requerimientos Funcionales

- El sistema debe permitir el registro de usuarios.
- El sistema debe permitir el inicio de sesión.
- El usuario debe poder visualizar servicios disponibles.
- El usuario debe poder consultar horarios de profesionales.
- El usuario debe poder realizar reservas.
- El usuario debe poder cancelar reservas.
- El administrador debe poder registrar servicios.
- El administrador debe poder editar servicios.

### 2.2 Requerimientos No Funcionales

- El sistema debe ser accesible vía web.
- El sistema debe garantizar la seguridad de autenticación.
- El sistema debe ser escalable.
- El sistema debe responder en tiempos adecuados.

## 3. Diseño del Sistema

### 3.1 Arquitectura

El sistema está basado en una arquitectura **cliente-servidor**:

- **Frontend:** Angular  
  Interfaz de usuario

- **Backend:** Node.js con Express  
  Lógica del sistema

- **Base de datos:** PostgreSQL

### 3.2 Modelo de Datos

El sistema está compuesto por las siguientes entidades principales:

- **Usuarios**
- **Servicios**
- **Profesionales**
- **Horarios**
- **Reservas**

#### Relaciones principales

- Un usuario puede realizar múltiples reservas.
- Un profesional puede ofrecer múltiples servicios.
- Un profesional puede tener múltiples horarios.
- Una reserva está asociada a un usuario, un servicio y un profesional.

## 4. Tecnologías Utilizadas

- **Backend:** Node.js con Express
- **Frontend:** Angular
- **Base de datos:** PostgreSQL
- **Control de versiones:** GitHub
- **Gestión del proyecto:** Jira (Scrum)
- **Despliegue:** Docker y Render

## 5. Estructura del Proyecto

### Backend (`reservas-backend`)

- `app.js` → servidor principal
- `database/schema.sql` → estructura de la base de datos
- `docs/documentacion.md` → documentación del sistema

### Frontend (`reservas-frontend`)

- Aplicación Angular en desarrollo

## 6. Metodología de Desarrollo

El proyecto se desarrolla bajo la metodología ágil **Scrum**, utilizando Jira para la gestión de:

- Épicas
- Historias de usuario
- Product Backlog
- Sprint Board

## 7. Estado Actual del Proyecto

Actualmente el proyecto se encuentra en fase inicial. Hasta el momento se ha realizado:

- Definición del proyecto en Jira
- Creación de épicas
- Creación de historias de usuario
- Organización del backlog
- Creación de repositorios en GitHub
- Definición de la estructura inicial del sistema
- Diseño inicial de la base de datos

## 8. Observaciones

El sistema será desarrollado de forma incremental mediante sprints, implementando progresivamente las funcionalidades definidas en el backlog.
