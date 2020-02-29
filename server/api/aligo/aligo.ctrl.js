import {send} from './aligo_sms'

/* SMS 전송
* POST /api/aligo/send
* */
export const sends = ctx => {
    ctx.body = 'sending'
    console.log("_________________"+JSON.stringify(ctx.request.body));
    send(ctx.request,ctx.response)
}

