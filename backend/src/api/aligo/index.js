/**
 *======================================================
* @파일명:/api/bootpay/index.js
* @작성일자:2020-02-06 오후 2:21
* @작성자:Yunwoo Kim
* @설명: Bootpay를 이용한 결제 관련 컨트롤러
* @변경이력:
*===================[ Thing-Project ]===================
*/

import Router from 'koa-router';
import * as aligoCtrl from './aligo.ctrl';

const aligo = new Router();

aligo.post('/send', aligoCtrl.cancel);

export default aligo;
