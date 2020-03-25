import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";
import api from "../../services/api";

export default function Login() {
  const [id, setID] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.login(id);
      localStorage.setItem("ngoId", id);
      localStorage.setItem("ngoName", res.data.name);
      history.push("/profile");
    } catch (e) {
      alert("Erro ao fazer login");
    }
  }

  return (
    <div className="login-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu Login</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={e => setID(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="form-link" to="/register">
            <FiLogIn size={16} color="#e02041"></FiLogIn> Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
