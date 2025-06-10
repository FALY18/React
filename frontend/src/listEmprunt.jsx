import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsPersonAdd, BsSearch } from "react-icons/bs";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function ListEmprunt() {
    const [emprunts, setEmprunts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const Myswal = withReactContent(Swal);

    useEffect(() => {
        const fetchEmprunt = async () => {
            try {
                const response = await axios.get("http://localhost:8081/api/emprunts");
                const empruntsWithTime = response.data.map(emprunt => {
                    return {
                        ...emprunt,
                        remainingTime: parseDuration(emprunt.duree)
                    };
                });
                setEmprunts(empruntsWithTime);
            } catch (err) {
                console.log('Erreur lors de la récupération des emprunts:', err);
            }
        };
        fetchEmprunt();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setEmprunts(prevEmprunts => {
                return prevEmprunts.map(emprunt => {
                    const updatedTime = emprunt.remainingTime - 1000;
                    if (updatedTime <= 0 && emprunt.remainingTime !== 0) {
                        generateNotification(emprunt);
                        updateDurationInDB(emprunt.idUs, 0);
                        return {
                            ...emprunt,
                            remainingTime: 0
                        };
                    } else if (updatedTime > 0) {
                        updateDurationInDB(emprunt.idUs, updatedTime);
                        return {
                            ...emprunt,
                            remainingTime: updatedTime
                        };
                    } else {
                        return emprunt;
                    }
                });
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const parseDuration = (duration) => {
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours * 3600 + minutes * 60 + seconds) * 1000;
    };

    const formatDuration = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const generateNotification = (emprunt) => {
        alert(`Le matériel ${emprunt.id} n'a pas été rendu par ${emprunt.nomUs} ${emprunt.prenomUs} !`);
    };

    const updateDurationInDB = useCallback(async (idUs, newDuration) => {
        try {
            await axios.patch(`http://localhost:8081/api/emprunts/${idUs}`, { newDuration: formatDuration(newDuration) });
        } catch (err) {
            console.log('Erreur lors de la mise à jour de la durée:', err);
        }
    }, []);

    const handleDoubleClick = async (idUs) => {
        Myswal.fire({
            title: `Voulez-vous supprimer l'emprunt de l'utilisateur avec l'id ${idUs} ?`,
            icon: "warning",
            confirmButtonText: 'Oui',
            confirmButtonColor: '#d33',
            showCancelButton: true,
            cancelButtonColor: 'green'
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    await axios.delete(`http://localhost:8081/api/emprunts/${idUs}`);
                    setEmprunts(prevEmprunts => prevEmprunts.filter(emprunt => emprunt.idUs !== idUs));
                }
            } catch (err) {
                console.log('Erreur lors de la suppression de l\'emprunt:', err);
            }
        });
    };

    
    const filteredEmprunts = emprunts.filter(emprunt => 
        emprunt.idUs.toString().includes(searchTerm) || 
        emprunt.id.toString().includes(searchTerm) || 
        emprunt.nomUs.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emprunt.prenomUs.toLowerCase().includes(searchTerm.toLowerCase()) || 
        emprunt.foncUs.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emprunt.salle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="usersList">
            <h2 className="list">Listes des matériels utilisés</h2>
            
            <div className="header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <BsSearch className="icon" style={{ marginRight: '10px', fontSize: '1.2em' }} />
                <input 
                    type="search" 
                    className="inputsearch" 
                    style={{ flexGrow: 1, maxWidth: '400px', padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc' }} 
                    placeholder="Search..."
                    value={searchTerm} // apifandraisin am serchItem
                    onChange={(e) => setSearchTerm(e.target.value)} // atao mis a jour n champ de sasie
                />
            </div>

            <div className="link">
                <Link to="/addEmprunt"><BsPersonAdd /> Ajouter</Link>
            </div>
            
            <div className="usersTable">
                <table>
                    <thead>
                        <tr>
                            <th>N° utilisateurs</th>
                            <th>Id Materiel</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Fonction</th>
                            <th>Salle</th>
                            <th>Date d'emprunt</th>
                            <th>Durée</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmprunts.map((emprunt) => (
                            <tr
                                key={emprunt.idUs}
                                onDoubleClick={() => handleDoubleClick(emprunt.idUs)}
                                style={{ backgroundColor: emprunt.remainingTime === 0 ? 'red' : 'transparent' }}
                            >
                                <td>{emprunt.idUs}</td>
                                <td>{emprunt.id}</td>
                                <td>{emprunt.nomUs}</td>
                                <td>{emprunt.prenomUs}</td>
                                <td>{emprunt.foncUs}</td>
                                <td>{emprunt.salle}</td>
                                <td>{emprunt.dateEmprunt}</td>
                                <td>{formatDuration(emprunt.remainingTime)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListEmprunt;
