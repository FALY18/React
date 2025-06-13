import React, { useState } from "react";
import { BsCloudLightning, BsHouse, BsPeople, BsArrowReturnRight, BsKeyboard, BsListTask, BsLaptop, BsList } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./main.css"; 

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/logout');
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const menuItems = [
        { path: "/home", label: "Dashboard", icon: <BsHouse className="icon" /> },
        { path: "/utilisateurs", label: "Utilisateurs", icon: <BsPeople className="icon" /> },
        { path: "/materiels", label: "Matériels", icon: <BsKeyboard className="icon" /> },
        { path: "/emprunts", label: "Emprunts", icon: <BsListTask className="icon" /> }
    ];

    return (
        <>
            <div className="mobile-header">
                <button className="menu-btn" onClick={toggleSidebar}><BsList size={24} /></button>
                <div className="logo-mobile">WBS</div>
            </div>

            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-title">
                    <div className="sidebar-brand">
                        <BsLaptop className="icon_header" /> WBS
                    </div>
                    <span className="icon close_icon" onClick={toggleSidebar}>X</span>
                </div>

                <ul className="sidebar-list">
                    {menuItems.map(item => (
                        <li key={item.path} className={`sidebar-list-item ${location.pathname === item.path ? "active" : ""}`}>
                            <Link to={item.path}>
                                {item.icon}
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li className="sidebar-list-item">
                        <button className="logout-btn" onClick={handleLogout}>
                            <BsArrowReturnRight className="icon" /> Logout
                        </button>
                    </li>
                </ul>
            </aside>
        </>
    );
}

export default Sidebar;
