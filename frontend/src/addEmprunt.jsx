import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function AddEmprunt() {
    const [formData, setFormData] = useState({
        idUs: '',
        id: '',
        dateEmprunt: '',
        salle: '',
        duree: ''
    });

    const [emprunts, setEmprunts] = useState([]);
    const Myswal = withReactContent(Swal);
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchEmprunts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/emprunts');
                setEmprunts(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des emprunts", error);
            }
        };
        fetchEmprunts();
    }, []);

    const recupValForm = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const envoyerFormData = async (e) => {
        e.preventDefault();

        
        const isMaterialAlreadyBorrowed = emprunts.some(emprunt => emprunt.id === formData.id);
        const isSalleAlreadyBorrowed = emprunts.some(emprunt => emprunt.salle === formData.salle);

        if (isMaterialAlreadyBorrowed) {
            Myswal.fire({
                title: 'Erreur',
                text: 'Ce matériel est déjà emprunté !',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
            return;
        }

        if (isSalleAlreadyBorrowed) {
            Myswal.fire({
                title: 'Erreur',
                text: 'Cette salle est déjà utilisée pour un autre emprunt !',
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
            return;
        }

        
        try {
            const response = await axios.post('http://localhost:8081/api/emprunts', formData);

            if (response.status === 200) {
                Myswal.fire({
                    title: 'Ajout avec succès',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                navigate('/emprunts');
            } else {
                Myswal.fire({
                    title: 'Erreur lors de l\'ajout .....',
                    text: response.data.message || 'Une erreur inconnue s\'est produite',
                    icon: 'error',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Une erreur s\'est produite', error);
            Myswal.fire({
                title: 'Erreur lors de l\'ajout',
                text: error.message,
                icon: 'error',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="addMat">
            <div className="addMat1">
                <form className="myformu" onSubmit={envoyerFormData}>
                    <div className="formu">
                        <label htmlFor="idUs">Id Utilisateur</label>
                        <input type="text" name="idUs" value={formData.idUs} onChange={recupValForm} />
                    </div>

                    <div className="formu">
                        <label htmlFor="id">Id Matériel</label>
                        <input type="text" name="id" value={formData.id} onChange={recupValForm} />
                    </div>
                    <div className="formu">
                        <label htmlFor="dateEmprunt">Date d'emprunt</label>
                        <input type="date" name="dateEmprunt" value={formData.dateEmprunt} onChange={recupValForm} />
                    </div>

                    <div className="formu">
                        <label htmlFor="salle">Salle</label>
                        <select name="salle" value={formData.salle} onChange={recupValForm} style={{ border:"none", padding: '8px 30px 8px', background: "gray ", outline:'none',borderRadius:'10%'}}>
                            <option value="">Sélectionnez la salle</option>
                            <option value="salle01">salle01</option>
                            <option value="salle15">salle15</option>
                            <option value="salle11">salle11</option>
                        </select>
                    </div>
                 
                    <div className="formu">
                        <label htmlFor="duree">Durée (hh:mm:ss)</label>
                        <input 
                            type="text" 
                            name="duree" 
                            value={formData.duree} 
                            onChange={recupValForm} 
                            placeholder="hh:mm:ss" 
                            pattern="([01]\d|2[0-3]):([0-5]\d):([0-5]\d)" 
                            title="Format attendu: hh:mm:ss"
                            required
                        />
                    </div>


                    <div className="add">
                        <button type="submit" className="btnLogin">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmprunt;
