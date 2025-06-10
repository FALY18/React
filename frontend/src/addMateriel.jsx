import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function AddMat() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        id: '',
        nomMat: '',
        qteMat: '',
        etatMat: ''
    });
console.log(formData)
    const [isEditMode, setIsEditMode] = useState(false);

/*avy amin listMateriel d miacceder am proprité ny materiel1 -d modifiena ny valeurs formData -d atao true ny setIsEdit */
    useEffect(() => {
        if (location.state && location.state.materiel) {
            setFormData(location.state.materiel);
            setIsEditMode(true);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;//nouveau valeur form ty a
        setFormData({
            ...formData,//copie valuer exitant ny fomData
            [name]: value//remplacer et change avec ce nouveau valeur
        });
    };

    const Myswal = withReactContent(Swal)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await axios.put(`http://localhost:8081/api/materiels/${formData.id}`, formData);//awiat attendre la repaonse de requette axiox.post
                Myswal.fire({
                    title: 'modification reussi!',
                    icon:'information',
                    confirmButtonText :'ok',
                    confirmButtonColor:'#3085d6'
                })
            } else {
                await axios.post('http://localhost:8081/api/materiels', formData);
                Myswal.fire({
                    title: 'ajout reussi!',
                    icon: 'information',
                    confirmButtonColor:'#3085d6',
                    confirmButtonText: 'ok'
                })
            }
            navigate('/materiels');
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire", error);
        }
    };

    return (
        <div className="addMat">
            <h2>{isEditMode ? 'Modifier le Matériel' : 'Ajout de Matériel'}</h2>
            <hr />
            <div className="addMat1">
                <form onSubmit={handleSubmit} className="myformu">

                    <div className="formu">
                        <label htmlFor="id">Id</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="Id matériel"
                            required
                        />
                    </div>

                    <div className="formu">
                        <label htmlFor="nomMat">Nom</label>
                        <input
                            type="text"
                            name="nomMat"
                            value={formData.nomMat}
                            onChange={handleChange}
                            placeholder="Nom du matériel"
                            required
                        />
                    </div>


                    <div className="formu">
                        <label htmlFor="foncUs">Etat du materiel</label>
                        <select name="etatMat" value={formData.etatMat} onChange={handleChange} style={{ border:"none", padding: '8px 30px 8px', background: "gray ", outline:'none',borderRadius:'10%'}}>
                            <option value="">Sélectionnez l'etat</option>
                            <option value="neuf">neuf</option>
                            <option value="bonne">bonne</option>
                            <option value="mauvais">mauvais</option>
                        </select>
                    </div>

                    <div className="formu">
                        <label htmlFor="qteMat">Quantité</label>
                        <input
                            type="number"
                            name="qteMat"
                            value={formData.qteMat}
                            onChange={handleChange}
                            placeholder="Quantité"
                            required
                        />
                    </div>

                    <div className="add">
                        <button type="submit" className="btnLogin">
                            {isEditMode ? 'Modifier' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMat;
