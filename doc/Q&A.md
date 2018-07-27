## Q1: 如何引入第三方库(非模块类型)?

A: 在`angular.json`scripts中引入, 然后在`d.ts`文件中定义变量, 名称与库添加到window上的变量相同. 以便ts能编译通过.

exp:
**angluar.json**
```json
scripts: ["node_modules/code-prettify/src/prettify.js"]
```

**d.ts**
```ts
declare var prettyPrint;
```





## Q2: 如何实现F11那样的全屏效果?

A: 使用HTML5中的api, `requestFullscreen()`,`exitFullscreen()`.

此api目前需要兼容处理, 需要加浏览器前缀.
**webkit**, **moz**, **ms**.

还可以添加全屏监听事件, `fullscreenchange`, 同样需要加前缀.