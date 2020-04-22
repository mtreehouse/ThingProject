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
import LoadingOverlay from 'react-loading-overlay';
import ReactFullpage from '@fullpage/react-fullpage';
import {setState} from "expect";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
                <div className={'rps_div'}>
                        <ReactFullpage
                            licenseKey = {'YOUR_KEY_HERE'}
                            scrollingSpeed = {800}
                            render={({ state, fullpageApi }) => {
                                return (
                                        <LoadingOverlay
                                            active={this.state.isLoading} spinner
                                        >
                                    <ReactFullpage.Wrapper>
                                        <div className="section">
                                            <FirstComponent loadApi={this.setLoading.bind(this)} fullApi={fullpageApi}/>
                                        </div>
                                        <div className="section">
                                            <SecondComponent/>
                                        </div>

                                    </ReactFullpage.Wrapper>
                                        </LoadingOverlay>
                                );
                            }}
                        />

                </div>
            </React.Fragment>
        );
    }
}