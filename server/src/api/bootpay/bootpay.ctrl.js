

/* receipt_id 를 이용한 결제 취소
* POST /api/bp/cancel
* */
export const cancel = ctx => {
    ctx.body = "결제 취소가 진행되었습니다."

    const rcptId = ctx.request.body.data;
    console.log("_________________reqId : "+rcptId);

    const BootpayRest = require('bootpay-rest-client');
    BootpayRest.setConfig(
        '5e38c26a02f57e00245c7596',
        'zprTbYxmryaiJ/aoYzXCSKk4MIEgUKp3W24lErlk9mM='
    );

    BootpayRest.getAccessToken().then(function (token) {
        if (token.status === 200) {
            BootpayRest.cancel(rcptId, '', 'test', 'test').then(function (response) {
                // 결제 취소가 완료되었다면
                if (response.status === 200) {
                    // TODO: 결제 취소에 관련된 로직을 수행하시면 됩니다.
                    console.log("_________________취소완료");
                }
            })
        }
    })
}

