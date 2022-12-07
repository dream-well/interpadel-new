import { Form, Button, InputGroup } from 'rsuite';
import Link from 'next/link';
import UnvisibleIcon from '@rsuite/icons/Unvisible';
import { useDispatch } from 'react-redux';
import { axios } from 'utils/helpers';
import { useState } from 'react';
import { login } from 'store/slices/authSlice';
import { useRouter } from 'next/router';

export default function Login() {
    const [formValue, setFormValue] = useState<any>({});
    const dispatch = useDispatch();
    const router = useRouter();
    const signin = () => {
        axios.post('/api/auth/login', {
            email: formValue.email, 
            password: formValue.password
        })
        .then(res => {
            dispatch(login(res));
            router.replace('/');
        })
        .catch((e) => {
            console.log(e);
        })
    }
    return (
    <div className='flex items-center justify-center bg-[url(/images/auth/back.png)] bg-cover min-h-screen py-[2rem]'>
        <div className='w-[48rem] flex flex-col items-center text-white bg-dark p-[4rem] rounded-[1.5rem] border border-grey'>
            <Link href='/home'>
                <img src='/images/logo.svg' className='h-[2rem] w-min'/>
            </Link>
            <span className='text-[3rem] mt-[2rem]'>
                Welcome to Interpadel
            </span>
            <div className='flex flex-col w-full'>
                <Form className='mt-[2rem] w-full space-y-[2.5rem]' fluid formValue={formValue} onChange={(value) => {setFormValue({...value})}}>
                    <Form.Group controlId="email">
                        <Form.Control className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="email" type="email" placeholder="Email Address"/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <InputGroup inside>
                            <Form.Control className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="password" type="password" autoComplete="off" placeholder="Password"/>
                            <InputGroup.Addon className='h-full mr-[1rem]'>
                                <UnvisibleIcon width='1.5rem' height='1.5rem'/>
                            </InputGroup.Addon>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className='!mb-[1rem]'>
                        <Button appearance="primary" color="green" className='h-[3.75rem] w-full !bg-green !text-dark'
                            onClick={signin}
                        >
                            Sign In
                        </Button>
                    </Form.Group>
                </Form>  
                <Form.Group className='text-right '>
                    <label className='pr-1'>Don’t have an account?</label>
                    <Link href="/auth/register" className='text-green'>
                        Sign Up here
                    </Link>
                </Form.Group>
            </div>
            <div className='flex items-center text-grey w-full mt-[3rem]'>
                <hr className='flex-grow' />
                <span className='px-4'>Or</span>
                <hr className='flex-grow' />
            </div>
            <div className='mt-[2.5rem] space-x-[1.25rem] flex'>
                <Button appearance='ghost' className='!text-grey7 !border-grey7 h-[3.6rem] flex items-center'>
                    <img src='/images/icons/google.svg' className='mr-3' />
                    Continue with Google
                </Button>
                <Button appearance='ghost' className='!text-grey7 !border-grey7 h-[3.6rem] flex items-center'>
                    <img src='/images/icons/apple.svg' className='mr-3' />
                    Continue with Apple
                </Button>
            </div>
        </div>
    </div>
    )
}
