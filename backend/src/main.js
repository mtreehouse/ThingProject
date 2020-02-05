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
router.get('/db', async (ctx) => {
    const db = require('../mysql-db');
    await db.promise().query('select * from posts')
        .then(([rows, fields]) => {
            rows.map(row => {
                const data = JSON.stringify(row);
                ctx.body = data;
                console.log("_________________" + data);
            })
        })
        .catch(console.log)
    //.then(() => db.end());
});

// payment
router.get('/cancel/:reqId', (ctx)=>{
    const { reqId } = ctx.params;
    const BootpayRest = require('bootpay-rest-client');

    BootpayRest.setConfig(
        '5e38c26a02f57e00245c7596',
        'zprTbYxmryaiJ/aoYzXCSKk4MIEgUKp3W24lErlk9mM='
    );
    console.log("_________________cancelpay start---------------");

    BootpayRest.getAccessToken().then(function (token) {
        if (token.status === 200) {
            BootpayRest.cancel(reqId, '', 'test', 'test').then(function (response) {
                console.log("_________________token: "+JSON.stringify(token));
                // 결제 취소가 완료되었다면
                console.log("_________________"+response.status);
                if (response.status === 200) {
                    // TODO: 결제 취소에 관련된 로직을 수행하시면 됩니다.
                    console.log("_________________취소완료");
                }
            });
        }
    });
})

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
