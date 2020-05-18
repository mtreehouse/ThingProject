/**
 *===================[  ]===================
 * @파일명:FirstComponent.js
 * @작성일자:2020-05-18 오전 10:29
 * @작성자:Yunwoo Kim
 * @설명: 두번째 페이지 (사용방법 설명)
 * @변경이력:유튜브 링크 삽입
 *===================[ Thing-Project ]===================
 */
import React from "react";
import "../../css/fourthComponent.css"
import 'video-react/dist/video-react.css';
import sp1 from "../../img/sponsors/sp1.jpg"
import sp2 from "../../img/sponsors/sp2.jpg"
import sp3 from "../../img/sponsors/sp3.jpg"
import sp4 from "../../img/sponsors/sp4.jpg"
import { Row, Col, Image } from 'react-bootstrap';

export default () => {
    function adClick(e){
        e.preventDefault()
        window.open('/#/adsurvey','','width=505,height=540,left=400,top=200')
        // alert('담당자      : 김윤우\n' +
        //     '전화번호   : 010-3700-4972\n' +
        //     '메일주소   : ywpartner@naver.com')
    }
    return (
        <div className="component fourth-component">
            <h2>Sponsors</h2>
                <br/>

            <Row className={'fourth_rows mt-md-5'}>
                <Col xs={'auto'} md={6} lg={6} className={'mb-2 mb-md-5'}>
                    <Image src={sp1} responsive rounded onClick={()=>{
                        window.open('https://ko.reactjs.org/','_blank')
                    }}/>
                </Col>
                <Col xs={'auto'} md={6} lg={6} className={'mb-2 mb-md-5'}>
                    <Image src={sp2} responsive onClick={()=>{
                        window.open('https://react-bootstrap.github.io/','_blank')
                    }}/>
                </Col>
                <Col xs={'auto'} md={6} lg={6} className={'mb-2 mb-md-5'}>
                    <Image src={sp3} responsive onClick={()=>{
                        window.open('https://material-ui.com/','_blank')
                    }} />
                </Col>
                <Col xs={'auto'} md={6} lg={6} className={'mb-2 mb-md-5'}>
                    <Image src={sp4} responsive onClick={()=>{
                        window.open('https://analytics.google.com/analytics/web/','_blank')
                    }}/>
                </Col>
            </Row>

            <div id="address">
                <p>
                    <span>Copyright</span> 2020 CA. All rights reserved. / <a className={'adText'} onClick={adClick}>광고문의</a>
                </p>
            </div>
        </div>
    );
};