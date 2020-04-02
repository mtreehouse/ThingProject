/**
 *=========================[  ]=========================
 * @파일명:FirstComponent.js
 * @작성일자:2020-01-07 오후 02:30
 * @작성자:Yunwoo Kim
 * @설명: 첫번째 페이지 (사용자 정보 입력)
 * @변경이력:
 *  2020-01-22 : class에서 function으로 변경 후
 *  state사용을 위해 componentDidMount를 useEffect,[] 로 대체 함.
 *  2020-02-18 : Bootpay & Aligo API 적용
 *===================[ Thing-Project ]===================
 */
import React, {useEffect, useState} from "react";
import '../../css/firstComponent.css';
import * as firebase from "firebase/app";
import 'firebase/auth';
import SlideToggle from "react-slide-toggle";
import BootPay from "bootpay-js"
import axios from "axios"
import sentlove from '../../img/runlove.gif'
import querystring from 'querystring'
import Modal from '../Modal/responseModal'
import { Container } from "semantic-ui-react";

export default function FirstComponent(props) {
    const [isTyped, setIsTyped] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [toggleEvent, setToggleEvent] = useState(0);
    const [toggleEvent2, setToggleEvent2] = useState(0);
    const [myName, setMyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loveNumber, setLoveNumber] = useState('');
    const [codeNumber, setCodeNumber] = useState('');

    let rcptId = "";

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


    function submitPhoneNumberAuth(phoneNum) {
        const appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNum, appVerifier)
            .then(function (confirmationResult) {
                window.confirmResult = confirmationResult;
            })
            .catch(function (error) {
                console.log("______--ERROR--__" + error);
            });
    }

    function submitPhoneNumberAuthCode(codeNum) {
        if (window.confirmResult != null) {
            window.confirmResult
                .confirm(codeNum)
                .then(function (result) {
                    setToggleEvent(Date.now());
                    setToggleEvent2(Date.now());
                    setIsVerified(true);
                })
                .catch(function (error) {
                    alert("You have entered a wrong code")
                    console.log("Verify Failed : " + error);
                });
        } else {
            console.log("메세지 전송 실패");
        }
    }

    // 전화번호 인증
    function btn_verify() {
        setIsTyped(true);
        onToggle();
        submitPhoneNumberAuth(phoneNumber);
    }

    // 결제 > DB저장 > 문자전송
    function btn_sendLove() {
        const korMyPhone = phoneNumber.replace('+82','')
        const korHisPhone = loveNumber.replace('+82','')

        axios.get('/api/connect') /* 서버 연결 확인 */
            .then(r => {
                if (r.status == 200) {
                    BootPay.request({
                        price: '1000', //실제 결제되는 가격
                        application_id: "5e38c26a02f57e00245c7593",
                        name: '메세지 전송하기', //결제창에서 보여질 이름
                        show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
                        items: [
                            {
                                item_name: '메세지1회전송',
                                qty: 1,
                                unique: 'msg_thinglove',
                                price: 1000,
                                cat1: 'send_message'
                            }
                        ],
                        user_info: {
                            username: '사용자 이름',
                            email: '',
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
                        console.log(data);
                        let enable = true; // 재고 수량 관리 로직 혹은 다른 처리
                        if (enable) {
                            BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
                        } else {
                            BootPay.removePaymentWindow(data); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
                        }
                    }).close(function (data) {
                        // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
                        console.log(data);
                    }).done(function (data) {
                        //결제가 정상적으로 완료되면 수행됩니다
                        //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
                        rcptId = data.receipt_id;

                        // DB에 저장
                        axios.post('/api/member/insert', {
                            name: myName,
                            my_phone: korMyPhone,
                            his_phone: korHisPhone,
                            receipt_id: rcptId
                        }).then(r => {
                            // 매칭여부 확인 후 '개인' 혹은 '매칭 성공' 메세지 전송
                            axios.post('/api/member/matchCheck', {
                                my_phone: korMyPhone,
                                his_phone: korHisPhone
                            }).then(r => {
                                if(r.data){ // 매칭 됐을 시
                                    // 문자 전송
                                    axios.post('/api/aligo/sendMass', querystring.stringify(
                                        {
                                            sender: '01037004972',
                                            rec_1: korMyPhone,
                                            rec_2: korHisPhone,
                                            msg_type: 'SMS',
                                            msg: '서로의 썸이 연결되었습니다!',
                                            cnt: 2
                                        })).catch(e => console.log("_________________" + e));
                                    console.log("___________매칭성공")
                                }else{ // 매칭 실패 시
                                    // 문자 전송
                                    axios.post('/api/aligo/send', querystring.stringify(
                                        {
                                            sender: '01037004972',
                                            receiver: korHisPhone,
                                            msg: '문자전송성공!',
                                            msg_type: 'SMS'
                                        })).catch(e => console.log("_________________" + e));
                                    console.log("___________매칭실패")
                                }
                            }).catch(r=>{
                                console.log(r)
                            })
                        }).then(r => {
                            setIsSent(true)
                        })
                            .catch(e => {
                                console.log(e);
                                axios.post('/api/bp/cancel', {
                                    data: rcptId
                                }).then(() => {
                                    console.log('결제취소되었습니다.');
                                    alert("문자전송에 실패하여 결제가 취소되었습니다.")
                                })
                                    .catch(e => {
                                        console.log(e);
                                    })
                            })
                        console.log("_________________결제 성공__" + data);
                        console.log("_____reciptId_________: " + data.receipt_id);
                    });
                }
            }).catch(e => {
            console.log("_________________" + e);
            alert('서버가 원활하지 않습니다.\n잠시 후 재시도 해주세요.')
        });
    }

    // 결제 취소 버튼
    function btn_cancelPay() {
        axios.post('/api/bp/cancel', {
            data: rcptId
        }).catch(e => {
            console.log(e);
        })

        //매칭 테스트
        // axios.post('/api/member/matchCheck', {
        //     my_phone: "123",
        //     his_phone: '01037004972'
        // }).then(r => {
        //     if(r.data){ // 매칭 됐을 시
        //         // 문자 전송
        //         axios.post('/api/aligo/sendMass', querystring.stringify(
        //             {
        //                 sender: '01037004972',
        //                 rec_1: '01037004972',
        //                 rec_2: '01037004972',
        //                 msg_type: 'SMS',
        //                 msg: '서로의 썸이 연결되었습니다!',
        //                 cnt: 2
        //             })).catch(e => console.log("_________________" + e));
        //         console.log("___________매칭성공")
        //     }else{ // 매칭 실패 시
        //         // 문자 전송
        //         axios.post('/api/aligo/send', querystring.stringify(
        //             {
        //                 sender: '01037004972',
        //                 receiver: '01037004972',
        //                 msg: '문자전송성공!',
        //                 msg_type: 'SMS'
        //             })).catch(e => console.log("_________________" + e));
        //         console.log("___________매칭실패")
        //     }
        // }).catch(r=>{
        //     console.log(r)
        // })

        // 메세지 전송 테스트
        // const querystring = require('querystring');
        // axios.post('/api/aligo/send', querystring.stringify(
        //     {
        //         sender: '01037004972',
        //         receiver: '01037004972',
        //         msg: 'hitestme10',
        //     }))
        //     .catch(e=>console.log("_________________"+e));

    }
    const ModalApp = ({ children }) => (
        <Container style={{  }}>
            {children}
        </Container>
    );

    function resSetMyNumber(phoneNum) {
        // setPhoneNumber(phoneNum)
        console.log("_________________"+phoneNum);
    }

    return (
        <div className="component first-component">

            <div>
                <h2 className={'first_main_h2'}>Get To Know</h2>
                {isSent ?
                    <img src={sentlove} alt='sentlovelogo' className={'sentloveimg'}/>
                    :
                    <div className='input_div'>
                        <SlideToggle toggleEvent={toggleEvent2}>
                            {({setCollapsibleElement}) => (
                                <div className="my-collapsible" ref={setCollapsibleElement}>
                                    <div className='input_field'>
                                        <input type={'text'} placeholder={'my name...'}
                                               className={'input_my_name ' + (isTyped ? 'readonly' : '')}
                                               readOnly={isTyped}
                                               onChange={e => {
                                                   setMyName(e.target.value)
                                               }}
                                        />
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
                                        <input type={'text'} placeholder={'verification code...'} onChange={e => {
                                            setCodeNumber(e.target.value)
                                        }}/>
                                    </div>
                                )}
                            </SlideToggle>
                        </div>
                        <div className='input_field'>
                            {isTyped ?
                            <button
                                className={'btn ' + (isVerified ? 'hide' : '')}
                                onClick={e=>{
                                    e.preventDefault()
                                    submitPhoneNumberAuthCode(codeNumber)
                                }}
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
                                className={'btn ' + (isVerified ? '' : 'hide')} // isVerified 임시
                                onClick={btn_sendLove}
                            >SEND
                            </button>
                        </div>
                    </div>
                }
                <ModalApp>
                    <Modal resMyNum={resSetMyNumber} submitPhone={submitPhoneNumberAuth} submitCode={submitPhoneNumberAuthCode}/>
                </ModalApp>

            </div>

            <footer>
                <div>how to</div>
                <button className={'scroll-link'} onClick={btn_cancelPay}>
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