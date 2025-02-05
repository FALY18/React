import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState('')
    const navigate = useNavigate();
    const [signup,setSignup] = useState(false)

    const OnclickSignUp = () =>{
        setSignup(!signup)
    }

    function HandleSub(event) {
        event.preventDefault();
       if(signup == false){
            if (email === '' || password === '') {
                toast.error("Veuillez remplir tous les champs!");
            } else {
                axios.post('http://localhost:8081/api/auth/login', { email, password })
                .then(res => {
                    if (res.data === "Connecté avec succès" || res.data.includes("Erreur lors de l'envoi de l'email")) {
                        toast.success("Bravo! Vous êtes connecté avec succès");
                        localStorage.setItem('authToken', 'your-auth-token');
                        setTimeout(() => {
                            navigate("/home");
                        }, 1500); 
                    } else {
                        toast.error("Email ou mot de passe incorrect! Veuillez vérifier!");
                    }
                })
                .catch(err => toast.error("Une erreur s'est produite! Veuillez réessayer!"));
            }
        }else if(email===''|| password==='' || users==''){
            toast.info("veuillez remplir tous le champs")
        }else{
             axios.post('http://localhost:8081/api/auth/signup',{users,email,password})
            .then(res => {
                if(res.data === "signup success"){
                    toast.success("nouveau compte ajouté")
                    localStorage.setItem('authToken', 'your-auth-token');
                            setTimeout(() => {
                                navigate("/home");
                            }, 1500); 
                }else{
                    toast.error("utilisateur réfusé")
                }
            })
            .catch(error => toast.error("veuillez réessayer plus tard e!"));
        }
    }

    return (
        <div className="myform">
            <h1></h1>
            <div className="myform1">
                <form onSubmit={HandleSub} className="form">
                    <ToastContainer />
                    {
                        signup? (
                            <div className="formulaire">
                            <label htmlFor="users" className="label">Nom d'utilisateur</label>
                            <input
                                type="text"
                                className="input"
                                name="users"
                                placeholder="nom d'uilisateur"
                                onChange={e =>setUsers(e.target.value)}
                            />
                        </div>
                        ): ""
                    }
                    <div className="formulaire">
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            type="text"
                            className="input"
                            name="email"
                            placeholder="votre email"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="formulaire">
                        <label htmlFor="password" className="label">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            className="input"
                            placeholder="Mot de passe"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="cloudflaire">
                        <input type="checkbox" />
                        <label htmlFor="">vérifier</label>
                    </div>
                    <button className="btnLogin">{signup ? 'Sign Up' : 'Login' }</button>
                    <div><a href="#" onClick={OnclickSignUp}>{signup?"my account":"new account"}</a></div>
                </form>
            </div>
        </div>
    );
}

export default Login;
