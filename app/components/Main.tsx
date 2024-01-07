'use client'
import { useState } from "react";
import MyNotes from "./MyNotes";
import FavoriteNotes from "./FavoriteNotes";


export default function Main() {
    const[searchQuery, setSearchQuery] = useState('');
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
      </div>
      <section className="note-section | kpds-container">
        <MyNotes searchQuery={searchQuery} />
      </section>
    </>
  );
}
