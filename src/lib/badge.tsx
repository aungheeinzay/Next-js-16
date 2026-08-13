import React from 'react'

function Badge({text}:{text:string}) {
  return (
    <div className='text-2xl bg-amber-500'>{text}</div>
  )
}

export default Badge