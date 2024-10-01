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

//Conectando al cliente 
cliente.connect();

cliente.query('SELECT * from cursos;', (err, res) => { 
    //arreglo de paises
    //console.log(res.rows); 
    const paises = ['Chile', 'Colombia', 'China'];
    console.table(paises);
    console.table(res.rows);
    cliente.end(); 
}); 

// cliente.query('SELECT NOW()', (err, res) => { 
//     //arreglo de paises
//     console.log(res); 
//     cliente.end(); 
// }); 