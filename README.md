# Todo Today

[![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron)](https://electronjs.org)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Author](https://img.shields.io/badge/author-Heroin-orange.svg)](https://github.com/Heroin)

一款悬停桌面的半透明便签应用，集成待办清单、备忘录和日历视图。采用 iOS 26 液态玻璃（Glass Morphism）设计风格，支持浅色/深色主题切换。

<p align="center">
  <img src="assets/icon.png" width="128" alt="Todo Today Icon">
</p>

---

## 功能亮点

| 功能 | 说明 |
|------|------|
| 🔮 液态玻璃界面 | backdrop-filter 毛玻璃 + 半透明窗口，精致细腻 |
| ✅ 待办清单 | 添加/勾选/删除，支持日期设置、过期提醒 |
| 🏷️ 标签管理 | 18 种配色标签，自由新建/重命名/删除，拖拽排序 |
| 📌 拖拽排序 | 按住手柄自由调整待办顺序 |
| ✨ Markdown 加粗 | 输入 `**文字**` 即可加粗重点内容 |
| 📝 备忘录 | 自由文本编辑，自动保存，字数统计 |
| 📅 日历视图 | 月视图展示每日待办状态，点击查看详情 |
| 🌓 深浅主题 | 一键切换浅色/深色模式，优雅过渡动画 |
| 🔝 窗口置顶 | 📌 按钮切换置顶状态，方便随时查阅 |
| 📐 自由缩放 | 拖拽窗口边缘自由调整大小 |
| 💾 本地持久化 | 数据存储在 AppData，开机即用 |

---

## 快速开始

### 环境要求

- **Node.js** >= 18
- **npm** >= 9

### 克隆 & 运行

```bash
# 克隆仓库
git clone https://github.com/Heroin/todo-today.git
cd todo-today

# 安装依赖（中国大陆用户已内置 npmmirror 镜像）
npm install

# 启动应用
npm start
```

### 打包为安装程序

```bash
npm run build
```

生成的安装包位于 `build/` 目录。

---

## 项目结构

```
todo-today/
├── main.js             # Electron 主进程（窗口管理、系统托盘）
├── preload.js          # 预加载脚本（安全 IPC 通信）
├── store.js            # 数据持久化（JSON 本地存储）
├── renderer/
│   └── index.html      # 全部 UI 与交互逻辑
├── assets/
│   ├── icon.png        # PNG 图标（256px）
│   └── icon.ico        # ICO 图标（多尺寸）
├── package.json        # 项目配置
├── .npmrc              # 中国大陆镜像加速
└── .gitignore
```

---

## 技术栈

- **Electron 33** — 跨平台桌面框架
- **原生 CSS 变量** — 完整浅色/深色主题系统
- **CSS Glass Morphism** — backdrop-filter 毛玻璃效果
- **原生 Drag & Drop API** — 待办项拖拽排序
- **Web Animations API** — 流畅的弹簧动画曲线

---

## 数据存储

所有数据以 JSON 格式存储在系统应用数据目录：

```
Windows: %APPDATA%/Todo Today/sticky-data.json
macOS:   ~/Library/Application Support/Todo Today/sticky-data.json
```

---

## 作者

**Heroin**

---

## 许可

MIT License — 详见 [LICENSE](LICENSE) 文件。
