# 💕 七夕快乐 — 写给最爱的你

一个浪漫星空主题的七夕节小网页，送给最爱的老婆 ❤️

## ✨ 页面效果

- 🌌 **星空背景** — 闪烁的星星 + 随机流星划过
- 💖 **爱心粒子** — 粉色爱心缓缓上升，浪漫氛围拉满
- 🌙 **弯月跟随** — 右上角月亮会跟着鼠标微微移动
- 🎆 **点击放烟花** — 点击屏幕任意位置，爱心烟花瞬间绽放
- ✨ **鼠标爱心拖尾** — 鼠标移动留下彩色爱心轨迹
- 💌 **情书打字机** — 情书文字逐段淡入，像他亲口在写信
- 📸 **照片翻牌** — 点击照片翻转，背面有隐藏情话
- 📊 **恋爱天数** — 自动计算在一起的每一天
- 📱 **响应式** — 手机和电脑都完美适配

## 🥚 隐藏彩蛋（全部 4 个！）

| # | 彩蛋名 | 触发方式 | 效果 |
|---|--------|---------|------|
| 1 | 🎆 **烟花** | 点击屏幕空白处 | 爱心+星星烟花绽放 |
| 2 | 🔐 **暗号** | 左下角输入框输入 `love`，或在页面上连续键入 `love` | 弹出隐藏情话 + 花瓣雨 |
| 3 | 💋 **狂点解锁** | 3 秒内连续点击标题「七夕快乐」10 次 | 弹出隐藏告白 + 花瓣雨 |
| 4 | 🌸 **摇一摇** | 手机端摇一摇手机 | 触发粉色花瓣雨 |

> 💡 彩蛋情话可以在 `js/easter-eggs.js` 顶部的 `CONFIG` 里改成你自己的话！

## 🚀 部署到 GitHub Pages

### 1. 创建仓库并推送

```bash
cd /home/tcai/project/qx
git init
git add .
git commit -m "💕 七夕快乐"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/qixi.git
git push -u origin main
```

> 把 `YOUR_USERNAME` 换成你的 GitHub 用户名

### 2. 开启 GitHub Pages

仓库 → **Settings** → **Pages** → Source 选 `main` 分支 → **Save**

网页就会在 `https://YOUR_USERNAME.github.io/qixi/` 上线！

## 🎨 自定义修改指南

所有可定制内容都在 `js/easter-eggs.js` 顶部 和 `index.html` 中：

### 1. 修改在一起的日期

打开 `js/easter-eggs.js`，改 `CONFIG.togetherDate`：

```js
togetherDate: '2024-08-18',  // ← 改成你们的纪念日
```

### 2. 替换照片

1. 根目录创建 `images/` 文件夹，放你们的合照
2. 打开 `index.html`，找到每张照片的 `<div class="card-front">`，把占位图替换为：

```html
<!-- 删除 placeholder，加上 img 即可 -->
<div class="card-front">
    <img src="./images/photo1.jpg" alt="">
</div>
```

> 照片会自动支持翻牌效果，不需要改 `.card-back`

### 3. 修改照片背面情话

在 `index.html` 中找到 `.card-back` 里的 `.back-text`，改成你想说的话：

```html
<div class="back-text">这里改成你的情话 💕</div>
```

### 4. 修改情书内容

在 `index.html` 中找到 `<div class="letter-body">`，修改每个 `<p class="letter-p">` 的文字。

### 5. 修改彩蛋情话

打开 `js/easter-eggs.js`，改 `CONFIG` 里的内容：

```js
secretMessage: `这里改成暗号解锁的话`,
clickUnlockMessage: `这里改成狂点解锁的话`,
secretCode: 'love',          // 暗号（也可以改成你们的名字缩写）
clickUnlockCount: 10,        // 狂点次数
```

### 6. 修改标题

`index.html` 中搜索 `七夕快乐`，改 `.hero h1` 和 `.subtitle` 的文字。

## 📂 文件结构

```
qx/
├── index.html            # 主页面骨架
├── css/
│   └── style.css         # 全部样式
├── js/
│   ├── starfield.js      # 星空 + 流星 + 爱心粒子
│   ├── effects.js        # 烟花 + 鼠标拖尾 + 月亮跟随
│   └── easter-eggs.js    # 彩蛋 + 配置 + 翻牌 + 打字机
├── images/               # 照片文件夹（自己创建）
│   ├── photo1.jpg
│   └── ...
├── .gitignore
└── README.md
```

## 💡 小贴士

- 照片建议控制在 500KB 以内，推荐 [tinypng.com](https://tinypng.com) 压缩
- 仓库设为 **Private**，只你和她能看到 😏
- 也可以把链接伪装成别的页面标题，制造惊喜效果

---

Made with ❤️ for the one I love most.
