import Router from 'koa-router';
import * as membersCtrl from './members.ctrl';

const members = new Router();

members.post('/insert', membersCtrl.insert);
members.post('/matchCheck', membersCtrl.matchCheck);
members.head('/del/:id', membersCtrl.del);

export default members;
