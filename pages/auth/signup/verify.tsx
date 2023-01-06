import { Form, Button, InputGroup } from 'rsuite';
import Link from 'next/link';
import UnvisibleIcon from '@rsuite/icons/Unvisible';
import VisibleIcon from '@rsuite/icons/Visible';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import Image from 'components/Image';

export default function Signup() {
    const [formValue, setFormValue] = useState<any>({});
    const [code, setCode] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [uId, setUId] = useState<string>('');
    const router = useRouter();
    const checkCode = async (code) => {
        const resp: any = await axios.post('/api/auth/verify-code', {
            uId: uId,
            code: code
        });
        if(resp.type == 'success') {
            localStorage.removeItem('signup_uId');
            localStorage.removeItem('signup_email');
            router.replace('/auth/login');
        } else {
            setCode('');
            document.getElementById('c0').focus();
            setError(resp.msg);
        }
    }
    const onCodeChange = (i, value: string) => {
        if(value == '') {
            setCode(code.substr(0, i ));
            if(i > 0)
                document.getElementById('c' + (i - 1)).focus();
        } else {
            if(!/\d/.test(value)) return;
            let newCode:string = code.substr(0, i) + value;
            setCode(newCode);
            if(i < 3)
                document.getElementById('c' + (i + 1)).focus();
            if(i == 3) {
                checkCode(newCode);
            }
        }
        setError('');
    }
    const resendEmail = () => {
        
    }
    useEffect(() => {
        const email = localStorage.getItem('signup_email');
        const uId = localStorage.getItem('signup_uId');
        if(!email) {
            router.replace('/auth/signup');
        }
        setEmail(email);
        setUId(uId);
    }, []);
    return (
    <div className='flex items-center justify-center bg-[url(/images/auth/back.png)] bg-cover min-h-screen py-[2rem] cursor-pointer' >
        <div className='w-[48rem] flex flex-col items-center text-white bg-dark p-[4rem] rounded-[1.5rem] border border-grey cursor-default	'>
            <Link href='/home'>
               <Image src='/images/logo.svg' className='h-[2rem]'/>
            </Link>
            <span className='text-[2rem] mt-[2rem]'>
                Verify your email to complete signup
            </span>
            <span className='text-[1rem] mt-[1rem] text-center'>
                We sent verification code to <span className='text-green'>{email}</span>
                <br/>
                Please check your inbox
            </span>
            <div className='flex flex-col w-full mt-8 px-8'>
                <div className='flex justify-between'>
                    <input className='h-[6rem] w-[6rem] bg-grey-dark border border-grey rounded-[0.5rem] text-center text-[3.5rem]' maxLength={1} id='c0' value={code[0] ?? ''} onChange={(e) => { onCodeChange(0, e.target.value)}} />
                    <input className='h-[6rem] w-[6rem] bg-grey-dark border border-grey rounded-[0.5rem] text-center text-[3.5rem]' maxLength={1} id='c1' value={code[1] ?? ''} onChange={(e) => { onCodeChange(1, e.target.value)}} />
                    <input className='h-[6rem] w-[6rem] bg-grey-dark border border-grey rounded-[0.5rem] text-center text-[3.5rem]' maxLength={1} id='c2' value={code[2] ?? ''} onChange={(e) => { onCodeChange(2, e.target.value)}} />
                    <input className='h-[6rem] w-[6rem] bg-grey-dark border border-grey rounded-[0.5rem] text-center text-[3.5rem]' maxLength={1} id='c3' value={code[3] ?? ''} onChange={(e) => { onCodeChange(3, e.target.value)}} />
                </div>
                {
                    error && 
                    <span className='mt-4 text-red'>
                        {error}
                    </span>
                }
                <div className='flex space-x-4 mt-8'>
                    <Button appearance="primary" color="green" className='h-[3.75rem] w-full !bg-green !text-dark'
                        onClick={resendEmail} disabled
                    >
                        Verify Code
                    </Button>
                    <Button appearance="primary" color="blue" className='h-[3.75rem] w-full !text-dark'
                        onClick={resendEmail}
                    >
                        Resend Email
                    </Button>
                </div>
            </div>
        </div>
    </div>
    )
}
