'use client'
import { useQueryClient, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import { useState } from "react"

type Props = {
    id: string
    setMakePublicToggle: (setMakePublicToggle: boolean) => void
    setIsPublic: (setIsPublic: boolean) => void
    isPublic: boolean
    color: string
}

type Data = {
  name: string
  postId: string
}

export default function MakePublic({ id, color, setMakePublicToggle, setIsPublic, isPublic }: Props) {
    const queryClient = useQueryClient();
    let makePublicToastID = "makePublicToastID";
    const [isDisabled, setIsDisabled] = useState(false)

    const { mutate } = useMutation(
      async (data: Data) =>
        await axios.put("/api/notes/addPublicNotes", {
          data,
        }),
        {
          onError: (error) => {
            if (error instanceof AxiosError) {
              toast.error(error?.response?.data.message, {id: makePublicToastID})
            }
            setIsDisabled(false)
          },
          onSuccess: (data) => {
            queryClient.invalidateQueries(["public-notes"])
            toast.success("Note Updated !", {id: makePublicToastID})
            setIsDisabled(false)
          },
        }
    )

    const makePublic = async (name: string ) => {
      setIsDisabled(true)
      makePublicToastID = toast.loading("Updating note", {id: makePublicToastID})
      mutate({name, postId: id})
    }

  return (
    <div className="kpds-popup-bg" onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
    }}>
        <div className={`make-public | kpds-popup-body ${color} kpds-text-center`}>
            <h1 className="kpds-fs-600 kpds-fw-bold">Are you sure you want to make this public ?</h1>
            <div className="kpds-container kpds-flex-group">
                <button className="public-button | kpds-button kpds-fs-500 kpds-clr-current-white kpds-bg-current-red"
                   onClick={() => {
                    makePublic('public'),
                    setMakePublicToggle(false)
                    setIsPublic(!isPublic)
                   }}>Make Public</button>
                <button className="back-button | kpds-button kpds-fs-500 kpds-clr-current-white kpds-bg-current-black"
                   onClick={() => setMakePublicToggle(false)}>Back</button>
            </div>
        </div>
    </div>
  )
}
