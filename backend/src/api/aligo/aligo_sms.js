const aligoapi = require('aligoapi');
const AuthData = {
  key: 'w1c7id0q0llywwwzetrdfi1sm7zme9no',
  user_id: 'sym3927',
}

  AuthData.testmode_yn = 'Y'
// test 모드를 사용하시려면 'Y'값으로 설정하세요

// form데이터를 포함한 request를 모두 보내시고 JSON data는 body pares를 사용하시기 바랍니다.

const send = (req, res) => {
  console.log("_________________"+JSON.stringify(req));
  // 메시지 발송하기
  // req.body = {
  /*** 필수값입니다 ***/
  //   sender: 발신자 전화번호  // (최대 16bytes)
  //   receiver: 수신자 전화번호 // 컴마()분기 입력으로 최대 1천명
  //   msg: 메시지 내용	// (1~2,000Byte)
  /*** 필수값입니다 ***/
  //   msg_type: SMS(단문), LMS(장문), MMS(그림문자)
  //   title: 문자제목(LMS, MMS만 허용) // (1~44Byte)
  //   destination: %고객명% 치환용 입력
  //   rdate: 예약일(현재일이상) // YYYYMMDD
  //   rtime: 예약시간-현재시간기준 10분이후 // HHMM
  //   image: 첨부이미지 // JPEG, PNG, GIF
  // }
  // req.body 요청값 예시입니다.

  aligoapi.send(req, AuthData)
    .catch((e) => {
      console.log("_________________"+e);
      console.log("_________________"+JSON.stringify(res));
      //res.send(e)
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

}


module.exports = {
  send,
  smsList
}