

/* 멤버 리스트
* GET /api/admin/list
*
* */
export const list = async ctx => {
    // ctx.body = {
    //     data:"hi"
    // }
    const db = require('../../../mysql-db');
    await db.promise().query('select * from posts')
        .then(([rows, fields]) => {
            // rows.map(row => {
            //     const data = JSON.stringify(row);
                ctx.body = {
                    member: rows
                };
            //     console.log("_________________" + data);
            // })
        })
        .catch(console.log)
};
