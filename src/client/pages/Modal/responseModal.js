import React, {useEffect, useState} from "react";
import { Button, Header, Icon, Modal, Input } from "semantic-ui-react";

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
                        props.submitCode(codeNumber)
                    }}>
                        <Icon name="checkmark" /> Check Code
                    </Button>
                    :
                    <Button color="green" inverted onClick={e=>{
                        e.preventDefault()
                        props.submitPhone(phoneNumber)
                        setIsTyped(true)
                    }}>
                        <Icon name="checkmark" /> Verify
                    </Button>
                }
                <Button color="green" inverted onClick={e=>{
                    e.preventDefault()
                    alert(props.verified)
                }}>
                    <Icon name="checkmark" /> tset
                </Button>

            </Modal.Actions>
        </Modal>
    )
}