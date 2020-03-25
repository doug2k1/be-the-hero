import React, { useEffect, useState } from "react";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";

export default function Profile() {
  const ngoName = localStorage.getItem("ngoName");
  const ngoId = localStorage.getItem("ngoId");

  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.listIncidents(ngoId);
        setIncidents(res.data);
      } catch (e) {
        alert("Falha ao carregar os casos");
      }
    }
    fetchData();
  }, [ngoId]);

  async function handleDeleteIncident(id) {
    try {
      await api.deleteIncident(id, ngoId);
      setIncidents(incidents.filter(i => i.id !== id));
      alert("Caso excluido");
    } catch (e) {
      alert("Erro ao excluir o caso");
    }
  }

  function handleLogout() {
    localStorage.removeItem("ngoId");
    localStorage.removeItem("ngoName");
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ngoName}!</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>

            <button onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
