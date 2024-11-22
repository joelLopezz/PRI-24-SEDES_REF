# SEDES REFERENCIAS
# Manual Técnico

## 1. Roles/Integrantes
- **Elsa Valentina Trigo Maldonado** – Team Leader
- **Joel Israel Lopez Ticlla** – Git Master
- **Angela Nicole Sánchez Leaño** – Bata base

## 2. Introducción
El presente proyecto tiene como objetivo el desarrollo de una plataforma web destinada a la gestión de información médica para el **Servicio Departamental de Salud (SEDES)** en Cochabamba, Bolivia. Esta plataforma tiene como propósito principal mejorar la organización y acceso a los datos relativos a **hospitales**, **servicios médicos** y **especialidades** dentro del departamento. Al facilitar el acceso rápido y sencillo a esta información clave, se busca mejorar la administración de los recursos de salud, optimizando la eficiencia en la toma de decisiones.

## 3. Descripción del Proyecto
El proyecto consiste en el desarrollo de una página web interactiva que permita al **SEDES Cochabamba** gestionar de manera centralizada y eficiente los registros de **hospitales**, **servicios médicos** y **especialidades** dentro del departamento. La plataforma permitirá registrar, modificar, eliminar y consultar información de manera intuitiva, proporcionando un sistema de fácil acceso y navegación para los usuarios.

### Funcionalidades Principales:
1. **Gestión de Hospitales**: Registro, modificación y eliminación de hospitales en el sistema, con la posibilidad de visualizar una lista completa de hospitales registrados.
2. **Gestión de Cartera de Servicios**: Registro, modificación y eliminación de servicios médicos ofrecidos por los hospitales, permitiendo la consulta de la lista de servicios.
3. **Gestión de Especialidades**: Registro, modificación y eliminación de especialidades médicas disponibles en los hospitales, con opción para consultar una lista actualizada de especialidades.

Además, se incluirá un **sistema de autenticación**.

## 4. Link al Video Demostrativo
_(YouTube - 5 minutos máximo)_

## 5. Listado de los Requisitos Funcionales del Sistema
### Gestión de Hospitales
- Registro de hospitales con información básica.
- Modificación y eliminación de registros hospitalarios.
- Visualización de la lista de hospitales registrados.

### Gestión de Cartera de Servicios
- Registro de servicios ofrecidos.
- Modificación y eliminación de registros de la cartera de servicios.
- Visualización de la lista de los servicios registrados.

### Gestión de Especialidades
- Registro de especialidades.
- Modificación y eliminación de registros de especialidades.
- Visualización de la lista de especialidades.

### Acceso de Usuarios
- Sistema de autenticación y roles.

## 6. Arquitectura del Software
La arquitectura de nuestro proyecto está diseñada con una estructura clara y organizada, dividiéndose en dos partes principales: el **frontend** y el **backend**, cada uno con herramientas y tecnologías específicas que nos permiten mantener el orden, facilitar el desarrollo y asegurar un buen rendimiento.

### Frontend
Para el desarrollo del frontend, utilizamos **React** junto con **Vite** para optimizar el entorno de desarrollo y **TypeScript** para añadir tipado estático, lo que ayuda a detectar errores de manera temprana y mejora la seguridad en el desarrollo. 

La estilización de la aplicación se llevó a cabo con **Tailwind CSS**, una herramienta que nos permite aplicar estilos de manera rápida y eficiente mediante clases predefinidas, haciendo el diseño más consistente y adaptable.

El frontend se encarga de manejar:
- La interfaz de usuario y las interacciones, como clics y formularios.
- La comunicación con el backend a través de solicitudes HTTP mediante una **API REST**. Esto asegura una comunicación fluida y ordenada entre las diferentes capas del sistema.

### Backend
El backend fue desarrollado usando **NestJS**, un framework de **Node.js** que nos permite mantener una estructura modular y organizada. Aquí se maneja:
- Toda la lógica del negocio.
- Las reglas y la interacción con la base de datos.
- Para la gestión de la base de datos, utilizamos **MySQL** como gestor relacional y un **ORM (Object-Relational Mapper)** para facilitar la interacción con la base de datos mediante objetos y modelos, evitando el uso excesivo de consultas SQL directas.

### Interacción entre Frontend y Backend
El frontend y el backend se comunican mediante **API REST**, donde:
- El frontend envía solicitudes al backend para obtener o enviar datos.
- Por ejemplo, cuando el usuario llena un formulario, esa información es enviada al backend, que la procesa, accede a la base de datos si es necesario, y responde al frontend, mostrando un resultado o mensaje al usuario.

### Patrones de Diseño Utilizados
- En Backend usamos MVC separando asi las responsabilidades y tambien separando por modulos
  
- **Separación de Responsabilidades**: Mantenemos una separación clara entre el frontend, que gestiona la presentación e interacción, y el backend, que se encarga de la lógica y los datos.
- **Inyección de Dependencias**: En el backend, NestJS utiliza este patrón para hacer que los componentes sean más fáciles de gestionar y probar.
- **Componentes en React**: Nuestro frontend está diseñado con componentes reutilizables, facilitando la creación de una interfaz consistente y modular.
## 7. Base de Datos

### a. Diagrama completo y actual
_(Incluir el diagrama de la base de datos actualizado en esta sección)_

### b. Scripts en GIT
En el repositorio GIT se encuentra una carpeta con:
- El script de generación de la base de datos.
- Scripts de inserción de datos de ejemplo utilizados.

### c. Script simple
_(Incluir aquí el script simple copiado y pegado en el documento si corresponde)_

---

## 8. Listado de Roles y Credenciales de los Usuarios del Sistema

### Roles:
- **Admin Sedes**: 
  - Acceso total al sistema, excepto a la sección "Mi hospital".
- **Admin Hospital**: 
  - Acceso a la gestión de especialidades y servicios, y la capacidad de establecer cuáles de estas tiene u ofrece su hospital.
- **Doctor**: 
  - Acceso a la vista (solo visualización) de especialidades y servicios de todos los hospitales, así como los del hospital al que pertenece.
## 9. Requisitos del Sistema

### Cliente
- **Requerimientos de Hardware (mínimo)**: _(Definir los requisitos mínimos de hardware para el cliente)_
- **Requerimientos de Software**: _(Definir los requisitos mínimos de software para el cliente)_

### Servidor
- **Requerimientos de Hardware (server/hosting/BD)**: _(Definir los requisitos de hardware para el servidor/hosting y la base de datos)_
- **Requerimientos de Software (server/hosting/BD)**: _(Definir los requisitos de software para el servidor/hosting y la base de datos)_

---

## 10. Instalación y Configuración
Instrucciones detalladas sobre cómo:
1. Instalar el software.
2. Configurar los componentes necesarios.
3. Establecer la conexión con otros sistemas o bases de datos.

---

## 11. Procedimiento de Hosteado / Hosting

### Configuración de:
- **Sitio Web**
- **Base de Datos (B.D.)**
- **API / Servicios Web**
- **Otros (Firebase, etc.)**

### Detalle del Procedimiento:
Pasos detallados para la puesta en marcha del hosting, que incluye:
1. Configuración del sitio web.
2. Configuración de la API.
3. Configuración de la base de datos.
4. Inclusión de:
   - Scripts de la base de datos.
   - Credenciales de acceso al servidor.
   - Usuarios root de la base de datos.
   - Roles de administradores y usuarios clientes.

---

## 12. GIT

### Versionado del Proyecto
- **Versión final entregada del proyecto.**
- **Rama de Integración**: _(Nota: Esta rama será cambiada a `master` en el futuro)._

### Entrega de Compilados Ejecutables
1. **Frontend**:
   - Ejecutar el siguiente comando en la terminal desde el directorio raíz del frontend:
     ```bash
     npm run build
     ```
   - Los archivos resultantes estarán en la carpeta `dist` y contendrán los archivos estáticos listos para el despliegue.
   
2. **Backend**:
   - Ejecutar el siguiente comando en la terminal desde el directorio raíz del backend:
     ```bash
     npm run build
     ```
   - Los archivos resultantes estarán en la carpeta `dist`.

---

## 13. Dockerizado del Sitio Web y Base de Datos

### a. Proceso de Dockerización y Configuración
Pasos necesarios para dockerizar la aplicación y configurarla correctamente.

### b. Cómo Ejecutar y Acceder
#### i. Base de Datos
- Configuración de la base de datos en un contenedor Docker.
- Inclusión de scripts de generación de la base de datos.

#### ii. Roles Admin y User
- Configuración de roles y credenciales para los usuarios del sistema.

#### iii. Base de Datos con Datos Válidos y Legibles
- Cargar la base de datos con datos de ejemplo o iniciales para pruebas.


