$("#dl").click(function() {
  ipcRenderer.send('files_dl');
  loggerLogin.log("DL FILES");
});
