const $ = require('jquery');
const LoggerUtil = require('./assets/js/loggerutil');
const loggerNav = LoggerUtil('%c[Nav]', 'color: #209b07; font-weight: bold;');

$(".nV").click(function() {
  let lastPage = $(".active");
  lastPage.removeClass("active");
  loggerNav.log("Went To " + $(this).html() + " From " + lastPage.html());
  $(this).addClass("active");
  $(".page").addClass("hidden");
  $("." + $(this).attr('id').slice(0, -3)).removeClass("hidden");
});

$("#siteNav").click(function() {
  let vSite = window.open('http://github.com', 'vSite');
});

$("#discordNav").click(function() {
  let vSite = window.open('https://discord.gg/txpnhp2', 'vDiscord');
});

$("#signinNav").click(function() {
  if($(this).html() === 'Se connecter') {
    let username;
    try {
        var data = fs.readFileSync(dir + "/vOptions/user.txt", 'utf8');
        username = data;
    } catch(e) {}
    $("#username").val(username);
    let lastPage = $(".active");
    lastPage.removeClass("active");
    loggerNav.log("Went To " + $(this).html() + " From " + lastPage.html());
    $(".page").addClass("hidden");
    $("." + $(this).attr('id').slice(0, -3)).removeClass("hidden");
  } else {
    let lastPage = $(".active");
    lastPage.removeClass("active");
    loggerNav.log("Went To " + $(this).html() + " From " + lastPage.html());
    $(".page").addClass("hidden");
    $("#profil").removeClass("hidden");
  }
});

$("#signupNav").click(function() {
  if($(this).html() === 'Inscription') {
    let lastPage = $(".active");
    lastPage.removeClass("active");
    loggerNav.log("Went To " + $(this).html() + " From " + lastPage.html());
    $(".page").addClass("hidden");
    $("." + $(this).attr('id').slice(0, -3)).removeClass("hidden");
  } else {
    let lastPage = $(".active");
    lastPage.removeClass("active");
    loggerNav.log("Went To " + $(this).html() + " From " + lastPage.html());
    $(".page").addClass("hidden");
    $('#home').removeClass('hidden');
    $('#signinNav').html('Se connecter');
    $('#signupNav').html('Inscription');
  }
});
