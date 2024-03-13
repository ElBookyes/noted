'use client'
import BinIcon from "../icons/binIcon"
import StarIcon from "../icons/starIcon"
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import EditNote from "./EditNote"
import DeleteNote from "./DeleteNote"
import MakePublic from "./MakePublic"


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

const Note = ({ title, color, date, id } : Props) => {
  const [toggle, setToggle] = useState(false)
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [makePublicToggle, setMakePublicToggle] = useState(false)
  const [isFavorite, setIsFavorite] = useState(() => {
    return localStorage.getItem(`isFavorite_${id}`) === 'true';
  });
  const [isDisabled, setIsDisabled] = useState(false)
  const [isPublic, setIsPublic] = useState(() => {
    return localStorage.getItem(`isPublic_${id}`) === 'true';
  })
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
          toast.success("Note Updated !", {id: toastPostID})
          setIsDisabled(false)
        },
      }
    )

    const handleClick = async ( name: string ) => {
      setIsDisabled(true)
      toastPostID = toast.loading("Updating note", { id: toastPostID})
      mutate({name, postId: id})
    }

    useEffect(() => {
      localStorage.setItem(`isPublic_${id}`, isPublic.toString());
      localStorage.setItem(`isFavorite_${id}`, isFavorite.toString());
    }, [isPublic, isFavorite, id]);

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
                <button className={`note-button | kpds-pointer kpds-round kpds-borderless`} 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setDeleteToggle(true)
                  } }>
                  <BinIcon />
                </button>
                <button className={`note-button | kpds-pointer kpds-round kpds-borderless ${isFavorite ? 'favorite-highlighted' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsFavorite(!isFavorite)
                    handleClick('favorites')
                    console.log(isFavorite)
                  }}>
                  <StarIcon />
                </button>
                <button className={`public-button note-button | kpds-pointer kpds-round kpds-borderless ${isPublic ? 'public-button-highlighted': ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setMakePublicToggle(true)
                    setIsPublic(!isPublic)
                  }}>
                    P
                </button>
            </div>
        </div>
    </motion.div>
    {toggle && <EditNote id={id} content={title} color={color} setToggle={setToggle} />}
    {deleteToggle && <DeleteNote id={id} color={color} setDeleteToggle={setDeleteToggle} />}
    {makePublicToggle && <MakePublic id={id} color={color} setMakePublicToggle={setMakePublicToggle} />}
    </>
  )
}

export default Note