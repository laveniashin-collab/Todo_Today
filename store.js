const fs = require('fs');
const path = require('path');
const { app } = require('electron');

class Store {
  constructor() {
    this.file = path.join(app.getPath('userData'), 'sticky-data.json');
  }

  _read() {
    try {
      if (fs.existsSync(this.file)) {
        return JSON.parse(fs.readFileSync(this.file, 'utf-8'));
      }
    } catch (e) {
      console.error('读取数据文件失败:', e);
    }
    return null;
  }

  getAll() {
    const data = this._read();
    const defaults = {
      title: 'Todo Today',
      todos: [],
      tags: [
        { name: '工作', color: '#378ADD' },
        { name: '个人', color: '#639922' },
        { name: '重要', color: '#D85A30' }
      ],
      memo: '',
      windowState: null,
      nextId: 1
    };
    return data ? { ...defaults, ...data } : defaults;
  }

  saveAll(data) {
    try {
      fs.writeFileSync(this.file, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('保存数据失败:', e);
    }
  }

  getWindowState() {
    const data = this._read();
    return (data && data.windowState) || {};
  }

  saveWindowState(state) {
    const data = this._read() || {};
    data.windowState = state;
    this.saveAll(data);
  }
}

module.exports = Store;
