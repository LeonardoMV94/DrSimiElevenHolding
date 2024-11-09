const http =  require('node:http')
const path = require('node:path')
const fs = require('node:fs')

const PORT = 3000

const server = http.createServer((req, res) => {

    if(req.url == '/'){
        response.writeHeader(200, {"Content-Type": "text/html"});  

    } else if(req.url === '/contacto' && req.method == 'GET') {
        response.writeHeader(200, {"Content-Type": "text/html"});  
        // responder con contacto.html

    } else if(req.url === '/contacto' && req.method == 'POST'){
        response.writeHeader(200, {"Content-Type": "text/html"});  
        // obtener los datos del formulario ,mostrarlos en consola y en gracias.html

        // responder con gracias.html

    }else {
        response.writeHeader(200, {"Content-Type": "text/html"});  
        res.send('Pagina')
    }

})

server.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}/contacto`)
})