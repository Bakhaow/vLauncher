const {getCurrentWindow, globalShortcut} = require('electron').remote;

var reload = ()=>{
  getCurrentWindow().reload()
}

globalShortcut.register('F5', reload);
globalShortcut.register('CommandOrControl+R', reload);

window.addEventListener('beforeunload', ()=>{
  globalShortcut.unregister('F5', reload);
  globalShortcut.unregister('CommandOrControl+R', reload);
})
