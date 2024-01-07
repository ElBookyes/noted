'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Note from './Note';
import Loading from './loading';
import { useState, useEffect } from 'react';
import { AuthNotes } from '../types/AuthNotes';
import { SearchQuery } from '../types/SearchQuery';

export default function FavoriteNotes() {
    const fetchFavNotes = async () => {
        const response = await axios.get("/api/notes/getFavoriteNotes")
        return response.data
    }
    const { data, isLoading, } = useQuery({
        queryFn: fetchFavNotes,
        queryKey: ['fav-notes'],
    })
    if(isLoading) {
        return <Loading />
    } else if (!data) {
        return <p className='kpds-clr-current-white kpds-fw-semi-bold kpds-fs-600 kpds-text-center'>Click the plus button to create a new note !</p>
    }
  return (
    <div className='overflow-section'>
        {data?.Post?.map((note : AuthNotes) => (
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
