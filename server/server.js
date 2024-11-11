const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs').promises; //modif por Jrejas

const PORT = 3000

const server = http.createServer((req, res) => {

    if (req.url == '/') {
        res.writeHeader(200, { "Content-Type": "text/html" });

    } else if (req.url === '/contacto' && req.method == 'GET') {
        const filepath = path.join(__dirname, '..', 'client', 'contacto.html');
        fs.readFile(filepath)
            .then(contenido => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contenido);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });

    } else if (req.url === '/contacto' && req.method == 'POST') {
        recuperar(req, res);


        //res.writeHeader(200, {"Content-Type": "text/html"});  
        // obtener los datos del formulario ,mostrarlos en consola y en gracias.html

        // responder con gracias.html

    } else {
        res.writeHeader(200, { "Content-Type": "text/html" });
        //res.send('Pagina')
    }

})

server.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}/contacto`)
})


function recuperar(pedido, respuesta) {
    let info = ''
    pedido.on('data', datosparciales => {
        info += datosparciales
    })
    pedido.on('end', () => {
        const formulario = new URLSearchParams(info)
        console.log(`Nombre: ${formulario.get('nombre')} Email: ${formulario.get('mail')}`)


        respuesta.writeHead(200, { 'Content-Type': 'text/html' })
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
            <p>Hemos enviado un correo electronico a ${formulario.get('mail')} con promociones exclusivas</p>
        </div>
    </body>
</html>`;


        respuesta.end(pagina);
    });
}