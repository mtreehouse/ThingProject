/**
 *======================================================
* @파일명:index.js
* @작성일자:2020-02-06 오후 4:05
* @작성자:Yunwoo Kim
* @설명: 관리자 페이지 컨트롤
* @변경이력:
*===================[ Thing-Project ]===================
*/

import Router from 'koa-router';
import * as adminCtrl from './admin.ctrl';

const admin = new Router();

admin.get('/list', adminCtrl.list);

export default admin;
