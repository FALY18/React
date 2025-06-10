import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

function AddUtilisateur() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        idUs: '',
        nomUs: '',
        prenomUs: '',
        foncUs: '',
        emailUs: ''
    });

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (location.state && location.state.utilisateur) {
            setFormData(location.state.utilisateur);
            setIsEditMode(true);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const MySwal = withReactContent(Swal);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {         
                await axios.put(`http://localhost:8081/api/utilisateurs/${formData.idUs}`, formData);
                MySwal.fire({
                    title: 'Modification reuissi!',
                    icon: 'information',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'ok'
                })
            } else {
                await axios.post('http://localhost:8081/api/utilisateurs', formData);
                MySwal.fire({
                    title: 'ajouté avec succes!',
                    icon:'information',
                    confirmButtonText:'ok',
                    confirmButtonColor: '#3085d6'
                })
            }
            navigate('/utilisateurs');
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire", error);
        }
    };

    return (
        <div className="addMat">
            <h2>{isEditMode ? '' : 'Ajouter un utilisateur'}</h2>
            <hr />
            <div className="addMat1">
                <form onSubmit={handleSubmit} className="myformu">
                    {isEditMode && (
                        <div className="formu">
                            <label htmlFor="idUs">ID</label>
                            <input
                                type="text"
                                name="idUs"
                                value={formData.idUs}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                    )}
                    <div className="formu">
                        <label htmlFor="nomUs">Nom</label>
                        <input
                            type="text"
                            name="nomUs"
                            value={formData.nomUs}
                            onChange={handleChange}
                            placeholder="Entrer le nom"
                            required
                        />
                    </div>
                    <div className="formu">
                        <label htmlFor="prenomUs">Prénoms</label>
                        <input
                            type="text"
                            name="prenomUs"
                            value={formData.prenomUs}
                            onChange={handleChange}
                            placeholder="Entrer les prénoms"
                            required
                        />
                    </div>
                    <div className="formu">
                        <label htmlFor="foncUs">Fonction</label>
                        <select name="foncUs" value={formData.foncUs} onChange={handleChange} style={{ border:"none", padding: '8px 30px 8px', background: "gray ", outline:'none',borderRadius:'10%'}}>
                            <option value="">Sélectionnez la fonction</option>
                            <option value="Formateur">Formateur</option>
                            <option value="Etudiant">Etudiant</option>
                            <option value="Stagiaire">Stagiaire</option>
                        </select>
                    </div>
                    <div className="formu">
                        <label htmlFor="emailUs">Email</label>
                        <input
                            type="email"
                            name="emailUs"
                            value={formData.emailUs}
                            onChange={handleChange}
                            placeholder="Entrer l'email"
                            required
                        />
                    </div>
                    <div className="add">
                        <button type="submit" className="btnLogin">
                            {isEditMode ? 'Modifier          ' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUtilisateur;
