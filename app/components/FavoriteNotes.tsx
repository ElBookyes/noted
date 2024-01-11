'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Note from './Note';
import { useState, useEffect } from 'react';
import { AuthNotes } from '../types/AuthNotes';
import { SearchQuery } from '../types/SearchQuery';

export default function FavoriteNotes( { searchQuery } : SearchQuery ) {
    const [notes, setNotes] = useState([])

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
                setNotes(data.Post.filter((note: AuthNotes) => 
                note.title.trim().includes(searchQuery)
                ))
            }
            else {
                setNotes([])
            }
        }
    }, [data, searchQuery])

    if (!data) {
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
            : data?.Post.map((note : AuthNotes) => (
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
