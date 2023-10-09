'use client'
import React from "react";
import { useState } from "react";


const MenuIcon = () => {
  const[isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <button className="kpds-round transition" 
    onMouseEnter={() => handleMouseEnter()} 
    onMouseLeave={() => handleMouseLeave()}
    onClick={() => setIsClicked(!isClicked)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className={`${
          !isClicked ? 'close' : 'open'
        } transition ${isHovered ? 'hovered-size' : 'default-size'}`}
      >
        <circle cx="24" cy="24" r="24" fill="white" />
        <path
          className={`${isHovered ? 'hovered-color' : 'default-color'}`}
          d="M22.7143 31.7143C22.7143 32.4244 23.2899 33 24 33C24.7101 33 25.2857 32.4244 25.2857 31.7143L25.2857 25.2857L31.7143 25.2857C32.4244 25.2857 33 24.7101 33 24C33 23.2899 32.4244 22.7143 31.7143 22.7143L25.2857 22.7143L25.2857 16.2857C25.2857 15.5756 24.7101 15 24 15C23.2899 15 22.7143 15.5756 22.7143 16.2857L22.7143 22.7143L16.2857 22.7143C15.5756 22.7143 15 23.2899 15 24C15 24.7101 15.5756 25.2857 16.2857 25.2857L22.7143 25.2857L22.7143 31.7143Z"
        />
      </svg>
    </button>
  );
};



export default MenuIcon;
