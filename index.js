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
