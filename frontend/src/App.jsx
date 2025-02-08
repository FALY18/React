import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from "./login"; 
import Home from "./Home";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AddMat from "./addMateriel";
import AddUtilisateur from "./addUtilisateur";
import ListMat from "./listMateriel";
import ListUtilisateur from "./listUilisateurs";
import ListEmprunt from "./listEmprunt";
import AddEmprunt from "./addEmprunt";
function App() {
    const location = useLocation();

    const hideHeaderAndSidebar = location.pathname === "/logout";//route pour les 2 io

    return (
        <div className="grid-container">
            {!hideHeaderAndSidebar && <Header />}
            {!hideHeaderAndSidebar && <Sidebar />}
            <Routes>
                <Route path="/materiels" element={<ListMat />} /> 
                <Route path="/home" element={<Home />} />
                <Route path="/utilisateurs" element={<ListUtilisateur/>} />
                <Route path="/addMat" element={<AddMat/>} />
                <Route path="/addUtilisateur" element={<AddUtilisateur/>} />
                <Route path="/logout" element={<Login />} /> 
                <Route path="/emprunts" element={<ListEmprunt/>} />
                <Route path="/addEmprunt" element = {<AddEmprunt/>}/>
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
