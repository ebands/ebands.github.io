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

app.get('/get', (req, res) => {
    var db = admin.database();
    var ref = db.ref("inventario");
    var value ;
    ref.once("value", function(snapshot) {
        value = snapshot.val();
        console.log(value);     
    });
    res.send(value)
  })

app.post('/read', function(req, res) {   
    console.log('req received');
    console.log(req.body);

    var db = admin.database();
    var ref = db.ref("inventario");
    var usersRef = ref;
    var newPostRef = usersRef.push();
    var key = newPostRef.key;
   
    var nameInstrument=req.body.nameInstrument;
    var typeInstrument = req.body.typeInstrument;
    
    console.log('var',nameInstrument,typeInstrument);
      
    res.send(newPostRef.set({      
        nameInstrument: nameInstrument,
        typeInstrument: typeInstrument        
    }));
 });
 
