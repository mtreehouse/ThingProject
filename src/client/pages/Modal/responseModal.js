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

export default function ModalExampleShorthand(props) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loveNumber, setLoveNumber] = useState('');
    const [codeNumber, setCodeNumber] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    const [isTyped, setIsTyped] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const styles = {
        textAlign: "center"
    };

    return(
        <Modal trigger={<Button className={'modalBtn'}
                                onClick={e=>{
                                    e.preventDefault();
                                    setModalOpen(true) }}>Check</Button>}
                basic size="mini"
                open={modalOpen}>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"/>
            <Header content="Response " />
            <Modal.Content>
                <div style={styles}>
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
            </Modal.Content>
            <Modal.Actions>
                <Button basic color="red" inverted onClick={e=>{
                    e.preventDefault();
                    setModalOpen(false)
                    setIsTyped(false)
                }}>
                    <Icon name="remove" /> Cancel
                </Button>
                {isTyped ?
                    <Button color="blue" inverted onClick={e=>{
                        e.preventDefault()
                        common.submitPhoneNumberAuthCode(codeNumber)
                            .then(result => {
                                if(result){

                                }
                        })
                    }}>
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
            </Modal.Actions>
        </Modal>
    )
}