//Modulo npm node-postgres 
const { Pool } = require('pg');

//Datos para la conexión a la base de datos 
const pool =
    new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'biblioteca',
        password: '1234',
        port: 5432,
    });   
    
//Realizando una consulta para verificar si hay error 
pool.query('SELECT * FROM miembros ORDER BY nombre_miembro;', (err, res) => {
    console.table(res.rows);
    pool.end();
}); 