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
---
## 9. Requisitos del Sistema

### Requerimientos de Hardware (mínimo): Cliente
Este apartado se refiere a los equipos donde se utilizará la aplicación web (frontend):
- **Procesador**: Intel Core i3 (o equivalente).
- **Memoria RAM**: 4 GB.
- **Espacio en Disco**: 200 MB libres para navegador y caché.
- **Resolución de Pantalla**: 1366x768 píxeles o superior.

### Requerimientos de Software: Cliente
- **Navegador Compatible**:
  - Google Chrome (versión 95 o superior).
  - Mozilla Firefox (versión 90 o superior).
  - Microsoft Edge (versión 95 o superior).
- **Sistema Operativo**:
  - Windows 10 o superior.
  - MacOS 11.0 (Big Sur) o superior.
  - Linux con soporte de navegadores modernos.

### Requerimientos de Hardware: Servidor/Hosting/Base de Datos
_(Definir los requisitos mínimos para el servidor, hosting y base de datos aquí)._

### Requerimientos de Software: Servidor/Hosting/Base de Datos
_(Definir los requisitos mínimos de software para el servidor, hosting y base de datos aquí)._

---
## 10. Instalación y Configuración

### Frontend
1. Clonar el repositorio del proyecto:
   - git clone <URL_REPOSITORIO_FRONTEND>
   - cd <CARPETA_FRONTEND>
2. Instalar dependencias:
   - npm install
3. Configurar el archivo `.env`:
   - Crear un archivo `.env` en la raíz del proyecto con la variable VITE_API_BASE_URL apuntando al backend:
     - VITE_API_BASE_URL=http://<IP_SERVIDOR>:3000
4. Ejecutar en modo desarrollo:
   - npm run dev
5. Compilar para producción:
   - npm run build

### Backend
1. Clonar el repositorio del proyecto:
   - git clone <URL_REPOSITORIO_BACKEND>
   - cd <CARPETA_BACKEND>
2. Instalar dependencias:
   - npm install
3. Configurar el archivo `.env`:
   - Crear un archivo `.env` en la raíz del proyecto con las credenciales de la base de datos:
     - DB_HOST=localhost
     - DB_PORT=3306
     - DB_USERNAME=root
     - DB_PASSWORD=tu_contraseña
     - DB_DATABASE=nombre_base_datos
4. Ejecutar en modo desarrollo:
   - npm run start:dev
5. Compilar para producción:
   - npm run build

### Base de Datos
1. Configurar el servidor MySQL:
   - Instalar MySQL en el servidor o entorno deseado.
   - Copiar la estructura proporcionada en los archivos `.sql` disponibles en la rama master del repositorio:
     - Archivo con solo estructura.
     - Archivo con estructura y datos.

---
## 11. PROCEDIMIENTO DE HOSTEADO / HOSTING (Configuración)

### Sitio Web (Frontend)
1. Subir el frontend a un servicio de hosting (por ejemplo, Vercel, Netlify o un servidor propio).
2. Configuración de URL Base:
   - Asegúrate de configurar el archivo `.env.production` con la URL de tu backend en producción.

### API / Servicios Web (Backend)
1. Subir el backend a un servidor:
   - Puedes usar servicios como AWS EC2, Heroku o servidores dedicados.
2. Configuración de Variables de Entorno:
   - Asegúrate de que las variables `.env` en producción tengan las credenciales correctas.
3. Correr el backend en producción:
   - Usa un manejador de procesos como PM2:
     - pm2 start dist/main.js --name backend

### Base de Datos
1. Asegúrate de que MySQL esté configurado correctamente en el servidor.
2. Configura los permisos de acceso para el backend:
   - Crear un usuario específico con acceso limitado:
     - CREATE USER 'api_user'@'%' IDENTIFIED BY 'api_password';
     - GRANT ALL PRIVILEGES ON nombre_base_datos.* TO 'api_user'@'%';
     - FLUSH PRIVILEGES;

### Detalle Paso a Paso
1. **Configuración de Frontend**:
   - Sube los archivos compilados (`dist/`) a un servicio como Vercel o a un servidor Nginx.
   - Asegúrate de que la URL del backend esté configurada correctamente.
2. **Configuración del Backend**:
   - Instala Node.js y las dependencias necesarias en el servidor.
   - Configura las variables de entorno con las credenciales de la base de datos.
   - Inicia el backend usando PM2 o un servicio similar.
3. **Configuración de la Base de Datos**:
   - Instala MySQL en el servidor.
   - Importa el script SQL con la estructura inicial de las tablas.
   - Configura un usuario con permisos limitados para el backend.
4. **Pruebas Finales**:
   - Asegúrate de que la conexión entre frontend, backend y base de datos funciona correctamente.
   - Prueba los endpoints del backend usando herramientas como Postman.
5. **Entrega de Credenciales**:
   - Documenta las credenciales de acceso al servidor, base de datos y API.
   - Usa herramientas seguras (como un gestor de contraseñas) para entregar esta información.
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

---
## 14. Personalización y Configuración

Una vez descargado el código fuente de Github, abre una terminal para cada proyecto y ubícate en la raíz de ambos. En cada proyecto, ejecuta `npm install` para instalar todas las dependencias.

### Frontend
1. **Configuración de API Base**:
   - Cada página o componente que consume datos del backend define la constante `API_BASE_URL` con el valor `http://localhost:3000`.
  - Para entornos de producción o un entorno diferente a localhost, el desarrollador debe actualizar esta constante manualmente en el archivo `.env` ubicado en la raíz del proyecto frontend:
    - Para entorno de desarrollo (puedes usar cualquier puerto disponible según tu entorno):
      ```env
      VITE_API_BASE_URL=http://localhost:3000
      ```
    - Para entorno de producción:
      ```env
      VITE_API_BASE_URL=https://api.miapp.com
      ```
  - **Nota**: El puerto `4000` es un ejemplo. Puedes configurar el puerto según la disponibilidad en tu entorno de desarrollo.

     - Para entorno de producción:
       ```env
       VITE_API_BASE_URL=https://api.miapp.com
       ```
   - Usa esta constante en lugar de escribir directamente la URL del servidor.

2. **Estilos**:
   - Configuración de **Tailwind CSS** en el archivo `tailwind.config.js`.
   - Los estilos globales se encuentran en `src/index.css`.

### Backend
1. **Conexión a la Base de Datos**:
   - Las credenciales de la base de datos y otras configuraciones críticas están definidas en el archivo `.env` (crearlo en la raíz del proyecto backend):
     ```env
     DB_HOST=localhost
     DB_PORT=3306
     DB_USERNAME=root
     DB_PASSWORD=tu_contraseña
     DB_DATABASE=nombre_base_datos
     ```
   - Estas variables son consumidas en el módulo `TypeOrmModule` en `AppModule`.

2. **Configuraciones Clave**:
   - El backend está configurado para correr en el puerto `3000`. Esto se define en el archivo `.env`. Puede modificarlo según la ruta del servidor.

3. **Parámetros Adicionales**:
   - La sincronización de esquemas con la base de datos (`synchronize`) está deshabilitada en producción para evitar cambios accidentales en las tablas.
---
## 15. Seguridad

### Frontend
1. **Políticas CORS**:
   - En el backend, CORS está habilitado para aceptar solicitudes desde cualquier origen durante el desarrollo.
   - En producción, restringe CORS para aceptar solicitudes únicamente desde dominios confiables.

2. **Variables Sensibles**:
   - Evita incluir datos sensibles o rutas críticas directamente en el código fuente del frontend.
   - Usa variables de entorno y configuración centralizada. Esto se configura en el archivo `.env` para evitar exponer la dirección del servidor.

### Backend
1. **Protección de Base de Datos**:
   - Las credenciales de conexión se manejan a través del archivo `.env` y no están expuestas en el código fuente.

2. **Restricciones de CORS**:
   - En producción, actualiza la configuración de `app.enableCors` en `main.ts` para permitir solicitudes únicamente desde dominios específicos.
---
## 16. Depuración y Solución de Problemas

### Problemas Comunes
1. **Conexión con la Base de Datos**:
   - **Error ECONNREFUSED**: Asegúrate de que el servidor MySQL esté corriendo y que las credenciales en el archivo `.env` sean correctas.
2. **Errores de CORS**:
   - Si el frontend no puede acceder al backend, revisa la configuración de CORS en el archivo `main.ts`.
3. **Errores en la URL Base del Backend**:
   - Si `http://localhost:3000` no es accesible, confirma que el backend esté corriendo correctamente.

### Herramientas de Depuración
1. **Frontend**:
   - Usa las herramientas de desarrollo del navegador para inspeccionar errores en la consola o problemas de red.
2. **Backend**:
   - Habilita un nivel de logging más detallado para rastrear errores internos.
3. **Postman**:
   - Verifica manualmente los endpoints del backend para asegurar que devuelvan los datos esperados.

### Soluciones Comunes
1. **Problemas con Dependencias**:
   - Elimina la carpeta `node_modules` y ejecuta en la terminal, desde la raíz del proyecto con problemas:
     - `npm install`
   - Esto reinstalará todas las dependencias.
   - Asegúrate de que no haya vulnerabilidades ejecutando:
     - `npm audit` o `npm audit fix`
   - Soluciona cualquier vulnerabilidad que pueda detectarse.
---
## 17. Glosario de Términos

- **API REST (Application Programming Interface - Representational State Transfer)**: Estilo de arquitectura que permite que las aplicaciones se comuniquen entre sí a través de solicitudes HTTP, como GET, POST, PUT y DELETE.
- **Frontend**: Parte de una aplicación o sitio web que interactúa directamente con el usuario y muestra la interfaz.
- **Backend**: Parte de una aplicación que maneja la lógica del negocio, la base de datos y las solicitudes del usuario desde el frontend.
- **NestJS**: Framework para aplicaciones Node.js que ofrece una estructura modular para el desarrollo de aplicaciones escalables del lado del servidor.
- **React**: Biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas.
- **Vite**: Herramienta rápida de desarrollo para proyectos web modernos que optimiza la creación de aplicaciones React.
- **Tailwind CSS**: Framework de CSS basado en utilidades que permite diseñar interfaces de manera rápida mediante clases predefinidas.
- **ORM (Object-Relational Mapper)**: Herramienta que facilita la interacción con bases de datos mediante objetos y modelos, evitando consultas SQL directas.
- **CORS (Cross-Origin Resource Sharing)**: Política de seguridad que permite o restringe las solicitudes entre diferentes dominios web.
- **Dockerización**: Proceso de empaquetar una aplicación y sus dependencias en un contenedor para asegurar su ejecución en cualquier entorno.
- **TypeScript**: Lenguaje de programación que extiende JavaScript con tipos estáticos, mejorando la detección de errores en tiempo de desarrollo.
---
## 18. Referencias y Recursos Adicionales
- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [Documentación de NestJS](https://docs.nestjs.com)
- [Guía de Tailwind CSS](https://tailwindcss.com/docs)
- [Tutorial de Vite para React](https://vitejs.dev/guide)
- [Documentación de MySQL](https://dev.mysql.com/doc)
- [Introducción a la API REST](https://restfulapi.net)
- [Recursos de soporte para Node.js](https://nodejs.org/en/community)
- [Postman (para probar APIs)](https://www.postman.com)
---
## 19. Herramientas de Implementación
- **Lenguajes de Programación**:
  - JavaScript
  - TypeScript
- **Frameworks**:
  - **Frontend**: React (con Vite)
  - **Backend**: NestJS (basado en Node.js)
- **APIs de Terceros**:
  - Librerías y paquetes npm como Axios para solicitudes HTTP.
- **Bases de Datos**:
  - MySQL (gestor de base de datos relacional)
---
## 20. Bibliografía
- _"Node.js Design Patterns"_ de Mario Casciaro y Luciano Mammino.
- [Documentación oficial de React](https://reactjs.org)
- [Documentación oficial de NestJS](https://nestjs.com)
- _"MySQL Reference Manual"_ de Oracle Corporation.
- _"Building RESTful Web APIs with Node.js"_ por Pradeep Kumar Singh.
---
