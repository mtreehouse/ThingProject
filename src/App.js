/**
 *======================================================
 * @파일명:App.js
 * @작성일자:2020-01-14 오전 10:56
 * @작성자:Yunwoo Kim
 * @설명: 페이지 콤퍼넌트들을 불러와 Full Page Scroll 처리
 * @변경이력: 모바일크롬 vh 사이즈 버그로 인한 동적 높이 조절
 *===================[ Thing-Project ]===================
 */

import React, {} from 'react';
import ReactPageScroller from "./page-scroller";
import FirstComponent from "./pages/FirstComponent";
import SecondComponent from "./pages/SecondComponent";
import WindowSizeListener from 'react-window-size-listener'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: null
        };
    }

    render() {
        return (
            <React.Fragment>
                <WindowSizeListener
                    onResize={(windowSize) => {
                        document.getElementsByClassName('rps_div').item(0).children[0].classList.add('full_size')
                        document.getElementsByClassName('full_size').item(0).style.height=windowSize.windowHeight+"px"
                    }}
                />
                <div className={'rps_div'}>
                    <ReactPageScroller
                        renderAllPagesOnFirstRender={false}
                    >
                        <FirstComponent/>
                        <SecondComponent/>
                    </ReactPageScroller>
                </div>
            </React.Fragment>
        );
    }
}