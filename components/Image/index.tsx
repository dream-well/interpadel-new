import NextImage from 'next/image';
import cn from 'classnames';
import styles from './Image.module.scss';

export default function Image( { src, alt='', className='', ...rest} ){
    return (
        <div className={cn(styles.imageContainer, className)} {...rest}>
            <NextImage src={src.replace('/api', process.env.API_HOST)} fill={true} alt={alt} className={styles.image} />
        </div>
    )
}