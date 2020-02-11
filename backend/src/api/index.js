import Router from 'koa-router';
import members from './member';
import admin from './admin';
import bp from './bootpay';

const api = new Router();

api.use('/member', members.routes())
    .use('/bp', bp.routes())
    .use('/admin', admin.routes());

// 라우터 내보내기
export default api;