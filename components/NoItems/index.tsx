import Link from 'next/link'
import Image from 'components/Image';
import cn from 'classnames';

export default function NoItems({ href, text, className='' }) {
  return (
    <div className='flex flex-col items-center space-y-4'>
       <Image src='/images/no-items.svg' alt='Not Items Found' />
        <Link href={href}  className={cn('font-bold', className)}>{text}</Link>
    </div>
  )
}
