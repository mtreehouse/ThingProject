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
import adpic from "../../img/ad/adsize.png"
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import scvid from "../../video/instruction.mp4"
import scpost from "../../../client/img/secretproposevid.jpg"

function SecondComponent () {
    function adClick(e){
        e.preventDefault()
        window.open('/#/adsurvey','','width=505,height=540,left=400,top=200')
        // alert('담당자      : 김윤우\n' +
        //     '전화번호   : 010-3700-4972\n' +
        //     '메일주소   : ywpartner@naver.com')
    }
    return (
        <div className="component second-component">
                <h2>How To Know Minds</h2>
                {/*<div className="youtube">
                    <iframe title={'youtubeiframe'}
                            src="https://www.youtube.com/embed/N2DRya_M6as?controls=0&showinfo=0&rel=0&autoplay=0&loop=1"
                            frameBorder="0" allow="accelerometer; fullscreen; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen width="100%"
                            height="100%"></iframe>
                </div>*/}
                <div className={'intro_vid'}>
                    <Player
                        fluid={true}
                        //playsInline={true}
                        //height={300}
                        poster={scpost}
                        src={scvid}
                    />
                </div>
                    <br/>
                <div className={''}>
                    <a href="https://coupa.ng/bC2Y0P" target="_blank"><img className={'cp1'} src="https://ads-partners.coupang.com/banners/217894?subId=&traceId=V0-301-371ae01f4226dec2-I217894&w=728&h=90" alt="쿠팡광고"/></a>
                    {/*<a href={'#'} target={'blank'} onClick={()=>{window.gtag('event', 'click_ad_2')}}>
                        <img src={adpic} alt={'advertise'} className={'adpic'}/>
                    </a>*/}
                </div>
                {/*<div id="address">
                    <p>
                        <span>Copyright</span> 2020 CA. All rights reserved. / <a className={'adText'} onClick={adClick}>광고문의</a>
                    </p>
                </div>*/}
        </div>
    );
};

export default React.memo(SecondComponent)