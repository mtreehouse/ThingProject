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
import * as firebase from "firebase"
import * as common from '../../js/common'
import axios from 'axios'
import querystring from "querystring";

export default function ModalExampleShorthand(props) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loveName, setLoveName] = useState('');
    const [loveNumber, setLoveNumber] = useState('');
    const [codeNumber, setCodeNumber] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [isTyped, setIsTyped] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const styles = {
        textAlign: "center"
    };

    function responseCheck() {
        axios.post('/api/member/matchCheck', {
            my_phone: phoneNumber
        }).then(r=>{
            r.data.forEach(r=>{
                const korMyPhone = r.my_phone.replace('+82','0')
                const korHisPhone = r.his_phone.replace('+82','0')

                if(r.my_phone===loveNumber){
                    // 매칭 성공 문자 전송 후 DB에서 삭제
                    console.log("______________매칭성공: "+korMyPhone+"__"+korHisPhone);
                    axios.post('/api/aligo/sendMass', querystring.stringify(
                        {
                            sender: '01037004972',
                            rec_1: korMyPhone,
                            rec_2: korHisPhone,
                            msg_type: 'SMS',
                            msg_1: '서로의 썸이 연결되었습니다!',
                            msg_2: '서로의 썸이 연결되었습니다!',
                            cnt: 2
                        }))
                        .then(()=>{
                            axios.head('/api/member/del/'+r.id)
                                .catch(e=>{console.log("______"+e);})
                        })
                        .catch(e => console.log("_________________" + e));
                }else{
                    // 매칭 실패 문자 전송 후 DB에서 삭제
                    console.log("______________매칭실패: "+korMyPhone+"__"+korHisPhone);
                    axios.post('/api/aligo/send', querystring.stringify(
                        {
                            sender: '01037004972',
                            receiver: korMyPhone,
                            msg: '매칭실패되었습니다.',
                            msg_type: 'SMS'
                        }))
                        .then(()=>{
                            axios.head('/api/member/del/'+r.id)
                                .catch(e=>{console.log("______"+e);})
                        })
                        .catch(e => console.log("_________________" + e));
                }
            })
        })
        .then(r=>{
            alert("결과 메세지가 전송되었습니다!")
            setModalOpen(false)
            setIsTyped(false)
            setIsVerified(false)
        })
    }

    return(
        <Modal trigger={<Button className={'modalBtn'}
                                onClick={e=>{
                                    e.preventDefault();
                                    setModalOpen(true) }}>Check</Button>}
                basic size="mini"
                open={modalOpen}>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"/>
            <Header content="Response Check" />
            <Modal.Content>
                <div style={styles}>
                        <div className={(isVerified ? 'hide' : '')}>
                            <Input placeholder={'Enter your phone number.'}
                                   onChange={e => {
                                       setPhoneNumber(e.target.value)
                                   }}
                                   className={(isTyped ? 'hide' : '')}
                            />
                            <Input placeholder={'Enter Code.'}
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
                            />
                            <br/><br/>
                            <Input placeholder={'Enter Lovers Phone.'}
                                   onChange={e => {
                                       setLoveNumber(e.target.value)
                                   }}
                            />
                        </div>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color="red" inverted onClick={e=>{
                    e.preventDefault();
                    setModalOpen(false)
                    setIsTyped(false)
                    setIsVerified(false)
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
                        <Icon name="checkmark" /> Check Code
                    </Button>
                    :
                    <Button color="green" inverted onClick={e=>{
                        e.preventDefault()
                        common.submitPhoneNumberAuth(firebase, phoneNumber)
                        setIsTyped(true)
                    }}>
                        <Icon name="checkmark" /> Verify
                    </Button>
                }
                <Button basic color="blue" inverted onClick={e=>{
                    e.preventDefault();
                        responseCheck()
                    }}
                    className={(isVerified ? '' : 'hide')}
                >
                    <Icon name="checkmark" /> SEND
                </Button>
            </Modal.Actions>
        </Modal>
    )
}