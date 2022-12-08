import { Form, Button, InputGroup } from 'rsuite';
import UnvisibleIcon from '@rsuite/icons/Unvisible';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import { useState } from 'react';

export default function PaymentCard() {
    const [formValue, setFormValue] = useState({});
    return (
        <div>
            <Form className='mt-[2rem] w-full space-y-[1rem] flex flex-wrap' fluid formValue={formValue} onChange={(value) => {setFormValue({...value})}}>
                <Form.Group controlId="name" className='w-full'>
                    <Form.Control className='h-[3.75rem] px-[2rem] placeholder:text-grey7' pattern='****-****-****-****' name="name" type="text" placeholder="Name On Card"/>
                </Form.Group>
                <Form.Group controlId="cardNumber" className='w-full'>
                    <Form.Control className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="cardNumber" type="text" placeholder="Card Number"/>
                </Form.Group>
                <Form.Group controlId="expireDate" className='w-1/2 pr-2'>
                    <Form.Control className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="expireDate" type="text" placeholder="Expire Date"/>
                </Form.Group>
                <Form.Group controlId="CVV" className='w-1/2 pl-2'>
                    <Form.Control className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="CVV" type="text" placeholder="CVV"/>
                </Form.Group>
                <Form.Group className='!mb-[1rem] w-full'>
                    <Button appearance="primary" color="green" className='h-[3.75rem] w-full !bg-green !text-dark'
                    >
                        Pay
                    </Button>
                </Form.Group>
            </Form>  
        </div>
    )
}

const masks = {
'credit': {
    name: 'Credit Card',
    mask: [
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ],
    placeholder: '4242 4242 4242 4242'
    }
}