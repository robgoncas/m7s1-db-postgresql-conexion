const http = require('http');
const url = require('url');
const URLSearchParams = url.URLSearchParams;
const cliente = require('../database/conexion_oficial.js');

//Lista de países como objetos
let paises = [
    { nombre: 'Chile', sufijoTelefonico: '+56', sueldoMinimo: 400000 },
    { nombre: 'Argentina', sufijoTelefonico: '+54', sueldoMinimo: 300000 },
    { nombre: 'Perú', sufijoTelefonico: '+51', sueldoMinimo: 350000 }
];

let animales = [];

const server = http.createServer((req, res) => {
    //Log el método HTTP
    console.log(`Método HTTP: ${req.method}`);

    if (req.method === 'GET' && req.url === '/paises') {
        // Endpoint GET /paises - devuelve la lista de países
        res.writeHead(200, { 'Content-Type': 'application/json' });

        cliente.connect();

        cliente.query('SELECT * from paises;', (err, resSQL) => { 
            //console.table(res.rows);
            res.write(JSON.stringify({paises: resSQL.rows}));
            res.end();
            cliente.end(); 
        }); 

    } else if (req.method === 'POST' && req.url === '/paises') {
        // Endpoint POST /paises - agrega un país a la lista
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            if (!body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No se envió ningún dato en el cuerpo' }));
                return;
            }

            const nuevoPais = JSON.parse(body);
            if (!nuevoPais.nombre || !nuevoPais.sufijoTelefonico || !nuevoPais.sueldoMinimo) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Faltan campos obligatorios' }));
                return;
            }

            paises.push(nuevoPais);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'País agregado', paises }));
        });

    } else if (req.method === 'PUT' && req.url.startsWith('/paises')) {
        //Endpoint PUT /paises - actualiza completamente un país por índice
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            if (!body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No se envió ningún dato en el cuerpo' }));
                return;
            }

            const { indice, pais } = JSON.parse(body);

            if (indice >= 0 && indice < paises.length 
                && pais.nombre && pais.sufijoTelefonico && pais.sueldoMinimo) {
                paises[indice] = pais;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'País actualizado', paises }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Índice inválido o falta información del país' }));
            }
        });

    } else if (req.method === 'PATCH' && req.url.startsWith('/paises')) {
        //Endpoint PATCH /paises - modifica parcialmente un país por índice
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            if (!body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No se envió ningún dato en el cuerpo' }));
                return;
            }

            const { indice, actualizacion } = JSON.parse(body);

            if (indice >= 0 && indice < paises.length && actualizacion) {
                const pais = paises[indice];
                paises[indice] = { 
                    ...pais, 
                    ...actualizacion  //Solo actualiza los campos enviados
                };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ mensaje: 'País modificado', paises }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Índice inválido o falta la actualización' }));
            }
        });

    } else if (req.method === 'DELETE' && req.url.startsWith('/paises')) {
        //Endpoint DELETE /paises - elimina un país por índice
        const queryParams = req.url.split('?')[1]; //Extrae los parámetros de la URL
        const searchParams = new URLSearchParams(queryParams);

        const indice = parseInt(searchParams.get('indice'), 10);

        if (indice >= 0 && indice < paises.length) {
            paises.splice(indice, 1); //Elimina el país en el índice dado
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ mensaje: 'País eliminado', paises }));
            res.end();
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ error: 'Índice inválido' }));
            res.end();
        }

    } else if (req.method === 'GET' && req.url.startsWith('/animal')) {
        //Endpoint GET /animal?nombre=tigre&familia=felinos - crea un animal
        const queryParams = req.url.split('?')[1]; 
        const searchParams = new URLSearchParams(queryParams);

        const animal = {
            nombre: searchParams.get('nombre'),
            familia: searchParams.get('familia')
        };

        if (animal.nombre && animal.familia) {
            animales.push(animal);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ mensaje: 'Animal agregado', animales }));
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Faltan parámetros' }));
        }

    } else {
        //Endpoint no encontrado
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Endpoint no encontrado' }));
    }
});

//Puerto de escucha del servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//exportar const server
module.exports = server;