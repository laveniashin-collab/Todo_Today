const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('stickyAPI', {
  getAll: () => ipcRenderer.invoke('store:getAll'),
  saveAll: (data) => ipcRenderer.invoke('store:saveAll', data),
  close: () => ipcRenderer.invoke('window:close'),
  minimize: () => ipcRenderer.invoke('window:minimize'),
  toggleOnTop: (flag) => ipcRenderer.invoke('window:toggleOnTop', flag),
  onDragStart: (callback) => {
    ipcRenderer.on('drag-start', callback);
  }
});
