'use client'

import Image from "next/image"
import {signOut} from 'next-auth/react'
import { useState } from "react"


type User = {
    image: string
    username: string
}

export default function Logged({ image, username }: User) {
    const [toggle, setToggle] = useState(false)
    return(
        <li className="Logged">
            <button className={`kpds-button ${toggle ? '' : 'kpds-hidden'}`} data-type="primary" onClick={() => signOut()}>
                Sign out
            </button>
            <p className={`kpds-fs-600 kpds-text-center ${toggle ? 'kpds-hidden' : ''}`}>{username}</p>
            <button className="image | kpds-round kpds-borderless kpds-pointer kpds-scale" onClick={() => setToggle(!toggle)}>
                <Image className="kpds-round" width={64} height={64} src={image} alt="google profile picture" placeholder="blur" blurDataURL="/img/profile"></Image>
            </button>
        </li>
    )
}