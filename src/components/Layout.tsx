/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"
import { GoogleIcon } from "../icons/icons"
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

// function Layout({children}) {
function Layout() {
  const [hoverSlide, setHoverSilde] = useState(false)



  const handleMouseEnter = () => {
    setHoverSilde(true); 
  };

  const handleMouseLeave = () => {
    setHoverSilde(false);
  };

  return (
    
    <>
    <aside className="w-16 overflow-x-hidden h-dvh  bg-sky-900 overflow-y-hidden hover:w-44  ease-in-out transition-all duration-200" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

        <div className="flex justify-center items-center my-2">
            <GoogleIcon />
        </div>

        <section className="flex justify-center items-center h-full rounded-xl ">
           <Navbar isHovered={hoverSlide}/>
        </section>

    </aside>


        <main className="flex-grow bg-black">
            {/* {children} */}
            <Outlet />
        </main>

    </>
  )
}

export default Layout