# Gulp

## 專案說明

- 該專案採用 EJS template 開發，基本上只需要針對 template/index 底下的 ejs 修正即可，EJS 撰寫如原始 HTML 開發相同。
- JavaScript 採用 ESLint Airbnb 風格。
- 專案預設載入 Boostrap-bundle、jQuery。
- 非必要請勿調整 index.js，通常只需要調整 options.js 即可。
- 該專案可直接丟上 Heroku 執行。

### Clone Project

```git
git clone project-repo
```

### Install Gulp

若本身已經安裝過 Gulp 則可以忽略該行指令。

```npm
npm install -g gulp
```

### Install package

```npm
npm install
```

### Develop mode

```gulp
gulp
```

### Build mode

```gulp
gulp build --env prod // 此模式會壓縮 JavaScript、Images、CSS、HTML
```

## 專案資料夾

- images
- javascript
  - all.js
- stylesheets
  - components
  - helpers
    - _variables.scss
  - all.scss
- templates
  - layout
    - _head.ejs
  - index.ejs
- gulpfile.js
  - index.js
  - options.js

## 指令說明

- `npm dev` - 等同 `gulp`。
- `npm start` - 等同 `gulp buildHeroku --env prod`，但主要部屬 Heroku 用。
- `npm prod` - 等同 `gulp build --env prod`。
