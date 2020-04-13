import * as Sentry from "@sentry/node";

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
import serve from 'koa-static'
import path from 'path'
const schedule = require('node-schedule');
import {send} from './api/aligo/aligo_sms'
import createContext from "koa-create-context";
import * as phoneSec from './api/security/SecurityUtils'

const app = new Koa();
const router = new Router();


const {PORT} = process.env;

// 개발용 임시 주석처리
app.use(serve(path.resolve(__dirname, '../build/')));

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전 bodyParser
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 3001;
app.listen(port, () => {
    console.log("Listening to port " + port);
})

/* 등록 후 7일 지난 멤버 매일 11시 삭제 */
schedule.scheduleJob('* 8 * * *', function(){
    console.log('__Check expired members : '+new Date().toLocaleString('ko-KR', { timeZone: 'GMT' }));
    const db = require('./mysql-db');
    db.promise().execute("SELECT * FROM thing_members WHERE created_date < SUBDATE(NOW(), INTERVAL 1 MINUTE )")
        .then((data)=>{
            if(Array.isArray(data[0]) && data[0].length){
                data[0].forEach(member=>{
                    db.promise().execute("DELETE FROM thing_members WHERE id=?",[member.id])
                        .then(()=>{
                            const msg = "7일이 지나 "+member.my_name+"님의 매칭이 실패하였습니다.\n" +
                                "Thing Love가 응원합니다♥\n" +
                                "http://mtree.shop"
                            const context = createContext({
                                status: 201,
                                body: {"sender":"01037004972","receiver":phoneSec.dec(member.my_phone),"msg":msg,"msg_type":"SMS"}
                            });
                            send(context,null)
                            console.log("Deleted expired member id : "+member.id);
                        })
                })
            }
        })
        .catch(e=>{
            console.log(e);
        })
});