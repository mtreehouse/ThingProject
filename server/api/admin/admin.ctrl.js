//
// /* 멤버 리스트
// * GET /api/admin/list
// *
// * */
export const list = async ctx => {
    const db = require('../../mysql-db');
    await db.promise().query("SELECT id, my_name, my_phone, his_phone, receipt_id, date_format(created_date,'%Y-%m-%d')created_date, ischecked FROM thing_members ORDER BY id DESC")
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
// import { enc, dec } from "../security/SecurityUtils"
// * GET /api/admin/enc
// *
// * */
// export const encode = ctx => {
//     const num = enc("+82103927392733")
//     console.log(dec(num))
//     ctx.body = num;
// };
//
// /* 전화번호 복호화
// * GET /api/admin/dec
// *
// * */
// export const decode = ctx => {
//     const num = dec("20168.829877159624,659310.078522467,772418.7682794463,632372.5651982229,148796.15058581618,34183.53764446391,728808.1904890076,993347.353766486,450285.8922781339,15483.278146009472,648997.1475022929,513440.7153357099,548956.7688015302,920381.2431153307,263243.62921008014,865137.3916612015,12467.577883098047,685871.4069701794,199314.84983588877,763825.8148308148,829577.4104222093,252220.69879801202,154042.68727028315,959559.3703943756,417166.87473504187,962334.9946961728,989928.4234232588,8575.572092186956,510320.3993345158,610371.5032228016,836593.3770187162,47051.63752541841,246296.71447785516#971842,971857,971867,971864,971865,971866,971856,971867,971870,971866,971856,971867,971870,971866,971866")
//     ctx.body = num;
// };
