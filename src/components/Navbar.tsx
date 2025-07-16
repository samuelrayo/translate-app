
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"
import { HistoryIcon, HomeIcon, InformationIcon, LogOutIcon } from "../icons/icons"
import { Link } from "react-router-dom"


function Navbar({ isHovered }: { isHovered: boolean }) {

    const [selected, setSelected] = useState('')



    const itemsHovered = [
        {
            to: '/home', label: 'Home', icon: <HomeIcon />,

        },
        {
            to: '/about', label: 'Acerca de', icon: <InformationIcon />,
        },        {
            to: '/history', label: 'Historial', icon: <HistoryIcon />,
        },
        {
            to: '/logout', label: 'Cerrar sesión', icon: <LogOutIcon />
        }
    ]

    return (
        <ul className="w-full h-auto">

            {itemsHovered.map((item, index) => {
                return (
                    <li key={index}>
                        <Link to={item.to}>
                            <div className={` pl-3 flex items-center align-center gap-4 h-20`}>
                                <div>
                                    {item.icon}
                                </div>

                            
                                <span className={`text-white transition-opacity duration-300 ${isHovered ? 'opacity-100 visible' : 'opacity-0 invisible' }`}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    </li>


                )
            })}




        </ul>
    )
}

export default Navbar