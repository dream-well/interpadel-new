import { Form, Button, InputGroup } from 'rsuite';
import Link from 'next/link';
import UnvisibleIcon from '@rsuite/icons/Unvisible';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import Image from 'components/Image';

export default function Signup() {
    const [formValue, setFormValue] = useState<any>({});
    const [error, setError] = useState<any>({});
    const router = useRouter();
    const signup = (e: Event) => {

        e.stopPropagation();

        const fields = ['firstname', 'lastname', 'email', 'password', 'repeat'];
        for(let field of fields) {
            if(!formValue[field]) {
                setError( {type: field, msg: 'Required'});
                return;
            }
        }

        if(!formValue.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            setError({ type: 'email', msg: 'Invalid email'});
            return;
        }

        if(formValue.password != formValue.repeat) {
            setError({ type: 'repeat', msg: 'Password mismatch'});
            return;
        }
        const { repeat, ...formData} = formValue;
        axios.post('/api/auth/signup', {
            ...formData
        })
        .then(res => {
            router.replace('/auth/login');
        })
        .catch((e: AxiosError) => {
            if(e.response?.status == 400) {
                if(e.response?.data['code'] == 11000) {
                    setError({ type: 'error', msg: 'Already registered'});
                }

            }
        })
    }
    return (
    <div className='flex items-center justify-center bg-[url(/images/auth/back.png)] bg-cover min-h-screen py-[2rem] cursor-pointer' onClick={() => { router.replace('/home') }}>
        <div className='w-[48rem] flex flex-col items-center text-white bg-dark p-[4rem] rounded-[1.5rem] border border-grey cursor-default	' onClick={(e) => { setError(''); e.stopPropagation(); }}>
            <Link href='/home'>
               <Image src='/images/logo.svg' className='h-[2rem]'/>
            </Link>
            <span className='text-[3rem] mt-[2rem]'>
                Create an account
            </span>
            <div className='flex flex-col w-full'>
                <Form className='mt-[2rem] w-full space-y-[2.5rem]' fluid formValue={formValue} onChange={setFormValue}>
                    <Form.Group controlId="firstname">
                        <Form.Control errorMessage={error.type == 'firstname' && error.msg } className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="firstname" type="text" placeholder="First Name"/>
                    </Form.Group>
                    <Form.Group controlId="lastname">
                        <Form.Control errorMessage={error.type == 'lastname' && error.msg } className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="lastname" type="text" placeholder="Last Name"/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Control errorMessage={error.type == 'email' && error.msg } className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="email" type="email" placeholder="Email Address"/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <InputGroup inside>
                            <Form.Control errorMessage={error.type == 'password' && error.msg } className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="password" type="password" autoComplete="off" placeholder="Password"/>
                            <InputGroup.Addon className='h-full mr-[1rem]'>
                                <UnvisibleIcon width='1.5rem' height='1.5rem'/>
                            </InputGroup.Addon>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="repeat">
                        <InputGroup inside>
                            <Form.Control errorMessage={error.type == 'repeat' && error.msg } className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="repeat" type="password" autoComplete="off" placeholder="Confirm Password"/>
                            <InputGroup.Addon className='h-full mr-[1rem]'>
                                <UnvisibleIcon width='1.5rem' height='1.5rem'/>
                            </InputGroup.Addon>
                        </InputGroup>
                        {
                        error.type == 'error' &&
                        <Form.HelpText className='text-sm text-red flex items-center'>
                            <HelpOutlineIcon/>
                            {error.msg}
                        </Form.HelpText>
                        }
                    </Form.Group>
                    <Form.Group className='!mb-[1rem]'>
                        <Button appearance="primary" color="green" className='h-[3.75rem] w-full !bg-green !text-dark'
                            onClick={signup}
                        >
                            Sign Up
                        </Button>
                    </Form.Group>
                </Form>  
                <Form.Group className='text-right '>
                    <label className='pr-1'>Already have an account?</label>
                    <Link href="/auth/login" className='text-green'>
                        Login Here
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
                   <Image src='/images/icons/google.svg' className='mr-3' />
                    Continue with Google
                </Button>
                <Button appearance='ghost' className='!text-grey7 !border-grey7 h-[3.6rem] flex items-center'>
                   <Image src='/images/icons/apple.svg' className='mr-3' />
                    Continue with Apple
                </Button>
            </div>
        </div>
    </div>
    )
}
