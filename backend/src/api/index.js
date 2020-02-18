import Router from 'koa-router';
import members from './member';
import admin from './admin';
import bp from './bootpay';
import aligo from './aligo';

const api = new Router();

api.use('/member', members.routes())
    .use('/bp', bp.routes())
    .use('/admin', admin.routes())
    .use('/aligo', aligo.routes());

// 서버 연결 테스트
api.get('/connect', ctx=>{
    ctx.body="200"
})

// 라우터 내보내기
export default api;