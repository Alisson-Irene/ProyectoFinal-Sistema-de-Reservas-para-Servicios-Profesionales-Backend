# Sistema de Reservas para Servicios Profesionales

## Descripción del Proyecto

El Sistema de Reservas para Servicios Profesionales es una aplicación web que permite a los usuarios registrarse, iniciar sesión y gestionar reservas de servicios ofrecidos por profesionales.

El sistema también permite a los administradores gestionar los servicios disponibles, asegurando una correcta organización y disponibilidad de los mismos.

## Objetivo

Desarrollar una aplicación que permita:

* Gestionar usuarios y autenticación
* Administrar servicios y profesionales
* Permitir la reserva de citas
* Controlar la disponibilidad de horarios

## Tecnologías Utilizadas

* **Backend:** Node.js con Express
* **Frontend:** Angular
* **Base de datos:** PostgreSQL
* **Control de versiones:** GitHub
* **Gestión del proyecto:** Jira (Scrum)
* **Despliegue:** Docker y Render
* 
## Estructura del Proyecto

### Backend (reservas-backend)

* `app.js` → servidor principal
* `database/schema.sql` → estructura de la base de datos
* `docs/documentacion.md` → documentación del sistema

### Frontend (reservas-frontend)

* Aplicación Angular (en desarrollo)

## Funcionalidades del Sistema

### Usuario

* Registro de cuenta
* Inicio de sesión
* Visualización de servicios disponibles
* Visualización de horarios de profesionales
* Reserva de servicios
* Cancelación de reservas

### Administrador

* Registro de servicios
* Edición de servicios

## 🗄 Base de Datos

El sistema utiliza PostgreSQL como sistema de gestión de base de datos.

### Tablas principales:

* **usuarios:** almacena la información de los usuarios del sistema
* **servicios:** contiene los servicios disponibles
* **profesionales:** almacena los profesionales que ofrecen servicios
* **horarios:** gestiona la disponibilidad de los profesionales
* **reservas:** registra las reservas realizadas por los usuarios

### Relaciones:

* Un usuario puede realizar múltiples reservas
* Un servicio puede estar asociado a un profesional
* Un profesional tiene múltiples horarios disponibles
* Una reserva está asociada a un usuario, servicio y profesional

## Metodología de Trabajo

El proyecto se desarrolla utilizando la metodología ágil **Scrum**, gestionada mediante Jira.

Se han definido:

* Épicas del sistema
* Historias de usuario
* Product Backlog

## Estado Actual del Proyecto

Actualmente el proyecto se encuentra en fase inicial, donde se ha realizado:

* Definición del proyecto en Jira
* Creación de épicas
* Creación de historias de usuario
* Organización del backlog
* Creación de repositorios en GitHub
* Definición de la estructura inicial del sistema
* Diseño inicial de la base de datos

## Observaciones

Este proyecto será desarrollado progresivamente mediante sprints, donde se implementarán las funcionalidades definidas en el backlog.

