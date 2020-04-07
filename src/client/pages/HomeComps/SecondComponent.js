/**
 *===================[  ]===================
 * @파일명:FirstComponent.js
 * @작성일자:2020-01-07 오후 03:00
 * @작성자:Yunwoo Kim
 * @설명: 두번째 페이지 (사용방법 설명)
 * @변경이력:유튜브 링크 삽입
 *===================[ Thing-Project ]===================
 */
import React from "react";
import "../../css/secondComponent.css"

export default () => {
    function adClick(e){
        e.preventDefault()
        alert('담당자      : 김윤우\n' +
            '전화번호   : 010-3700-4972\n' +
            '메일주소   : ywpartner@naver.com')
    }
    return (
        <div className="component second-component">
                <h2>How To Know Minds</h2>
                <div className="youtube">
                    <iframe title={'youtubeiframe'}
                            src="https://www.youtube.com/embed/KuLRsBuuwt4?controls=0&showinfo=0&rel=0&autoplay=1&loop=1"
                            frameBorder="0" allow="fullscreen" allowFullScreen width="100%"
                            height="100%"></iframe>
                </div>
                <div id="address">
                    <p>
                        <span>Copyright</span> 2020 CA. All rights reserved. / <a onClick={adClick}>광고문의</a>
                    </p>
                </div>
        </div>
    );
};