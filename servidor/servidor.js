var http = require("http");
var fs = require("fs");
var url = require("url");

// Crea el servidor Web, que será atendido por la funcion listener
var server = http.createServer( listener );

// funcion que atiende las peticiones
function listener(req, res){
console.log( "Peticion recibida: " + req.url );

// Descompone la URL en sus componentes
var params = url.parse( req.url );
// convierte las partes del path en un array
var folders = params.pathname.split("/");

var archivo = params.pathname;

paginaPorDefecto( req, res );

}

function paginaPorDefecto(req, res){
var archivo = req.url;

try{
// cambie el archivo home.html por el el desea mostrar
var readStream = fs.createReadStream( "../" + archivo, {} );

// Espera a que comience la conversación para entregar el archivo
readStream.on('open', function () {
res.writeHead(200, { });
readStream.pipe(res);
});

readStream.on( 'error', hayError );

// Controla en caso de error en la lectura
function hayError(error){
console.log( "Ocurrió un error" );
console.log( error );

res.writeHead(404, { 'content-type': 'text/html' });

res.write( '<h1>Archivo no encontrado</h1>' );
res.write( 'verifique la URL por favor' );
res.end();
// Equivalen a: res.end( 'Archivo no encontrado' );
}

} catch ( error ) {
console.log( "Ocurrió un error" );
console.log( error );

}
}

// Si no recibe un numero de puerto por parametro en la linea de comando, usa el 8081
var port = process.argv[2] || 8081 ;

// Ejecuta el servidor
server.listen( port );

console.log( "Servidor HTTP corriendo en el puerto " + port);
console.log( "Ctrl-c para terminar");