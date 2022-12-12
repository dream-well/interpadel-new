import Link from 'next/link'
import Image from 'components/Image';

export default function NoItems({ href, text }) {
  return (
    <div className='flex flex-col items-center space-y-4'>
       <Image src='/images/no-items.svg' alt='Not Items Found' />
        <Link href={href}  className='font-bold'>{text}</Link>
    </div>
  )
}
