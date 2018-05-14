var url = "login.html";    
$(function(){ 
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {    
      user = firebase.auth().currentUser;      
    } else {
       $(location).attr('href',url);   
    }
  });
});
