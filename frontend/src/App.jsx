import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
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
import ProtectedRoute from "./middleware/ProtectedRoute";

function App() {
    const location = useLocation();
    const hideHeaderAndSidebar = location.pathname === "/logout"; // On masque header et sidebar sur la page login

    return (
        <div className="grid-container">
            {!hideHeaderAndSidebar && <Header />}
            {!hideHeaderAndSidebar && <Sidebar />}
            <Routes>
                {/* Route publique pour la connexion */}
                <Route path="/logout" element={<Login />} />
                
                {/* Routes protégées via ProtectedRoute (notre "middleware") */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/materiels" element={
                    <ProtectedRoute>
                        <ListMat />
                    </ProtectedRoute>
                } />
                <Route path="/utilisateurs" element={
                    <ProtectedRoute>
                        <ListUtilisateur />
                    </ProtectedRoute>
                } />
                <Route path="/addMat" element={
                    <ProtectedRoute>
                        <AddMat />
                    </ProtectedRoute>
                } />
                <Route path="/addUtilisateur" element={
                    <ProtectedRoute>
                        <AddUtilisateur />
                    </ProtectedRoute>
                } />
                <Route path="/emprunts" element={
                    <ProtectedRoute>
                        <ListEmprunt />
                    </ProtectedRoute>
                } />
                <Route path="/addEmprunt" element={
                    <ProtectedRoute>
                        <AddEmprunt />
                    </ProtectedRoute>
                } />

                {/* Redirection par défaut */}
                <Route path="*" element={<Navigate to="/logout" replace />} />
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
