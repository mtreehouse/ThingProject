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

const app = new Koa();
const router = new Router();

const {PORT} = process.env;

// dbtest
// router.get('/db', async (ctx) => {
//     const db = require('../mysql-db');
//     await db.promise().query('select * from posts')
//         .then(([rows, fields]) => {
//             rows.map(row => {
//                 const data = JSON.stringify(row);
//                 ctx.body = data;
//                 console.log("_________________" + data);
//             })
//         })
//         .catch(console.log)
//     //.then(() => db.end());
// });

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전 bodyParser
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
    console.log("Listening to port " + port);
})
