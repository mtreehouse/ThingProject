
/* 멤버 등록
* POST /api/member/insert
* {name, my_phone, his_phone, receipt_id}
* */
export const insert = ctx => {
    const db = require('../../mysql-db');
    const name = ctx.request.body.name;
    const my_phone = ctx.request.body.my_phone;
    const his_phone = ctx.request.body.his_phone;
    const receipt_id = ctx.request.body.receipt_id;
    console.log("___________recptid:______"+receipt_id);
    db.promise().execute("INSERT INTO thing_members (name, my_phone, his_phone, receipt_id) VALUES (?, ?, ?, ?)"
        , [name, my_phone, his_phone, receipt_id])
        .then(e => {
            console.log("_________________db입력성공");

        })
        .catch(e => {
            console.log(e);
        })
};

/* 멤버 삭제
* POST /api/member/del
* {id}
* */
export const del = ctx => {
    ctx.body=200;
    const { id } = ctx.params;
    const db = require('../../mysql-db');
    db.promise().execute("DELETE FROM thing_members WHERE id=?"
        , [id])
        .then(e => {
            console.log("_________________db입력성공");
        })
        .catch(e => {
            console.log(e);
        })
};

/* 멤버 매칭 확인
* POST /api/member/matchCheck
* {my_phone, his_phone}
* */
export const matchCheck = async ctx => {

    const db = require('../../mysql-db');
    const my_phone = ctx.request.body.my_phone;
    const his_phone = ctx.request.body.his_phone;
    await db.promise().execute("SELECT id FROM thing_members WHERE my_phone=? AND his_phone=?"
        , [his_phone, my_phone])
        .then(r => {
            // 매칭여부 true/fasle 반환
            ctx.body=!!r[0].length
        })
        .catch(e => {
            console.log(e);
        })


};