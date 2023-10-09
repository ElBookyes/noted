"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import React, { useState, useEffect } from 'react';

type ToggleProps = {
  color: string
  setToggle: (toggle: boolean) => void
  id: string
  content: string
}

type Data = {
  postId: string
  title: string
}

export default function EditNote({ setToggle, color, id, content } : ToggleProps) {
  const [title, setTitle] = useState(content)
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  useEffect(() =>{
    if(title === "This is a new note"){
      setTitle('')
    }
  })
  let toastPostID = "toastID";

  const { mutate } = useMutation(
    async (data: Data) =>
      await axios.put("/api/notes/editNote", {
        data
      }),
      {
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error?.response?.data.message, {id: toastPostID})
          }
          setIsDisabled(false)
        },
        onSuccess: (data) => {
          setTitle("")
          setIsDisabled(false)
          queryClient.invalidateQueries(["auth-notes"])
          toast.success("Note has been updated!", {id: toastPostID})
        },
      }
  )
  const SubmitChanges = async () => {
    setIsDisabled(true)
    toastPostID = toast.loading("Updating your note", {id: toastPostID})
    mutate({ title, postId: id })
  }

  return (
    <div className="dark-bg" onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
  }}>
      <form className={`add-note ${color}`}>
        <div className="note-options">
          <p className="kpds-fs-600 kpds-fw-bold">Edit Note</p>
          <div className="note-buttons">
            <button disabled={isDisabled} onClick={() => {
              SubmitChanges()
              setToggle(false)
              }} className="kpds-button">Save</button>
            <button className="kpds-button" onClick={() => setToggle(false)}>Back</button>
          </div>
        </div>
          <div>
            <textarea
              name="title"
              className="kpds-fs-600"
              rows={18}
              spellCheck='false'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
             />
          </div>
      </form>
    </div>
  );
}
