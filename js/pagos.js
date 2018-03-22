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
    });
  

});


 

 
 

  
   

 


