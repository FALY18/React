import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import { BsPencil, BsTrash ,BsPersonAdd} from "react-icons/bs";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function ListUtilisateur(){

    const [utilisateurs,setUtilisateurs] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        const fetchUtilisateurs = async() => {
            try{
                const response = await axios.get("http://localhost:8081/api/utilisateurs")
                setUtilisateurs(response.data)
            } catch(error){
                console.error("Erreur de recuperation de donnée")
            }
        }
        fetchUtilisateurs()
    },[]);

const handleEdit =(utilisateur) =>{
    navigate('/addUtilisateur', {state:{utilisateur}})
}

const Myswal = withReactContent(Swal)
const handleDelete = async (idUs) =>{
    Myswal.fire({
            title: 'Êtes-vous sûr de Supprimer cet utilisateur?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimez-le!'
    }).then(async(result) =>{
        if(result.isConfirmed){
           try{
            await axios.delete(`http://localhost:8081/api/utilisateurs/${idUs}`)
            setUtilisateurs(utilisateurs.filter(utilisateur => utilisateur.idUs !== idUs))
           } catch(err){
                console.error("erreur lors de suppression de utilsiateur")
           }
        }
    })
}
    return (
        <div className="usersList">
            <h2 className="list">Listes des utilisateurs</h2>
           <div className="link"> <Link to="/addUtilisateur"><BsPersonAdd/> ajouter</Link></div>
            <div className="usersTable">
                <table>
                    <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Nom</th>
                            <th>Prénoms</th>
                            <th>Fonction</th>
                            <th>Email</th>
                            <th></th><th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {utilisateurs.map((utilisateur) => 
                           ( <tr key={utilisateur.idUs}>
                                <td>{utilisateur.idUs}</td>
                                <td>{utilisateur.nomUs}</td>
                                <td>{utilisateur.prenomUs}</td>
                                <td>{utilisateur.foncUs}</td>
                                <td>{utilisateur.emailUs}</td>
                                <td >
                                    <button onClick={() =>handleEdit(utilisateur)}> <BsPencil className="icon_header" style={{color:"black",background:"gray",color:'blue',width:"30px ",height:"20px"}}/> </button> 
                                </td>
                                <td >
                                     <button onClick={() =>handleDelete(utilisateur.idUs)}> <BsTrash className="icon_header" style={{color:"black",background:"gray",color:'crimson', width:"30px ",height:"20px"}} /></button>
                                </td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )       
}
export default ListUtilisateur