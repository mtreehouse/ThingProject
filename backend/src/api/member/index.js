import Router from 'koa-router';
import * as membersCtrl from './members.ctrl';

const members = new Router();

members.post('/insert', membersCtrl.insert);

export default members;
