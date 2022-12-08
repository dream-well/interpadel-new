import { Form, Button, MaskedInput } from 'rsuite';
import { useState } from 'react';

export default function PaymentCard() {
    const [formValue, setFormValue] = useState({});
    return (
        <div>
            <Form className='mt-[2rem] w-full space-y-[1rem] flex flex-wrap' fluid formValue={formValue} onChange={(value) => {setFormValue({...value})}}>
                <Form.Group controlId="name" className='w-full'>
                    <Form.Control className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="name" type="text" placeholder="Name On Card"/>
                </Form.Group>
                <Form.Group controlId="cardNumber" className='w-full'>
                    <MaskedInput
                        // value={value}
                        name='cardNumber'
                        mask={masks.creditCard.mask}
                        guide={false}
                        showMask={true}
                        keepCharPositions={true}
                        placeholder={'Card Number'}
                        placeholderChar={'_'}
                        className='h-[3.75rem] tracking-widest placeholder:text-grey7 px-[2rem]'
                        // onChange={setValue}
                    />
                </Form.Group>
                <Form.Group controlId="expireDate" className='w-1/2 pr-2'>
                    <MaskedInput
                        // value={value}
                        name='expireDate'
                        mask={masks.expireDate.mask}
                        guide={false}
                        showMask={false}
                        keepCharPositions={true}
                        placeholder={'Expire Date'}
                        placeholderChar={'_'}
                        className='h-[3.75rem] tracking-widest placeholder:text-grey7 px-[2rem]'
                        // onChange={setValue}
                    />
                </Form.Group>
                <Form.Group controlId="CVV" className='w-1/2 pl-2'>
                    <MaskedInput
                        // value={value}
                        name='CVV'
                        mask={masks.cvv.mask}
                        guide={false}
                        showMask={false}
                        keepCharPositions={true}
                        placeholder={'CVV'}
                        placeholderChar={'_'}
                        className='h-[3.75rem] tracking-widest placeholder:text-grey7 px-[2rem]'
                        // onChange={setValue}
                    />
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
    'creditCard': {
        name: 'Credit Card',
        mask: [/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/,' ',/\d/,/\d/,/\d/,/\d/],
    },
    'expireDate': {
        name: 'Expire Date',
        mask: [/\d/,/\d/,'/',/\d/,/\d/],
    },
    'cvv': {
        name: 'CVV Number',
        mask: [/\d/,/\d/,/\d/],
    },

}