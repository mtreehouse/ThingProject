import {send, sendMass} from './aligo_sms'

/* SMS 전송
* POST /api/aligo/send
* */
export const sends = ctx => {
    ctx.body = 'sms sending'
    console.log("_________________"+JSON.stringify(ctx.request.body));
    send(ctx.request,ctx.response)
}

/* SMS 대량 전송
* POST /api/aligo/sendMass
* */
export const sendsMass = ctx => {
    ctx.body = 'sms mass sending'
    console.log("_________________"+JSON.stringify(ctx.request.body));
    sendMass(ctx.request,ctx.response)
}

