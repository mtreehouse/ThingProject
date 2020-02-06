import Router from 'koa-router';
import posts from './posts';
import bp from './bootpay';

const api = new Router();

api.use('/posts', posts.routes()).use('/bp', bp.routes());

// 라우터 내보내기
export default api;