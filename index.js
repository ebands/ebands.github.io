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


 //////////////////////////////////
 ///// peticiones PAGOS
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
