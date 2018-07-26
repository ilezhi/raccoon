# Q1: 如何引入第三方库(非模块类型)

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