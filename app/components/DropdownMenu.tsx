'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"

type Props = {
  children: React.ReactNode
}


export default function DropdownMenu() {
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let toastPostID = "toastID";

  const { mutate } = useMutation(
    async (color: string) =>
      await axios.post("/api/notes/addNote", {
        color,
      }),
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message, {id: toastPostID})
          }
          setIsDisabled(false)
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["auth-notes"])
          toast.success("Note has been made!", {id: toastPostID})
          setIsDisabled(false)
        },
      }
    )
    const handleClick = async (color : string) => {
      setIsDisabled(true)
      toastPostID = toast.loading("Creating your note", { id: toastPostID})
      mutate(color)
    }

  function DropdownItem( props : Props ) {
    return (
      <div className='menu-item'>
        {props.children}
      </div>
    )
  }
  return (
    <>
    <motion.div 
      initial={{'translateY': '-15%'} as any}
      animate={{'translateY': '0%' } as any}
      transition={{ duration: .5 }}
      className='dropdown'>
      <DropdownItem>
          <motion.div
           animate={{ opacity: 1, scale: 1}}
           initial={{ opacity: 0, scale: 0.8}}
           transition={{ease: "easeOut" }}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClick('yellow')
              }} className='kpds-round kpds-pointer kpds-bg-current-yellow | menu-button'></button>
              <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClick('red')
              }} className='kpds-round kpds-pointer kpds-bg-current-red | menu-button'></button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClick('green')
              }} className='kpds-round kpds-pointer kpds-bg-current-green | menu-button'></button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClick('cyan')
              }} className='kpds-round kpds-pointer kpds-bg-current-cyan | menu-button'></button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClick('pink')
              }} className='kpds-round kpds-pointer kpds-bg-current-pink | menu-button'></button>
          </motion.div>
      </DropdownItem>
    </motion.div>
    </>
  )
}
