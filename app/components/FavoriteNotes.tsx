'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Note from './Note';
import { useState, useEffect } from 'react';
import { AuthNotes } from '../types/AuthNotes';
import { SearchQuery } from '../types/SearchQuery';
import Loading from './loading';
import { useSession } from 'next-auth/react';

export default function FavoriteNotes( { searchQuery } : SearchQuery ) {
    const [notes, setNotes] = useState([])
    const {data: session, status } = useSession();

    const fetchFavNotes = async () => {
        const response = await axios.get("/api/notes/getFavoriteNotes")
        return response.data
    }
    const { data, isLoading, } = useQuery({
        queryFn: fetchFavNotes,
        queryKey: ['fav-notes'],
    })
    useEffect(() => {
        if (searchQuery.length > 0) {
            if (data) {
                setNotes(data.filter((note: AuthNotes) => 
                note.title.trim().includes(searchQuery)
                ))
            }
            else {
                setNotes([])
            }
        }
    }, [data, searchQuery])

    if (isLoading && status === "authenticated") {
        return <Loading />;
    }

    if (!data || data == 0) {
        return <p className='kpds-clr-current-white kpds-fw-semi-bold kpds-fs-600 kpds-text-center'>Click the plus button to create a new note !</p>
    }

  return (
    <div className='overflow-section'>
        {searchQuery.length ? notes?.map((note : AuthNotes) => (
                    <>
                    <Note 
                      id={note.id}
                      key={note.id}
                      title={note.title}
                      color={note.color}
                      date={note.createdAt}
                    />
                    </>
                ))
            : data?.map((note : AuthNotes) => (
                <>
                <Note 
                    id={note.id}
                    key={note.id}
                    title={note.title}
                    color={note.color}
                    date={note.createdAt}
                    />
                </>
            ))}
    </div>
  )
}
