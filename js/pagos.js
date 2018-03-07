$(document).ready(function(){
    pop =  $("#pop-up-info");
    date =    $("#date").datepicker()
    $("#btnAdd").click(function(){
        pop.bPopup({
            zIndex: 4,
          modalClose: false,
          position: [750, 150]
        });
    });
    $(".b-close").click(function(){
        console.log("SDF")
     date.datepicker("hide");
    });
  

});

 

 
 

  
   

 


