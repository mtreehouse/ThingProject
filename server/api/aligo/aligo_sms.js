const aligoapi = require('aligoapi');
// 해당 예제는 npm에서도 확인하실 수 있습니다
// npm i aligoapi
// https://www.npmjs.com/package/aligoapi

const AuthData = {
  key: 'w1c7id0q0llywwwzetrdfi1sm7zme9no',
  user_id: 'sym3927',
}

// test 모드를 사용하시려면 'Y'값으로 설정하세요
 AuthData.testmode_yn = 'N'
// form데이터를 포함한 request를 모두 보내시고 JSON data는 body pares를 사용하시기 바랍니다.
const send = (req, res) => {
  // 메시지 발송하기
  aligoapi.send(req, AuthData)
      .then((r) => {
        console.log("_response________________"+JSON.stringify(r));
      })
      .catch((e) => {
        console.log("_error________________"+e);
      })
}

const sendMass = (req, res) => {
    // 메시지 대량발송하기
    aligoapi.sendMass(req, AuthData)
        .then((r) => {
            console.log("_response________________"+JSON.stringify(r));
        })
        .catch((e) => {
            console.log("_error________________"+e);
        })
}

const list = (req, res) => {
  // 전송결과보기
  // req.body = {
  //   page: 페이지번호 // (기본 1)
  //   page_size: 페이지당 출력갯수 // (기본 30) 30~500
  //   start_date: 조회시작일자 // (기본 최근일자) YYYYMMDD
  //   limit_day: 조회마감일자
  // }
  // req.body 요청값 예시입니다.

  aligoapi.list(req, AuthData)
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.send(e)
      })

}

const smsList = (req, res) => {
  // 전송결과보기 상세

  // req.body = {
  /*** 필수값입니다 ***/
  //   mid: 메세지 고유ID
  /*** 필수값입니다 ***/
  //   page: 페이지번호 // (기본 1)
  //   page_size: 페이지당 출력갯수 // (기본 30) 30~500
  //   start_date: 조회시작일자 // (기본 최근일자) YYYYMMDD
  //   limit_day: 조회마감일자
  // }
  // req.body 요청값 예시입니다.

  aligoapi.smsList(req, AuthData)
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.send(e)
      })
}

const remain = (req, res) => {
  // 발송가능건수
  aligoapi.remain(req, AuthData)
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.send(e)
      })
}

const cancel = (req, res) => {
  // 예약취소하기
  // req.body = {
  /*** 필수값입니다 ***/
  //   mid: 메세지 고유ID
  /*** 필수값입니다 ***/
  // }
  // req.body 요청값 예시입니다.

  aligoapi.cancel(req, AuthData)
      .then((r) => {
        res.send(r)
      })
      .catch((e) => {
        res.send(e)
      })
}

module.exports = {
  send,
  sendMass,
  list,
  smsList,
  remain,
  cancel
}