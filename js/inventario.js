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
var commentsRef = database.ref('inventario');
var pop =  $("#pop-up-info");
var btnUpdateInt = $("#btnUpdateInt");
var nameInstrument =$("#tvName"); 
var typeInstrument = $("#spTipOb");   
var url = "login.html";    
var key ;
var userId ;

//////////////////////////
//METODOS
/////////////////////////

/**Metodo que obtiene los datos de la BD y los carga en un dataTable**/
function getData() { 
  //userId = firebase.auth().currentUser.uid
    return redt.once('value').then(function(snapshot) {  		
    snapshot.forEach(function(child){       
      var key = child.key;
      var value = child.val();
      var nameInstrument = value.nameInstrument;
      var typeInstrument = value.typeInstrument;
      var btnEdicion ="<input type='image' src='../img/edit-button.png'  class='edicion' />";          
      var btnBorrar = "<input type='image' src='../img/waste-bin1.png'  class='borrar' />";

      tableInvent.row.add([
        key,
        nameInstrument,
        typeInstrument,
        btnEdicion,
        btnBorrar          
      ]).draw();  
    });
  });
}

function getFromServ(){
 
  $.ajax({
    url: "/read_invent",
    type: 'GET',
    //dataType: 'json', // added data type
    success: function(res) {
      var btnEdicion ="<input type='image' src='../img/edit-button.png'  class='edicion' />";          
      var btnBorrar = "<input type='image' src='../img/waste-bin1.png'  class='borrar' />";
      res.forEach(function(element) {
        console.log(element);
        tableInvent.row.add([
          element[0],
          element[1],
          element[2],
          btnEdicion,
          btnBorrar
        ]).draw();  
      });
    
  
    },error: function (res, status, error) {
      alert("si, error", error);
    }
});
}

function getF(){
  $.getJSON( '/read', function( data ) {

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      console.log(data)
    });

  });
}

/**Onclick de los botones edición del DataTable, carga un popUp con la información de la fila**/
tableInvent.on('click', '.edicion', function () {
  var RowIndex = $(this).closest('tr');
  var data = tableInvent.row(RowIndex).data(); 
  key = data[0];
  pop.bPopup({
    zIndex: 4,
  position: ['auto',100]  
  });
  
  nameInstrument.val(data[1]);
  typeInstrument.val(data[2]);

});

/**Onclick de los botones edición del DataTable, Elimina la fila del boton que se haya seleccinado**/
tableInvent.on('click', '.borrar', function () {
  var RowIndex = $(this).closest('tr');
  var data = tableInvent.row(RowIndex).data(); 
  deleteBk(data[0]);
  //var desertRef = database.ref('inventario/'+data[0]);
  // Delete the file
  /*desertRef.remove().then(function() {
    rechargeTable();
  }).catch(function(error) {
    // Uh-oh, an error occurred!
  });*/

});

/**Onclick del boton Actualizar del popUP, actualiza la fila que se haya seleccionado, con la información que se haya cambiado**/
btnUpdateInt.click( function() {
  updateBk(key);
  //updateEst(key);
});

/**Actualiza un instrumento con el key de este pasado por parametro**/
function updateEst(key) {
  var fechaMatricula =$("#tvDateMatr");
  var fechaIngreso =  $("#tvDateIngr");

  var postData = {
    id:key,
    nameInstrument:nameInstrument.val(),
    typeInstrument:typeInstrument.val()
  };  
  
  var updates = {};
  updates['/inventario/' + key] = postData;
  return fb.update(updates);
}

function updateBk(key){
  $.ajax({
    url: '/put_invent',
    type: 'PUT',    
    data: {id:key,
          nameInstrument:nameInstrument.val(),
          typeInstrument:typeInstrument.val() },//test: JSON.stringify( data ) }, // Our valid JSON string
    success: function( data, status, xhr ) {
        //...
    },
    error: function( xhr, status, error ) {
        //...
    }
  
  });
}


function deleteBk(key){
  $.ajax({
    url: '/delete_invent',
    type: 'DELETE',    
    data: {id:key},//test: JSON.stringify( data ) }, // Our valid JSON string
    success: function( data, status, xhr ) {
        //...
    },
    error: function( xhr, status, error ) {
        //...
    }
  
  });
}
/**Escucha cambios en en el nodo Inventario, para actualizar la información del DataTable y cerrar el popUP**/
commentsRef.on('child_changed', function(data) {     
   rechargeTable();
  pop.close();
});

/**Actualiza la información del DataTable**/
function rechargeTable() {
  tableInvent
  .clear()
  .draw();
  try{
    getFromServ();    
  }catch(err){
    alert("cannot recharge de page")   
  }
}

/**Metodo de inialización del documento, comienza por aquí**/
 $(function() {    
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {    
      user = firebase.auth().currentUser;    
      getFromServ();
      
    } else {
       $(location).attr('href',url);   
    }
  });
  
 });