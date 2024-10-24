# App Evaluación 360 grados

## Descripción
Este proyecto es una aplicación de evaluación 360 grados que permite a los usuarios crear, responder y gestionar evaluaciones. La aplicación está construida utilizando Node.js para el backend y React.js para el frontend.

## Instrucciones para Configurar y Ejecutar el Proyecto


### Requisitos Previos
- Node.js (v14 o superior)
- React.js
- MongoDB
- Git

### Clonación del Repositorio
```bash
git clone https://github.com/Bomc17/test-evaluacion-360.git
```

### Backend
### Instalar dependencias del proyecto e iniciarlo

```bash
cd backend
npm install
npm start
```

### Fronted
```bash
cd fronted
npm install
npm run dev
```

## Decisiones de Diseño


## Backend

Modelo Usuario: Gestiona la autenticación y autorización.

Modelo Empleado: Relaciona usuarios con sus roles y detalles específicos.

Modelo Evaluacion: Permite la creación y gestión de evaluaciones, incluyendo preguntas y respuestas.

Modelo Feedback: Permite la creación y gestión del feedback dependiendo de las caracteristicas de los datos.

Rutas y Controladores: Modularidad para un manejo claro y eficiente de las distintas funcionalidades (autenticación, gestión de empleados, evaluaciones, y feedback).


## Frontend

Componentes Modulares: Cada componente maneja una funcionalidad específica (formulario de evaluación, lista de evaluaciones, respuesta a preguntas).

Contexto de Autenticación: Facilita la gestión de la autenticación y el manejo de tokens en toda la aplicación.

Interfaz Intuitiva: Diseño centrado en el usuario para una navegación sencilla y clara.
