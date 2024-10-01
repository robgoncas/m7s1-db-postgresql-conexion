
# Introducción a las Bases de Datos

## ¿Qué es una Base de Datos?
Una base de datos es un conjunto organizado de información o datos estructurados, generalmente almacenados y accesibles electrónicamente desde un sistema informático. Las bases de datos permiten almacenar grandes cantidades de datos de manera eficiente, permitiendo su recuperación, actualización y manipulación de forma sencilla.

## Beneficios de PostgreSQL
PostgreSQL es un sistema de gestión de bases de datos relacional y orientado a objetos. A continuación, algunos de sus beneficios:

- **Código abierto**: PostgreSQL es de código abierto, lo que significa que es gratuito y tiene una gran comunidad de desarrolladores que contribuyen a su mejora.
- **Extensible**: Permite la creación de nuevos tipos de datos, funciones personalizadas, y más.
- **Compatibilidad con estándares**: Cumple con el estándar SQL, lo que facilita su uso con diferentes herramientas.
- **Rendimiento y escalabilidad**: Es adecuado tanto para pequeñas aplicaciones como para grandes sistemas empresariales.
- **Soporte para datos no estructurados**: Ofrece soporte nativo para JSON y otras estructuras no relacionales.

## ¿Qué es el Backend?
El backend se refiere a la parte de una aplicación o sistema que se encarga de la lógica del servidor, la manipulación de la base de datos, y la lógica de negocio. A diferencia del frontend, que es la parte visible para el usuario, el backend procesa peticiones y envía datos al frontend para que sean visualizados.

## Conexión a PostgreSQL desde Node.js

### Paquete `pg`
El paquete `pg` en Node.js es uno de los módulos más utilizados para conectarse a bases de datos PostgreSQL. Ofrece dos maneras principales de conectarse:

1. Conexión Simple: Se utiliza cuando la aplicación maneja un número bajo de peticiones concurrentes o cuando las conexiones a la base de datos no son frecuentes. Cada vez que haces una consulta, se establece y cierra una conexión nueva. Este enfoque es adecuado para aplicaciones pequeñas o con tráfico bajo, ya que no hay necesidad de reutilizar conexiones.

Ejemplo de uso: Una aplicación de escritorio que interactúa ocasionalmente con la base de datos para obtener o actualizar información.

2. Pool de Conexiones: Es recomendable cuando tu aplicación maneja múltiples usuarios simultáneos o cuando se realizan muchas peticiones a la base de datos. El pool crea un conjunto de conexiones que se reutilizan para mejorar el rendimiento, evitando el costo de crear y cerrar una conexión cada vez. Esto es ideal para aplicaciones web o móviles con alto tráfico.

Ejemplo de uso: Un sitio web de comercio electrónico donde muchos usuarios realizan consultas al mismo tiempo.

### Instalación del Paquete
Para instalar el paquete `pg`, puedes usar el siguiente comando:

```bash
npm install pg
```

### Conexión Simple a la Base de Datos

```js
//import { Client } from 'pg' // Importar de manera ES6
//const { Client } = require('pg'); CommonJS -> forma tradicional (antigua)

const { Client } = require('pg');

const client = new Client({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'mi_basedatos',
  password: 'tu_contraseña',
  port: 5432,
});

client.connect()
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión', err.stack));
```

### Pool de Conexiones

```js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'mi_basedatos',
  password: 'tu_contraseña',
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log('Conectado al pool de conexiones');
    client.release(); // Libera la conexión de vuelta al pool
  })
  .catch(err => console.error('Error de conexión', err.stack));
```

### Conexión usando URI

También puedes conectarte a PostgreSQL utilizando una URI:

```js
const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://tu_usuario:tu_contraseña@localhost:5432/mi_basedatos'
});

client.connect()
  .then(() => console.log('Conectado a la base de datos mediante URI'))
  .catch(err => console.error('Error de conexión', err.stack));
```


Crear BD
Crear un usuario BD + password
Crear una tabla
Crear conexión Simple + Pool
Select! Node.js + PostgreSQL