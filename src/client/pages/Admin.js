/**
 *======================================================
 * @파일명:Admin.js
 * @작성일자:2020-02-06 오후 3:24
 * @작성자:Yunwoo Kim
 * @설명: 관리자 페이지
 * @변경이력:
 *===================[ Thing-Project ]===================
 */
import React, {useState, useEffect} from 'react';
import '../css/admin.css'
import Member from './AdminComps/MemberComponent'
import Backup from './AdminComps/BackupComponent'
import {HashRouter as Router , Route, Switch} from "react-router-dom";


export default function Admin() {
    const [password, setPassword] = useState(false);

    useEffect(()=>{
        if(window.sessionStorage.getItem('authState')){
            setPassword(true)
        }
    },[])

    function logout(e){
        e.preventDefault()
        window.sessionStorage.removeItem('authState')
        window.location.reload()
    }

    return (
        <div>
            { !password ?
                <div>
                    <h3>404 Error</h3>
                    <br/>
                    <p>페이지를 찾을 수 없습니다.</p>
                    <br/><br/><br/><br/><br/><br/>
                    <input autoFocus onChange={r=>{
                            if(r.target.value==='thing'){
                                window.sessionStorage.setItem('authState','true')
                                setPassword(true)
                            }}}
                           style={{border:'none'}}
                    />
                </div>
                :
                <div>
                <header><p>관리자 페이지</p></header>
                    <div id={'body'}>
                        <menu>
                            <ul>
                                <li className={'menu_home'}><a href="/">Home</a></li>
                                <li><a href="/#/admin">Members</a></li>
                                <li><a href="/#/admin/backup">Backup</a></li>
                                <li className={'menu_logout'}><a onClick={logout}>Logout</a></li>
                            </ul>
                        </menu>
                        <article>
                            <Router>
                                <Switch>
                                    <>
                                        <Route exact path="/admin" component={Member}/>
                                        <Route exact path="/admin/backup" component={Backup}/>
                                    </>
                                </Switch>
                            </Router>
                        </article>
                    </div>
                </div>

            }

        </div>

    )
}