/**
 *===================[  ]===================
 * @파일명:FirstComponent.js
 * @작성일자:2020-05-18 오전 10:25
 * @작성자:Yunwoo Kim
 * @설명: 두번째 페이지 (사용방법 설명)
 * @변경이력:유튜브 링크 삽입
 *===================[ Thing-Project ]===================
 */
import React from "react";
import "../../css/thirdComponent.css"
import adpic from "../../img/ad/adsize.png"

export default () => {
    function adClick(e){
        e.preventDefault()
        window.open('/#/adsurvey','','width=505,height=540,left=400,top=200')
        // alert('담당자      : 김윤우\n' +
        //     '전화번호   : 010-3700-4972\n' +
        //     '메일주소   : ywpartner@naver.com')
    }
    return (
        <div className="component third-component">
                <h2>About Us</h2>
                    <br/>

        </div>
    );
};