// variable de entorno, debe ser agregada para la conexión

var config =  {
    apiKey: "AIzaSyADwwPRJnzyBzWCBKFYZbER_nzCDwTPOzk",
    authDomain: "contabilidade-78eda.firebaseapp.com",
    databaseURL: "https://contabilidade-78eda.firebaseio.com",
    projectId: "contabilidade-78eda",
    storageBucket: "contabilidade-78eda.appspot.com",
    messagingSenderId: "884124638954"
  };  

//////////////////////////
//VARIABLES
/////////////////////////
var tableInvent = $("#tableInvent").DataTable();
var defaultApp = firebase.initializeApp(config);
var fb = firebase.database().ref();
var database = firebase.database();
var redt = database.ref('/inventario/');

/**Metodo que obtiene los datos de la BD y los carga en un dataTable**/
function getData(){ 
    //userId = firebase.auth().currentUser.uid
      return redt.once('value').then(function(snapshot) {  		
      snapshot.forEach(function(child){       
        var key = child.key;
        var value = child.val();
        var nameInstrument = value.nameInstrument;
        var typeInstrument = value.typeInstrument;
        tableInvent.row.add([
          key,
          nameInstrument,
          typeInstrument          
        ]).draw();  
      });
    });
  }

  /**Metodo de inialización del documento, comienza por aquí**/
 $(function(){     
    getData();
 });