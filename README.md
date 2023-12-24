# 注意

本应用采用vue3 + electron开发，但是electron只是一个壳子，不必在意。

本应用采用node16版本开发（第一开发者开发时版本是16.20.1），希望都保持在16版本，避免冲突。

推荐使用nvm包管理工具。

开发前你应该这么做：

```
npm install（或：cnpm install）
```

如果你想以web形式开发，则：

```
npm run dev
```

如果你想以“应用窗口”形式开发，则：(当前版本暂时不支持)

```
npm start
```

本应用支持热更新，不必执行其他指令。

git指令：

```
git pull

git add .

git commit -m ''

git push origin main:master
```