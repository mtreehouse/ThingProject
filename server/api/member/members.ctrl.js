
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
    db.promise().execute("insert into thing_members (name, my_phone, his_phone, receipt_id) values (?, ?, ?, ?)"
        , [name, my_phone, his_phone, receipt_id])
        .then(e => {
            console.log("_________________db입력성공");
        })
        .catch(e => {
            console.log(e);
        })
};

/* 포스트 작성
* HEAD /api/posts
* {id}
* */
export const del = ctx => {
    ctx.body=200;
    const { id } = ctx.params;
    const db = require('../../mysql-db');
    db.promise().execute("delete from thing_members where id=?"
        , [id])
        .then(e => {
            console.log("_________________db입력성공");
        })
        .catch(e => {
            console.log(e);
        })
};