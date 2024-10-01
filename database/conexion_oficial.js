//Modulo npm node-postgres 
const { Client } = require('pg');

//Datos para la conexión a la base de datos 
const cliente = 
new Client({ 
            user: 'postgres', 
            host: 'localhost', 
            database: 'edutecno', 
            password: '1234', 
            port: 5432
        });

module.exports = cliente;