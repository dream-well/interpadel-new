import cn from 'classnames';

export default function Avatar({ src, alt='Avatar', className }) {
    return (
        <img src={src} alt={alt} className={cn('rounded-full object-cover', className)}/>
    )
}