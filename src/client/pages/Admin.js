/**
 *======================================================
 * @파일명:Admin.js
 * @작성일자:2020-02-06 오후 3:24
 * @작성자:Yunwoo Kim
 * @설명: 관리자 페이지
 * @변경이력:
 *===================[ Thing-Project ]===================
 */
import React, {useState} from 'react';
import '../css/admin.css'
import Member from './AdminComps/MemberComponent'


export default function Admin() {
    const [password, setPassword] = useState(false);
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
                                <li><a href="/#/admin">Members</a></li>
                                <li><a href=""></a></li>
                                <li><a href="/">Home</a></li>
                            </ul>
                        </menu>
                        <article>
                            <Member/>
                        </article>
                    </div>
                </div>

            }

        </div>

    )
}