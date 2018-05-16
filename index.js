var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// set port 
var port = process.env.PORT || 5000
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
var usersRef = ref;

var refEst = db.ref("estudiantes");
var estRef = refEst;


app.use(express.static(__dirname)); 

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function(req, res){
    res.render("index");
})

app.listen(port, function(){
    console.log("app running");
})

 //////////////////////////////////
 ///// PETICIONES INVENTARIO
 //////////////////////////////////

app.get('/read_invent',function (req, res){
    var db = admin.database();
    var ref = db.ref("inventario");
    var value ;
    var dataSet;
    var mapDatos=[];
    ref.once("value", function(snapshot) {
        value = snapshot.val();
        snapshot.forEach(function (childSnapshot) {
            var val = childSnapshot.val();
            dataSet = [val.id,val.nameInstrument, val.typeInstrument];              
            mapDatos.push(dataSet);
            console.log(dataSet);
        });
        res.send(mapDatos);          
    });   
    
  })

app.post('/write_invent', function(req, res) {   
    console.log('req received');
    console.log(req.body);

   
    var newPostRef = usersRef.push();
    var key = newPostRef.key;
   
    var nameInstrument=req.body.nameInstrument;
    var typeInstrument = req.body.typeInstrument;
    
    console.log('var',nameInstrument,typeInstrument);
      
    res.send(newPostRef.set({   
        id:key,   
        nameInstrument: nameInstrument,
        typeInstrument: typeInstrument        
    }));
 });

 app.put('/put_invent', function (req, res) {
    console.log(req.body);  
    var key = req.body.id;
    var nameInstrument=req.body.nameInstrument;
    var typeInstrument = req.body.typeInstrument;
    var hopperRef = usersRef.child(key);
        res.send(         
            hopperRef.update({
                "nameInstrument":nameInstrument,
                "typeInstrument":typeInstrument
            })
        );
 });
 

 app.delete('/delete_invent', function(req, res){
    console.log(req.body);
    var key = req.body.id;
    var desertRef = db.ref('inventario/'+key);
    res.send(        
        // Delete the file
        desertRef.remove().then(function() {
        }).catch(function(error) {
            // Uh-oh, an error occurred!
        })
    );
 });

///////////////////////////////////////////////////////////////////////////////////
//ESTUDIANTE
//////////////////////////////////////////////////////////////////////////////////
app.post('/write_student', function(req, res) {   
    console.log('req received');
    console.log(req.body);
   
    var newPostRef = estRef.push();
    var key = newPostRef.key;

    var fechaMatr = req.body.fechaMatr;
    var fechaIngr = req.body.fechaIngr;
    var nombre = req.body.nombre;
    var tipoDoc = req.body.tipoDoc;
    var apellido = req.body.apellido;
    var numDoc = req.body.numDoc;
    var fechaNac = req.body.fechaNac;
    var rh = req.body.rh;
    var sexo = req.body.sexo;
    var dir = req.body.dir;
    var telefono = req.body.telefono;
    var celular = req.body.celular;
    var salud = req.body.salud;
    var escuadron = req.body.escuadron;

    console.log('var',fechaMatr,fechaIngr,nombre,tipoDoc,apellido,
    numDoc,fechaNac,rh,sexo,dir,telefono,celular,salud,escuadron);
      
    res.send(newPostRef.set({   
        id:key,   
        fechaMatr:fechaMatr,
        fechaIngr:fechaIngr,
        nombre:nombre,
        tipoDoc:tipoDoc,
        apellido:apellido,
        numDoc:numDoc,
        fechaNac:fechaNac,
        rh:rh,
        sexo:sexo,
        dir:dir,
        telefono:telefono,
        celular:celular,
        salud:salud,
        escuadron:escuadron  
    }));
 });

 app.get('/read_estudiantes',function (req, res){
    var db = admin.database();
    var ref = db.ref("estudiantes");
    var value ;
    var dataSet;
    var lstEstudiantes=[];
    ref.once("value", function(snapshot) {
        value = snapshot.val();
        snapshot.forEach(function (childSnapshot) {
            var val = childSnapshot.val();
            dataSet = [val.id, val.fechaMatr,val.fechaIngr, val.nombre, val.apellido, 
                val.tipoDoc, val.numDoc, val.fechaNac, val.rh, val.sexo, val.dir, 
                val.telefono, val.celular, val.salud, val.escuadron];              
            lstEstudiantes.push(dataSet);
            console.log(dataSet);
        });
        res.send(lstEstudiantes);          
    });   
    
  })

  app.delete('/delete_estudiante', function(req, res){
    console.log(req.body);
    var key = req.body.id;
    var desertRef = db.ref('estudiantes/'+key);
    res.send(        
        // Delete the file
        desertRef.remove().then(function() {
        }).catch(function(error) {
            // Uh-oh, an error occurred!
        })
    );
 });

 //////////////////////////////////
 ///// PETICIONES PAGOS
 //////////////////////////////////

 app.post('/write_pago', function(req, res) {   
    console.log('req received');
    console.log(req.body);
    var refe = db.ref("pagos");
    var usersRefe = refe;

   
    var newPostRef = usersRefe.push();
    var key = newPostRef.key;
   
    var nameTipoPago=req.body.nameTipoPago;
    var fecha = req.body.fecha;
    var estado = req.body.estado;
    
    console.log('var',nameTipoPago,fecha);
      
    res.send(newPostRef.set({   
        id:key,   
        nameTipoPago: nameTipoPago,
        fecha: fecha,
        estado: estado

    }));
 });

 app.get('/read_pagos',function (req, res){  
    var ref = db.ref("pagos");
    var value ;
    var dataSet;
    var mapDatos=[];
    ref.once("value", function(snapshot) {
        value = snapshot.val();
        snapshot.forEach(function (childSnapshot) {
            var val = childSnapshot.val();
            dataSet = [val.id, val.fecha, val.nameTipoPago];              
            mapDatos.push(dataSet);
            console.log(dataSet);
        });
        res.send(mapDatos);          
    });   
    
  })

  app.get('/read_pagosEst',function (req, res){
    var db = admin.database();
    var ref = db.ref("estudiantes");
    var value ;
    var dataSet;
    var listaEst=[];
    ref.once("value", function(snapshot) {
        value = snapshot.val();
        snapshot.forEach(function (childSnapshot) {
            var val = childSnapshot.val();
            dataSet = [val.id,val.nombre, val.apellido,val.numDoc];              
            listaEst.push(dataSet);
            console.log(dataSet);
        });
        res.send(listaEst);          
    });   
    
  })
