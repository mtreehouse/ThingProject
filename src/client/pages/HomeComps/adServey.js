/**
 *======================================================
 * @파일명:adServey.js
 * @작성일자:2020-04-22 오후 05:06
 * @작성자:Yunwoo Kim
 * @설명: 광고문의 팝업 페이지
 * @변경이력:
 *===================[ Thing-Project ]===================
 */
import React from "react";
import * as Survey from "survey-react";
import "survey-react/modern.css";
import '../../css/adServey.css'

export default function adServey() {

    const options = {
        questions: [
            {
                name: "name",
                type: "text",
                title: "이름:",
                isRequired: true
            }, {
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
                name: "website",
                type: "text",
                inputType: "url",
                title: "웹사이트 주소:",
                isRequired: true
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
        console.log("Survey results: " + JSON.stringify(survey.data));
        alert('확인 후 연락드리겠습니다.\n감사합니다!')
        window.close();
    }

    Survey
        .StylesManager
        .applyTheme("modern");

    const model = new Survey.Model(options);

    return (
        <div id={"adServey"}>
            <h2>광고 문의</h2><br/>
            <Survey.Survey model={model} onComplete={onComplete}/>
        </div>
    )
}