import { Button, DatePicker, IconButton, Input, Modal, Placeholder, Radio, RadioGroup, SelectPicker, toaster, Tooltip } from "rsuite";
import CloseIcon from '@rsuite/icons/Close';
import axios from 'axios';
import { useState } from "react";
import { notification } from "utils/helpers";

export default function MessageBox({isOpen, onClose, to, name}) {

    const [message, setMessage] = useState<string>('');

    const closeBox = () => {
        setMessage('');
        onClose();
    }

    const sendMessage = (evt) => {
        evt.preventDefault();
        if ( message.length === 0 ) return;

        axios.post(`/api/chats/${to}`, { message })
        .then(data => {
            closeBox();
            toaster.push(
                notification({
                    title: "Messages",
                    description: "Message is sent successfully",
                    type: "success",
                }),
                { placement: 'topEnd', }
            )
        })
        .catch(err => {
            toaster.push(
                notification({
                    title: "Messages",
                    description: "Could not send messages due to some issues",
                    type: "error",
                }),
                { placement: 'topEnd', }
            )
        })
    }

    return (
        <Modal open={isOpen} onClose={closeBox} size='xs'>
            <Modal.Header as={() => (
                <div className='w-full flex justify-between text-white'>
                    <span>{`Message to ${name}`}</span>
                    <span className='flex items-center'>
                    <CloseIcon className='text-[1.2rem] mr-1 cursor-pointer' onClick={closeBox}/>
                    </span>
                </div>
            )}/>
            <Modal.Body className='space-y-5'>
                <Input
                    as="textarea"
                    rows={7}
                    placeholder="Write message here"
                    name="language"
                    className="flex items-center h-[3.75rem] placeholder-grey7"
                    value={message}
                    onChange={setMessage}
                />
                <Button color='green' className='bg-green w-full text-dark' onClick={sendMessage}>
                    Send
                </Button>
            </Modal.Body>
        </Modal>
    );
}