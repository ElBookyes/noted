'use client'
import BinIcon from "../icons/binIcon"
import StarIcon from "../icons/starIcon"
import { motion } from 'framer-motion'
import { useState } from 'react'
import EditNote from "./EditNote"
import DeleteNote from "./DeleteNote"

type Props = {
  title: string
  color: string
  date: string
  key: string
  id: string
}

const Note = ({ title, color, date, id } : Props) => {
  const [toggle, setToggle] = useState(false)
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
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
                    setDeleteToggle(true)
                  } }>
                  <BinIcon />
                </button>
                <button className="note-button | kpds-pointer kpds-round kpds-borderless"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setHighlighted(!highlighted)
                    console.log(highlighted)
                  }}>
                  <StarIcon highlighted={highlighted} />
                </button>
            </div>
        </div>
    </motion.div>
    {toggle && <EditNote id={id} content={title} color={color} setToggle={setToggle} />}
    {deleteToggle && <DeleteNote id={id} color={color} setDeleteToggle={setDeleteToggle} />}
    </>
  )
}

export default Note