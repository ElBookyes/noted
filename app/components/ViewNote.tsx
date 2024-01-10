"use client"
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

export default function ViewNote({ setToggle, color, id, content } : ToggleProps) {
  const [title, setTitle] = useState(content)
  const [isDisabled, setIsDisabled] = useState(false)
  return (
    <div className="dark-bg" onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
  }}>
      <form className={`add-note ${color}`}>
        <div className="note-options">
          <p className="kpds-fs-600 kpds-fw-bold">Edit Note</p>
          <div className="note-buttons">
            <button className="kpds-button" onClick={() => setToggle(false)}>Back</button>
          </div>
        </div>
          <div>
            <textarea
              readOnly
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
