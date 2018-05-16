var inputPago= $("#namePagos");

$(document).ready(function(){
    pop =  $("#pop-up-info");
    date =    $("#date").datepicker()
    $("#btnAdd").click(function(){
        pop.bPopup({
            zIndex: 4,
          modalClose: false,
          position: [300, 150]
        });
    });
    $(".b-close").click(function(){
        
        date.datepicker("hide");
    });

    $("#btnAceptar").click(function(){
        pop.close();
        date.datepicker("hide");
        postTipoPago();
    });


  

});


function postTipoPago(){
    
    var options = {
      url: "/write_pago",
      dataType: "text",
      type: "POST",
      data: {nameTipoPago:inputPago.val(),
          fecha:date.val() },//test: JSON.stringify( data ) }, // Our valid JSON string
      success: function( data, status, xhr ) {
         //...
      },
      error: function( xhr, status, error ) {
          //...
      }
    };
    $.ajax( options );
}


function getData() { 
    //userId = firebase.auth().currentUser.uid
      return redt.once('value').then(function(snapshot) {  		
      snapshot.forEach(function(child){       
        var key = child.key;
        var value = child.val();
        var nameTipoPago = value.nameTipoPago;
        var fecha = value.fecha;
        var button = document.createElement('input');
        button.type = 'button';
        button.className = 'btn btn-primary btn-lg btn block'
       
  
         
      });
    });
  }


function getFromServ(){
 
    $.ajax({
      url: "/read_pagos",
      type: 'GET',
      //dataType: 'json', // added data type
      success: function(res) {
        var button = "<input type='button' class='btn btn-primary btn-lg btn-block'/>"
        res.forEach(function(element) {
          console.log(element);
          var button = document.createElement('input');
          button.type = 'button';
          button.className = 'btn btn-primary btn-lg btn block'
          button.value = element[2]

          
          
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

 

 
 

  
   

 


