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
import React, {useEffect, useState} from "react"
import '../../css/firstComponent.css'
import firebase from "firebase/app";
import 'firebase/auth';
import SlideToggle from "react-slide-toggle"
import BootPay from "bootpay-js"
import axios from "axios"
import sentlove from '../../img/runlove.gif'
import adpic from '../../img/ad/adsize.png'
import querystring from 'querystring'
import Modal from '../Modal/responseModal'
import { Container } from "semantic-ui-react"
import * as common from '../../js/common'
import * as Sentry from "@sentry/browser";

function FirstComponent(props) {
    const [isTyped, setIsTyped] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [toggleEvent, setToggleEvent] = useState(0);
    const [toggleEvent2, setToggleEvent2] = useState(0);
    const [myName, setMyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loveName, setLoveName] = useState('');
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
         * @설명:문자 인증용 recaptcha 초기화
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

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

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

        Sentry.init({dsn: "https://0554b0406469483d96b7f43e9298ccb9@o375237.ingest.sentry.io/5194338"});
    }, [])

    // 전화번호 인증
    function btn_verify() {
        window.gtag('event', 'click_step1_인증')
        if(myName != '' && phoneNumber.length===11){
            setIsTyped(true);
            onToggle();
            common.submitPhoneNumberAuth(firebase, phoneNumber);
        }else{
            alert('정확한 내 정보를 입력해주세요!')
        }
    }

    // 결제 > DB저장 > 문자전송
    function btn_sendLove() {
        window.gtag('event', 'click_step2_전송')
        if(loveName == '' || loveNumber.length!=11){
            alert('정확한 상대방 정보를 입력해주세요!')
            return;
        }

        axios.get('/api/connect') /* 서버 연결 확인 */
            .then(r => {
                if (r.status === 200) {
                    // BootPay.request({
                    //     price: '1000', //실제 결제되는 가격
                    //     application_id: "5e38c26a02f57e00245c7593",
                    //     name: '메세지 전송하기', //결제창에서 보여질 이름
                    //     show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
                    //     items: [
                    //         {
                    //             item_name: '메세지1회전송',
                    //             qty: 1,
                    //             unique: 'msg_thinglove',
                    //             price: 1000,
                    //             cat1: 'send_message'
                    //         }
                    //     ],
                    //     user_info: {
                    //         username: '사용자 이름',
                    //         email: '',
                    //         addr: '사용자 주소',
                    //         phone: '010-1234-4567'
                    //     },
                    //     order_id: 'order_id_1234', //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
                    //     params: {callback1: '그대로 콜백받을 변수 1', callback2: '그대로 콜백받을 변수 2', customvar1234: '변수명도 마음대로'},
                    // }).error(function (data) {
                    //     //결제 진행시 에러가 발생하면 수행됩니다.
                    //     Sentry.captureException(data)
                    //     console.log(data);
                    // }).cancel(function (data) {
                    //     //결제가 취소되면 수행됩니다.
                    //     console.log(data);
                    // }).ready(function (data) {
                    //     // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
                    //     console.log(data);
                    // }).confirm(function (data) {
                    //     console.log(data);
                    //     let enable = true; // 재고 수량 관리 로직 혹은 다른 처리
                    //     if (enable) {
                    //         BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
                    //     } else {
                    //         BootPay.removePaymentWindow(data); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
                    //     }
                    // }).close(function (data) {
                    //     // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
                    // }).done(function (data) {
                    //     //결제가 정상적으로 완료되면 수행됩니다
                    //     //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
                    //     rcptId = data.receipt_id;

                        // DB에 저장
                        axios.post('/api/member/insert', {
                            my_name: myName,
                            his_name: loveName,
                            my_phone: phoneNumber,
                            his_phone: loveNumber,
                            receipt_id: rcptId
                        }).then(r => {
                            // 상대에게 메세지 전송
                            const sms_message = loveName+'님, 주변의 누군가가 당신에게 호감을 가지고있습니다!\n'
                                        + loveName+'님이 마음에 두고있는 분이 있다면 지금 확인해보세요!\n'
                                        + 'http://secretpropose.com \n\n'
                                        + loveName+'님의 사랑,\n 비밀고백이 함께 응원합니다♥\n\n'
                                        + '- Secret Propose -'
                            axios.post('/api/aligo/send', querystring.stringify(
                                {
                                    title: '[SECRET PROPOSE]',
                                    sender: '01037004972',
                                    receiver: loveNumber,
                                    msg: sms_message,
                                    msg_type: 'LMS'
                                })).catch(e => {
                                    console.log("_________________" + e)
                                    Sentry.captureException(e)
                                });
                        }).then(r => {
                            props.loadApi() //Loading overlay
                            setTimeout(()=>{
                                setIsSent(true)
                                window.gtag('event', 'count_finalUser')
                                alert(myName+'님의 마음이 출발했습니다!')
                                setTimeout(()=>{
                                    window.location.reload();
                                },4000)
                            },4500)
                        }).catch(e => {
                                console.log(e);
                                Sentry.captureException(e)
                                console.log('문자전송에 실패하였습니다.');
                                alert("문자전송에 실패하였습니다.")
                                // axios.post('/api/bp/cancel', {
                                //     data: rcptId
                                // }).then(() => {
                                //     console.log('문자전송에 실패하여 결제가 취소되었습니다.');
                                //     alert("문자전송에 실패하여 결제가 취소되었습니다.")
                                // }).catch(e => {
                                //     console.log(e);
                                // })
                        })
                        // console.log("_________________결제 성공__" + data);
                        // console.log("_____reciptId_________: " + data.receipt_id);
                        // });
                }
            }).catch(e => {
            console.log("_________________" + e);
            Sentry.captureException(e)
            alert('서버가 원활하지 않습니다.\n잠시 후 재시도 해주세요.')
        });
    }

    // 스크롤 아래 이동 버튼
    function btn_moveBottom() {
        props.fullApi.moveTo(2,1)
    }

    const ModalApp = ({ children }) => (
        <Container style={{  }}>
            {children}
        </Container>
    );

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
                                        <input type={'text'} placeholder={'나의 이름...'}
                                               className={'input_my_name ' + (isTyped ? 'readonly' : '')}
                                               readOnly={isTyped}
                                               onChange={e => {
                                                   setMyName(e.target.value)
                                               }}
                                        />
                                    </div>
                                    <div className='input_field'>
                                        <input type={'text'} placeholder={'나의 번호...'}
                                               className={'input_my_phone ' + (isTyped ? 'readonly' : '')}
                                               readOnly={isTyped}
                                               onChange={e => {
                                                   setPhoneNumber(e.target.value.replace(/-/gi,''))
                                               }}
                                               onKeyUp={e=>{
                                                   e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-")
                                               }}
                                               maxLength={13}
                                        />
                                    </div>
                                </div>
                            )}
                        </SlideToggle>

                        <div className='input_field'>
                            <input type={'text'} placeholder={"♥의 이름..."} onChange={e => {
                                setLoveName(e.target.value)
                            }} className={'input_love_phone ' + (isVerified ? '' : 'hide')}/>
                        </div>
                        <div className='input_field'>
                            <input type={'text'} placeholder={"♥의 번호..."} onChange={e => {
                                setLoveNumber(e.target.value.replace(/-/gi,''))
                            }} className={'input_love_phone ' + (isVerified ? '' : 'hide')}
                               onKeyUp={e=>{
                                   e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-")
                               }}
                               maxLength={13}
                            />
                        </div>
                        <div className='input_field vchide'>
                            <SlideToggle collapsed toggleEvent={toggleEvent}>
                                {({setCollapsibleElement}) => (
                                    <div className="my-collapsible" ref={setCollapsibleElement}>
                                        <input type={'text'} placeholder={'인증 번호'} onChange={e => {
                                            setCodeNumber(e.target.value)
                                        }}
                                        type={'number'}
                                        />
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
                                    common.submitPhoneNumberAuthCode(codeNumber)
                                        .then(result => {
                                            if(result){
                                                setToggleEvent(Date.now());
                                                setToggleEvent2(Date.now());
                                                setIsVerified(true);
                                            }
                                    })
                                }}
                            >확인</button>
                            :
                            <button
                                className={'btn btntest'}
                                onClick={btn_verify}
                            >인증</button>
                        }
                        </div>
                        <div className='input_field'>
                            <button
                                className={'btn ' + (isVerified ? '' : 'hide')} // isVerified 임시
                                onClick={btn_sendLove}
                            >전송
                            </button>
                        </div>
                    </div>
                }

                <br/><br/>
                <div className={(isTyped ? 'hide' : '')}>
                    <ModalApp>
                        <Modal />
                    </ModalApp>
                </div>
            </div>

            <div className={'ad'}>
                {/*<script data-ad-client="ca-pub-4872298844105618" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>*/}
                {/*<a href={'#'} target={'blank'} onClick={()=>{window.gtag('event', 'click_ad_1')}}>
                    <img src={adpic} alt={'advertise'} className={'adpic'}/>
                </a>*/}
            </div>

            <footer>
                <button className={'scroll-link'} onClick={btn_moveBottom}>
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

export default React.memo(FirstComponent)