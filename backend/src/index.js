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
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전 bodyParser
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log("Listening to port 4000");
})
