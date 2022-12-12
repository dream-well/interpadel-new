import cn from 'classnames';
import Image from 'components/Image';

export default function Avatar({ src, alt='Avatar', className }) {
    return (
       <Image src={src} alt={alt} className={cn('rounded-full object-cover object-center border border-solid border-grey', className)}/>
    )
}