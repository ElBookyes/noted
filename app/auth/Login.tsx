'use client'

import { signIn } from "next-auth/react"



export default function Login() {
  return (
    <li>
        <button className="kpds-button" data-type="primary" onClick={() => signIn()}>
            Sign In
        </button>
    </li>
  )
}
