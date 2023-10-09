'use client'
import { useQueryClient, useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios from "axios"

type Props = {
  id: string
  setDeleteToggle: (deleteToggle: boolean) => void
  color: string
}


export default function DeleteNote( { id, setDeleteToggle, color}: Props) {
  const queryClient = useQueryClient();
  let deleteToastID = "deleteToastID"
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/notes/deleteNote", {
        data: id
      }),
      {
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (data) => {
          console.log(data);
          queryClient.invalidateQueries(["auth-notes"]);
          toast.success("Note has been deleted.", {id: deleteToastID });
        },
      }
  );

  const deleteNote = () => {
    deleteToastID = toast.loading("Deleting your note.", { id: deleteToastID });
    mutate(id);
  };

  return (
    <div className='kpds-popup-bg' onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
    }}>
      <div className={`delete-note | kpds-popup-body ${color}  kpds-text-center`}>
        <h1 className="kpds-fs-600 kpds-fw-bold">Are you sure you want to delete this ?</h1>
        <div className="kpds-container kpds-flex-group">
          <button className="delete-button | kpds-button kpds-fs-500 kpds-clr-current-white kpds-bg-current-red"
            onClick={() => {
              deleteNote(),
              setDeleteToggle(false)
            }}>Delete</button>
          <button className="back-button | kpds-button kpds-fs-500 kpds-clr-current-white kpds-bg-current-black" 
            onClick={() => setDeleteToggle(false)}>Back</button>
        </div>
      </div>
    </div>
  )
}
