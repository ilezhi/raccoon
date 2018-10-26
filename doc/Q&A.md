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


## Q3: 如何跳转到命名路由下的子路由

A:
1. 在a元素中的`[routerLink]="['', {outlets: {slide: topic/create}}]"`,
数组第一个参数如果为空格, 则为当前主路由下的命名路由.
如果设置为绝对路径, 则会同时改变主路由.
2. 通过`Router`对象跳转. **this.router.navigate(['', {outlets: {slide: topic/create}}])**

exp
```html
<router-outlet></router-outlet>
<router-outlet name="slide"></router-outlet>
```

```ts
// 当前路径 主路由
`/all`

// 显示命名路由后
`/all(slide:topic)`

// 显示命名路由下的子路由
`/all(slide:topic/create)`
```


## Q4: 如何监控路由变化
A: 
```ts
router.event.pipe(
  filter(ev => ev instanceof NavigationEnd)
).subscribe()
```

## Q5: 获取dom元素
A: 