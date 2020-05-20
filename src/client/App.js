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
import {Route, Switch} from 'react-router-dom'
import {Home, Admin} from './pages'
import adSurvey from './pages/HomeComps/adSurvey'

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                <>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/admin" component={Admin}/>
                    <Route exact path="/adsurvey" component={adSurvey}/>
                </>
            </Switch>
        );
    }
}