import Link from 'next/link'
import Image from 'components/Image';
import cn from 'classnames';

export default function NoItems({ href, text, className='' }) {
  return (
    <div className={cn('flex flex-col items-center space-y-4', className)} >
       <Image src='/images/no-items.svg' alt='Not Items Found' />
        <Link href={href} className='font-bold'>{text}</Link>
    </div>
  )
}
