
/* 멤버 리스트
* GET /api/admin/list
*
* */
import { enc, dec } from "../security/SecurityUtils"
export const list = async ctx => {
    const db = require('../../../mysql-db');
    await db.promise().query("select id, author, title, date_format(created_date,'%Y-%m-%d')created_date  from posts")
        .then(([rows, fields]) => {
                ctx.body = {
                    member: rows,
                    columns: fields
                };
        })
        .catch(console.log)
};

export const encode = ctx => {
    const num = enc("+821037004972")
    console.log(dec(num))
    ctx.body = num;
};

export const decode = ctx => {
    const num = dec("214176.47808196372,748454.1279425123,51653.94689030633,983080.1616099759,253410.21429867583,628160.4904317686,75703.21495460175,680353.9702763739,146452.85073133564,286427.31124312524,882949.0873847646,767205.9012223711,879937.8262686755,666535.0381530178,214034.2556156971,731080.0671199663,960589.3470745679,340907.7537972416,851162.7668396342,48363.93535140937,117542.5844180702,39660.1960849341,741385.7192205262,380822.2376810435,938807.0946876021,910625.9831652265,676705.131531302,173470.21587201185,582755.4830451102,114375.24936808407,777214.1562904131,978284.0929232701,871703.5516109301#726701,726718,726708,726711,726710,726709,726705,726710,726710,726706,726719,726705,726708")
    ctx.body = num;
};