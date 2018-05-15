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

/*var route = express.Router();

route.get('/', function(req, res){
    res.json({'mensaje':'Hola Api'})
})

//El use es para asignarle una ruta por defecto
app.use('/api', route)
app.listen(PORT, ()=> console.log('Escuchando en el puerto ', PORT))*/