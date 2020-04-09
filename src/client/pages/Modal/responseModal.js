/**
 *=========================[  ]=========================
 * @파일명:responseModal.js
 * @작성일자:2020-04-02 오전 11:00
 * @작성자:Yunwoo Kim
 * @설명: 응답자 확인 모달
 * @변경이력:
 *===================[ Thing-Project ]===================
 */
import React, {useState} from "react";
import { Button, Header, Icon, Modal, Input } from "semantic-ui-react";
import firebase from "firebase/app"
import * as common from '../../js/common'
import axios from 'axios'
import querystring from "querystring";
import * as Sentry from "@sentry/browser";

export default function ModalExampleShorthand(props) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [myName, setMyName] = useState('');
    const [loveName, setLoveName] = useState('');
    const [loveNumber, setLoveNumber] = useState('');
    const [codeNumber, setCodeNumber] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [isTyped, setIsTyped] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const styles = {
        textAlign: "center"
    };

    function initState(){
        setPhoneNumber('')
        setMyName('')
        setLoveName('')
        setLoveNumber('')
        setCodeNumber('')
        setIsTyped(false)
        setIsVerified(false)
        setModalOpen(false)
    }

    function responseCheck() {
        Sentry.init({dsn: "https://0554b0406469483d96b7f43e9298ccb9@o375237.ingest.sentry.io/5194338"});

        let notConnected = true
        axios.post('/api/member/matchCheck', {
            my_phone: phoneNumber
        }).then(r=>{
            if(r.data.length===0){
                notConnected = false
                alert("당신의 번호로 등록된 썸이 존재하지 않습니다.")
            }else{
                r.data.forEach(member=>{
                    const myPhone = member.my_phone
                    if(member.my_phone===loveNumber){
                        // 매칭 성공 문자 전송 후 DB에서 삭제
                        notConnected = false
                        console.log("______________매칭성공: "+myPhone+"__"+member.his_phone);
                        const match_Message = member.my_name+'님과 '+member.his_name+'님의 사랑이 이루어졌습니다!\n\n'
                            + member.my_name+'님의 사랑, Thing Love가 응원합니다♥\n'
                        axios.post('/api/aligo/send', querystring.stringify(
                            {
                                sender: '01037004972',
                                receiver: myPhone,
                                msg: match_Message,
                                msg_type: 'SMS',
                            }))
                            .then(()=>{
                                axios.head('/api/member/del/'+member.id)
                                    .catch(e=>{
                                        console.log("______"+e);
                                        Sentry.captureException(e)
                                    })
                                alert(myName+"님의 "+loveName+"님에 대한 사랑이 이루어졌습니다!\n\n"+myName+"님의 사랑,\nThing Love가 응원합니다♥")
                            })
                            .catch(e => {
                                initState()
                                console.log("_________________" + e)
                                Sentry.captureException(e)
                            });
                    }else{
                        // 매칭 실패 문자 전송 후 DB에서 삭제
                        console.log("______________매칭실패: "+myPhone+"__"+member.his_phone);
                        const fail_Message = member.my_name+'님의 '+member.his_name+'님에 대한 마음이 빗나갔습니다.\n'
                            + '\n'
                            + member.my_name+'님의 사랑, Thing Love가 응원합니다♥\n'
                        axios.post('/api/aligo/send', querystring.stringify(
                            {
                                sender: '01037004972',
                                receiver: myPhone,
                                msg: fail_Message,
                                msg_type: 'SMS'
                            }))
                            .then(()=>{
                                axios.head('/api/member/del/'+member.id)
                                    .catch(e=>{
                                        console.log("______"+e);
                                        Sentry.captureException(e)
                                    })
                            })
                            .catch(e => {
                                initState()
                                console.log("_________________" + e)
                                Sentry.captureException(e)
                            });
                    }
                })
            }
        }).then(()=>{
            if(notConnected){
                alert("고객님의 마음이 빗나갔습니다..\n\n"+myName+"님의 사랑,\nThing Love가 응원합니다!")
            }
        }).then(r=>{
            initState()
        })
    }

    return(
        <Modal trigger={<Button className={'modalBtn'}
                                onClick={e=>{
                                    e.preventDefault();
                                    setModalOpen(true) }}>문자를 받으셨다면 여기로!</Button>}
                basic size="mini"
                open={modalOpen}>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"/>
            <Header content="Response Check" />
            <Modal.Content>
                <div style={styles}>
                        <div className={(isVerified ? 'hide' : '')}>
                            <Input placeholder={'Enter your Name.'}
                                   onChange={e => {
                                       setMyName(e.target.value)
                                   }}
                                   className={(isTyped ? 'hide' : '')}
                                   onFocus={e=>{e.target.setAttribute("autocomplete","nope")}}
                            />
                            <br/><br/>
                            <Input placeholder={'Enter your phone number.'}
                                   onChange={e => {
                                       setPhoneNumber(e.target.value.replace(/-/gi,''))
                                   }}
                                   className={(isTyped ? 'hide' : '')}
                                   onKeyUp={e=>{
                                       e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-")
                                   }}
                                   maxLength={13}
                                   onFocus={e=>{e.target.setAttribute("autocomplete","nope")}}
                            />
                            <Input placeholder={'Enter Code.'}
                                   type={'number'}
                                   onChange={e => {
                                       setCodeNumber(e.target.value)
                                   }}
                                   className={(isTyped ? '' : 'hide')}
                            />
                        </div>
                        <div className={(isVerified ? '' : 'hide')}>
                            <Input placeholder={'Enter Lovers Name.'}
                                   onChange={e => {
                                       setLoveName(e.target.value)
                                   }}
                                   onFocus={e=>{e.target.setAttribute("autocomplete","nope")}}
                            />
                            <br/><br/>
                            <Input placeholder={'Enter Lovers Phone.'}
                                   onChange={e => {
                                       setLoveNumber(e.target.value.replace(/-/gi,''))
                                   }}
                                   onFocus={e=>{e.target.setAttribute("autocomplete","nope")}}
                                   onKeyUp={e=>{
                                       e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,"$1-$2-$3").replace("--", "-")
                                   }}
                                   maxLength={13}
                            />
                        </div>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color="red" inverted onClick={e=>{
                    e.preventDefault();
                    initState()
                }}>
                    <Icon name="remove" /> Cancel
                </Button>
                {isTyped ?
                    <Button color="blue" inverted onClick={e=>{
                        e.preventDefault()
                        common.submitPhoneNumberAuthCode(codeNumber)
                            .then(result => {
                                if(result){
                                    setIsVerified(true)
                                }
                        })}}
                        className={(isVerified ? 'hide' : '')}
                    >
                        <Icon name="checkmark" /> Verify
                    </Button>
                    :
                    <Button color="green" inverted onClick={e=>{
                        e.preventDefault()
                        if(myName == '' || phoneNumber.length!=11){
                            alert('정확한 내 정보를 입력해주세요!')
                            return;
                        }
                        common.submitPhoneNumberAuth(firebase, phoneNumber)
                        setIsTyped(true)
                    }}>
                        <Icon name="checkmark" /> Send Code
                    </Button>
                }
                <Button basic color="blue" inverted onClick={e=>{
                    e.preventDefault();
                        if(loveName == '' || loveNumber.length!=11){
                            alert('정확한 상대방 정보를 입력해주세요!')
                            return;
                        }
                        responseCheck()
                    }}
                    className={(isVerified ? '' : 'hide')}
                >
                    <Icon name="checkmark" /> CHECK
                </Button>
            </Modal.Actions>
        </Modal>
    )
}