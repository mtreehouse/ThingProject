
/* 멤버 등록
* POST /api/member/insert
* {name, my_phone, his_phone, receipt_id}
* */
export const insert = ctx => {
    ctx.body = 'db insert'
    const db = require('../../mysql-db');
    const my_name = ctx.request.body.my_name;
    const his_name = ctx.request.body.his_name;
    const my_phone = ctx.request.body.my_phone;
    const his_phone = ctx.request.body.his_phone;
    const receipt_id = ctx.request.body.receipt_id;
    console.log("___________recptid:______"+receipt_id);
    db.promise().execute("INSERT INTO thing_members (my_name, his_name, my_phone, his_phone, receipt_id) VALUES (?, ?, ?, ?, ?)"
        , [my_name, his_name, my_phone, his_phone, receipt_id])
        .then(e => {
            console.log("_________________db입력성공");
            db.promise().execute("INSERT INTO thing_backup (my_name, his_name, my_phone, his_phone, receipt_id) VALUES (?, ?, ?, ?, ?)"
                , [my_name, his_name, my_phone, his_phone, receipt_id])
                .then(e => {
                    console.log("_________________백업 db입력성공");
                })
                .catch(e => {
                    console.log(e);
                })
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
            console.log("_________________db삭제성공");
        })
        .catch(e => {
            console.log(e);
        })
};

/* 멤버 매칭 확인
* POST /api/member/matchCheck
* {my_phone}
* */
export const matchCheck = async ctx => {
    const db = require('../../mysql-db');
    const my_phone = ctx.request.body.my_phone;
    await db.promise().execute("SELECT * FROM thing_members WHERE his_phone=?"
        , [my_phone])
        .then(r => {
            console.log("_________________"+r[0]);
            // 응답자 번호로 등록된 모든 요청자 반환
            ctx.body=r[0]
        })
        .catch(e => {
            console.log(e);
        })


};