'use client'
import { useState } from "react";
import MyNotes from "./MyNotes";
import FavoriteNotes from "./FavoriteNotes";
import PublicNotes from "./PublicNotes";
import { SessionProvider } from "next-auth/react";

export default function Main() {
    const[searchQuery, setSearchQuery] = useState('');
    const[favToggle, setFavToggle] = useState(false);
    const[publicToggle, setPublicToggle] = useState(false);
    const[myNotesToggle, setMyNotesToggle] = useState(true);
  return (
    <>
      <div className="kpds-container">
        <div className="main-header | kpds-text-center">
          <h1 className="kpds-heading-1">Nimal notes</h1>
          <form>
            <label>
              <input
                value={searchQuery || ""}
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar | kpds-fs-600"
                placeholder="Search"
              />
            </label>
          </form>
        </div>
        <div className="categories">
          <button onClick={() => {setFavToggle(false)
                                  setMyNotesToggle(true)
                                  setPublicToggle(false)}} className={`${myNotesToggle ? 'current-category kpds-fw-bold' : ''} my-notes | kpds-clr-current-white kpds-fw-semi-bold kpds-fs-600 clean kpds-pointer`}>Home</button>
          <button onClick={() => {setFavToggle(true)
                                  setMyNotesToggle(false)
                                  setPublicToggle(false)}} className={`${favToggle ? 'current-category kpds-fw-bold' : ''} favorite-notes | kpds-clr-current-white kpds-fw-semi-bold kpds-fs-600 clean kpds-pointer`}>Favorites</button>
          <button onClick={() => {setFavToggle(false)
                                  setMyNotesToggle(false)
                                  setPublicToggle(true)}}  className={`${publicToggle ? 'current-category kpds-fw-bold' : ''} public-notes | kpds-clr-current-white kpds-fw-semi-bold kpds-fs-600 clean kpds-pointer`}>Public</button>
        </div>
      </div>
      <section className="note-section | kpds-container">
        <SessionProvider>
          {myNotesToggle && <MyNotes searchQuery={searchQuery} />}
          {favToggle && <FavoriteNotes searchQuery={searchQuery} />}
          {publicToggle && <PublicNotes searchQuery={searchQuery}/>}
        </SessionProvider>
      </section>
    </>
  );
}
