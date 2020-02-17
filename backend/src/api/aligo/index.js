/**
 *======================================================
* @파일명:/api/bootpay/index.js
* @작성일자:2020-02-14 오후 4:30
* @작성자:Yunwoo Kim
* @설명: Aligo를 이용한 SMS 관련 컨트롤러
* @변경이력:
*===================[ Thing-Project ]===================
*/

import Router from 'koa-router';
import * as aligoCtrl from './aligo.ctrl';

const aligo = new Router();

aligo.post('/send', aligoCtrl.sends);

export default aligo;
