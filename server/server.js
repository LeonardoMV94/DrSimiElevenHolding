const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs').promises; //modif por Jrejas

const PORT = 3000
const indexPath = path.join(__dirname,'..', 'client','index.html');
const contactPath = path.join(__dirname, '..', 'client', 'contacto.html');
const notFoundPath = path.join(__dirname, '..', 'client', '404.html');
const server = http.createServer(async(req, res) => {

    if (req.url == '/' || req.url == '/index.html') {
        res.writeHead(200, { "Content-Type": "text/html" });
        
        fs.readFile(indexPath)
            .then(response => {
                res.end(response);
            })
            .catch(err => {
                res.end("No se encuentra index");
            });
    }  else if ((req.url === '/contacto' || req.url === '/contacto.html') && req.method === 'POST') {        
        console.log('POST contacto')
        recuperar(req, res);
        
        

        //res.writeHeader(200, {"Content-Type": "text/html"});  
        // obtener los datos del formulario ,mostrarlos en consola y en gracias.html

        // responder con gracias.html

    } else if ((req.url === '/contacto' || req.url === '/contacto.html') && req.method === 'GET') {
        console.log('GET contacto')
        fs.readFile(contactPath)
            .then(contenido => {
                res.writeHead(200,{"Content-Type": "text/html"});
                res.end(contenido);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });

    }else {
        res.writeHeader(200, { "Content-Type": "text/html" });        
       fs.readFile(notFoundPath).then(r => res.end(r))
    }

})

server.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}/contacto`)
})


function recuperar(request, response) {
    let info = ''
    request.on('data', datosparciales => {
        console.log(datosparciales)
        info += datosparciales
    })
    request.on('end', () => {
        const formulario = new URLSearchParams(info)
        console.log("formulario : " + formulario)
        console.log(`Nombre: ${formulario.get('nombre')} Email: ${formulario.get('email')} Mensaje: ${formulario.get('mensaje')}`)
        console.log('HOla')

        response.writeHead(200, { 'Content-Type': 'text/html' })
        const pagina =
            `    <!DOCTYPE html>
                    <head>
                        <title>Gracias</title>
                        <style>
                            html {
                                margin: 0;
                                padding: 0;
                                border: 0;
                            }
                            html {
                                width: 100%;
                                height: 100%;
                            }
                            body {
                                width: 100%;
                                height: 100%;
                                position: relative;
                                background-color: rgb(236, 152, 42);
                            }
                            .center {
                                width: 100%;
                                height: 50%;
                                margin: 0;
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                color: white;
                                font-family: "Trebuchet MS", Helvetica, sans-serif;
                                text-align: center;
                            }
                            h1 {
                                font-size: 40px;
                            }
                            p {
                                font-size: 30px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="center">
                            <h1>Gracias ${formulario.get('nombre')} por comunicarse con el Grupo Eleven Holding</h1>
                            <p>Hemos enviado un correo electronico a ${formulario.get('email')} con promociones exclusivas</p>
                            <p>Con el mensaje: ${formulario.get('mensaje')}</p>
                        </div>
                    </body>
                </html>`;


        response.end(pagina);
    });
}