import * as phoneSec from '../security/SecurityUtils'
/* 멤버 등록
* POST /api/member/insert
* {name, my_phone, his_phone, receipt_id}
* */
export const insert = ctx => {
    ctx.body = 'db insert'
    const db = require('../../mysql-db');
    const my_name = ctx.request.body.my_name;
    const his_name = ctx.request.body.his_name;
    const my_phone = phoneSec.enc(ctx.request.body.my_phone);
    const his_phone = phoneSec.enc(ctx.request.body.his_phone);
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
export const matchCheck = async ctx=> {
    ctx.body=200
    const db = require('../../mysql-db');
    const my_phone = ctx.request.body.my_phone;
    let members = []
    await db.promise().execute("SELECT * FROM thing_members"//" WHERE his_phone=?" 암호화 과정에서 임시 주석처리
        , [my_phone])
        .then(async r => {
            await new Promise(resolve => {
                if(Array.isArray(r[0]) && r[0].length){
                    r[0].forEach((re, index)=>{
                        re.my_phone = phoneSec.dec(re.my_phone)
                        re.his_phone = phoneSec.dec(re.his_phone)
                        if(re.his_phone==my_phone)members.push(re)
                        if(index+1===r[0].length)resolve()
                    })
                }else{
                    resolve()
                }
            }).then(()=>{
                // 응답자 번호로 등록된 모든 요청자 반환
                ctx.body = members
            })
        })
        .catch(e => {
            console.log(e);
        })
};