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
const app = new Koa();
const router = new Router();
const Sentry = require("@sentry/node");
const {PORT} = process.env;

Sentry.init({
    dsn: "https://0554b0406469483d96b7f43e9298ccb9@o375237.ingest.sentry.io/5194338",
    tracesSampleRate: 1
});

// RequestHandler creates a separate execution-context using domains, so that every transaction/span/breadcrumb has it's own Hub to be attached to
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a tracing for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// 개발용 임시 주석처리
app.use(serve(path.resolve(__dirname, '../build/')));

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용 전 bodyParser
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.use(Sentry.Handlers.errorHandler());

const port = PORT || 3001;
app.listen(port, () => {
    console.log("Listening to port " + port);
})
