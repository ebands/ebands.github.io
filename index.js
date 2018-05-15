var express = require('express');
var app = express();

// set port 
var port = process.env.PORT || 5000

app.use(express.static(__dirname));

app.get("/", function(req, res){
    res.render("index");
})

app.listen(port, function(){
    console.log("app running");
})

var admin = require('firebase-admin');

var serviceAccount = require('./contabilidade-78eda-firebase-adminsdk-esjeu-e274d3296a.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://contabilidade-78eda.firebaseio.com'
      });
}

var db = admin.database();
var ref = db.ref("inventario");
var value ;
ref.once("value", function(snapshot) {
    value = snapshot.val();
     console.log(value);     
});

/*var route = express.Router();

route.get('/', function(req, res){
    res.json({'mensaje':'Hola Api'})
})

//El use es para asignarle una ruta por defecto
app.use('/api', route)
app.listen(PORT, ()=> console.log('Escuchando en el puerto ', PORT))*/