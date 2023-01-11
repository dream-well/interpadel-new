import { Form, Button, InputGroup } from 'rsuite';
import Link from 'next/link';
import UnvisibleIcon from '@rsuite/icons/Unvisible';
import VisibleIcon from '@rsuite/icons/Visible';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { login } from 'store/slices/authSlice';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import Image from 'components/Image';
import { getProviders, signIn } from "next-auth/react"

export default function Login({ providers }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const [revealPassword, setRevealPassword] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    const signin = () => {
        axios.post('/api/auth/login', {
            email: formValue.email, 
            password: formValue.password
        })
        .then(res => {            
            dispatch(login(res));
            router.replace('/home');
        })
        .catch((e: AxiosError) => {
            if(e?.response?.status == 401) {
                setError("Password you entered doesn't match");
            }
        })
    }
    return (
    <div className='flex items-center justify-center bg-[url(/images/auth/back.png)] bg-cover min-h-screen py-[2rem]' >
        <div className='w-[48rem] flex flex-col items-center text-white bg-dark p-[4rem] rounded-[1.5rem] border border-grey' onClick={(e) => { setError(''); e.stopPropagation(); }}>
            <Link href='/home'>
               <Image src='/images/logo.svg' className='h-[2rem]'/>
            </Link>
            <span className='text-[3rem] mt-[2rem]'>
                Welcome to Interpadel
            </span>
            <div className='flex flex-col w-full'>
                <Form className='mt-[2rem] w-full space-y-[2.5rem]' fluid formValue={formValue} onChange={setFormValue}>
                    <Form.Group controlId="email">
                        <Form.Control className='h-[3.75rem] px-[2rem] placeholder:text-grey7' name="email" type="email" placeholder="Email Address"/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <InputGroup inside>
                            <Form.Control onPressEnter={signin} className='h-[3.75rem] px-[2rem] placeholder:text-grey7 bg-dark' name="password" type={revealPassword ? "text" : "password"} autoComplete="off" placeholder="Password"/>
                            <InputGroup.Addon className='h-full mr-[1rem] cursor-pointer !bg-grey' onMouseDown={() => setRevealPassword(true)} onMouseUp={() => setRevealPassword(false)} onMouseLeave={() => setRevealPassword(false)}>
                                {
                                    revealPassword ?
                                    <VisibleIcon width='1.5rem' height='1.5rem'/> :
                                    <UnvisibleIcon width='1.5rem' height='1.5rem'/>
                                }
                            </InputGroup.Addon>
                        </InputGroup>
                        <Form.HelpText className='text-sm text-red flex items-center'>
                            {
                                error && 
                                <HelpOutlineIcon/>
                            }
                            {error}
                        </Form.HelpText>
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
                    <Link href="/auth/signup" className='text-green'>
                        Sign Up here
                    </Link>
                </Form.Group>
            </div>
            <div className='flex items-center text-grey w-full mt-[3rem]'>
                <hr className='flex-grow' />
                <span className='px-4'>Or</span>
                <hr className='flex-grow' />
            </div>
            <div className='mt-[2.5rem] space-x-[1.25rem] flex text-white'>
                <Button 
                    appearance='ghost' 
                    className='!border-grey7 h-[3.6rem] flex items-center !text-white'
                    onClick={() => signIn('google')}
                >
                   <Image src='/images/icons/google.svg' className='mr-3' />
                    Continue with Google
                </Button>
                <Button appearance='ghost' className='!border-grey7 h-[3.6rem] flex items-center !text-white'>
                   <Image src='/images/icons/apple.svg' className='mr-3' />
                    Continue with Apple
                </Button>
            </div>
        </div>
    </div>
    )
}


export async function getServerSideProps(context) {
    const providers = await getProviders()
    console.log(providers);
    return {
      props: { providers },
    }
  }