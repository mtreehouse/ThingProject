/**
 *======================================================
 * @파일명:main.js
 * @작성일자:2020-01-23 오전 11:27
 * @작성자:Yunwoo Kim
 * @설명: BackEnd Koa 작업
 * @변경이력:
 *===================[ Thing-Project ]===================
 */
require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import api from './api';
import kos from 'koa-static'
const app = new Koa();
const router = new Router();

const {PORT} = process.env;

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전 bodyParser
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());
app.use(require('koa-static')('../../build'))
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../build", "index.html"));
});

const port = PORT || 5000;
app.listen(port, () => {
    console.log("Listening to port " + port);
})
