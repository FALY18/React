import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsHouseAdd, BsPencil, BsTrash, BsSearch } from "react-icons/bs";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

function ListMat() {
    //m'stock n donnée av am api de bakan raisin map io
    const [materiels, setMateriels] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMateriels = async () => {
            try {
                //mak donnee via api izy io
                const response = await axios.get('http://localhost:8081/api/materiels');
                setMateriels(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des matériels", error);
            }
        };

        fetchMateriels();
    }, []);

    const handleEdit = (materiel) => {
        navigate('/addMat', { state: { materiel } });
    };

    const MySwal = withReactContent(Swal);

    const handleDelete = async (id) => {
        MySwal.fire({
            title: 'Êtes-vous sûr de supprimer ce matériel ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimez-le!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8081/api/materiels/${id}`);
                    setMateriels(materiels.filter(materiel => materiel.id !== id));
                } catch (error) {
                    console.error("Erreur lors de la suppression du matériel", error);
                    MySwal.fire('Erreur!', 'Une erreur s\'est produite lors de la suppression.', 'error');
                }
            }
        });
    };

    const filteredMateriels = materiels.filter(materiel => 
        materiel.id.toString().includes(searchTerm) || 
        materiel.nomMat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        materiel.etatMat.toLowerCase().includes(searchTerm.toLowerCase()) ||
        materiel.qteMat.toString().includes(searchTerm)
    );

    return (
        <div className="usersList">
            <h2 className="list">Listes des Matériels</h2>

            <div 
                className="header" 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'flex-start' 
                }}
            >
                <BsSearch className="icon" style={{ marginRight: '10px', fontSize: '1.2em' }} />
                <input 
                    type="search" 
                    className="inputsearch" 
                    style={{ 
                        flexGrow: 1, 
                        maxWidth: '400px',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }} 
                    placeholder="Rechercher..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="link">
                <Link to="/addMat"><BsHouseAdd /> Ajouter</Link>
            </div>
            
            <div className="usersTable">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>État</th>
                            <th>Quantité</th>
                            <th></th><th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMateriels.map((materiel) => (
                            <tr key={materiel.id}>
                                <td>{materiel.id}</td>
                                <td>{materiel.nomMat}</td>
                                <td>{materiel.etatMat}</td>
                                <td>{materiel.qteMat}</td>
                                <td>
                                    <button onClick={() => handleEdit(materiel)}>
                                        <BsPencil className="icon_header" style={{ color: "black", background: "gray",color:'blue', width: "30px", height: "20px" }} />
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(materiel.id)}>
                                        <BsTrash className="icon_header" style={{ color: "black", background: "gray",color:'crimson', width: "30px", height: "20px" }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListMat;
