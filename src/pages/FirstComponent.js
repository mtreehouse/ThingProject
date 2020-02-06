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
import BootPay from "bootpay-js"

export default function FirstComponent(props) {
    // TODO: 데이터베이스연결
    const [isTyped, setIsTyped] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [toggleEvent, setToggleEvent] = useState(0);
    const [toggleEvent2, setToggleEvent2] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loveNumber, setLoveNumber] = useState('');

    let reqId = "";

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
        BootPay.request({
            price: '1000', //실제 결제되는 가격
            application_id: "5e38c26a02f57e00245c7593",
            name: '메세지 전송 결제', //결제창에서 보여질 이름
            show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
            items: [
                {
                    item_name: '나는 아이템',
                    qty: 1, //수량
                    unique: '123',
                    price: 1000,
                    cat1: 'TOP',
                    cat2: '티셔츠',
                    cat3: '라운드 티',
                }
            ],
            user_info: {
                username: '사용자 이름',
                email: '사용자 이메일',
                addr: '사용자 주소',
                phone: '010-1234-4567'
            },
            order_id: 'order_id_1234', //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
            params: {callback1: '그대로 콜백받을 변수 1', callback2: '그대로 콜백받을 변수 2', customvar1234: '변수명도 마음대로'},
        }).error(function (data) {
            //결제 진행시 에러가 발생하면 수행됩니다.
            console.log(data);
        }).cancel(function (data) {
            //결제가 취소되면 수행됩니다.
            console.log(data);
        }).ready(function (data) {
            // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
            console.log(data);
        }).confirm(function (data) {
            //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
            //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
            console.log(data);
            const enable = true; // 재고 수량 관리 로직 혹은 다른 처리
            if (enable) {
                BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
            } else {
                BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
            }
        }).close(function (data) {
            // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
            console.log(data);
        }).done(function (data) {
            console.log("_________________결제 성공__"+data);
            //결제가 정상적으로 완료되면 수행됩니다
            //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
            console.log("_____reciptId_________: "+data.receipt_id);
            reqId = data.receipt_id;
        });
    }

    // 결제 취소 버튼
    function btn_cancelPay() {
        // TODO : requestId 받아서 취소페이지 넘겨주기
        fetch('http://localhost:4000/cancel/'+reqId)
            .catch(e=>{
            console.log("________________fetch_error_:"+e);
        })
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
                                    <input type={'text'} placeholder={'my phone...'}
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
                        <input type={'text'} placeholder={"♥'s phone..."} onChange={e => {
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
                            className={'btn ' + (true ? '' : 'hide')} // isVerified 임시
                            onClick={btn_sendLove}
                        >SEND
                        </button>
                    </div>
                    <div className='input_field'>
                        <button
                            className={'btn ' + (true ? '' : 'hide')}
                            onClick={btn_cancelPay}
                        >결제취소
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
            <div id="recaptcha-container"/>
        </div>
    )
}