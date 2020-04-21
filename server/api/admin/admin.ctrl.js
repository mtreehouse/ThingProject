//
// /* 멤버 리스트
// * GET /api/admin/list
// *
// * */
export const list = async ctx => {
    const db = require('../../mysql-db');
    await db.promise().query("SELECT id, my_name, his_name, my_phone, his_phone, receipt_id, date_format(created_date,'%Y-%m-%d')created_date FROM thing_members ORDER BY id DESC")
        .then(([rows, fields]) => {
                ctx.body = {
                    members: rows,
                    columns: fields
                };
        })
        .catch(e=>{console.log(e);})
};
//
// /* 전화번호 암호화
import { enc, dec } from "../security/SecurityUtils"
// * GET /api/admin/enc
// *
// * */
// export const encode = ctx => {
//     const num = enc("+82103927392733")
//     console.log(dec(num))
//     ctx.body = num;
// };
//
/* 전화번호 복호화
* POST /api/admin/dec
*
* */
export const decode = ctx => {
    const phoneNum = ctx.request.body.phoneNum;
    const decPhone = dec(phoneNum);
    ctx.body = decPhone;
};
