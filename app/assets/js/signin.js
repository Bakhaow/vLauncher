const loggerLogin = LoggerUtil('%c[Login]', 'color: #209b07; font-weight: bold;');
const { dialog } = require('electron').remote;
const request = require('request');
const {remote} = require('electron');
const fs = require('fs');
const dir = remote.app.getPath('userData') + '/vLauncher';
let pseudo;

function logged() {
  loggerLogin.log("Logged as " + $("#username").val());
  pseudo = $("#username").val();
  createNotExisting(dir);
  if($('#saver').prop("checked") == true){
    usernameSaver();
  }
  $('#pseudo').html('<img src="https://cravatar.eu/helmavatar/' + pseudo + '/75.png" alt="">' + pseudo)
  $(".page").addClass("hidden");
  $('#profil').removeClass('hidden');
  $('#signinNav').html('Profil');
  $('#signupNav').html('Déconnexion');
}

function usernameSaver() {
  loggerLogin.log('Saving credentials');
  createNotExisting(dir + '/vOptions');
  fs.writeFile(dir + "/vOptions/user.txt", $("#username").val(), function(err) {
    if(err) {
        return loggerLogin.log(err);
    }
  })
}

function createNotExisting(directory) {
  if(!fs.existsSync(directory)){
      fs.mkdirSync(directory, 0766, function(err){
          if(err){
              loggerLogin.log(err);
          }
      });
  }
}

$("#signin-button").click(function() {
  if($("#username").val().length < 4) {
    dialog.showErrorBox("Authentification", "Il faut entrer un pseudo valide.");
    loggerLogin.log('Error (user.length < 4)');
  } else {
    if($("#password").val().length < 8) {
      dialog.showErrorBox("Authentification", "Il faut entrer un mot de passe valide.");
      loggerLogin.log('Error (password.length < 8)');
    } else {
      let url = "https://dev.netheberg.eu/Auth.php?" + "pseudo=" + $("#username").val() + "&password=" + $("#password").val();

      request({
        url: url,
        json: true
      }, function(error, response, body) {

        if(!error && response.statusCode === 200) {
          if(body.authentification) {
            logged();
          } else if(!body.authentification){
            dialog.showErrorBox("Authentification", "Le mot de passe ne correspond pas au pseudonyme.");
            loggerLogin.log('Error (Bad credentials)');
          }
        } else {
          dialog.showErrorBox("Erreur:","Veuillez contacter le support. Code:0");
          loggerLogin.log('Error (Connexion / Page invalide)');
        }
      })
    }
  }
});
