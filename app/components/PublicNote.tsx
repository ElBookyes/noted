'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import StarIcon from '../icons/starIcon'
import ViewNote from './ViewNote'

type Props = {
  title: string
  color: string
  date: string
  key: string
  id: string
}

type Data = {
  name: string
  postId: string
}

const PublicNote = ({ title, color, date, id } : Props) => {
  const [toggle, setToggle] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let toastPostID = "toastID";

  const { mutate } = useMutation(
    async (data: Data) =>
      await axios.put("/api/notes/addFavorites", {
        data,
      }),
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message, {id: toastPostID})
          }
          setIsDisabled(false)
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries(["fav-notes"])
          toast.success("Note added to favorites!", {id: toastPostID})
          setIsDisabled(false)
        },
      }
    )
    const handleClick = async ( name: string ) => {
      setIsDisabled(true)
      toastPostID = toast.loading("Adding to favorites", { id: toastPostID})
      mutate({name, postId: id})
    }

  return (
    <>
    <motion.div className={`card | kpds-card kpds-pointer ${color}`}
           animate={{ opacity: 1, scale: 1}}
           initial={{ opacity: 0, scale: 0.8}}
           transition={{ease: "easeOut" }}
           whileHover={{scale: 1.035}}
           onClick={() => setToggle(true)}
           >
        <div className="note-content">
          {title}
        </div>
        <div className="bottom-note | kpds-nav kpds-site-header__inner">
            <div className="kpds-flex-group">{date.substring(0, date.length - 14)}</div>
            <div className="kpds-site-header__inner">
                <button className="note-button | kpds-pointer kpds-round kpds-borderless"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleClick('favorites')
                  }}>
                  <StarIcon />
                </button>
            </div>
        </div>
    </motion.div>
    {toggle && <ViewNote id={id} content={title} color={color} setToggle={setToggle} />}
    </>
  )
}

export default PublicNote