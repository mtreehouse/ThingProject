/**
 *=========================[  ]=========================
 * @파일명:FirstComponent.js
 * @작성일자:2020-01-07 오후 02:30
 * @작성자:Yunwoo Kim
 * @설명: 첫번째 페이지 (사용자 정보 입력)
 * @변경이력:
 *  2020-01-22 : class에서 function으로 변경 후
 *  state사용을 위해 componentDidMount를 useEffect,[] 로 대체 함.
 *===================[ Thing-Project ]===================
 */
import React, {useState, useEffect} from "react";
import '../css/firstComponent.css';
import * as firebase from "firebase/app";
import 'firebase/auth';
import SlideToggle from "react-slide-toggle";


export default function FirstComponent(props) {
    // TODO: 데이터베이스연결
    const [isTyped, setIsTyped] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [toggleEvent, setToggleEvent] = useState(0);
    const [toggleEvent2, setToggleEvent2] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loveNumber, setLoveNumber] = useState('');

    const onToggle = () => {
        setToggleEvent(Date.now());
    };

    useEffect(() => {
        /*
         *==========================================================
         * @파일명:verifyPhone.js -> FirstComponent.js
         * @작성일자:2020-01-17 오전 10:51
         * @작성자:Yunwoo Kim
         * @설명:문자 인증
         * @변경이력: 외부 파일에서 안으로 이동함.
        *===================[ Firebase sms Start]===================
        */
        const fbConf = require('./firebase');
        const firebaseConfig = {
            apiKey: fbConf.apiKey,
            authDomain: fbConf.authDomain,
            databaseURL: fbConf.databaseURL,
            projectId: fbConf.projectId,
            storageBucket: fbConf.storageBucket,
            messagingSenderId: fbConf.messagingSenderId,
            appId: fbConf.appId
        };

        firebase.initializeApp(firebaseConfig);

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function (response) {
                }
            }
        );
        /**
         *===================[ Firebase sms End ]===================
         */

    }, [])

    function submitPhoneNumberAuth() {
        const appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                window.confirmResult = confirmationResult;
            })
            .catch(function (error) {
                console.log("______--ERROR--__" + error);
            });
    }

    function submitPhoneNumberAuthCode(e) {
        e.preventDefault();
        if (window.confirmResult != null) {
            const code = document.getElementById("code").value;
            window.confirmResult
                .confirm(code)
                .then(function (result) {
                    setToggleEvent(Date.now());
                    setToggleEvent2(Date.now());
                    setIsVerified(true);
                    console.log("성공!!!!!!!!!!");
                })
                .catch(function (error) {
                    console.log("실패 ㅠㅠㅠ" + error);
                });
        } else {
            console.log("_________________메세지 전송이 안되었습니다.");
        }
    }

    function btn_verify() {
        setIsTyped(true);
        onToggle();
        submitPhoneNumberAuth();
    }

    function btn_sendLove() {
        console.log("_______loverNumber__________" + loveNumber);
    }

    return (
        <div className="component first-component">
            <div>
                <h2 className={'first_main_h2'}>Get To Know</h2>
                <div className='input_div'>
                    <SlideToggle toggleEvent={toggleEvent2}>
                        {({setCollapsibleElement}) => (
                            <div className="my-collapsible" ref={setCollapsibleElement}>
                                <div className='input_field'>
                                    <input type={'text'} placeholder={'my name...'}
                                           className={'input_my_name ' + (isTyped ? 'readonly' : '')}
                                           readOnly={isTyped}/>
                                </div>
                                <div className='input_field'>
                                    <input type={'text'} placeholder={'my phone...'} id="phoneNumber"
                                           className={'input_my_phone ' + (isTyped ? 'readonly' : '')}
                                           readOnly={isTyped}
                                           onChange={e => {
                                               setPhoneNumber(e.target.value)
                                           }}
                                    />
                                </div>
                            </div>
                        )}
                    </SlideToggle>

                    <div className='input_field'>
                        <input type={'number'} placeholder={"♥'s phone..."} onChange={e => {
                            setLoveNumber(e.target.value)
                        }} className={'input_love_phone ' + (isVerified ? '' : 'hide')}/>
                    </div>
                    <div className='input_field vchide'>
                        <SlideToggle collapsed toggleEvent={toggleEvent}>
                            {({setCollapsibleElement}) => (
                                <div className="my-collapsible" ref={setCollapsibleElement}>
                                    <input type={'text'} placeholder={'verification code...'} id="code"/>
                                </div>
                            )}
                        </SlideToggle>
                    </div>
                    <div className='input_field'>
                        {isTyped ?
                            <button
                                className={'btn ' + (isVerified ? 'hide' : '')}
                                onClick={submitPhoneNumberAuthCode}
                            >OK</button>
                            :
                            <button
                                className={'btn btntest'}
                                onClick={btn_verify}
                            >Verify</button>
                        }
                    </div>
                    <div className='input_field'>
                        <button
                            className={'btn ' + (isVerified ? '' : 'hide')}
                            onClick={btn_sendLove}
                        >SEND
                        </button>
                    </div>

                </div>
                <div className={'input_info_div'}>
                    <img className={'svg_my_phone'} src={require('../img/svgmyphone.gif')} alt={'my phone-number'}/>
                </div>
            </div>
            <footer>
                <div>how to</div>
                <button className={'scroll-link'}>
                    <svg className="mouse" xmlns="..." viewBox="0 0 76 130">
                        <g fill="none">
                            <rect width="70" height="118" x="1.5" y="1.5" stroke="#FFF" strokeWidth={3} rx="36"/>
                            <circle className={'scroll'} cx="36.5" cy="31.5" r="4.5" fill="#FFF"/>
                        </g>
                    </svg>
                </button>
            </footer>
            <div id="recaptcha-container"></div>
        </div>
    )
}