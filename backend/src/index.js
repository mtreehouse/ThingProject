/**
 *======================================================
* @파일명:index.js
* @작성일자:2020-01-23 오전 11:27
* @작성자:Yunwoo Kim
* @설명: BackEnd Koa 작업
* @변경이력:
*===================[ Thing-Project ]===================
*/
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
    ctx.body = 'hello world';
});

app.listen(4000, () => {
    console.log("Listening to port 4000");
})
