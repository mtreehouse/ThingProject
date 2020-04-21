/**
 *======================================================
 * @파일명:Home.js
 * @작성일자:2020-01-14 오전 10:56
 * @작성자:Yunwoo Kim
 * @설명: 페이지 콤퍼넌트들을 불러와 Full Page Scroll 처리
 * @변경이력: 모바일크롬 vh 사이즈 버그로 인한 동적 높이 조절
 *===================[ Thing-Project ]===================
 */

import React, {} from 'react';
import FirstComponent from "./HomeComps/FirstComponent";
import SecondComponent from "./HomeComps/SecondComponent";
import WindowSizeListener from 'react-window-size-listener'
import LoadingOverlay from 'react-loading-overlay';
import ReactFullpage from '@fullpage/react-fullpage';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: null,
            isLoading: false
        };
    }

    setLoading(){
        this.setState({isLoading: true})
        setTimeout(()=>{
            this.setState({isLoading:false})
        },4000)
    }

    render() {
        return (
            <React.Fragment>
                <WindowSizeListener
                    onResize={(windowSize) => {
                        document.getElementsByClassName('rps_div').item(0).children[0].classList.add('full_size')
                        document.getElementsByClassName('full_size').item(0).style.height=windowSize.windowHeight+"px"

                        // const $videoIframe = document.getElementById('video');
                        // let responsiveHeight = $videoIframe.offsetWidth * 0.5625;
                        // $videoIframe.setAttribute('height', responsiveHeight);
                    }}
                />
                <div className={'rps_div'}>
                    <LoadingOverlay
                        active={this.state.isLoading} spinner
                    >
                        <ReactFullpage
                            //fullpage options
                            licenseKey = {'YOUR_KEY_HERE'}
                            scrollingSpeed = {800} /* Options here */

                            render={({ state, fullpageApi }) => {
                                return (
                                    <ReactFullpage.Wrapper>
                                        <div className="section">
                                            <FirstComponent load={this.setLoading.bind(this)}/>
                                        </div>
                                        <div className="section">
                                            <SecondComponent/>
                                        </div>
                                    </ReactFullpage.Wrapper>
                                );
                            }}
                        />
                    </LoadingOverlay>
                </div>
            </React.Fragment>
        );
    }
}