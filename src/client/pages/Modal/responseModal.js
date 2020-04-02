import React from "react";
import { Button, Header, Icon, Modal, Input } from "semantic-ui-react";

const styles = {
    textAlign: "center"
};


const ModalExampleShorthand = (props) => (
    <Modal trigger={<Button className={'modalBtn'}>Check</Button>} basic size="mini">
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css"/>
        <Header content="Response " />
        <Modal.Content>
            <div style={styles}>
                <Input placeholder={'Enter your phone number.'}
                       id={'modalMyNum'}
                    //onChange={(e)=>{props.resMyNum(e.target.value)}}
                />
                <Input placeholder={'Enter Code.'}
                       id={'modalCode'}
                    //onChange={(e)=>{props.resMyNum(e.target.value)}}
                />
            </div>
        </Modal.Content>
        <Modal.Actions>
            <Button basic color="red" inverted>
                <Icon name="remove" /> Cancel
            </Button>
            <Button color="green" inverted onClick={e=>{
                e.preventDefault();
                props.submitPhone(document.getElementById("modalMyNum").value);
            }}>
                <Icon name="checkmark" /> Verify
            </Button>
            <Button color="blue" inverted onClick={e=>{
                e.preventDefault();
                props.submitCode(document.getElementById("modalCode").value);
            }}>
                <Icon name="checkmark" /> Check Code
            </Button>
        </Modal.Actions>
    </Modal>
);

export default ModalExampleShorthand;