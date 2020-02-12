import {send} from './aligo_sms'

/* SMS 전송
* POST /api/aligo/send
* */
export const cancel = ctx => {
    send({
        body:{
              sender: '01037004972',
              receiver: '01037004972',
              msg: '메세지전송되었습니다.',
              msg_type: 'SMS'
        }
    },ctx.response)
}

