import Link from 'next/link'
import React from 'react'

export default function NoItems({ href, text }) {
  return (
    <div className='flex flex-col items-center space-y-4'>
        <img src='./images/no-items.svg' alt='Not Items Found' />
        <Link href={href}  className='font-bold'>{text}</Link>
    </div>
  )
}
