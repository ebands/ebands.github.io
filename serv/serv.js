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
var idx = folders.indexOf('ventanas');
console.log("fold"+folders, idx);
var archivo = params.pathname;


var admin = require('firebase-admin');

var serviceAccount = require('../serv/contabilidade-78eda-firebase-adminsdk-esjeu-e274d3296a.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://contabilidade-78eda.firebaseio.com'
      });
}


if(req.url == "/fecha"){
    var fecha = new Date();
    res.write("La fecha actual es: " + fecha);
    res.end();
} else if(req.url == "/hola"){
    var db = admin.database();
    var ref = db.ref("inventario");
    var value ;
    ref.once("value", function(snapshot) {
        value = snapshot.val();
         console.log(value);     
    });
    res.end("hola mundo");

} else if(req.url == "/headers"){
    res.write(req.rawHeaders+"");
    res.end();
}else if(req.url == "/"){
    var readStream = fs.createReadStream( "../" + "index.html", {} );
    readStream.on('open', function () {
        res.writeHead(200, { });
        readStream.pipe(res);
    });
}/*else if(req.url == "/ventanas/inventario.html"){
   
}else if(req.url == "/ventanas/membersRecord.html"){
   
}else if(req.url == "/ventanas/nav.html"){
   
}else if(req.url == "/ventanas/newMember.html"){
   
}else if(req.url == "/ventanas/pagos.html"){
   
}else if(req.url == "/ventanas/registroInventario.html"){
   
}else if(req.url == "/ventanas/reportePagos.html"){
   
}else if(req.url == "/ventanas/welcomeAdmin.html"){
   
}*/else{
    paginaPorDefecto( req, res );
}

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