import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { BsPeople, BsBell, BsKeyboard, BsListTask } from "react-icons/bs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Home() {
  const [data, setData] = useState({
    utilisateurs: 0,
    emprunts: 0,
    materiels: 0,
  });

  const [notificationCount, setNotificationCount] = useState(0);
  const [etatMatStats, setEtatMatStats] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/emprunts");
        const emprunts = response.data;
        const count = emprunts.filter(emprunt => emprunt.duree === "00:00:00").length;
        setNotificationCount(count);
      } catch (err) {
        console.log('Erreur lors de la récupération des notifications:', err);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchEtatMatStats = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/statistics/etatMat');
        setEtatMatStats(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques par état du matériel:', error);
      }
    };
    fetchEtatMatStats();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/dashboard/data');
        setData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <Link to="/utilisateurs" className="card">
          <div className="card-inner">
            <BsPeople />
            <h3>Utilisateurs</h3>
          </div>
          <h1>{data.utilisateurs}</h1>
        </Link>

        <Link to="/materiels" className="card">
          <div className="card-inner">
            <BsKeyboard />
            <h3>Matériels</h3>
          </div>
          <h1>{data.materiels}</h1>
        </Link>

        <Link to="/emprunts" className="card">
          <div className="card-inner">
            <BsListTask />
            <h3>En cours</h3>
          </div>
          <h1>{data.emprunts}</h1>
        </Link>
  
        <Link to="/emprunts" className="card">
          <div className="card-inner">
            <BsBell />
            <h3>Notifications</h3>
          </div>
          <p>Vous avez {notificationCount} notifications</p>
        </Link>
      </div>

      <div className="stat">
        <div className="container">
          <h4>Analyse d'etat du matériel</h4>
          <ResponsiveContainer width="75%" height={290}>
            <BarChart data={etatMatStats}>
              <CartesianGrid strokeDasharray="3 4" />
              <XAxis dataKey="etatMat" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalQuantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default Home;

