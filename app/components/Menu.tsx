'use client'
import React from 'react'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
  icon: React.JSX.Element
}

export default function Menu(props : Props) {
    const [open, setOpen] = useState(false);

  return (
    <li className='nav-item' aria-controls='primary-navigation' onClick={() => setOpen(!open)}>
        {props.icon}
        {open && props.children}
    </li>
  )
}
