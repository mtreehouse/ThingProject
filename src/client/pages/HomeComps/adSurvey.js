/**
 *======================================================
 * @파일명:adSurvey.js
 * @작성일자:2020-04-22 오후 05:06
 * @작성자:Yunwoo Kim
 * @설명: 광고문의 팝업 페이지
 * @변경이력:
 *===================[ Thing-Project ]===================
 */
import React from "react";
import * as Survey from "survey-react";
import "survey-react/modern.css";
import '../../css/adSurvey.css'
import axios from "axios"

export default function adSurvey() {

    const options = {
        showCompletedPage : false,
        questions: [
            {
                name: "name",
                type: "text",
                title: "담당자:",
                isRequired: true
            },{
                name: "company",
                type: "text",
                title: "회사명:",
                isRequired: true
            },{
                name: "phone",
                type: "text",
                inputType: "tel",
                title: "전화번호:",
                isRequired: true
            }, {
                name: "email",
                type: "text",
                inputType: "email",
                title: "이메일 주소:",
                isRequired: true,
                validators: [
                    {
                        type: "email"
                    }
                ]
            }, {
                name: "url",
                type: "text",
                inputType: "url",
                title: "웹사이트 주소:",
                isRequired: false
            }, {
                name: "content",
                type: "text",
                inputType: "text",
                title: "광고 내용:",
                isRequired: true
            },
        ]
    };

    function onComplete(survey, options) {
        const adMsg = "담당자 : " + survey.data.name +
                    "\n회사명 : " + survey.data.company +
                    "\n메일 : " + survey.data.email +
                    "\n번호 : " + survey.data.phone +
                    "\n주소 : " + survey.data.url +
                    "\n내용 : " + survey.data.content ;
       alert(adMsg);
       /* axios.post('/api/aligo/sms', {})
            .then(()=>{
                alert('확인 후 연락드리겠습니다.\n감사합니다!')
            })
            .catch(e=>{
                console.log(e);
                alert('오류로 인해 전송에 실패하였습니다. 잠시 후 다시 시도해주세요.')
            })*/

        window.close();
    }

    Survey
        .StylesManager
        .applyTheme("modern");

    const model = new Survey.Model(options);

    return (
        <div id={"adSurvey"}>
            <h2>광고 문의</h2><br/>
            <Survey.Survey model={model} onComplete={onComplete}/>
        </div>
    )
}