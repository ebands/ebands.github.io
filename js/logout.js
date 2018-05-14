
var btnLogout = $("#btnLogout");
btnLogout.click(function() {
  var url = "login.html";    
  firebase.auth().signOut()
  .then(function() {
    // Sign-out successful.    
    $(location).attr('href',url);
  })
  .catch(function(error) {
    // An error happened
  });

});

