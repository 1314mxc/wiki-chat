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


# 目录

从上到下（如无说明则第一版前端部分暂时已完成）：

 - Editor.vue：编辑器（write）页面
 - Fileload.vue：文件预览和上传页面
 - Header.vue：侧边栏
 - Home.vue：登录后的总览页面（前端部分还差：wikiGroup组件中完成wiki组和wiki部分（一层），“r-top”中完成wiki展示部分（结合url中id））
 - ImageGallery.vue：聊天室页面
 - Index.vue：包含登录页的总览页面
 - Login.vue：登录页面
 - Message.vue：消息通知页面
 - Setting.vue：设置页面


git指令：

```
git pull

git add .

git commit -m ''

git push origin main:master
```