import React from "react";
import { BsCloudLightning, BsHouse, BsPeople, BsArrowReturnRight, BsKeyboard, BsListTask, BsLaptopFill, BsFillLaptopFill, BsLaptop } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate()
    const handleLogout=() => {
        localStorage.removeItem('authToken')
        navigate('/logout')
    }
    return (
        <aside id="sidebar">
            
            <div className="sidebar-title">
                <div className="sidebar-brand">
                    <BsLaptop className="icon_header" />WBS
                </div>
                <span className="icon close_icon">X</span>
            </div>


            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <Link to="/home">
                        <BsHouse className="icon" />
                        Dashboard
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/utilisateurs">
                        <BsPeople className="icon" />
                        Utilisateurs
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/materiels">
                        <BsKeyboard className="icon" />
                        Matériels
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/emprunts">
                        <BsListTask className="icon" />
                        Emprunts
                    </Link>
                </li>
                <li className="sidebar-list-item">
                    <Link to="/logout">
                        <BsArrowReturnRight className="icon" />
                        <button onClick={() => handleLogout()}>Logout</button>
                    </Link>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
